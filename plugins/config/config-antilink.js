export default {
  command: ["antilink"],
  tags: "config",
  admin: true,
  group: true,

  run: async (sock, m, { args }) => {
    const db = global.db
    const gid = m.chat
    const chat = db.data.chats[gid] ||= {}
    chat.antiLink = args[0] === "on"

    await sock.sendMessage(gid, {
      text: `🔗 Anti-Link ${chat.antiLink ? "ACTIVADO" : "DESACTIVADO"}`
    })
  }
}
