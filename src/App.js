import { useEffect, useState } from "react";
import Card from "./components/Card";

function App() {
  const coverSrc = "../img/cover.png";

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [firstPick, setFirstPick] = useState(null);
  const [secondPick, setSecondPick] = useState(null);

  const cardImages = [
    {
      src: "/img/sword-1.png",
      matched: false,
    },
    {
      src: "/img/shield-1.png",
      matched: false,
    },
    {
      src: "/img/scroll-1.png",
      matched: false,
    },
    {
      src: "/img/ring-1.png",
      matched: false,
    },
    {
      src: "/img/potion-1.png",
      matched: false,
    },
    {
      src: "/img/helmet-1.png",
      matched: false,
    },
  ];

  const shuffleCards = () => {
    const pack = [...cardImages, ...cardImages];
    pack.sort((a, b) => Math.random() - 0.5);
    const cards = pack.map((card) => ({ ...card, id: Math.random() }));
    setCards(cards);
    setTurns(0);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    if (firstPick && secondPick) {
      if (firstPick.src === secondPick.src) {
        setCards((prev) => {
          return prev.map((card) => {
            if (card.src === firstPick.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  }, [firstPick, secondPick]);

  const handleClick = (card) => {
    firstPick ? setSecondPick(card) : setFirstPick(card);

  };

  const resetTurn = () => {
    setFirstPick(null);
    setSecondPick(null);
    setTurns((prev) => prev + 1);
  };

  // console.log(cards);

  return (
    <div className="App">
      <h1>MEMORY GAME</h1>
      <button>New game</button>
      <div className="board">
        {cards.map((card) => (
          <Card key={card.id} card={card} flipped={card === firstPick || card === secondPick || card.matched } handleClick={handleClick} />
        ))}
      </div>
      <div>
        Turns played : {turns}
      </div>
    </div>
  );
}

export default App;
