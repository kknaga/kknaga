import Link from "next/link";
import Image from "next/image";
import styles from "./Navigation.module.scss";

export default function Navigation() {
  return (
    <nav className={styles.navigation}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.name}>Kareem Aboualnaga</span>
          <span className={styles.title}>
            Frontend Engineer with a Side Project Habit
          </span>
        </Link>

        <div className={styles.links}>
          <div className={styles.socialLinks}>
            <Link
              href="https://www.linkedin.com/in/kkmet/"
              className={styles.socialLink}
            >
              <Image
                src="/linkedin.png"
                alt="Linkedin"
                width={16}
                height={16}
              />
            </Link>
            <Link
              href="https://github.com/kknaga"
              className={styles.socialLink}
            >
              <Image src="/github.png" alt="Github" width={16} height={16} />
            </Link>
            <Link
              href="mailto:kareemkamal91@gmail.com"
              className={styles.socialLink}
            >
              <Image src="/mail.png" alt="Email" width={16} height={16} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
