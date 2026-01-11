import { config } from "./config.js"

export default async function handler(sock, msg) {
  const text =
    msg.message?.conversation ||
    msg.message?.extendedTextMessage?.text ||
    ""

  if (!text) return

  const prefix = config.prefix.find(p => text.startsWith(p))
  if (!prefix) return

  const command = text.slice(prefix.length).trim().split(" ")[0].toLowerCase()

  if (command === "ping") {
    await sock.sendMessage(msg.key.remoteJid, {
      text: "🛰️ ORBIT-MD activo"
    })
  }
}

