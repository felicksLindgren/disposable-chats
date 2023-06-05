import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { query } = useRouter();
  const { c } = query;
  const [socket, setSocket] = useState<Socket>();
  const [username, setUsername] = useState<string>();

  useEffect(() => {
    const initializeSocket = async () => {
      await fetch('/api/socket');

      const socket = io();

      socket.on('connect', () => {
        setSocket(socket);
      });

      socket.on('username', (username: string) => {
        setUsername(username);
      });
    }

    initializeSocket();

    return () => {
      socket?.off('connect');
      socket?.off('username');
    }
  }, [])

  return (
    <>
      <Head>
        <title>Disposable Chats</title>
        <meta name="description" content="A disposable chat app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${styles.container} ${inter.className}`}>
        <aside className={styles.aside}>
          <h1 className={styles.title}>@ <b>{username}</b></h1>
        </aside>
        <main className={styles.main}>
          <h1 className={styles.title}># <b>{socket?.id}</b></h1>
        </main>
      </div>
    </>
  )
}
