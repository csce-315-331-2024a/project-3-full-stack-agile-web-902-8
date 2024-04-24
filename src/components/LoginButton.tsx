import { signIn } from 'next-auth/react';
import styles from './component.module.css';

function LoginButton() {
    const handleClick = () => {
        signIn("google");
    }

    return (
        <button
            onClick={handleClick}
            className={styles.loginButton}
        >
            Login
        </button>
    );
}

export default LoginButton;
