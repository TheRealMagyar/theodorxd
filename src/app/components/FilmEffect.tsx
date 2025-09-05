// app/FilmEffect.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "../home.module.css";

export default function FilmEffect() {
  return (
    <div className={styles.filmwrap} aria-hidden="true">
      <div className={styles.content}>
        <Image
          src="/background.png"
          alt=""
          className={styles.bgImg}
          aria-hidden="true"
          fill
          style={{ objectFit: "cover" }}
        />
        <div className={styles.film}>
          <div className={styles.effect}>
            <div className={styles.grain}></div>
          </div>
        </div>
      </div>
    </div>
  );
}