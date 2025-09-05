import { readdir } from "fs/promises";
import { join } from "path";
import Head from "next/head";
import Image from "next/image";
import Gallery from "./components/Gallery";
import FilmEffect from "./components/FilmEffect";
import Navbar from "./components/Navbar";
import styles from "./home.module.css";

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
        <section className={`${styles.panel} ${styles.about}`}>
          <h2>$ODOR: From the trench comes the stench</h2>
          <p>
            Crypto isn’t a market, it’s a busted sewage main. $ODOR crawled out of the pipe to tag every scam with a stink you can’t chart away. He doesn’t pump halfass shitcoins, he is THE ultimate shitcoin. He points, laughs, and leaves a smellmark.
          </p>
          <p>
            When rugs slip, $ODOR sticks like splooge on a bath towel. He ghost-haunts dev wallets, stains exit-liquidity dreams, and perfumes every “soon™” roadmap with eau de stank.
          </p>
          <p>
            Holders? Nose-blind degenerates with iron guts. Breathe deep. The fouler it gets, the louder we cackle. Scams fade. The stench lingers. The cult grows. $ODOR remains.
          </p>
        </section>

        <section className={`${styles.panel} ${styles.memecoinomics}`}>
          {/* <h2>Memecoinomics</h2> */}
          <h3>Supply Breakdown</h3>
          <ul>
            <li>52% Public Sale (bonding curve)</li>
            <li>48% Dev Wallet</li>
          </ul>
          <h3>Dev Wallet Allocation</h3>
          <ul>
            <li>25% Burn, liquidity, reserves</li>
            <li>15% Community & external airdrops</li>
            <li>5% DeFi/staking incentives</li>
            <li>2% Marketing, partnerships, collabs</li>
            <li>1% Contest winner</li>
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