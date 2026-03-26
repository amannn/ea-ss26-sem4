import {addMessage, getMessages} from '@/lib/messages';
import {revalidatePath} from 'next/cache';

export default async function Home() {
  const messages = await getMessages();

  async function action(data: FormData) {
    'use server';
    const message = data.get('message');
    if (typeof message !== 'string') return;
    await addMessage(message);

    // Tell Next.js to return updated markup for this page
    revalidatePath('/');
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">Chat</h1>
      <form className="flex gap-2 mt-4" action={action}>
        <input
          className="border border-slate-200 px-2 py-1 rounded-md"
          required
          name="message"
          placeholder="Your message"
        />
        <button className="bg-slate-900 text-white font-semibold px-6 rounded-md">
          Submit
        </button>
      </form>
      <ul className="mt-4">
        {messages.map((message) => (
          <li key={message.id}>{message.content}</li>
        ))}
      </ul>
    </div>
  );
}
