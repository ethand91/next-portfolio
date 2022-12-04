import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to my Portfolio
        </h1>

        <p className={styles.description}>
          Hello! My name is Ethan, I am a backend/media developer based in Japan. 😃 <br/>
          I am currently learning frontend development to become a fullstack developer. <br />
          If you would like to know more visit the about page, I have a lot of experience with live streaming and media solutions so if you have a project in mind feel free to contact me. ☺️
        </p>
      </main>
    </div>
  )
}
