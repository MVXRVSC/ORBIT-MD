export default {
  command: ["rank", "top"],
  tags: "xp",

  run: async (sock, m) => {
    const users = Object.entries(global.db.data.users)
      .sort((a, b) => b[1].xp - a[1].xp)
      .slice(0, 10)

    let text = "🏆 TOP XP\n\n"
    users.forEach(([jid, u], i) => {
      text += `${i + 1}. @${jid.split("@")[0]} → Lv.${u.level} (${u.xp} XP)\n`
    })

    await sock.sendMessage(m.chat, {
      text,
      mentions: users.map(u => u[0])
    })
  }
}
