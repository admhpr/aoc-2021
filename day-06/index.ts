const input = Deno.readTextFileSync("input").split(",").map((n: string) => Number(n))

function calculateFishAfterDays(days: number){
  const fishByAge = new Array(9).fill(0)
  input.forEach((age: number) => (fishByAge[age] += 1))
  for (let i = 0; i < days; i++){
    const dead = fishByAge[0]

    fishByAge.forEach((_, index) => {
      fishByAge[index] = fishByAge[index + 1]
    })

    fishByAge[6] += dead; // reset
    fishByAge[8] = dead; // spawned
    
  }
  return fishByAge.reduce((acc, c) => acc + c)
}

console.log(calculateFishAfterDays(80))
console.log(calculateFishAfterDays(256))