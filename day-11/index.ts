const input = Deno.readTextFileSync("input")
  .split("\n")
  .map((line: any) => line.trim())
  .map((line: any) => line.split(""))

const grid = input.map((a: Array<string>) => {
  return a.map((s: string) => Number(s))
})

function createOctopusMap(grid: number[][]) {
  const octopi: Octopus[] = []
  for (const [ri, row] of grid.entries()) {
    row.forEach((v: number, ci: number) => {
      octopi.push(createOctopus(ri, ci, v))
    })
  }
  return octopi
}

function findOctopusById(id: string, octopi: Octopus[]){
  const found = octopi.find(o => o.id === id)
  return found 
}

function addAllAdjacent(octopus: Octopus, octopi: Octopus[]){
  const { row, col } = octopus
  const up = row - 1 >= 0
  const down = row + 1 < octopi.length
  const right = col + 1 < octopi[octopi.length - 1].col
  const left = col - 1 >= 0

  const toVisit: Array<Octopus> = []

  if (up) {
    // up
    const o = findOctopusById(
      JSON.stringify({ row: row - 1, col}),
      octopi
    )
    if(o){
      toVisit.push(o)
    }
  }
  if (up && right) {
    // up right
    const o = findOctopusById(JSON.stringify({ row: row - 1, col: col + 1 }), octopi)
    if (o) {
      toVisit.push(o)
    }
  }
  if (up && left) {
    // up left
      const o = findOctopusById(
        JSON.stringify({ row: row - 1, col: col - 1 }),
        octopi
      )
      if (o) {
        toVisit.push(o)
      }
  }
  if (down) {
    // down
      const o = findOctopusById(
        JSON.stringify({ row: row + 1, col }),
        octopi
      )
      if (o) {
        toVisit.push(o)
      }
  }
  if (down && right) {
    // down right
  }
  if (down && left) {
    // down left
  }
  if (left) {
    // left
  }
  if (right) {
    // right
  }
  return
}

function solve(grid: number[][]) {
  const octopi = createOctopusMap(grid)
  for (const step of [...new Array(100).fill(0)]) {

    console.log(step)
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
