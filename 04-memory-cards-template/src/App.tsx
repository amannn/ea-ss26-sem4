import {useState} from 'react';
import clsx from 'clsx';
import {Toggle} from '@base-ui/react';
import {ToggleGroup} from '@base-ui/react';

type Theme = 'animals' | 'fruits';

const animals = ['🐶', '🐱', '🐭'];
const fruits = ['🍎', '🍌', '🍇'];

function getInitialCards(theme: Theme) {
  const emojis = theme === 'animals' ? animals : fruits;
  return [...emojis, ...emojis].sort(() =>
    Math.random() > 0.5 ? -1 : 1
  );
}

export default function App() {
  const [theme, setTheme] = useState<Theme>('animals');
  const [cards, setCards] = useState(() => getInitialCards(theme));
  const [flippedCards, setFlippedCards] = useState<Array<number>>(
    []
  );

  function onCardClick(index: number) {
    setFlippedCards([...flippedCards, index]);
  }

  function onThemeChange(value: Theme) {
    setTheme(value);
    setFlippedCards([]);
    setCards(getInitialCards(value));
  }

  let announcement;
  if (flippedCards.length > 0) {
    announcement = `You have flipped ${cards[flippedCards.at(-1)]}`;
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 gap-4">
      <ThemePicker theme={theme} onChange={onThemeChange} />
      <span role="status" className="sr-only" aria-live="polite">
        {announcement}
      </span>
      <div className="grid grid-cols-3 gap-4">
        {cards.map((emoji, index) => (
          <MemoryCard
            key={index}
            emoji={emoji}
            isFlipped={flippedCards.includes(index)}
            onClick={() => onCardClick(index)}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

function MemoryCard({emoji, isFlipped, onClick, index}) {
  let label = `Card ${index + 1}`;
  if (isFlipped) {
    label += `: ${emoji}`;
  }
  return (
    <button
      className={clsx(
        'w-24 h-32 rounded-md',
        isFlipped ? 'bg-blue-300' : 'bg-gray-300'
      )}
      onClick={onClick}
      aria-label={label}
      disabled={isFlipped}
    >
      {isFlipped && <span className="text-4xl">{emoji}</span>}
    </button>
  );
}

function ThemePicker({theme, onChange}) {
  function onValueChange(value: Array<string>) {
    onChange(value[0] || theme);
  }

  return (
    <ToggleGroup
      value={[theme]}
      onValueChange={onValueChange}
      className="flex gap-1 rounded-md border border-gray-200"
    >
      <Toggle
        aria-label="Animals"
        value="animals"
        className="flex size-10 items-center justify-center rounded-sm data-pressed:bg-gray-300"
      >
        🐱
      </Toggle>
      <Toggle
        aria-label="Fruits"
        value="fruits"
        className="flex size-10 items-center justify-center rounded-sm data-pressed:bg-gray-300"
      >
        🍉
      </Toggle>
    </ToggleGroup>
  );
}
