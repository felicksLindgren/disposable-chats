import { component$, useSignal, useStylesScoped$, useVisibleTask$ } from '@builder.io/qwik';
import type { DocumentHead} from '@builder.io/qwik-city';
import socket from '~/lib/socket';

export default component$(() => {
  const connected = useSignal(false);
  const socketId = useSignal('');

  useStylesScoped$(`
    h1 {
      margin: 0;
      font-weight: normal;
      font-size: 20px;
    }
  `);

  useVisibleTask$(() => {

    socket.on("connect", () => {
      connected.value = true;
      socketId.value = socket.id;
    });

    socket.on("disconnect", () => {
      connected.value = false;
    });
  });

  return (
    <>
      <h1># <b>{socketId.value}</b></h1>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Disposable Chat',
  meta: [
    {
      name: 'description',
      content: 'Disposable Chat',
    },
  ],
};
