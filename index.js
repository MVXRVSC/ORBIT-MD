import { join, dirname } from 'path'
import { createRequire } from 'module'
import { fileURLToPath } from 'url'
import cluster from 'cluster'
import { watchFile, unwatchFile } from 'fs'
import cfonts from 'cfonts'
import { createInterface } from 'readline'
import boxen from 'boxen'
import yargs from 'yargs'
import chalk from 'chalk'

/* ================= PATH ================= */
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const require = createRequire(__dirname)

/* ================= PACKAGE ================= */
const pkg = require(join(__dirname, './package.json'))
const { name, author, version, description, collaborators } = pkg

/* ================= UI ================= */
const rl = createInterface(process.stdin, process.stdout)
console.log(chalk.bold('✨ Iniciando Orbit MD...'))

let activeCollaborators = Object.values(collaborators || {}).join(', ')

cfonts.say(`${name}\nbot md`, {
  align: 'center',
  gradient: ['red', 'blue']
})

cfonts.say(description || 'Orbit MD WhatsApp Bot', {
  font: 'console',
  align: 'center',
  gradient: ['blue', 'magenta']
})

const message = `
${chalk.white.bold('Desarrollado por »')} ${chalk.dim.bold(author?.name || 'Unknown')}
${chalk.white.bold('Código base »')} ${chalk.dim.bold(collaborators?.col1 || 'Orbit MD')}
${chalk.white.bold('Colaboradores »')} ${chalk.dim.bold(activeCollaborators || '—')}
${chalk.white.bold('Versión »')} ${chalk.dim.bold(version)}
`

console.log(
  boxen(message.trim(), {
    padding: 1,
    margin: 1,
    borderStyle: 'double',
    borderColor: 'blue',
    float: 'center'
  })
)

/* ================= CLUSTER ================= */
let isRunning = false

async function start(file) {
  if (isRunning) return
  isRunning = true

  const args = [join(__dirname, file), ...process.argv.slice(2)]

  if (cluster.isPrimary) {
    console.log(chalk.green('🚀 Lanzando proceso principal...'))

    const worker = cluster.fork({
      ARGS: JSON.stringify(args)
    })

    worker.on('message', data => {
      if (data === 'reset') {
        console.log(chalk.yellow('♻️ Reiniciando bot...'))
        worker.kill()
        isRunning = false
        start(file)
      }
      if (data === 'uptime') {
        worker.send(process.uptime())
      }
    })

    worker.on('exit', (_, code) => {
      isRunning = false
      console.error(chalk.red(`⚠️ Bot cerrado con código ${code}`))

      if (code !== 0) {
        watchFile(args[0], () => {
          unwatchFile(args[0])
          start(file)
        })
      }
    })

  } else {
    const parsedArgs = JSON.parse(process.env.ARGS)
    process.argv = parsedArgs
    await import(parsedArgs[0])
  }

  /* ================= CONSOLE INPUT ================= */
  let opts = yargs(process.argv.slice(2)).exitProcess(false).parse()
  if (!opts.test && !rl.listenerCount('line')) {
    rl.on('line', line => {
      cluster.worker?.send(line.trim())
    })
  }
}

start('main.js')
