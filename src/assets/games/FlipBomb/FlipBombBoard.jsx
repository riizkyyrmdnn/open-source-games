import { cardImages, bombImage } from "@asset/data/CardImages";

const formatImages = (images) => {
  const uniquePaths = new Set();
  const formattedImages = [];
  for (const img of images) {
    if (!uniquePaths.has(img.image)) {
      uniquePaths.add(img.image);
      formattedImages.push(img);
    }
  }
  return formattedImages;
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const FlipBombBoard = (size) => {
  const totalCards = size * size;
  const bombIndex = Math.floor(Math.random() * totalCards);
  const cardImagesCopy = [...formatImages(cardImages)];
  while (cardImagesCopy.length < totalCards / 2) {
    cardImagesCopy.push(...cardImagesCopy);
  }
  const shuffledCards = shuffleArray([
    ...cardImagesCopy.slice(0, totalCards / 2),
    ...cardImagesCopy.slice(0, totalCards / 2),
  ]);
  return shuffledCards.slice(0, totalCards).map((image, idx) => ({
    id: idx,
    hasBomb: idx === bombIndex,
    image: idx === bombIndex ? bombImage : image,
  }));
};

export default FlipBombBoard;
