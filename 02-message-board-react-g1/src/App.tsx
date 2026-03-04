import {useState} from 'react';

type Message = {
  id: number;
  subject: string;
  body: string;
  isRead: boolean;
};

export default function App() {
  const [messages, setMessages] = useState<Array<Message>>([]);

  function onSubmit(subject, body) {
    const message: Message = {
      body: body,
      subject: subject,
      isRead: false,
      id: Date.now()
    };

    const nextMessages = messages.concat(message);
    setMessages(nextMessages);
  }

  function onItemClick(id: number) {
    // TODO: Change isRead in messages in App
    console.log(id);
  }

  console.log(messages);

  return (
    <div>
      <MessageForm onSubmit={onSubmit} />
      <MessagesList messages={messages} onItemClick={onItemClick} />
      {/* TODO: Implement summary */}
    </div>
  );
}

function MessagesList({messages, onItemClick}) {
  return (
    <ul>
      {messages.map((message) => (
        <li key={message.id} className={message.isRead ? undefined : 'unread'}>
          <button onClick={() => onItemClick(message.id)}>
            <p>{message.subject}</p>
            <p>{message.body}</p>
          </button>
        </li>
      ))}
    </ul>
  );
}

function MessageForm({onSubmit}) {
  // 1. Event handler for submit (action?)
  function action(values: FormData) {
    const subject = values.get('subject') as string;
    const body = values.get('body') as string;

    // 2. Pass to App
    onSubmit(subject, body);
  }

  return (
    <form action={action}>
      <input required type="text" name="subject" placeholder="Subject" />
      <input required name="body" placeholder="Write your message here..." />
      <button>Send message</button>
    </form>
  );
}
