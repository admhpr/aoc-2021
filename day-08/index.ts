const input = Deno.readTextFileSync("input").split("\n")
function prepareLine(line: any) {
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
    const { before, after } = prepareLine(line)
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
  return uniqueSegments
}

// don't look down 🙈
function part2(input: any) {
  let totalOutput = 0
  for (const line of input) {
    const { before, after } = prepareLine(line)
    const digits = {
      0: "",
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
      6: "",
      7: "",
      8: "",
      9: "",
    }
    for (const seg of before) {
      switch (seg.length) {
        case 2:
          // 1
          digits[1] = seg
          break
        case 3:
          // 7
          digits[7] = seg
          break
        case 4:
          // 4
          digits[4] = seg
          break
        case 7:
          // 8
          digits[8] = seg
          break
      }
    }
    for (const seg of before) {
      const chars = seg.split("")
      switch (seg.length) {
        case 6:
          // ? 6 9 0
          const foursChars = digits[4].split("")
          const oneChars = digits[1].split("")
          const intersectOne = chars.filter((v: any) => oneChars.includes(v))
          const intersectFour = chars.filter((v: any) => foursChars.includes(v))

          if (intersectFour.length === foursChars.length) {
            digits[9] = seg
            break
          }
          if (intersectOne.length === oneChars.length) {
            digits[0] = seg
          } else {
            digits[6] = seg
          }
          break
        case 5:
          // ? 2 3 5
          const sevenChars = digits[7].split("")
          const intersectSeven = chars.filter((v: any) =>
            sevenChars.includes(v)
          )

          if (intersectSeven.length === sevenChars.length) {
            digits[3] = seg
          }
          break
      }
    }
    for (const seg of before) {
      if (seg.length === 5) {
        const chars = seg.split("")
        const sixChars = digits[6].split("")
        const differenceSix = sixChars.filter((v: any) => !chars.includes(v))

        if (differenceSix.length === 1) {
          digits[5] = seg
        } else if (seg !== digits[3] && differenceSix.length === 2) {
          digits[2] = seg
        }
      }
    }
    const sortedDigits = {}
    for (const [key, value] of Object.entries(digits)) {
      //@ts-ignore
      sortedDigits[value.split("").sort().join("")] = key
    }
    const sortedDisplaySignals = after.map((v: any) => v.split("").sort().join(""))
    let display = ""
    for (const seg of sortedDisplaySignals) {
      //@ts-ignore
      if (sortedDigits[seg]) {
        //@ts-ignore
        display += sortedDigits[seg]
      }
    }
    totalOutput += parseInt(display)
    display = ""
  }
  return totalOutput
}

console.log(part1(input))
console.log(part2(input))
