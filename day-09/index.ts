const input = Deno.readTextFileSync("input")
  .split("\n")
  .map((line: any) => line.trim())
  .map((line: any) => line.split(""))

const grid = input.map((a: Array<string>) => {
  return a.map((s: string) => Number(s))
})

function solve(input: any) {
  const rows = input.length
  const cols = input[0].length
  const points: Array<Point> = []
  let sum = 0
  for (const r of [...Array(rows).keys()]) {
    for (const c of [...Array(cols).keys()]) {
      const current = input[r][c]
      if (r - 1 >= 0 && current >= input[r - 1][c]) {
        continue
      }
      if (r + 1 < rows && current >= input[r + 1][c]) {
        continue
      }
      if (c - 1 >= 0 && current >= input[r][c - 1]) {
        continue
      }
      if (c + 1 < cols && current >= input[r][c + 1]) {
        continue
      }
      points.push(createPoint(r, c))
      sum += current + 1
    }
  }
  console.log(sum)
  let largestBasins: Array<number> = []
  let seen: Array<number> = []
  for (const point of points) {
    const visited: Array<Point> = []
    const toVisit: Array<Point> = []
    toVisit.push(point)
    while (toVisit.length > 0) {
      const next = toVisit.shift()
      if (!next) {
        continue
      }
      if (hasVisited(visited, next)) {
        continue
      }
      visited.push(next)
      const { row, col } = next
      if (row - 1 >= 0 && input[row - 1][col] !== 9) {
        const down = createPoint(row - 1, col)
        if (!hasVisited(visited, down)) {
          toVisit.push(down)
        }
      }
      if (row + 1 < rows && input[row + 1][col] !== 9) {
        const up = createPoint(row + 1, col)
        if (!hasVisited(visited, up)) {
          toVisit.push(up)
        }
      }
      if (col - 1 >= 0 && input[row][col - 1] !== 9) {
        const left = createPoint(row, col - 1)
        if (!hasVisited(visited, left)) {
          toVisit.push(left)
        }
      }
      if (col + 1 < cols && input[row][col + 1] !== 9) {
        const right = createPoint(row, col + 1)
        if (!hasVisited(visited, right)) {
          toVisit.push(right)
        }
      }
    }
    if (largestBasins.length < 3) {
      largestBasins.push(visited.length)
    } else {
      const last = largestBasins[0]
      if (visited.length > last) {
        largestBasins.shift()
        largestBasins.push(visited.length)
      }
    }
    largestBasins = largestBasins.sort((a, b) => a - b)
  }
  console.log(largestBasins.reduce((a, c) => a * c))
}
function hasVisited(visited: Array<Point>, point: Point) {
  return visited.filter((p: Point) => p.id === point.id).length > 0
}
type Point = {
  id: string
  row: number
  col: number
}
function createPoint(row: number, col: number) {
  return {
    id: JSON.stringify({ row: row, col: col }),
    row,
    col
  }
}
solve(grid)
