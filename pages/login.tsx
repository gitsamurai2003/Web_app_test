import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import styles from "../styles/Login.module.css"; // Importar el archivo de estilos

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password
    });

    if (result && result.error) {
      alert("Login failed");
    } else if (result) {
      window.location.href = "/";
    } else {
      console.error("Sign-in result is undefined");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Login</h2>
        <div className={styles.inputGroup}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.button}>&rarr;</button>
        <div className={styles.register}>
          <span>Don't have an account?</span>
          <Link href="/register">
           Create one
          </Link>
        </div>
      </form>
    </div>
  );
}
