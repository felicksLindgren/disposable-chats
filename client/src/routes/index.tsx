import { component$, useStylesScoped$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  useStylesScoped$(`
    h1 {
      color: red;
    }
  `);

  return (
    <>
      <p>
        Can't wait to see what you build with qwik!
        <br />
        Happy coding.
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
