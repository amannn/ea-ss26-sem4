'use client';

import {useActionState} from 'react';

export default function ChatForm({action}) {
  const [state, formAction, pending] = useActionState(action, undefined);
  console.log(pending);

  return (
    <form className="flex gap-2 mt-4" action={formAction}>
      <input
        className="border border-slate-200 px-2 py-1 rounded-md disabled:opacity-50"
        required
        disabled={pending}
        name="message"
        placeholder="Your message"
      />
      <button
        disabled={pending}
        className="bg-slate-900 text-white font-semibold px-6 rounded-md disabled:opacity-50"
      >
        Submit
      </button>
    </form>
  );
}
