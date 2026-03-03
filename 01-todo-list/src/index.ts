import createListElement from './createListElement';

const form = document.getElementById('form') as HTMLFormElement;
const list = document.getElementById('list') as HTMLUListElement;

form.addEventListener('submit', (event) => {
  // No reload
  event.preventDefault();

  // Read form data
  const data = new FormData(form);
  const todo = data.get('todo');
  if (typeof todo !== 'string') {
    throw new Error('Expected string');
  }

  const li = createListElement(todo, list);
  list.appendChild(li);

  form.reset();
});
