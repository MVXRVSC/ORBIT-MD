/* ⚙️ Credits to:
* ORBIT Team
* DevMaster
* CodeBotX
*/

import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import fs from 'fs'
import moment from 'moment-timezone'
import path, { join } from 'path'
import { getRandomImageBoys } from 'module-gatadios'
import { fileURLToPath, pathToFileURL } from 'url'
import { platform } from 'process'

global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') { 
    return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString() 
}; 

global.__dirname = function dirname(pathURL) { 
    return path.dirname(global.__filename(pathURL, true)) 
}; 

global.__require = function require(dir = import.meta.url) { 
    return createRequire(dir) 
}

const __dirname = global.__dirname(import.meta.url)

// 🟢 Propietarios y bots
global.owner = [
  ['5353023586', '✨ ORBIT-MD', true],
  ['5359336242'],
  ['5355718620'],
  ['595976126756'],
  ['593968585383'],
  ['50492280729'],
  ['573012482597']
]

// Opcional: sesión por número
global.botNumberCode = '' // ejemplo: +59309090909
global.confirmCode = ''

global.suittag = ['5214531287294']
global.mods = []
global.prems = []

global.isdev = [
  ['542215034412'],
  ['593968263524'],
  ['573012482597'],
  ['5492215034412'],
  ['5214434703586'],
  ['595976126756'],
  ['573012482597']
]

// Branding del bot
global.packname = 'ORBIT-MD ✨'
global.author = 'ORBIT TEAM 🫶'
global.wm = 'ORBIT-MD | ORBIT TEAM 🫶'
global.wm2 = '                   ORBIT-MD ✨\n> *Administrador de sesiones y funciones avanzadas*'
global.des = 'Bot de WhatsApp con QR y sesión por número.'

// Librerías
global.vs = 'V2'
global.library = 'Baileys'
global.baileys = '@whiskeysockets/baileys'
global.lenguaje = 'Español'
global.menudi = ['⛶','❏','⫹⫺']
global.dev = 'ORBIT TEAM'
global.devnum = '+593968263524'

// Decoración de menús
global.dis = ':⁖֟⊱┈֟፝❥ '
global.cen1 = '✧──⭒─⊹ '
global.cen2 = ' ⊹─⭒──✧'

// Imágenes y medios
global.random1 = getRandomImageBoys

global.imagen1 = fs.readFileSync('./storage/logos/Menu1.jpg')
global.imagen2 = fs.readFileSync('./storage/logos/Menu2.jpg')
global.imagen3 = fs.readFileSync('./storage/logos/Menu3.jpg')
global.imagen4 = fs.readFileSync('./storage/logos/Menu4.jpg')

// URLs de imágenes generales
global.ImgAll = [
  'https://telegra.ph/file/9a9a4851b638c90ebb214.jpg',
  'https://telegra.ph/file/c248943164f6a3d28088c.jpg',
  'https://telegra.ph/file/f14102fec3b4104e41e98.jpg',
  'https://telegra.ph/file/5646b7540b22e8a00615e.jpg',
  'https://telegra.ph/file/e6c11fc60a74a77789f56.jpg',
  'https://telegra.ph/file/19af932324e24ceb896cd.jpg'
]

// Videos generales
global.yartexVid = [
  'https://telegra.ph/file/991f743c25817e4b94db5.mp4',
  'https://telegra.ph/file/a45d4c28a7b57bf2b4e5c.mp4',
  'https://telegra.ph/file/42628261be1a83c99907b.mp4',
  'https://telegra.ph/file/579959f8734e12ee3d827.mp4',
  'https://telegra.ph/file/7f9922e4d2cb2001b4682.mp4'
]

// Links oficiales y redes
global.yt = 'https://youtube.com/@orbitteam'
global.ig = 'https://instagram.com/orbitteam'
global.md = 'https://github.com/YourUsername/ORBIT-MD'
global.paypal = 'https://paypal.me/orbitteam'
global.git = 'https://github.com/YourUsername'
global.email = 'orbitbot@gmail.com'
global.group = 'https://chat.whatsapp.com/ORBITGROUP'
global.channel = 'https://whatsapp.com/channel/ORBITCHANNEL'
global.linkSity = [yt, ig, md, paypal, git, channel, email]

// Directorios
global.raiz = './'
global.aniD = 'sessions/'
global.dirP = raiz
global.authFile = join(__dirname, `sessions/`)
global.authFileRespald = join(__dirname, `sesionRespaldo/`)
global.temp = join(__dirname, 'tmp')
global.media = raiz+'media/'
global.jadibts = join(__dirname, 'jadibts/')

// Emojis y estados
global.rwait = '⏰'
global.done = '✅'
global.error = '❌'
global.wait = '*■□□□□ 20%*'
global.waitt = '*■■■□□ 60%*'
global.waittt = '*■■■■□ 90%*'
global.waitttt = '*■■■■■ 100%*'

// APIs
global.keysZens = ['LuOlangNgentot','c2459db922','37CC845916']
global.keysxxx = keysZens[Math.floor(keysZens.length * Math.random())]

global.APIs = {
  amel: 'https://melcanz.com',
  bx: 'https://bx-hunter.herokuapp.com',
  nrtm: 'https://nurutomo.herokuapp.com'
}
global.APIKeys = {
  'https://melcanz.com': 'F3bOrWzY',
  'https://bx-hunter.herokuapp.com': 'Ikyy69'
}

// Multiplicador RPG
global.multiplier = 200
global.rpg = {
  emoticon(string) {
    string = string.toLowerCase()
    let emot = {
      level: '🏆', limit: '💎', exp: '✨',
      health: '❤️', money: '💵', potion: '🥤', pickaxe: '⛏️'
    }
    let results = Object.keys(emot).map(v => [v, new RegExp(v, 'gi')]).filter(v => v[1].test(string))
    if (!results.length) return ''
    else return emot[results[0][0]]
  }
}

// Fechas y hora
global.d = new Date(new Date + 3600000)
global.locale = 'es'
global.dia = d.toLocaleDateString(locale, {weekday: 'long'})
global.fecha = d.toLocaleDateString('es', {day: 'numeric', month: 'numeric', year: 'numeric'})
global.mes = d.toLocaleDateString('es', {month: 'long'})
global.año = d.toLocaleDateString('es', {year: 'numeric'})
global.tiempo = d.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true})

// WatchFile para recarga automática
let file = fileURLToPath(import.meta.url)
watchFile(file, () => { 
  unwatchFile(file)
  console.log(chalk.yellow('Se actualizó el archivo config.js'))
  import(`${file}?update=${Date.now()}`)
})
