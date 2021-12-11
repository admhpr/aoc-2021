const { readFileSync } = require("fs")
const input = readFileSync("./input", "UTF-8").split(/\n/)
function part1(input) {
  let most = []
  let least = []
  for (const [i, c] of input[0].split("").entries()) {
    const col = input.map((n) => Number(n.charAt(i)))
    const common = col.reduce((acc, curr) => {
      return curr === 0 ? acc - 1 : acc + 1
    }, 0)

    if (common > 0) {
      //@ts-ignore
      most.push(1)
      //@ts-ignore
      least.push(0)
    } else {
      // @ts-ignore
      most.push(0)
      //@ts-ignore
      least.push(1)
    }

  }
  console.log(parseInt(most.join(""), 2) * parseInt(least.join(""), 2))
}

function part2(input){
    let filteredO = input
    let filteredC = input
    for (const [i, c] of input[0].split("").entries()) {
      const colO = filteredO.map((n) => Number(n.charAt(i)))
      const commonO = colO.reduce((acc, curr) => {
        return curr === 0 ? acc - 1 : acc + 1
      }, 0)
      const colC = filteredC.map((n) => Number(n.charAt(i)))
      const commonC = colC.reduce((acc, curr) => {
        return curr === 0 ? acc - 1 : acc + 1
      }, 0)

      let searchO;
      let searchC;

      if (commonO >= 0) {
        searchO = 1
      } else {
        searchO = 0
      }

      if (commonC < 0) {
        searchC = 1
      } else {
        searchC = 0
      }

      if(filteredO.length > 1){
        filteredO = filteredO.filter(n => Number(n.charAt(i)) === searchO)
      }
      if(filteredC.length > 1){
        filteredC = filteredC.filter(n => Number(n.charAt(i)) === searchC)
      }

    }
    console.log(parseInt(filteredO[0], 2) * parseInt(filteredC[0], 2))
}
function main(input) {
  part1(input)
  part2(input)
}
main(input)

