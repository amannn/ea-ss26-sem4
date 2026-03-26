import {API_URL} from '@/config';
// import {API_URL} from '../../config';

export default function CreatePage() {
  async function submitAction() {
    'use server';
    console.log('submit');

    // TODO: Read form data

    const response = await fetch(API_URL + '/rooms', {
      method: 'POST',
      body: JSON.stringify({
        title: 'New room',
        // description: 'This is a new room',
        heroUrl: 'https://google.com/image',
        // 'https://c.pxhere.com/photos/75/9b/sailboat_ship_sailing_greenland_boat-1092104.jpg!d',
        pricePerNight: {
          amount: 100,
          currency: 'USD'
        }
      })
    });

    if (!response.ok) {
      const body = await response.json();
      console.log(body);
      // TODO: Read errors from body, return to client
      // return {
      //   error: '....'
      // }
    }
  }

  return (
    <div>
      <h1 className="text-2xl">Create new cabin</h1>
      <form className="mt-2" action={submitAction}>
        {/* <input ... /> */}
        <button className="border px-2 py-1 border-slate-200 rounded-md">
          Submit new cabin
        </button>
      </form>
    </div>
  );
}
