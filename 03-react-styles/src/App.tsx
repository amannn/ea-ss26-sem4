import {useState} from 'react';
import clsx from 'clsx';
import {Accordion} from '@base-ui/react/accordion';

function Counter({count, onCountChange}) {
  const isOdd = count % 2 !== 0;

  function onIncrement() {
    const nextCount = count + 1;
    onCountChange(nextCount);
  }

  function onDecrement() {
    onCountChange(count - 1);
  }

  return (
    <div className="p-2">
      <p className="font-bold">Count: {count}</p>
      <p>
        Is odd:{' '}
        <span
          className={clsx(
            'font-bold',
            isOdd ? 'text-blue-800' : 'text-red-800'
          )}
        >
          {isOdd ? 'yes' : 'no'}
        </span>
      </p>
      <div className="flex gap-2">
        <Button onClick={onIncrement}>Increment</Button>
        <Button onClick={onDecrement}>Decrement</Button>
      </div>
    </div>
  );
}

function Button({children, onClick}) {
  return (
    <button
      className="bg-slate-100 px-2 py-1 rounded-sm border border-slate-300"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col gap-2">
      <Counter count={count} onCountChange={setCount} />
      <Counter count={count} onCountChange={setCount} />
      <ExampleAccordion />
    </div>
  );
}

function ExampleAccordion() {
  return (
    <Accordion.Root className="flex w-96 max-w-[calc(100vw-8rem)] flex-col justify-center text-gray-900">
      <AccordionItem
        title="What is Base UI?"
        description="Base UI is a library of high-quality unstyled React components for design systems and web apps."
      />
      <AccordionItem
        title="How do I get started?"
        description="Head to the “Quick start” guide in the docs. If you’ve used unstyled libraries before, you’ll feel at home."
      />
      <AccordionItem
        title="Can I use it for my project?"
        description="Of course! Base UI is free and open source."
      />
    </Accordion.Root>
  );
}

function AccordionItem({title, description}) {
  return (
    <Accordion.Item className="border-b border-gray-800">
      <Accordion.Header>
        <Accordion.Trigger className="group relative flex w-full items-baseline justify-between gap-4 bg-gray-50 py-2 pr-1 pl-3 text-left font-medium hover:bg-gray-100 focus-visible:z-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-800">
          {title}
          <PlusIcon className="mr-2 size-3 shrink-0 transition-all ease-out group-data-[panel-open]:scale-110 group-data-[panel-open]:rotate-45" />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Panel className="h-[var(--accordion-panel-height)] overflow-hidden text-base text-gray-600 transition-[height] ease-out data-[ending-style]:h-0 data-[starting-style]:h-0">
        <div className="p-3">{description}</div>
      </Accordion.Panel>
    </Accordion.Item>
  );
}

function PlusIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 12 12" fill="currentcolor" {...props}>
      <path d="M6.75 0H5.25V5.25H0V6.75L5.25 6.75V12H6.75V6.75L12 6.75V5.25H6.75V0Z" />
    </svg>
  );
}
