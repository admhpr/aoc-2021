const { readFileSync } = require("fs")
const inputs = readFileSync("./input", "UTF-8").split(/\n/)

function part1(inputs) {
  const sub = {
    forward: 0,
    down: 0,
    up: 0,
  }
  for (const command of inputs) {
    const [move, amount] = command.split(" ")
    if (move === "forward") {
      sub[move] += Number(amount)
    }
    if (move === "down") {
      sub[move] += Number(amount)
    }
    if (move === "up") {
      sub[move] += Number(amount)
    }
  }
  const depth = sub.down - sub.up
  console.log(depth * sub.forward)
}

function part2(inputs) {
  const sub = {
    forward: 0,
    down: 0,
    up: 0,
    depth: 0
  }
  let aim = 0
  for (const command of inputs) {
    const [move, amount] = command.split(" ")
    if (move === "forward") {
      sub[move] += Number(amount)
      sub["depth"] += aim * Number(amount)
    }
    if (move === "down") {
      aim += Number(amount)
    }
    if (move === "up") {
      aim -= Number(amount)
    }
  }
  console.log(sub.depth * sub.forward)
}

function main(inputs) {
  part1(inputs)
  part2(inputs)
}
main(inputs)
