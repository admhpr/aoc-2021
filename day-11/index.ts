const input = Deno.readTextFileSync("input")
  .split("\n")
  .map((line: any) => line.trim())
  .map((line: any) => line.split(""))

const grid = input.map((a: Array<string>) => {
  return a.map((s: string) => Number(s))
})

function createOctopusMap(grid: any) {
  const octopi: Octopus[] = []
  for (const [ri, row] of grid.entries()) {
    row.forEach((v: number, ci: number) => {
      octopi.push(createOctopus(ri, ci, v))
    })
  }
  return octopi
}

function solve(input: any) {
  const octopi = createOctopusMap(input)
  for (const octopus of octopi) {
    console.log(octopus)
    const visited: Array<Octopus> = []
    const toVisit: Array<Octopus> = []
    const { row, col } = octopus
    if (row - 1 >= 0) {
      // up
    }
    if (row - 1 >= 0 && col + 1 < octopi[octopi.length - 1].col) {
      // up right
    }
    if (row - 1 >= 0 && col - 1 >= 0) {
      // up left
    }
    if (row + 1 < octopi.length) {
      // down
    }
    if (row + 1 < octopi.length && col + 1 < octopi[octopi.length - 1].col) {
      // down right
    }
    if (row + 1 < && col - 1 >= 0) {
      // down left
    }
    if (row + 1 < octopi.length) {
      // up
    }
    if (col - 1 >= 0) {
      // left
    }
    if (col + 1 < octopi[octopi.length - 1].col) {
      // right
    }
  }
}
type Octopus = {
  id: string
  energy: number
  row: number
  col: number
  hasFlashed: boolean
}
function createOctopus(row: number, col: number, energy: number = 0) {
  return {
    id: JSON.stringify({ row: row, col: col }),
    energy,
    row,
    col,
    hasFlashed: false,
  }
}
solve(grid)
