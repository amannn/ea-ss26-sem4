// 1) Select the form from DOM
const form = document.getElementById('form') as HTMLFormElement;
const list = document.getElementById('list') as HTMLUListElement;

// 2) Add submit event handler
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const subject = data.get('subject');
  const body = data.get('body');

  console.log(subject, body);

  const li = document.createElement('li');
  li.className = 'unread';
  li.innerHTML = `
    <button>
      <p>${subject}</p>
      <p>${body}</p>
    </button>
  `;
  list.appendChild(li);

  // TODO:
  // - Clear form after submit
  // - Mark as done
});
