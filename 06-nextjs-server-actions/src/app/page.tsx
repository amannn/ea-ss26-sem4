import {addMessage, getMessages} from '@/lib/messages';
import {revalidatePath} from 'next/cache';
import ChatForm from './ChatForm';

export default async function Home() {
  const messages = await getMessages();

  async function action(initialState, data: FormData) {
    'use server';
    const message = data.get('message');
    if (typeof message !== 'string' || message.trim().length === 0) {
      return {
        error: 'Message must not be empty.',
        data
      };
    }
    await addMessage(message);

    // Tell Next.js to return updated markup for this page
    revalidatePath('/');

    // (return undefined;)
  }

  // Scenarios:
  // - Everything functional (ideal UX)
  // - JS not loaded yet, still works
  // - Slow network (pending state used)
  // - Error handling (return value from action used)

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
