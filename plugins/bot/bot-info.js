export default {
  command: ["info", "estado", "bot"],
  tags: "bot",
  desc: "Información básica del bot",

  run: async (sock, m, { config, usedPrefix }) => {
    const prefixes = Array.isArray(config?.prefix) ? config.prefix.join(" ") : usedPrefix
    const botName = config?.botName || "ORBIT-MD"

    const text = [
      `🤖 ${botName}`,
      "",
      `Prefijos: ${prefixes || "no configurado"}`,
      `Estado: activo`,
      "",
      `Escribe ${usedPrefix || "."}menu para ver comandos.`
    ].join("\n")

    await sock.sendMessage(m.chat, { text })
  }
}
