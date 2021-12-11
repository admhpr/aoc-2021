const { readFile } = require("fs")
readFile("input", `utf8`, (err, data) => {
  if (err) throw err
  const input = data.split("\n")

  part1(input)
  part2(input)
})

function part1(input) {
  let last = input[0]
  const result = input.reduce((acc, curr) => {
    acc = last < curr ? acc + 1 : acc
    last = curr
    return acc
  }, 0)
  console.log(result)
}

function part2(input) {
  let result = []
  for (let i = 0; i < input.length; i++) {
    const max = Math.min(input.length, i + 3)
    const threeOF = input.slice(i, max)
    const sum = threeOF.reduce((acc, curr) => acc + Number(curr), 0)
    // @ts-ignore
    result.push(sum)
  }
  part1(result)
}
