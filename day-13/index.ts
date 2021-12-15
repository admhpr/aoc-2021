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
function removeCol(from: number, to: number, grid: string[][]) {
  const folded = [...grid];
  folded.forEach((row) => row.splice(from, to + 1));
  return folded;
}

function solve(input: string[]) {
  const { grid, instructions } = parseInput(input);
  console.log(grid);
  const foldedGrid = [...grid];
}

solve(input);
