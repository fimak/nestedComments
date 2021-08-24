import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import firebase from '../components/firebase/clientApp';
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Header';
import Comments, { IComments } from '../components/Comments';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const AuthUser = useAuthUser();
  const [comments, setComments] = useState(undefined);
  const [commentsCollection, commentsLoading, commentsError] = useCollection(
    firebase.firestore().collection('comments'),
    {}
  );

  if (!commentsLoading && commentsCollection) {
    commentsCollection.docs.map((doc) => console.log(doc.data()));
  }

  useEffect(() => {
    if (!commentsLoading && commentsCollection) {
      const comments = [];
      commentsCollection.docs.map((doc) => comments.push(doc.data()));
      setComments(comments);
    }
  }, [commentsLoading, commentsCollection]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header email={AuthUser.email} signOut={AuthUser.signOut} />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://www.upwork.com/freelancers/aleksandrufimtsev">Tweet-tulator</a>
        </h1>

        <Comments comments={comments} userEmail={AuthUser.email}/>

      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export const getServerSideProps = withAuthUserTokenSSR()()
export default withAuthUser()(Home)
