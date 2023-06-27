import styled from "styled-components";
import { socket } from "../socket";
import { Avatar } from "./avatar";

type MessageProps = {
    message: string;
    username: string;
    userID: string;
    index: number;
    time: string;
}

const StyledMessage = styled.div`
    display: flex;
    gap: 0.5rem;
    padding: .5rem 1rem;
    word-break: break-word;
    align-items: center;

    &:hover {
        background-color: var(--container);
    }

    & > div {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        & > span {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 16px;
            color: var(--text-muted);
            text-wrap: nowrap;

            & > b {
                color: var(--text);
            }

            & > span {
                font-size: 12px;
                font-weight: normal;
                color: var(--text-muted);
            }
        }

        & > p {
            font-size: 16px;
            margin: 0;
        }
    }
`;

export const Message = ({
    message,
    username,
    userID,
    time,
    index
}: MessageProps) => {
    return (
        <StyledMessage>
            <Avatar index={index}>{username[0]}{username[username.indexOf('_') + 1]}</Avatar>
            <div>
                <span><b>{username}</b> {userID === socket.id ? '(you)' : ''}<span>{time}</span></span>
                <p>{message}</p>
            </div>
        </StyledMessage>
    );
}