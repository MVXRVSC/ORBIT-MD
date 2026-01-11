export function addXP(user, amount = 1) {
  user.xp = (user.xp || 0) + amount
  user.level = Math.floor(user.xp / 100)
  return user
}
