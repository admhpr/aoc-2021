const input = Deno.readTextFileSync("input")
  .split("\n")
  .map((x: string) => x.split("-"));

const caves = new Map<string, string[]>();

for (const [a, b] of input) {
  if (a !== "start" && b !== "end") {
    caves.set(b, (caves.get(b) || []).concat(a));
  }
  if (a !== "end" && b !== "start") {
    caves.set(a, (caves.get(a) || []).concat(b));
  }
}
// part one
function partOne(): number {
  let count = 0;
  const paths: [string[], boolean][] = [[["start"], true]];
  const smallCaves: {
    [node: string]: number;
  } = {};
  while (paths.length) {
    // @ts-expect-error
    const [prev, visited] = paths.pop();

    const current = prev.at(-1);
    const nodes = caves.get(current)!;
    if (!prev || !current || !nodes) {
      continue;
    }
    for (const node of nodes) {
      if (node === "end") {
        count += 1;
      } else if (node.toUpperCase() === node || prev.includes(node)) {
        paths.push([prev.concat(node), visited]);
      } else if (visited) {
        smallCaves[node] = 1;
        smallCaves[node] += 1;
        paths.push([prev.concat(node), false]);
      }
    }
  }
  return count;
}

function solve() {
  partOne();
}
solve();
