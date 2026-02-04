import { addXP } from "../../lib/leveling.js"

export default {
  custom: true,

  run: async (sock, m) => {
    if (!m.chat.endsWith("@g.us")) return

    const db = global.db
    const user = db.data.users[m.sender] ||= { xp: 0, level: 0 }

    const oldLevel = user.level
    addXP(user, 5)

    if (user.level > oldLevel) {
      await sock.sendMessage(m.chat, {
        text: `🎉 @${m.sender.split("@")[0]} subió a nivel ${user.level}`,
        mentions: [m.sender]
      })
    }
  }
}
