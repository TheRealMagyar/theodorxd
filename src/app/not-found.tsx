import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import FilmEffect from "./components/FilmEffect";
import styles from "./home.module.css";

export default function NotFound() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>404 - The Odor | $ODOR</title>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>

      <FilmEffect />

      <div className={styles.fade} aria-hidden="true"></div>

      {/* <Navbar /> */}

      <main className={styles.wrap_nf}>
        <section className={`${styles.panel} ${styles.notFound}`}>
          <div className={`${styles.center}`}>
            <Image
              src="/logo.png"
              className={styles.logo}
              alt="THE ODOR"
              width={150}
              height={150}
              priority
            />
            <h1>404: The Stench Has Vanished!</h1>
            <p>
              Whoa, you wandered into a crypto sewer with no $ODOR to guide you. This page got rugged harder than a shady shitcoin. Sniff your way back to the stench!
            </p>
            <Link href="/" className={styles.backLink}>
              Return to the Stinky Homepage
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}