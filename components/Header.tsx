import React from 'react'
import Link from 'next/link'
import styles from '../styles/Header.module.css';

interface HeaderProps {
  email: string | null
  signOut: Function
}

const Header = ({ email, signOut }: HeaderProps) => (
  <div className={styles.container}>
    {email ? (
      <>
        <p>Signed in as {email}</p>
        <button
          type="button"
          onClick={() => {
            signOut()
          }}
          className={styles.button}
        >
          Sign out
        </button>
      </>
    ) : (
      <>
        <p>You are not signed in.</p>
        <Link href="/auth">
          <a>
            <button type="button" className={styles.button}>
              Sign in
            </button>
          </a>
        </Link>
      </>
    )}
  </div>
)

export default Header