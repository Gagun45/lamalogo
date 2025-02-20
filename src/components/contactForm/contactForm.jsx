'use client'
import { useRef, useState } from 'react'
import styles from './contactForm.module.css'
import emailjs from '@emailjs/browser'

export default function ContactForm({ session }) {
    const form = useRef()
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const sendEmail = (e) => {
        e.preventDefault();
        setSuccess(false)
        setError(false)

        const formData = new FormData(form.current)
        const user_username_from_data = formData.get('user_username')
        const user_email_from_data = formData.get('user_email')

        const user_name = formData.get('user_name')
        const user_contactEmail = formData.get('user_contactEmail')
        const user_phone_from_data = formData.get('user_phone')
        const user_message = formData.get('user_message')

        const user_phone = user_phone_from_data ? user_phone_from_data : false
        const user_username = user_username_from_data ? user_username_from_data : false
        const user_email = user_email_from_data ? user_email_from_data : false


        const formParams = {
            user_username,
            user_email,
            user_name,
            user_contactEmail,
            user_phone,
            user_message
        }

        console.log(form.current)

        if (!user_name) {
            setError('Missing a Name and Surname')
            return
        }
        if (!user_contactEmail) {
            setError('Missing a contact email')
            return
        }
        if (!user_message) {
            setError('Missing a message')
            return
        }
        if (user_message.lenght > 500) {
            setError('Message exceeding limit (500 symbols max)')
            return
        }


        emailjs
            .send(process.env.NEXT_PUBLIC_SERVICE_ID, process.env.NEXT_PUBLIC_TEMPLATE_ID, formParams, {
                publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
            })
            .then(
                () => {
                    setSuccess(true)
                    form.current.reset()
                },
                (error) => {
                    console.log(error)
                    setError('Unexpected Error, try later please')
                },
            );
    };
    return (
        <form ref={form} onSubmit={sendEmail} className={styles.form}>
            <input type='hidden' name='user_username' value={session?.user.name} />
            <input type='hidden' name='user_email' value={session?.user.email} />
            <input type='text' placeholder='Name and Surname' name='user_name' />
            <input type='email' placeholder='Email Address' name='user_contactEmail' />
            <input type='phone' placeholder='Phone Number (optional)' name='user_phone' />
            <textarea name='user_message' id='' cols="30" rows="10" placeholder='Message'></textarea>
            <button className={styles.button}>Send</button>
            {success && <span style={{ color: 'green' }}>Your message has been successfully sent!</span>}
            {error && <span style={{ color: 'red' }}>{error || 'Something went wrong'}</span>}
        </form>
    )
}
