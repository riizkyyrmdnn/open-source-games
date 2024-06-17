import { BrowserRouter, Routes, Route } from "react-router-dom";
import { games } from "@asset/data/Games";
import { guessWords } from "@asset/data/Words";
import HomePage from "@page/HomePage/Home";

export default function App() {
  return (
    <BrowserRouter basename="/open-source-games/">
      <Routes>
        <Route path="/" element={<HomePage props={games} />} />
        {games.map((game) => (
          <Route
            key={game.id}
            path={game.link}
            element={
              <game.element
                wordGame={{ guessWords }}
                propsWordScramble={guessWords}
                propsHangmanGame={{ guessWords }}
              />
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
