export default {
  command: ["antiprivado"],
  tags: "config",
  owner: true,

  run: async (sock, m, { args }) => {
    global.config.antiPrivate = args[0] === "on"
    await sock.sendMessage(m.chat, {
      text: `🔒 Anti-Privado ${global.config.antiPrivate ? "ACTIVADO" : "DESACTIVADO"}`
    })
  }
}

