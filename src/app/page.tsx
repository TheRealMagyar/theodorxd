import { readdir } from "fs/promises";
import { join } from "path";
import Head from "next/head";
import Image from "next/image";
import Gallery from "./components/Gallery";
import FilmEffect from "./components/FilmEffect";
import Navbar from "./components/Navbar";
import styles from "./home.module.css";
import Link from "next/link";

async function getImageFiles() {
  const memesDir = join(process.cwd(), "public", "memes");
  try {
    const files = await readdir(memesDir);
    const imageFiles = files
      .filter((file) => /^img\d+\.jpg$/.test(file))
      .sort((a, b) => {
        const numA = parseInt(a.match(/\d+/)![0]);
        const numB = parseInt(b.match(/\d+/)![0]);
        return numA - numB;
      })
      .map((file) => `/memes/${file}`);
    return imageFiles;
  } catch (error) {
    console.error("Error reading memes directory:", error);
    return [];
  }
}

export default async function Home() {
  const imageFiles = await getImageFiles();

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>The Odor | $ODOR</title>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>

      <FilmEffect />

      <div className={styles.fade} aria-hidden="true"></div>

      <Navbar />

      <header className={styles.siteHeader}>
        <div className={`${styles.wrap} ${styles.center}`}>
          <Image
            src="/logo.png"
            className={styles.logo}
            alt="THE ODOR"
            width={300}
            height={300}
            priority
          />
        </div>
      </header>

      <main className={styles.wrap}>
        <section className={`${styles.panel} ${styles.memecoinomics}`}>
          <h3>$ODOR: From the trench comes the stench</h3>
          <ul>
            <li>The $ODOR is not your ordinary token. It is a symbol of resistance against deception, scams and rugs. Whenever extraction or deception shows its ugly face, the $ODOR stench attaches, marking the guilty with a foul aura that cannot be ignored. The stronger the scams, the stronger the smell, and the more powerful $ODOR grows.</li>
            <li>The $ODOR thrives on parody, satire, and unrelenting dark humor, reminding us that morality in crypto is often twisted, or discarded. The purpose? Search wallets for $ODOR, if you think it is a rug, it will most likely be a rug.</li>
            <li>The $ODOR is a landmark for Sui, the last piece of history that remains from and old era, where extraction and questionable ethics were everyday items. Today a new path is forged, a much less smelly path.</li>
          </ul>
        </section>

        <section className={`${styles.panel} ${styles.memecoinomics}`}>
          {/* <h2>Memecoinomics</h2> */}
                        <h3 className={styles.tooltip}>
                Tokenomics
                <span className={styles.tooltipText}>Find the shit game on the site, good luck! :3</span>
              </h3>
          <ul>
            <li>52% public sale on blast.fun</li>
            <li>25% burn, liquidity and reserves</li>
            <li>15% community and external airdrops</li>
            <li>5% DeFI and incentives</li>
            <li>2% Marketing, partnerships and collabs</li>
            <li>1% Contest winner</li>
          </ul>
          <p>Note: The creator wallet will command 48% of the supply.</p>
        </section>

        <section className={`${styles.panel} ${styles.flush}`}>
          <h2>FLUSH: Burn Mechanism</h2>
          <p>Stay tuned for updates on how $ODOR burns will work soon!</p>
        </section>

        <section className={`${styles.panel} ${styles.memecoinomics}`}>
            <h3>History</h3>
            <ul>
              <li>
                  The $ODOR is a piece of Sui’s legacy, born from an era of crypto chaos. Learn more about its origins and the community behind it on{" "}
                  <Link href="https://theorder.site" className={styles.historyLink}>
                    The Order
                  </Link>{" "}
                  page.
                </li>
            </ul>
        </section>
        <section className={`${styles.panel} ${styles.galleryBlock}`}>
          <h2>Meme Gallery</h2>
          <Gallery imageFiles={imageFiles} />
        </section>
      </main>
    </>
  );
}