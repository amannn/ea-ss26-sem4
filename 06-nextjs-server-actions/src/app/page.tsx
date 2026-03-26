import {addMessage, getMessages} from '@/lib/messages';
import {revalidatePath} from 'next/cache';
import ChatForm from './ChatForm';

export default async function Home() {
  const messages = await getMessages();

  async function action(initialState, data: FormData) {
    'use server';
    const message = data.get('message');
    if (typeof message !== 'string') return;
    await addMessage(message);

    // Tell Next.js to return updated markup for this page
    revalidatePath('/');
  }

  // Scenarios:
  // - Everything functional (ideal UX)
  // - JS not loaded yet, still works
  // - Slow network (TODO)
  // - Error handling (TODO)

  return (
    <div>
      <h1 className="text-2xl font-semibold">Chat</h1>
      <ChatForm action={action} />
      <ul className="mt-4">
        {messages.map((message) => (
          <li key={message.id}>{message.content}</li>
        ))}
      </ul>
    </div>
  );
}
