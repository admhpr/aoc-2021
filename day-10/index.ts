
    const input = Deno.readTextFileSync("input").split("\n")

    function solve(input: any){
      const openers = [`(`,`[`,`{`,`<`]
      let score = 0;
      const stack = [];
      for(const line of input.reverse()){
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
              }
              break
            case `]`:
              if(stack.pop() !== `[`){
                score += 57
              }
              break
            case `}`:
              if(stack.pop() !== `{`){
                score += 1197
              }
              break
            case `>`:
              if(stack.pop() !== `<`){
                score += 25137
              }
              break
          }
        }
      }
      console.log(score)
    }
    solve(input)
  