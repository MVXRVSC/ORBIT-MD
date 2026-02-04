export default {
  custom: true,

  run: async (sock, m) => {
    const db = global.db
    const text = m.text || ""
    const gid = m.chat
    const chat = db.data.chats[gid] || {}

    // ANTI-PRIVADO
    if (!gid.endsWith("@g.us") && global.config.antiPrivate) {
      await sock.sendMessage(gid, { text: "❌ No escribas al privado." })
      return
    }

    // ANTI-LINK
    if (gid.endsWith("@g.us") && chat.antiLink) {
      if (/https?:\/\//i.test(text)) {
        await sock.sendMessage(gid, {
          text: "🚫 Links no permitidos"
        })
        await sock.groupParticipantsUpdate(gid, [m.sender], "remove")
      }
    }

    // ANTI-FAKE
    if (gid.endsWith("@g.us") && chat.antiFake) {
      if (!m.sender.startsWith("+53")) {
        await sock.groupParticipantsUpdate(gid, [m.sender], "remove")
      }
    }
  }
}
