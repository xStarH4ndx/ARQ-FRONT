import React, { useState } from "react";

const LoginPageTest: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const body = new URLSearchParams();
    body.append("username", email); // <- el backend espera "username"
    body.append("password", password);
    // body.append("username", email); // <- el backend espera "username"

    try {
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
        credentials: "include",
      });

      if (res.ok) {
        console.log("Login exitoso");
        console.log("Respuesta del servidor:", await res.text());
        setError("");
        // Aquí puedes redirigir o mostrar algo
      } else {
        const text = await res.text();
        console.error("Login fallido:", text);
        setError("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor", error);
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
