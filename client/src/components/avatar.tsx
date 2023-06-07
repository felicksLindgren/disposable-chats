import { Slot, component$, useStylesScoped$ } from "@builder.io/qwik";

const colors = [
    "#3245FF",
    "#B845ED",
    "#FF3245",
    "#FFB845",
    "#FF45ED",
    "#B845FF",
    "#EDB845",
    "#ED45B8",
    "#45B8ED",
];

export const Avatar = component$(() => {
    useStylesScoped$(`
        .avatar {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: ${colors[Math.floor(Math.random() * colors.length)]};
            background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.2) 75%, transparent 75%, transparent);
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-weight: bold;
            font-size: 14px;
            text-transform: uppercase;
        }
    `);

    return (
        <div class="avatar">
            <Slot></Slot>
        </div>
    );
});