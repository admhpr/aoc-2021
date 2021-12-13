require("dotenv").config()
const { mkdir, writeFile } = require("fs").promises
const { resolve, join } = require("path")
const { SESSION_COOKIE } = process.env

const https = require("https")
const { parsePage } = require("./toMarkdown")
const cookie = `session=${SESSION_COOKIE}`
const YEAR = `${new Date().getFullYear()}`

const DAY = process.argv[2] ? process.argv[2] : new Date().getDate()

const BASE_URL = `https://adventofcode.com/${YEAR}/day/${DAY}`

async function createDir(location) {
  try {
    await mkdir(location)
  } catch {
    console.error(`folder already exists. ${location}`)
  }
}

async function createStart(location) {
  const template = `
    const raw = Deno.readTextFileSync("input").split("")
    const input = [...raw]
    function solve(input: string[]){
      console.log(input)
    }
    solve(input)
  `
  const file = "index.ts"
  try {
    await writeFile(join(location, file), template, { flag: "wx" })
  } catch (e) {
    console.error(`file already exists. ${location}/${file}`)
  }
}

function createInput(location) {
  const url = `${BASE_URL}/input`
  const req = https.get(`${url}`, { headers: { Cookie: cookie } })
  req.on(`response`, async function (res) {
    try {
      let body = ""
      for await (const chunk of res) {
        body += chunk
      }
      await writeFile(join(location, "input"), body.trim())
    } catch (e) {
      console.error(e)
    }
  })
}

function createInstructions(location) {
  const req = https.get(`${BASE_URL}`, { headers: { Cookie: cookie } })
  req.on(`response`, async function (res) {
    try {
      let body = ""
      for await (const chunk of res) {
        body += chunk
      }
      const markdown = parsePage(body, BASE_URL)
      await writeFile(join(location, "README.md"), markdown)
    } catch (e) {
      console.error(e)
    }
  })
}

function main() {
  const location = resolve(__dirname, `../day-${DAY}`)
  createDir(location)
  createStart(location)
  createInput(location)
  createInstructions(location)
}

main()
