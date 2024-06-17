import air from "./svgs/air.svg";
import devil from "./svgs/devil.svg";
import dragon from "./svgs/dragon.svg";
import fire from "./svgs/fire.svg";
import gun from "./svgs/gun.svg";
import human from "./svgs/human.svg";
import lightning from "./svgs/lightning.svg";
import paper from "./svgs/paper.svg";
import rock from "./svgs/rock.svg";
import scissors from "./svgs/scissors.svg";
import snake from "./svgs/snake.svg";
import sponge from "./svgs/sponge.svg";
import tree from "./svgs/tree.svg";
import water from "./svgs/water.svg";
import wolf from "./svgs/wolf.svg";

export const ModeChoices = {
  easy: [
    { id: 1, image: rock, title: "rock" },
    { id: 2, image: paper, title: "paper" },
    { id: 3, image: scissors, title: "scissors" },
  ],
  medium: [
    { id: 4, image: rock, title: "rock" },
    { id: 5, image: paper, title: "paper" },
    { id: 6, image: scissors, title: "scissors" },
    { id: 7, image: gun, title: "gun" },
    { id: 8, image: lightning, title: "lightning" },
    { id: 9, image: devil, title: "devil" },
    { id: 10, image: dragon, title: "dragon" },
    { id: 11, image: water, title: "water" },
  ],
  hard: [
    { id: 11, image: rock, title: "rock" },
    { id: 12, image: paper, title: "paper" },
    { id: 13, image: scissors, title: "scissors" },
    { id: 14, image: gun, title: "gun" },
    { id: 15, image: lightning, title: "lightning" },
    { id: 16, image: devil, title: "devil" },
    { id: 17, image: dragon, title: "dragon" },
    { id: 18, image: water, title: "water" },
    { id: 19, image: air, title: "air" },
    { id: 20, image: sponge, title: "sponge" },
    { id: 21, image: wolf, title: "wolf" },
    { id: 22, image: tree, title: "tree" },
    { id: 23, image: human, title: "human" },
    { id: 24, image: snake, title: "snake" },
    { id: 25, image: fire, title: "fire" },
  ],
};

export const rules = {
  rock: ["scissors", "snake", "human", "tree", "wolf", "sponge"],
  paper: ["rock", "gun", "lightning", "devil", "dragon", "water"],
  scissors: ["human", "tree", "wolf", "sponge", "paper", "air"],
  gun: ["fire", "scissors", "snake", "human", "tree", "wolf"],
  lightning: ["rock", "fire", "scissors", "snake", "human", "tree"],
  devil: ["gun", "rock", "fire", "scissors", "human", "tree"],
  dragon: ["lightning", "gun", "rock", "scissors", "snake"],
  water: ["devil", "lightning", "gun", "rock", "fire", "scissors"],
  air: ["fire", "rock", "gun", "lightning", "devil", "dragon"],
  sponge: ["gun", "lightning", "devil", "dragon", "water", "air"],
  wolf: ["lightning", "devil", "dragon", "water", "air", "paper"],
  tree: ["devil", "dragon", "water", "air", "paper", "sponge", "wolf"],
  human: ["dragon", "water", "air", "paper", "sponge", "wolf", "tree"],
  snake: ["water", "air", "paper", "sponge", "wolf", "tree"],
  fire: ["snake", "human", "tree", "wolf", "sponge", "paper"],
};
