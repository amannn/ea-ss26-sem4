import {useState} from 'react';

const animals = ['🐈', '🐙', '🐳'];

export default function App() {
  const [cards, setCards] = useState(() =>
    [...animals, ...animals].sort(() => (Math.random() > 0.5 ? -1 : 1))
  );

  // Next step: Theme picker

  // Indices of flipped cards
  const [flipped, setFlipped] = useState<Array<number>>([]);

  function onCardClick(index: number) {
    setFlipped(flipped.concat(index));
  }

  return (
    <div className="grid grid-cols-3 gap-8">
      {cards.map((card, index) => (
        <Card
          key={index}
          flipped={flipped.includes(index)}
          emoji={card}
          onClick={() => onCardClick(index)}
        />
      ))}
    </div>
  );
}

function Card({emoji, onClick, flipped}) {
  return (
    <button onClick={onClick} className="bg-gray-100 w-24 h-32">
      {flipped && emoji}
    </button>
  );
}
