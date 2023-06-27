import { useEffect, useState } from "react";
import styled from "styled-components";
import { User } from "../../types.ts";
import { socket } from "../socket.ts";
import { Avatar } from "./avatar.tsx";

const StyledAside = styled.aside`
  overflow-y: auto;
  grid-area: aside;
  background-color: var(--container);
  border-right: 1px solid var(--border);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;

  @media (max-width: 768px) {
    border: none;
    border-top: 1px solid var(--border);
  }
`;

const StyledUl = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    list-style: none;
    padding: 0;
    margin: 0;
    overflow-y: auto;
`;

const StyledLi = styled.li`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 16px;
    font-weight: 500;
    color: var(--text);
    text-wrap: nowrap;

    span {
        color: var(--text-muted);
    }
`;

const StyledAnchor = styled.a`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-size: 16px;
    font-weight: 500;
    color: var(--text);
    text-wrap: nowrap;
    text-decoration: none;
    border-radius: 0.5rem;
    padding: 0.5rem;
    border: 1px solid var(--border);
    background-color: var(--background);

    span {
        color: var(--text-muted);
    }
`;

export const Aside = () => {
    const [users, setUsers] = useState<User[]>([])

    // sort users by placing the current user at the top of the list
    const sortedUsers = users.sort((a, b) => {
        if (a.userID === socket.id) return -1;
        if (b.userID === socket.id) return 1;
        return 0;
    });


    useEffect(() => {
        socket.on("users", (users: User[]) => {
            setUsers(users)
        });

        socket.on("user connected", (user: User) => {
            setUsers((users) => [...users, user])
        });

        socket.on("user disconnected", (userID: string) => {
            setUsers((users) => users.filter((user) => user.userID !== userID))
        });

        return () => {
            socket.off("users");
            socket.off("user connected");
            socket.off("user disconnected");
        }
    }, [])

    return (
        <StyledAside>
            <StyledUl>
                {sortedUsers.map(({ userID, username }: User) => (
                    <StyledLi key={userID}>
                        <Avatar index={username.length}>{username[0]}{username[username.indexOf('_') + 1]}</Avatar>
                        {username} <span>{userID === socket.id ? '(you)' : ''}</span>
                    </StyledLi>
                ))}
            </StyledUl>
            <StyledAnchor href="/">
                <span>New Session</span>
            </StyledAnchor>
        </StyledAside>
    )
}