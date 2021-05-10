const { spawn, execSync } = require('child_process')

// A map of task names to error strings.
let errors = {}

// Look at the session data every time it changes.
function onSessionChange() {
  let output = execSync('tilt get session Tiltfile -o=json')
  let data = JSON.parse(output)
  let targets = data.status.targets || []

  let maybeNewErrors = {}
  targets.forEach((task) => {
    let error = (task.state && task.state.terminated && task.state.terminated.error) || ''
    if (error) {
      maybeNewErrors[task.name] = error
    }
  })

  for (let key in maybeNewErrors) {
    if (maybeNewErrors[key] && !errors[key]) {
      console.error('HONK: ' + maybeNewErrors[key])
    }
  }
  errors = maybeNewErrors
}

// Get notifications whenver the session data changes.
const session = spawn('tilt', ['get', 'session', 'Tiltfile', '--watch'])
let current = ''
session.stdout.on('data', onSessionChange)
session.stderr.pipe(process.stderr)
session.on('close', (code) => {
  console.error(`"tilt" stopped streaming session data: ${code}`)
})
