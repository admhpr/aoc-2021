const input = Deno.readTextFileSync("input").split("\n");
function parseInput(input: string[]) {
  const grid: Dot[] = [];
  const instructions: Array<string | number>[] = [];
  for (const line of input) {
    if (line.length === 7) {
      const [x, y] = line.split(",").map((v) => Number(v));
      grid.push(createDot(y, x));
    } else if (
      line.length === 16
    ) {
      instructions.push(
        line.replace(`fold along `, "").split("=").map((v) => {
          if (Number(v)) {
            return Number(v);
          }
          return v;
        }),
      );
    }
  }
  return {
    grid,
    instructions,
  };
}
function solve(input: string[]) {
  const { grid, instructions } = parseInput(input);
  console.log(grid, instructions);
}
solve(input);

type Dot = {
  id: string;
  row: number;
  col: number;
};
function createDot(row: number, col: number) {
  return {
    id: JSON.stringify({ row: row, col: col }),
    row,
    col,
  };
}
