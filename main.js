import makeWASocket from "@whiskeysockets/baileys"
import { useMultiFileAuthState } from "@whiskeysockets/baileys"
import Pino from "pino"
import { config } from "./config.js"
import handler from "./handler.js"
import { loadDB, saveDB } from "./lib/database.js"
global.db = loadDB()

export default async function startOrbit() {
  const { state, saveCreds } = await useMultiFileAuthState(config.sessionName)

  const sock = makeWASocket({
    logger: Pino({ level: "silent" }),
    auth: state,
    printQRInTerminal: true
  })

  sock.ev.on("creds.update", saveCreds)

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0]
    if (!msg.message) return
    await handler(sock, msg)
  })
  
import { saveDB } from "./lib/database.js"
saveDB(global.db)

  console.log(`🛰️ ${config.botName} iniciado correctamente`)
}

