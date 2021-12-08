const input = Deno.readTextFileSync("input").split("\n")
function prepareLine(line: any){
  let [before, after] = line.split("|")
  before = before.split(" ")
  after = after.split(" ")
  return {
    before,
    after,
  }
}
function part1(input: any) {
  let uniqueSegments = 0
  for (const line of input) {
    const {before, after} = prepareLine(line)
    const lengths = { 2: [], 3: [], 4: [], 7: [] }
    for (const seg of before) {
      if (lengths[seg.length as keyof typeof lengths]) {
        // @ts-ignore
        lengths[seg.length].push(seg)
      }
    }
    for (const seg of after) {
      if (
        lengths[seg.length as keyof typeof lengths] &&
        lengths[seg.length as keyof typeof lengths].length === 1
      ) {
        uniqueSegments += 1
      }
    }
  }
  console.log(uniqueSegments)
}
part1(input)
