import { io } from "socket.io-client";

const URL = process.env.SOCKET_URL || 'http://localhost:3000';

const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('c');
const options = code ? { query: { code } } : {};

export const socket = io(URL, options);