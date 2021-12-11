const input = Deno.readTextFileSync("input")
  .split(",")
  .map((n: string) => Number(n))

function leastFuel(input: any) {
  const max = Math.max(...input)
  const min = Math.min(...input)
  let lowestCost = Infinity

  for (let loc = min; loc <= max; loc++) {
    const cost = getCostToPos(input, loc)
    if (cost < lowestCost) {
      lowestCost = cost
    }
  }
  return lowestCost
}

function getCostToPos(positions: number[], toPos: number) {
  let fuelCost = 0
  for (const pos of positions) {
    const distance = Math.abs(toPos - pos)
    // fuelCost += distance
    fuelCost += (distance * (distance + 1)) / 2
  }
  return fuelCost
}
console.log(leastFuel(input))
