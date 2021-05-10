#!/usr/bin/env node

const { spawn, execSync } = require('child_process')
const fs = require('fs')
const Speaker = require('speaker')
const path = require('path')

// A map of task names to error strings.
let errors = {}
let honking = false

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
    if (maybeNewErrors[key] && !errors[key] && !honking) {
      honking = true
      let speaker = new Speaker({channels: 2, bitDepth: 16, sampleRate: 44100});
      let honkStream = fs.createReadStream(path.join(__dirname, './honk.wav'))
      honkStream.on('end', () => {
        honking = false
      })
      honkStream.pipe(speaker)
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
