import {useState} from 'react';

const animals = ['🐈', '🐒', '🐳'];

function getInitialCards() {
  const cards = [...animals, ...animals];
  cards.sort((a, b) => (Math.random() < 0.5 ? -1 : 1));
  return cards;
}

export default function App() {
  const [cards, setCards] = useState(
    // Using a fn here tells React to only evaluate this once
    () => getInitialCards()
  );
  const [flippedCards, setFlippedCards] = useState<Array<number>>([]);

  function onCardClick(index: number) {
    setFlippedCards([...flippedCards, index]);
  }

  // TODO: Theme picker

  return (
    <div className="grid grid-cols-3 gap-10">
      {cards.map((card, index) => (
        <CardItem
          onClick={() => onCardClick(index)}
          key={index}
          emoji={card}
          flipped={flippedCards.includes(index)}
        />
      ))}
    </div>
  );
}

function CardItem({emoji, onClick, flipped}) {
  return (
    <button onClick={onClick} className="w-24 h-32 bg-gray-100">
      {flipped && emoji}
    </button>
  );
}
