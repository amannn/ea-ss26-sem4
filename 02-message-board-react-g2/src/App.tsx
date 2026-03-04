import {useState} from 'react';

type Message = {
  subject: string;
  body: string;
  isRead: boolean;
  id: number;
};

export default function App() {
  const [messages, setMessages] = useState<Array<Message>>([]);

  function onSubmit(subject: string, body: string) {
    console.log(subject, body);
    const message: Message = {
      subject: subject,
      body: body,
      isRead: false,
      id: messages.length
    };
    const nextMessages = [...messages, message];
    setMessages(nextMessages);
  }

  function onRead(id: number) {
    // Based on id, change isRead flag
  }

  console.log(messages);

  return (
    <>
      <MessageForm onSubmit={onSubmit} />
      <MessageList messages={messages} onRead={onRead} />
      {/* <MessageSummary /> */}
    </>
  );
}

function MessageList({messages, onRead}) {
  function onClick(id: number) {
    onRead(id);
  }

  return (
    <ul>
      {messages.map((message) => (
        <li key={message.id} className={message.isRead ? undefined : 'unread'}>
          <button onClick={() => onClick(message.id)}>
            <p>{message.subject}</p>
            <p>{message.body}</p>
          </button>
        </li>
      ))}
    </ul>
  );
}

function MessageForm({onSubmit}) {
  function action(values: FormData) {
    const subject = values.get('subject') as string;
    const body = values.get('body') as string;
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
