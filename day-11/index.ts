const input = Deno.readTextFileSync("input")
  .split("\n")
  .map((line: any) => line.trim())
  .map((line: any) => line.split(""))

const grid = input.map((a: Array<string>) => {
  return a.map((s: string) => Number(s))
})

function addAllAdjacent(
  octopus: Octopus,
  grid: number[][],
  toVisit: Octopus[]
) {
  const { row, col } = octopus

  const up = row - 1
  const down = row + 1
  const left = col - 1
  const right = col + 1
  const hasUp = up >= 0
  const hasDown = down < grid.length
  const hasRight = right < grid[row].length
  const hasLeft = left >= 0

  if (hasUp) {
    const o = createOctopus(up, col)
    toVisit.push(o)
  }
  if (hasUp && hasRight) {
    const o = createOctopus(up, right)
    toVisit.push(o)
  }
  if (hasUp && hasLeft) {
    const o = createOctopus(up, left)
    toVisit.push(o)
  }
  if (hasDown) {
    const o = createOctopus(down, col)
    toVisit.push(o)
  }
  if (hasDown && hasRight) {
    const o = createOctopus(down, right)
    toVisit.push(o)
  }
  if (hasDown && hasLeft) {
    const o = createOctopus(down, left)
    toVisit.push(o)
  }
  if (hasLeft) {
    const o = createOctopus(row, left)
    toVisit.push(o)
  }
  if (hasRight) {
    const o = createOctopus(row, right)
    toVisit.push(o)
  }
  return
}

function solve(grid: number[][]) {
  let flashes = 0
  const gridTwo = JSON.parse(JSON.stringify(grid))
  for (const _ of [...new Array(100).fill(0)]) {
    flashes += octopusFlash(grid)
    resetFlashed(grid)
  }
  console.log(flashes)
  let step = 0;
  flashes = 0
  while(flashes < grid.length * grid[0].length){
    step += 1;
    flashes = octopusFlash(gridTwo)
    resetFlashed(gridTwo)
  }
  console.log(step)
}

function octopusFlash(grid: number[][]) {
  let flashes = 0
  const rows = grid.length
  const cols = grid[0].length
  for (const r of [...Array(rows).keys()]) {
    for (const c of [...Array(cols).keys()]) {
      const toVisit: Octopus[] = []
      toVisit.push(createOctopus(r, c))
      while (toVisit.length) {
        const o = toVisit.shift()
        if (o) {
          const { row, col } = o
          grid[row][col] += 1
          if (grid[row][col] === 10) {
            flashes += 1
            addAllAdjacent(o, grid, toVisit)
          }
        }
      }
    }
  }
  return flashes
}

function resetFlashed(grid: number[][]) {
  const rows = grid.length
  const cols = grid[0].length
  for (const r of [...Array(rows).keys()]) {
    for (const c of [...Array(cols).keys()]) {
      if (grid[r][c] > 9) {
        grid[r][c] = 0
      }
    }
  }
}
type Octopus = {
  id: string
  row: number
  col: number
}
function createOctopus(row: number, col: number) {
  return {
    id: JSON.stringify({ row: row, col: col }),
    row,
    col,
  }
}
solve(grid)
