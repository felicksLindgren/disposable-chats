import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import type { DocumentHead} from '@builder.io/qwik-city';
import { io } from 'socket.io-client';

export default component$(() => {
  const connected = useSignal(false);

  useVisibleTask$(() => {
    const socket = io("http://localhost:3000");

    socket.on("connect", () => {
      connected.value = true;
    });

    socket.on("disconnect", () => {
      connected.value = false;
    });

    socket.on("hello", (data) => {
      console.log(data);
    });
  })

  return (
    <>
      <p>
        Can't wait to see what you build with qwik!
        <br />
        Happy coding. {connected.value ? 'Connected ✅' : 'Not connected ❌'}
      </p>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
