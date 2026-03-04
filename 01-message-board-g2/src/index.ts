// 1. Select form
const form = document.getElementById('form') as HTMLFormElement;
const list = document.getElementById('list') as HTMLUListElement;

console.log(form);

// 2. Add event listener for submit
form.addEventListener('submit', (event) => {
  event.preventDefault();

  // 3. Read form data
  const data = new FormData(form);
  const subject = data.get('subject');
  const body = data.get('body');

  // 4. console.log all data
  console.log(subject, body);

  // 5. Reset input fields of form
  form.reset();

  // 6. Add entry to list (with subject and body)
  const li = document.createElement('li');
  li.innerHTML = `
    <button>
      <p>${subject}</p>
      <p>${body}</p>
    </button>
  `;

  // 7. Unread messages shown highlighted
  li.className = 'unread';
  list.appendChild(li);

  // 8. Clicking on a message, marks as read
  // 9. Verify markup is accessible (keyboard controllable)
  li.addEventListener('click', () => {
    console.log(li.textContent);
    li.className = '';
    const button = li.querySelector('button');
    button.disabled = true;
  });

  // 10. Summary (total number of messages, how many read)
  // 11. Restructure code to separate concerns (functions, files)
});
