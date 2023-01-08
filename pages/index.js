import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css'

import homeTranslations from './../public/assets/translations/home.json';

export default function Home() {
  const { locale } = useRouter();

  const homeItems = homeTranslations.home.filter(item => item.locale === locale);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          { homeItems[0].title }
        </h1>

        <p className={styles.description}>
          { homeItems[0].description1 } <br />
          { homeItems[0].description2 } <br />
          { homeItems[0].description3 } <br />
        </p>
      </main>
    </div>
  )
}
