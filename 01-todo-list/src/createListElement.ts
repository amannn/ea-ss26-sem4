export default function createListElement(
  todo: string,
  list: HTMLUListElement
) {
  // Create list element
  const li = document.createElement('li');
  li.innerHTML = `
  <label>
    <input type="checkbox" />
    <span>${todo}</span>
  </label>
`;

  // (delete handler of list element)
  li.addEventListener('click', (event) => {
    const element = event.target as Element;
    const isInput = element.tagName === 'INPUT';
    if (!isInput) return;

    list.removeChild(li);
  });

  return li;
}
