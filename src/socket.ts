import { io } from "socket.io-client";

const URL = 'https://nodejs-production-7c99.up.railway.app';

const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('c');
const options = code ? { query: { code } } : {};

export const socket = io(URL, options);