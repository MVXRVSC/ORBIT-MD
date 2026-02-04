import { generateWAMessageFromContent } from '@whiskeysockets/baileys'
import { smsg } from './lib/simple.js'
import { format } from 'util'
import { fileURLToPath } from 'url'
import path, { join } from 'path'
import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const isNumber = x => typeof x === 'number' && !isNaN(x)
const delay = ms => isNumber(ms) && new Promise(r => setTimeout(r, ms))

export async function handler(chatUpdate) {
  if (!chatUpdate?.messages) return
  this.pushMessage(chatUpdate.messages).catch(() => {})

  let m = chatUpdate.messages.at(-1)
  if (!m) return

  if (!global.db.data) await global.loadDatabase()
  m = smsg(this, m)

  /* ================= USER ================= */
  let user = global.db.data.users[m.sender] ||= {
    exp: 0,
    money: 10,
    diamond: 20,
    level: 0,
    role: 'Novato',
    registered: false,
    premium: false,
    premiumTime: 0,
    afk: -1,
    afkReason: '',
    banned: false,
    warn: 0,
    muto: false,
    autolevelup: true
  }

  /* ================= CHAT ================= */
  let chat = global.db.data.chats[m.chat] ||= {
    isBanned: false,
    welcome: true,
    detect: false,
    delete: true,
    antiLink: false,
    antiFake: false,
    antiTraba: true,
    modoadmin: false,
    nsfw: true,
    reaction: true
  }

  /* ================= SETTINGS ================= */
  let settings = global.db.data.settings[this.user.jid] ||= {
    self: false,
    autoread: false,
    restrict: false,
    antiCall: false
  }

  const isROwner = [this.user.jid, ...global.owner.map(v => v[0] + '@s.whatsapp.net')].includes(m.sender)
  const isOwner = isROwner || m.fromMe
  const isMods = isOwner || global.mods?.includes(m.sender)
  const isPrems = isROwner || user.premiumTime > Date.now()

  if (settings.self && !isOwner) return
  if (chat.isBanned && !isOwner) return
  if (user.banned && !isOwner) return

  m.exp = Math.ceil(Math.random() * 10)

  /* ================= PLUGINS ================= */
  const pluginDir = join(__dirname, 'plugins')

  for (let name in global.plugins) {
    let plugin = global.plugins[name]
    if (!plugin || plugin.disabled) continue

    try {
      if (typeof plugin.all === 'function') {
        await plugin.all.call(this, m, { chatUpdate })
      }

      if (plugin.custom && typeof plugin.run === 'function') {
        await plugin.run.call(this, this, m, { conn: this, chatUpdate })
      }

      if (!plugin.command) continue
      if (!m.text) continue

      let prefix = plugin.customPrefix || global.prefix
      let usedPrefix = ''
      if (prefix instanceof RegExp) {
        const match = m.text.match(prefix)
        if (!match) continue
        usedPrefix = match[0]
      } else {
        if (!m.text.startsWith(prefix)) continue
        usedPrefix = prefix
      }

      let [cmd, ...args] = m.text.slice(usedPrefix.length).trim().split(/\s+/)
      cmd = cmd.toLowerCase()

      let accepted = Array.isArray(plugin.command)
        ? plugin.command.includes(cmd)
        : plugin.command === cmd

      if (!accepted) continue

      if (plugin.owner && !isOwner) return
      if (plugin.mods && !isMods) return
      if (plugin.premium && !isPrems) return
      if (plugin.group && !m.isGroup) return
      if (plugin.admin && !m.isAdmin) return

      const text = args.join(' ')
      const handlerFn = typeof plugin.call === 'function' ? plugin.call : plugin.run
      if (typeof handlerFn !== 'function') continue

      await handlerFn.call(this, this, m, {
        args,
        text,
        command: cmd,
        usedPrefix,
        prefix: usedPrefix,
        config: global.config || {},
        conn: this,
        isOwner,
        isMods,
        isPrems
      })

      user.exp += plugin.exp || 10

    } catch (e) {
      console.error(e)
      m.reply(`❌ Error en *${name}*\n\n${format(e)}`)
    }
  }

  user.exp += m.exp
}

/* ================= ANTICALL ================= */
export async function callUpdate(calls) {
  let settings = global.db.data.settings[this.user.jid]
  if (!settings?.antiCall) return

  for (let call of calls) {
    if (call.status === 'offer') {
      await this.sendMessage(call.from, {
        text: '🚫 Las llamadas están prohibidas.\nSerás bloqueado.'
      })
      await this.updateBlockStatus(call.from, 'block')
    }
  }
}

/* ================= DELETE DETECT ================= */
export async function deleteUpdate(msg) {
  try {
    let m = this.loadMessage(msg.id)
    if (!m?.isGroup) return

    let chat = global.db.data.chats[m.chat]
    if (!chat?.delete) return

    await this.sendMessage(m.chat, {
      text: `🗑️ Mensaje eliminado por @${msg.participant.split('@')[0]}`,
      mentions: [msg.participant]
    })

    await this.copyNForward(m.chat, m)

  } catch {}
}

/* ================= HOT RELOAD ================= */
watchFile(__filename, () => {
  unwatchFile(__filename)
  console.log(chalk.redBright('handler.js actualizado'))
  if (global.reloadHandler) global.reloadHandler()
})
