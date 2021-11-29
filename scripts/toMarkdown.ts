import { load } from "cheerio"
import * as TurndownService from "turndown"
import { gfm } from "turndown-plugin-gfm"


export function parsePage(body, url) {
  const document = load(body)
  const instructions = load("")

  let title
  document(`article`).each((index, article) => {
    const headingElement = document(article).find("h2")
    let headingElementText = headingElement.text()
    let newHeadingElementText = headingElementText.replace(/---/g, "").trim()

    if (index === 0) {
      title = newHeadingElementText
      newHeadingElementText = "Part One"
    }

    headingElement.replaceWith(`<h3>${newHeadingElementText}</h3>`)

    document(article)
      .find("code > em:only-child")
      .each((_, emInCodeBlock) => {
        document(emInCodeBlock.parentNode).replaceWith(
          `<code>${document(emInCodeBlock).text()}</code>`
        )
      })
  })

  instructions
    .root()
    .append(`<h1><a href="${url}">${title}</a></h1>`)
    .append("<h2>Description</h2>")
    .append(document("article"))

  const turndownService = new TurndownService({
    headingStyle: "atx",
  })
  turndownService.use(gfm)
  turndownService.keep(["span"])

  return turndownService.turndown(instructions.html()).concat("\n")
}
