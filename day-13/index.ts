const input = Deno.readTextFileSync("input").split("\n");
function parseInput(input: string[]) {
  const instructions: [string, number][] = [];
  const allX = [];
  const allY = [];
  const plot = [];
  for (const line of input) {
    if (line.length < 14 && line.length > 0) {
      const [x, y] = line.split(",").map((v) => Number(v));
      allX.push(x);
      allY.push(y);
      plot.push([x, y]);
    } else if (
      line.length !== 0
    ) {
      instructions.push(
        //@ts-expect-error
        line.replace(`fold along `, "").split("=").map((v) => {
          if (Number(v)) {
            return Number(v);
          }
          return v;
        }),
      );
    }
  }
  const maxX = Math.max(...allX);
  const maxY = Math.max(...allY);
  const grid = new Array(maxY + 1).fill(".").map(() =>
    new Array(maxX + 1).fill(".")
  );
  for (const [x, y] of plot) {
    grid[y][x] = "#";
  }

  return {
    grid,
    instructions,
  };
}

function removeRow(from: number, to: number, grid: string[][]) {
  const folded = [...grid];
  folded.splice(from, to + 1);
  return folded;
}
function removeCols(from: number, to: number, grid: string[][]) {
  const folded = [...grid];
  folded.forEach((row) => row.splice(from, to + 1));
  return folded;
}

function solve(input: string[]) {
  const { grid, instructions } = parseInput(input);
  let foldingGrid = [...grid];
  let isFirstFold = true;
  const colAmount = foldingGrid[0].length;
  for (const [foldOn, foldAlong] of instructions) {
    if (foldOn === "x") {
      for (const [r, rv] of foldingGrid.entries()) {
        for (let c = foldAlong + 1; c < colAmount; c++) {
          const current = foldingGrid[r][c];
          if (current === "#") {
            const newFold = foldAlong - (c - foldAlong);
            foldingGrid[r][c] = ".";
            foldingGrid[r][newFold] = "#";
          }
        }
      }
      foldingGrid = removeCols(foldAlong, colAmount, foldingGrid);
    } else {
      // handle rows
      for (const [r, rv] of foldingGrid.entries()) {
        for (let c = 0; c < colAmount; c++) {
          const current = foldingGrid[r][c];
          if (current === "#") {
            const newFold = foldAlong - (r - foldAlong);
            foldingGrid[r][c] = ".";
            foldingGrid[newFold][c] = "#";
          }
        }
      }
      foldingGrid = removeRow(foldAlong, colAmount, foldingGrid);
    }
    if (isFirstFold) {
      console.log(foldingGrid.flat().filter((s) => s === "#").length);
      isFirstFold = false;
    }
  }
  console.log(
    foldingGrid.map((row: number[]) => row.join("").replaceAll(".", " ")).join(
      "\r\n",
    ),
  );
}

solve(input);
