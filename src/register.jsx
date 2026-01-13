import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "./api";
import "./register.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    if (!name || !email || !password) {
      alert("Semua field wajib diisi");
      return;
    }

    try {
      await api.post("/register", { name, email, password });
      alert("Register berhasil, silakan login");
      navigate("/login");
    } catch (err) {
      alert("Register gagal");
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h2>Register Akun</h2>

        <input
          placeholder="Nama Lengkap"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={register}>Register</button>

        <p className="login-text">
          Sudah punya akun? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
