import { component$, Slot, useStylesScoped$ } from '@builder.io/qwik';
import { Aside } from '~/components/aside';

export default component$(() => {
  useStylesScoped$(`
    main {
      padding: 1rem;
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
