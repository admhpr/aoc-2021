
    const input = Deno.readTextFileSync("input").split("\n")

    function solve(input: any){
      const openers = [`(`,`[`,`{`,`<`]
      const closers = [`)`,`]`,`}`,`>`]
      let score = 0;
      const stack = [];
      const valid = [];
      for(const line of input){
        let corrupt = false;
        const tokens = line.split("")
        for(const token of tokens){
          if(openers.includes(token)){
            stack.push(token)
            continue
          }
          switch(token){
            case `)`:
              if(stack.pop() !== `(`){
                score += 3
                corrupt = true
              }
              break
            case `]`:
              if(stack.pop() !== `[`){
                score += 57
                corrupt = true
              }
              break
            case `}`:
              if(stack.pop() !== `{`){
                score += 1197
                corrupt = true
              }
              break
            case `>`:
              if(stack.pop() !== `<`){
                score += 25137
                corrupt = true
              }
              break
            }
          }
          if(!corrupt){
            valid.push(line)
          }
      }
      console.log(score)
      const totals = [];
      for(const line of valid){
        const tokens = line.split("")
        const stack = [];
        for(const token of tokens){
          if(openers.includes(token)){
            stack.push(token)
            continue
          }
          if(closers.includes(token)){
            stack.pop()
            continue
          }
        }
        let s = 0;
        while(stack.length){
          const token = stack.pop()
          s *= 5;
          switch(token){
            case `(`:
              s += 1
              break
            case `[`:
              s += 2
              break
            case `{`:
              s += 3
              break
            case `<`:
              s += 4
              break

          }
        }
        totals.push(s)
      }
      const sorted = totals.sort((a,b) => a-b)
      console.log(sorted[Math.floor(totals.length / 2)])
    }
    solve(input)
  