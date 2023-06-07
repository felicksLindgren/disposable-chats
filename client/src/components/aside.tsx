import { component$, useSignal, useStylesScoped$, useVisibleTask$ } from "@builder.io/qwik";
import socket from "~/lib/socket";
import { Avatar } from "./avatar";

type User = {
    userID: string;
    username: string;
};

export const Aside = component$(() => {
    const username = useSignal('');
    const users = useSignal<User[]>([]);

    useStylesScoped$(`
        aside {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            grid-area: aside;
            background-color: var(--container);
            padding: 1rem;
            overflow-y: auto;
        }

        h1 {
            margin: 0;
            font-size: 20px;
        }

        ul {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        li {
            display: flex;
            align-items: center;
            gap: 0.5rem;

            
        }

        li span {
            color: var(--text-muted);
        }
    `);

    useVisibleTask$(() => {
        socket.on("username", (data) => {
            username.value = data;
        });

        socket.on("users", (data: User[]) => {
            users.value = data;
        });

        socket.on("user connected", (data: User) => {
            const newUsers = [...users.value, data] as User[];
            users.value = newUsers;
        }); 

        socket.on("user disconnected", (data: User) => {
            const index = users.value.findIndex((user) => user.userID === data.userID);
            const newArray = [...users.value];
            newArray.splice(index, 1);

            users.value = newArray;
        });
    });

    return (
        <aside>
            <ul>
                {users.value.reduce((acc, user) => {
                    if (user.username === username.value) {
                        return [user, ...acc];
                    }

                    return [...acc, user];
                }, []).map((user, index) => (
                    <li key={user.userID}>
                        <Avatar>
                            {user.username[0]}{user.username[user.username.indexOf('_') + 1]}
                        </Avatar>
                        {user.username} <span>{index === 0 && 'you'}</span>
                    </li>
                ))}
            </ul>
        </aside>
    )
});