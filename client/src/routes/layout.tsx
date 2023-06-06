import { component$, Slot, useStylesScoped$ } from '@builder.io/qwik';
import { Aside } from '~/components/aside';

export default component$(() => {
  useStylesScoped$(`
    main {
      padding: 1rem;
      border-radius: 8px;
    }
  `);
  
  return (
    <>
      <Aside></Aside>
      <main>
        <Slot></Slot>
      </main>
    </>
  )
});
