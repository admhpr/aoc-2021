interface Line {
  from: Position
  to: Position
}

interface Position {
  x: number
  y: number
}

function toPosition(s: string): Position {
  return {
    x: Number(s.split(",")[0]),
    y: Number(s.split(",")[1]),
  }
}
function toLine(entry: string): Line {
  return {
    from: toPosition(entry.split(/ -> /)[0]),
    to: toPosition(entry.split(/ -> /)[1]),
  }
}

function isStraightLine(line: Line): boolean {
  return line.from.x === line.to.x || line.from.y === line.to.y
}

function getRangeBetweenTwoNumbers(a: number, b: number): number[] {
  return [
    ...[...Array(Math.abs(a - b)).keys()].map((n) => n + Math.min(a, b)),
    Math.max(a, b),
  ]
} 
function toKey(pos: Position): string {
  return pos.x + "," + pos.y
}

function getLineCoordinates(line: Line): Position[] {
  return isStraightLine(line)
    ? calculatePositionsForStraightLines(line)
    : calculatePositionsForDiagonalLines(line)
}

function calculatePositionsForStraightLines(line: Line): Position[] {
  return line.from.x === line.to.x
    ? getRangeBetweenTwoNumbers(line.from.y, line.to.y).map((newY) => ({
        x: line.from.x,
        y: newY,
      }))
    : getRangeBetweenTwoNumbers(line.from.x, line.to.x).map((newX) => ({
        x: newX,
        y: line.from.y,
      }))
}

function calculatePositionsForDiagonalLines(line: Line): Position[] {
  const allXCoordinates =
    line.from.x > line.to.x
      ? getRangeBetweenTwoNumbers(line.from.x, line.to.x).reverse()
      : getRangeBetweenTwoNumbers(line.from.x, line.to.x)
  
  return allXCoordinates.map((newX: number, i: number) => ({
    x: newX,
    y: line.from.y < line.to.y ? line.from.y + i : line.from.y - i,
  }))
}

function calculateDanger(lines: Line[]) {
  const ventMap = new Map()
  let allVentPositions = lines.map(getLineCoordinates).flat()
  allVentPositions.forEach((pos) =>
    ventMap.has(toKey(pos))
      ? ventMap.set(toKey(pos), ventMap.get(toKey(pos))! + 1)
      : ventMap.set(toKey(pos), 1)
  )
  return [...ventMap.values()].reduce(
    (acc: number, b: number) => (b > 1 ? acc + 1 : acc),
    0
  )
}

const allLines: Line[] = Deno.readTextFileSync("input")
  .split(/\n/)
  .map(toLine)
const allStraightLines: Line[] = allLines.filter(isStraightLine)

console.log(
  "part 1",
  calculateDanger(allStraightLines)
)
console.log("part 2", calculateDanger(allLines))