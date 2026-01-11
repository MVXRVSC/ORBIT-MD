const queue = []

export function addQueue(task) {
  queue.push(task)
}

export async function processQueue() {
  if (queue.length === 0) return
  const task = queue.shift()
  await task()
}

