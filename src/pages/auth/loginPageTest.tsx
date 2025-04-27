import React, { useState } from "react";

const LoginPageTest: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    console.log("[LOGIN] Iniciando login...");
  
    const body = new URLSearchParams();
    body.append("username", email); // ✅ Spring espera "username"
    body.append("password", password);
  
    try {
      console.log("[LOGIN] Enviando request a /login...");
  
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
        credentials: "include",
      });
  
      console.log("[LOGIN] Response recibido. Status:", res.status);
  
      if (res.ok) {
        console.log("[LOGIN] Login exitoso. Procesando JSON...");
        const tokens = await res.json();
        console.log("[LOGIN] Tokens recibidos:", tokens);
  
        localStorage.setItem("access_token", tokens.access_token);
        localStorage.setItem("refresh_token", tokens.refresh_token);
  
        setError("");
      } else {
        const text = await res.text();
        console.error("[LOGIN] Login fallido. Detalle del backend:", text);
        setError("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("[LOGIN] Error de conexión o fetch:", error);
      setError("Error de conexión");
    }
  };
  

  return (
    <div style={{ maxWidth: 300, margin: "100px auto", fontFamily: "Arial" }}>
      <h2>Please sign in</h2>
      <div style={{ marginBottom: 10 }}>
        <label>Username</label>
        <input
          type="text"
          placeholder="Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: 5 }}
        />
      </div>
      <div style={{ marginBottom: 10 }}>
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: 5 }}
        />
      </div>
      {error && (
        <div style={{ color: "red", marginBottom: 10 }}>{error}</div>
      )}
      <button onClick={handleLogin} style={{ padding: "6px 12px" }}>
        Sign in
      </button>
    </div>
  );
};

export default LoginPageTest;
