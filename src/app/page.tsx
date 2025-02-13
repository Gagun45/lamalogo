import Image from 'next/image';
import styles from './home.module.css'
import Link from 'next/link';

export default function Homepage() {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Creative Thoughts Agency.</h1>
        <p className={styles.desc}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, sint. Consequatur dicta omnis quas asperiores rem iusto tempore veritatis architecto perferendis error ad quo voluptas quibusdam quae, accusamus accusantium id.</p>
        <div className={styles.buttons}>
          <Link href='/about'>
            <button className={`${styles.button} ${styles.learnMore}`}>Learn More</button>
          </Link>
          <Link href='/contact'>
            <button className={`${styles.button} ${styles.contact}`} >Contact</button>
          </Link>
        </div>
        <div className={styles.brands}>
          <Link href="/" className={styles.brandContainer}>
            <Image src='/reddit.png' alt='' fill className={styles.brandImg} />
          </Link>

          <Link href="/" className={styles.brandContainer}>
            <Image src='/twitch.png' alt='' fill className={styles.brandImg} />
          </Link>

          <Link href="/" className={styles.brandContainer}>
            <Image src='/discord.png' alt='' fill className={styles.brandImg} />
          </Link>

          <Link href="/" className={styles.brandContainer}>
            <Image src='/steam.png' alt='' fill className={styles.brandImg} />
          </Link>
        </div>
      </div>
      <div className={styles.imgContainer}>
        <Image src='/hero.gif' alt='' fill className={styles.heroImg} />
      </div>
    </div>
  );
}
