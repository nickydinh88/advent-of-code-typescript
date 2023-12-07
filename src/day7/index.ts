// @ts-nocheck
import * as path from "path";
import { parseInput } from "../util";

const input = parseInput(path.join(__dirname, "input.txt"), { split: { delimiter: '\n', mapper: false } });

// const hands = [
//  { hand: '32T3K', bid: 765 },
//    { hand: 'T55J5', bid: 684 },
//    { hand: 'QQQJA', bid: 483 },
//  { hand: 'KK677', bid: 28 },
//     { hand: 'KTJJT', bid: 220 },
// ];
const hands = input.map(handString => {
  const [hand, bid] = handString.split(' ');
  return { hand, bid: parseInt(bid) };
});

const stringOrder = '23456789TJQKA'

const getHandRank = (hand) => {
  const handSet = {};
  for (let i = 0; i < hand.length; i++) {
    handSet[hand[i]] = handSet[hand[i]] || 0;
    handSet[hand[i]] += 1;
  }

  let hasPair = false;
  let hasThreeOfAKind = false;
  for (let key in handSet) {
    const val = handSet[key];
    if (val === 5) {
      return 7; // Five of a kind
    } else if (val === 4) {
      return 6; // Four of a kind
    } else if ((val === 3 && hasPair) || (val === 2 && hasThreeOfAKind)) {
      return 5; // Full house
    } else if (val === 2 && hasPair) {
      return 3; // Two pair
    } else if (val === 3) {
      hasThreeOfAKind = true;
    } else if (val === 2) {
      hasPair = true;
    }
  }

  if (hasThreeOfAKind) return 4;
  if (hasPair) return 2;
  return 1; // high card
};

hands.forEach(hand => {
  hand.rank = getHandRank(hand.hand);
});


console.log(hands);

hands.sort((a, b) => {
  if(a.rank === b.rank) {
    // id rank is the same, sort by the a.hand and b.hand
    // ex: QQQJA and T55J5 is both three of a kind
    // base on the order of 23456789TJQKA
    // the first card of QQQJA is Q and T55J5 is T
    // so Q is stronger than T, so QQQJA is stronger than T55J5
    const cardsA = a.hand.split('');
    const cardsB = b.hand.split('');
    for (let i = 0; i < cardsA.length; i++) {
      if (cardsA[i] !== cardsB[i]) {
        // compore the index of the card in the stringOrder
        // console.log(cardsA[i], cardsB[i]);
        // console.log(stringOrder.indexOf(cardsA[i]), stringOrder.indexOf(cardsB[i]))
        return stringOrder.indexOf(cardsA[i]) - stringOrder.indexOf(cardsB[i]);
      }
    }
  }
  return  a.rank - b.rank;
})


function calculateWinningAmount(hands) {
  let winningAmount = 0;
  for (let i = 0; i < hands.length; i++) {
    // console.log(hands[i].bid , i+1)
    winningAmount += hands[i].bid * (i + 1);
  }
  return winningAmount;
}

console.log(calculateWinningAmount(hands));


function main() {
  return 0;
}

export default main();
