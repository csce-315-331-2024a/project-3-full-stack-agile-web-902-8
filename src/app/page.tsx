import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link"; // Import Link from Next.js

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Hello World&nbsp;
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
      </div>
    </main>
  );
}
