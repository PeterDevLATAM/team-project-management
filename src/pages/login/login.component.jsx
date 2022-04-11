import "./login.styles.css";
import { useState } from "react";
import {useLogin} from "../../hooks/useLogin"

export default function Loguin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {login, isPending, error} = useLogin()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)

  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <label>
        <span>email:</span>
        <input
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>

      {!isPending && <button className="btn">Login</button>}
      {isPending && (
        <button className="btn" disabled>
          Loading..
        </button>
      )}
      {error && <div className="error">{error}</div>}
    </form>
  );
}
