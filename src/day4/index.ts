import * as path from "path";
import { parseInput } from "../util";

const input = parseInput(path.join(__dirname, "input.txt"), { split: { mapper: false } });

function main() {
  const cards = (input as unknown as string[]).map((card) => {
    // remove the text "card 1, card 2, card 3, .." from the string
    // return the string
    const str = card.replace(/Card \d: /g, "");

    const strArray = str.split("|").filter((s) => s !== "")

    const col1 =strArray[0].split(" ").filter((s) => s !== "")
    const col2 =strArray[1].split(" ").filter((s) => s !== "")

    // count the number of item in the col2 match the item in the col1
    // return the number
    const count = col2.filter((item) => col1.includes(item)).length

    return count
  })

  console.log(cards)

  const cards2 = cards.map((card, index) => {
    return ({
      [index]: {
        count: 1,
        value: card
      }
    })
  })
  console.log(cards2)
  // for loop through the cards2
  // if card 1 has value is 4, increase  1 for the count next 4 cards
  // if card 2 has value is 2, increase  1 for the count next 2 cards
  // return the cards2
  for (let i = 0; i < cards2.length; i++) {
    const card = cards2[i]
    const cardValue = Object.values(card)[0].value
    const cardCount = Object.values(card)[0].count

    for (let j = 1; j <= cardValue; j++) {
      const nextCard = cards2[i + j]
      if (nextCard) {
        nextCard[i + j] = {
          count: nextCard[i + j].count + cardCount,
          value: nextCard[i + j].value
        }
        console.log(i, cardValue, cards2)

      }
    }
    
  }

  // sum all the count in the cards2
  // return the number
  const sum = cards2.reduce((acc, cur) => {
    return acc + Object.values(cur)[0].count
  }, 0)

  console.log(sum)

}


export default main();
