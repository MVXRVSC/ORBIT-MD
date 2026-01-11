import fetch from "node-fetch"

export async function getJSON(url) {
  const res = await fetch(url)
  return res.json()
}

