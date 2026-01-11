export function addXP(user, amount = 5) {
  user.xp = (user.xp || 0) + amount
  user.level = Math.floor(user.xp / 100)
  return user
}
