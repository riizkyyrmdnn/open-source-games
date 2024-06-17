import FlappyBirdGame from "@asset/games/FlappyBird/FlappyBird";
import FlipBombGame from "@asset/games/FlipBomb/FlipBomb";
import GuessWordGame from "@asset/games/GuessWord/GuessWord";
import HangmanGame from "@asset/games/Hangman/Hangman";
import MemoryCardGame from "@asset/games/MemoryCard/MemoryCard";
import RockPaperScissorsGame from "@asset/games/RockPaperScissors/RockPaperScissors";
import SnakeGame from "@asset/games/SnakeEat/SnakeEat";
import TicTacToeGame from "@asset/games/TicTacToe/TicTacToe";
import WhackAMoleGame from "@asset/games/WhackAMole/WhackAMole";

const categories = [
  "Arcade",
  "Racing",
  "Card",
  "Casino",
  "Word",
  "Fight",
  "Music",
  "Sport",
  "Board",
  "Education",
  "Adventure",
  "RPG",
  "Relax",
  "Simulation",
  "Strategy",
  "Puzzle",
  "Trivia"
]

export const games = [
  {
    id: 1,
    title: "Flappy Bird",
    category: categories[0],
    link: "/flappy-bird-game",
    howto: [
      { list: 1, text: "Click the game area to fly" },
      { list: 2, text: "Avoid being touched by pipes" },
      { list: 3, text: "Don't touch the bottom line" },
    ],
    detail: {
      developer: "OSGames",
      date: "28 April 2024",
      version: {
        "1.0.0": [{ list: 1, feature: "Official Release" }],
      },
    },
    element: FlappyBirdGame
  },
  {
    id: 2,
    title: "Flip Bomb",
    category: categories[0],
    link: "/flip-bomb-game",
    howto: [
      { list: 1, text: "There is 1 bomb image in each mode" },
      { list: 2, text: "If you find a bomb image, it will lose" },
      { list: 3, text: "Don't find a picture of a bomb to the end" },
    ],
    detail: {
      developer: "OSGames",
      date: "2 Mei 2024",
      version: {
        "1.0.0": [{ list: 1, feature: "Official Release" }],
      },
    },
    element: FlipBombGame
  },
  {
    id: 3,
    title: "Guess Word",
    category: categories[15],
    link: "/guess-words-game",
    howto: [
      { list: 1, text: "Put words in each box in the appropriate order" },
      { list: 2, text: "The total true and false words will be displayed" },
      { list: 3, text: "You have 5 chances to enter the word back" },
    ],
    detail: {
      developer: "OSGames",
      date: "5 Mei 2024",
      version: {
        "1.0.0": [{ list: 1, feature: "Official Release" }],
      },
    },
    element: GuessWordGame
  },
  {
    id: 4,
    title: "Hangman Game",
    category: categories[15],
    link: "/hangman-game",
    howto: [
      { list: 1, text: "Put words in each box in the appropriate order" },
      { list: 2, text: "The total true and false words will be displayed" },
      { list: 3, text: "You have 7 chances to enter the word back" },
      { list: 4, text: "Don't get hung" },
    ],
    detail: {
      developer: "OSGames",
      date: "6 Mei 2024",
      version: {
        "1.0.0": [{ list: 1, feature: "Official Release" }],
      },
    },
    element: HangmanGame
  },
  {
    id: 5,
    title: "Memory Card Game",
    category: categories[15],
    link: "/memory-card-game",
    howto: [
      { list: 1, text: "Find 2 cards with the same image" },
    ],
    detail: {
      developer: "OSGames",
      date: "8 Mei 2024",
      version: {
        "1.0.0": [{ list: 1, feature: "Official Release" }],
      },
    },
    element: MemoryCardGame
  },
  {
    id: 6,
    title: "Rock Paper Scissors",
    category: categories[14],
    link: "/rock-paper-scissors-game",
    howto: [
      { list: 1, text: "There are 3 modes in this game" },
      { list: 2, text: "The computer thinks at least 3 seconds to beat you" },
      { list: 3, text: "There are 15 total options besides rock paper scissors" },
    ],
    detail: {
      developer: "OSGames",
      date: "9 Mei 2024",
      version: {
        "1.0.0": [{ list: 1, feature: "Official Release" }],
      },
    },
    element: RockPaperScissorsGame
  },
  {
    id: 7,
    title: "Snake Game",
    category: categories[0],
    link: "/snake-game",
    howto: [
      { list: 1, text: "Don't touch the borders of the box" },
      { list: 2, text: "Eat to death" },
      { list: 3, text: "Do not touch the body" },
    ],
    detail: {
      developer: "OSGames",
      date: "12 Mei 2024",
      version: {
        "1.0.0": [{ list: 1, feature: "Official Release" }],
      },
    },
    element: SnakeGame
  },
  {
    id: 8,
    title: "Tic Tac Toe",
    category: categories[14],
    link: "/tic-tac-toe-game",
    howto: [
      { list: 1, text: "There are 3 modes in this game" },
      { list: 2, text: "there are PvP and PvB (player vs bot) options" },
      { list: 3, text: "The computer responds quickly to you after its turn" },
      { list: 4, text: "Sort 3 symbols to win the game Easy Mode" },
      { list: 5, text: "Sort 4 symbols to win the medium and hard mode game" },
    ],
    detail: {
      developer: "OSGames",
      date: "13 Mei 2024",
      version: {
        "1.0.0": [{ list: 1, feature: "Official Release" }],
      },
    },
    element: TicTacToeGame
  },
  {
    id: 9,
    title: "Whack A Mole",
    category: categories[0],
    link: "/whack-a-mole-game",
    howto: [
      { list: 1, text: "There are 3 modes in this game" },
      { list: 2, text: "Hit Mole until time runs out" },
      { list: 3, text: "They can appear sooner and later" },
    ],
    detail: {
      developer: "OSGames",
      date: "16 Mei 2024",
      version: {
        "1.0.0": [{ list: 1, feature: "Official Release" }],
      },
    },
    element: WhackAMoleGame
  },
];
