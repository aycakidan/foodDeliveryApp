import React, { useState } from "react";
import axios from "axios";
import AdminPage from "./AdminPage";
import HomePage from "./HomePage";
import "./styles/LoginPage.css";

function LoginForm({ handleLogin, showRegistrationForm }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Kullanıcı girişi için API çağrısı
      const response = await axios.post("http://localhost:4000/login", {
        username,
        password,
      });

      if (response.data === "admin") {
        // Eğer kullanıcı admin ise admin sayfasını aç
        handleLogin("admin");
      } else {
        // Diğer durumlarda ana sayfayı aç
        handleLogin("user");
      }
    } catch (error) {
      console.error("Giriş hatası:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>LOGIN</h2>
      <div>
        <label>User Name:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">LOGIN</button>
      <p>
        Not A member?{" "}
        <button type="button" onClick={showRegistrationForm}>
          Kaydol
        </button>
      </p>
    </form>
  );
}

function RegistrationForm({ handleLogin, showLoginForm }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Kullanıcı kaydı için API çağrısı
      const response = await axios.post("http://localhost:4000/register", {
        username,
        password,
        email,
      });

      if (response.data === "success") {
        // Kayıt başarılıysa giriş yap ve ana sayfayı aç
        handleLogin("user");
      } else {
        console.error("Kayıt hatası:", response.data);
      }
    } catch (error) {
      console.error("Kayıt hatası:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>SIGN UP</h2>
      <div>
        <label>User Name:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>E-mail:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="submit">Üye Ol</button>
      <p>
        Already Have An Account?{" "}
        <button type="button" onClick={showLoginForm}>
          LOGIN{" "}
        </button>
      </p>
    </form>
  );
}

function LoginPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");
  const [loginFormVisible, setLoginFormVisible] = useState(true);

  const handleLogin = (type) => {
    setLoggedIn(true);
    setUserType(type);
  };

  const showRegistrationForm = () => {
    setLoginFormVisible(false);
  };

  const showLoginForm = () => {
    setLoginFormVisible(true);
  };

  if (loggedIn) {
    // Eğer kullanıcı giriş yapmışsa ve admin ise admin sayfasını aç
    if (userType === "admin") {
      return <AdminPage />;
    }

    // Diğer durumlarda ana sayfayı aç
    return <HomePage />;
  }

  return (
    <div>
      <div className="left-section">
        {/* Sol tarafta kullanıcı resmi */}
        <img src="/path/to/user-image.jpg" alt="User" />
      </div>
      <div className="right-section">
        {/* Giriş formu veya kayıt formu */}
        {loginFormVisible ? (
          <LoginForm
            handleLogin={handleLogin}
            showRegistrationForm={showRegistrationForm}
          />
        ) : (
          <RegistrationForm
            handleLogin={handleLogin}
            showLoginForm={showLoginForm}
          />
        )}
      </div>
    </div>
  );
}

export default LoginPage;
