const input = Deno.readTextFileSync("input").split("\n");
function parseInput(input: string[]) {
  const grid: Dot[] = [];
  const instructions: [string, number][] = [];
  for (const line of input) {
    if (line.length < 14 && line.length > 0) {
      const [x, y] = line.split(",").map((v) => Number(v));
      grid.push(createDot(y, x));
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
  return {
    grid,
    instructions,
  };
}
function solve(input: string[]) {
  const { grid, instructions } = parseInput(input);
  let foldedGrid = [...grid];
  let firstFold = true;
  for (const [foldOn, foldAlong] of instructions) {
    for (const dot of foldedGrid) {
      if (foldOn === "x") {
        if (dot.col > foldAlong) {
          const newX = foldAlong - (dot.col - foldAlong);
          if (
            foldedGrid.find(({ id }) =>
              id === JSON.stringify({ row: dot.row, col: newX })
            )
          ) {
            foldedGrid = foldedGrid.filter(({ id }) =>
              id !== JSON.stringify({ row: dot.row, col: newX })
            );
          } else {
            dot.col = newX;
            dot.id = JSON.stringify({ row: dot.row, col: newX });
          }
        }
      } else {
        if (dot.row > foldAlong) {
          const newY = foldAlong - (dot.row - foldAlong);
          if (
            foldedGrid.find(({ id }) =>
              id === JSON.stringify({ row: newY, col: dot.col })
            )
          ) {
            foldedGrid = foldedGrid.filter(({ id }) =>
              id !== JSON.stringify({ row: newY, col: dot.col })
            );
          } else {
            dot.row = newY;
            dot.id = JSON.stringify({ row: newY, col: dot.col });
          }
        }
      }
    }
    if (firstFold) {
      console.log(foldedGrid.length);
      firstFold = false;
    }
  }
  let maxRow = -1;
  let maxCol = -1;
  for (const { row, col } of foldedGrid) {
    if (row > maxRow) {
      maxRow = row;
    }
    if (col > maxCol) {
      maxCol = col;
    }
  }
  const g: string[][] = [];
  for (const r of [...Array(maxRow).keys()]) {
    if (!g[r]) {
      g.push([]);
    }
    for (const c of [...Array(maxCol).keys()]) {
      if (
        foldedGrid.find(({ id }) => id === JSON.stringify({ row: r, col: c }))
      ) {
        g[r].push("#");
      } else {
        g[r].push(".");
      }
    }
  }
  console.log(g.map((row) => row.join("")).join("\r\n"));
}
solve(input);

type Dot = {
  id: string;
  row: number;
  col: number;
};
function createDot(row: number, col: number) {
  const id = JSON.stringify({ row: row, col: col });
  return {
    id,
    row,
    col,
  };
}
