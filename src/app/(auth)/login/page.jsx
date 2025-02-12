import LoginForm from '@/components/loginForm/loginForm'
import { handleGithubLogin } from '@/lib/actions'
import styles from './login.module.css'

export default function LoginPage() {

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form action={handleGithubLogin}>
          <button className={styles.github}>Login with github</button>
        </form>
        <LoginForm />
      </div>
    </div>
  )
}
