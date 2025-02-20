import Image from 'next/image'
import styles from './contact.module.css'
import { auth } from '@/lib/auth';
import ContactForm from '@/components/contactForm/contactForm';

export const metadata = {
  title: "Contact Page",
  description: "Contact description",
};

export default async function ContactPage() {
  const session = await auth()
  console.log(session)
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src='/contact.png' alt='' fill className={styles.img} />
      </div>
      <div className={styles.formContainer}>
        <ContactForm session={session}/>
      </div>
    </div>
  )
}
