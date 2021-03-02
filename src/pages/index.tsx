/* eslint-disable camelcase */
import axios from 'axios';
import Head from 'next/head';
import { FormEvent, useState } from 'react';
import { Button } from '../components/Button';
import styles from '../styles/pages/Login.module.css';

export default function Login(): JSX.Element {
  const [username, setUsername] = useState('');

  function handleUsername(e) {
    setUsername(e.target.value);
  }

  function saveSession(userSession) {
    const { login, avatar_url, name } = userSession.data;
    const userInfo = {
      login,
      avatarUrl: avatar_url,
      name,
    };
    sessionStorage.setItem('userSession', JSON.stringify(userInfo));
  }

  function handleSubmitForm(e: FormEvent) {
    e.preventDefault();

    axios.get(`https://api.github.com/users/${username}`)
      .then((value) => {
        if (value.status === 404) {
          window.location.href = '/';
        }
        saveSession(value);

        window.location.href = '/authenticated';
      });
  }

  return (
    <>
      <Head>
        <title>Login | moveit</title>
      </Head>

      <div className={styles.loginContainer}>
        <div className={styles.logo}>
          <img src="/logo-giant.svg" alt="Logo do moveit" />
        </div>

        <div className={styles.textContainer}>
          <div />

          <div className={styles.logo}>
            <img
              src="/logo-full.svg"
              alt="logo do moveit com o nome moveit escrito"
            />
          </div>

          <section className={styles.submitContainer}>
            <h1>Bem-vindo</h1>

            <div>
              <div>
                <img src="/icons/github.svg" alt="logo do gitghub" />
              </div>
              <p>Faça login com seu Github para começar</p>
              <div />
            </div>

            <form onSubmit={handleSubmitForm}>
              <div>
                <input
                  type="text"
                  placeholder="Digite seu username"
                  name="username"
                  value={username}
                  title="Digite seu username"
                  onChange={handleUsername}
                />
                <Button
                  style={{ backgroundColor: 'var(--green)' }}
                  value=""
                  type="submit"
                >
                  <img src="/icons/arrow-right.svg" alt="Seta para continuar" />
                </Button>
              </div>
            </form>
          </section>

          <div />
          <div />
        </div>
      </div>
    </>
  );
}
