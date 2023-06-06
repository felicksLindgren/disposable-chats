import { component$, useStylesScoped$ } from "@builder.io/qwik";

export const Aside = component$(() => {
    useStylesScoped$(`
        aside {
            grid-area: aside;
            background-color: var(--container);
            padding: 1rem;
        }
    `);

    return (
        <aside></aside>
    )
});