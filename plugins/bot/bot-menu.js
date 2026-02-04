export default {
  command: ["menu", "help"],
  tags: "bot",
  desc: "Menú principal",

  run: async (sock, m, { config }) => {
    const menu = `
🛰️ ${config.botName}
━━━━━━━━━━━━
• .menu
• .info
• .ping
• .sticker
• .kick
• .translate
━━━━━━━━━━━━
    `
    await sock.sendMessage(m.chat, { text: menu })
  }
}
