export default {
  command: ["antifake"],
  tags: "config",
  admin: true,
  group: true,

  run: async (sock, m, { args }) => {
    const db = global.db
    const gid = m.chat
    const chat = db.data.chats[gid] ||= {}
    chat.antiFake = args[0] === "on"

    await sock.sendMessage(gid, {
      text: `🛡️ Anti-Fake ${chat.antiFake ? "ACTIVADO" : "DESACTIVADO"}`
    })
  }
}
