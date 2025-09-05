// src/app/components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import styles from "../home.module.css";

export default function Navbar() {
  const [contractAddress, setContractAddress] = useState("Loading...");
  const [copied, setCopied] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Fetch contract address from API
  useEffect(() => {
    const fetchContractAddress = async () => {
      try {
        const response = await fetch("/api/getCa");
        const data = await response.json();
        setContractAddress(data.contractAddress);
      } catch (error) {
        console.error("Error fetching contract address:", error);
        setContractAddress("Failed to load");
      }
    };
    fetchContractAddress();
  }, []);

  // Handle copy to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress);
      setCopied(true); // Fixed: Removed space between set and Copied
      setTimeout(() => setCopied(false), 1000);
    } catch (e) {
      alert("Copy failed");
    }
  };

  // Handle scroll to toggle background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={`${styles.wrap} ${styles.contractRow}`}>
        <div className={styles.contractGroup}>
          <span className={styles.caLabel}>CA:</span>
          <span id="short-ca" className={styles.ca}>
            {contractAddress.slice(0, 18) + (contractAddress.length > 18 ? "..." : "")}
          </span>
          <button id="copy" className={styles.btn} aria-label="Copy contract" onClick={handleCopy}>
            {copied ? (
              "✔"
            ) : (
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M16 1H8a2 2 0 0 0-2 2v2H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2h2a2 2 0 0 0 2-2V7l-6-6Zm2 19a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h2v10a2 2 0 0 0 2 2h10v2Zm4-5a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h7v3a1 1 0 0 0 1 1h3v9Z" />
              </svg>
            )}
          </button>
        </div>
        <div className={styles.socialGroup}>
          <a
            className={styles.icon}
            href="https://x.com/theodorsui"
            target="_blank"
            rel="noopener"
            aria-label="X"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
              <path d="M18.244 2H21l-6.51 7.44L22 22h-5.873l-4.59-6.095L5.3 22H2.542l7.063-8.07L2 2h6.003l4.146 5.59L18.244 2Zm-2.058 18h1.51L7.88 4h-1.51L16.186 20Z" />
            </svg>
          </a>
          <a
            className={styles.icon}
            href="https://t.me/+Eakbd8o_qzBmNzcx"
            target="_blank"
            rel="noopener"
            aria-label="Telegram"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
              <path d="M9.036 15.47 8.9 19.7c.61 0 .878-.262 1.2-.574l2.882-2.735 5.973 4.373c1.096.605 1.88.287 2.176-1.016L24 4.732c.35-1.421-.513-1.99-1.56-1.563L1.765 11.133c-1.4.563-1.379 1.372-.237 1.742l5.7 1.781L19.854 6.5c.548-.333 1.047-.15.636.183L9.036 15.47Z" />
            </svg>
          </a>
        </div>
      </div>
    </nav>
  );
}