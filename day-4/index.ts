type Square = number | "x"
type Board = Array<Square>
type Game = Array<Board>

const input = Deno.readTextFileSync("input")

function isHorizontalWinner(board: Board) {
  const rows = board
    .map((v, index) => {
      return index % 5 === 0 ? board.slice(index, index + 5) : null
    })
    .filter(Boolean)
  let isWinner = false
  for (const row of rows) {
    if (isWinner) {
      break
    }
    const rowIsWinner = row ? row.every((v) => v === "x") : false
    if (rowIsWinner) {
      isWinner = rowIsWinner
    }
  }
  return isWinner
}

function isVerticalWinner(board: Board) {
  const rows = board
    .map((v, index) => {
      return index % 5 === 0 ? board.slice(index, index + 5) : null
    })
    .filter(Boolean)
  const columns = [[], [], [], [], []]
  for (const row of rows) {
    for (const [i, r] of row!.entries()) {
      if(columns[i].length < 5){

        // @ts-ignore
        columns[i].push(r)
      }
    }
  }

  let isWinner = false

  for (const col of columns) {
    if (isWinner) {
      break
    }
    const colIsWinner = col ? col.every((v) => v === "x") : false
    if (colIsWinner) {
      isWinner = colIsWinner
    }
  }

  return isWinner
}

function calculateScore(remaining: number[], n: number) {
  return remaining.reduce((acc, c) => acc + c, 0) * n
}

function main(input: any) {
  const numbers = input.split(/\n/)[0].split(",").map(Number)
  let boards = input
    .split(/\n\n/)
    .slice(1)
    .map((b: any) =>
      b
        .replace(/(\n ?| {2})/g, " ")
        .split(" ")
        .map(Number)
    )
  const results = []
  let winningBoardHorizontal = []
  let winningBoardVertical = []
  for (const number of numbers) {
    boards = boards.map((b: Board) =>
      b.map((n: Square) => (n === number ? "x" : n))
    )

    const prevH = [...winningBoardHorizontal]
    const prevV = [...winningBoardVertical]
    const prevR = [...results]
    winningBoardHorizontal = boards
      .map(isHorizontalWinner)
      .map((isWinner: boolean, board: number) => (isWinner ? board : null))
      .filter(Boolean)
    winningBoardVertical = boards
      .map(isVerticalWinner)
      .map((isWinner: boolean, board: number) => (isWinner ? board : null))
      .filter(Boolean)


    if (winningBoardVertical.length > prevV.length) {
      const [winningBoard] = winningBoardVertical.filter((x: number) => !prevV.includes(x))
      results.push(calculateScore(boards[winningBoard].filter((n: Square) => n !== "x"), number))
    }
    if (winningBoardHorizontal.length > prevH.length) {
      const [winningBoard] = winningBoardHorizontal.filter((x: number) => !prevH.includes(x))
      results.push(calculateScore(boards[winningBoard].filter((n: Square) => n !== "x"), number))
    }

  }
  console.log(results)
}

main(input)
