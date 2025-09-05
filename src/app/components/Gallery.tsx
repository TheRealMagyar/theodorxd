"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom"; // Import createPortal
import styles from "../home.module.css";

interface GalleryProps {
  imageFiles: string[];
}

export default function Gallery({ imageFiles }: GalleryProps) {
  const fullCA = "0x356a26eb9e012a68958082340d4c4116e7f55615cf27affcff209cf0ae544f59::wal::WAL";
  const [copied, setCopied] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState("");

  // Handle copy to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullCA);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch (e) {
      alert("Copy failed");
    }
  };

  // Handle lightbox
  const openLightbox = (src: string) => {
    setLightboxSrc(src);
  };

  const closeLightbox = () => {
    setLightboxSrc("");
  };

  // Handle Escape key for lightbox
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Lightbox component
  const Lightbox = () => (
    <div
      id="lightbox"
      className={`${styles.lightbox} ${lightboxSrc ? styles.open : ""}`}
      aria-hidden={lightboxSrc ? "false" : "true"}
      onClick={(e) => e.target === e.currentTarget && closeLightbox()}
    >
      <button
        id="closeLb"
        type="button"
        className={styles.close}
        aria-label="Close"
        onClick={closeLightbox}
      >
        &times;
      </button>
      <a
        id="dl"
        className={styles.download}
        href={lightboxSrc}
        download={lightboxSrc ? lightboxSrc.split("/").pop() || "meme.jpg" : "meme.jpg"}
      >
        Download
      </a>
      {lightboxSrc && (
        <Image
          id="lbImg"
          src={lightboxSrc}
          alt="Meme preview"
          width={600}
          height={600}
          className={styles.lightboxImage}
        />
      )}
    </div>
  );

  return (
    <>
      <div id="gallery" className={styles.gallery}>
        {imageFiles.map((src, i) => (
          <div key={i} className={styles.card} onClick={() => openLightbox(src)}>
            <Image
              src={src}
              alt={`Meme ${i + 1}`}
              width={200}
              height={200}
              loading="lazy"
              className={styles.cardImage}
              onError={(e) => {
                e.currentTarget.parentElement?.remove();
              }}
            />
            <div className={styles.zoom}>Open</div>
          </div>
        ))}
      </div>

      {/* Render lightbox using a portal */}
      {typeof window !== "undefined" && lightboxSrc && createPortal(<Lightbox />, document.body)}
    </>
  );
}