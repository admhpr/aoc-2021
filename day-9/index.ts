
    const input = Deno.readTextFileSync("input")
      .split("\n")
      .map((line: any) => line.trim())
      .map((line: any) => line.split(""))
    
    const grid = input.map((a: Array<string>) => {
      return a.map((s: string) => Number(s))
    })

    function solve(input: any){
      const rows = input.length;
      const cols = input[0].length;
      let sum = 0
      for (const r of [...Array(rows).keys()]){
        for(const c of [...Array(cols).keys()]){
          const current = input[r][c]
          if(r - 1 >= 0 && current >= input[r - 1][c]){
            continue;
          }
          if(r + 1 < rows && current >= input[r + 1][c]){
            continue;
          }
          if(c - 1 >= 0 && current >= input[r][c - 1]){
            continue;
          }
          if(c + 1 < cols && current >= input[r][c + 1]){
            continue;
          }

          sum += current + 1
        }
      }
      console.log(sum)
    }
    solve(grid)
  