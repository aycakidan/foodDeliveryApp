import React, { useState } from "react";
import axios from "axios";
import AdminPage from "./AdminPage";
import HomePage from "./HomePage";
import "./styles/LoginPage.css";

function LoginForm({ handleLogin, showRegistrationForm }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Hata durumunda mesajı saklamak için state ekledik

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/members/login", {
        username: username,
        password: password,
      }, { withCredentials: true });

      if (response.data.success) {
        console.log("Login successful");
        localStorage.setItem('MemberId', response.data.memberId)

        if (username === "admin") {
          handleLogin("admin");
        } else {
          handleLogin("user");
        }
      } else {
        setError("Invalid username or password"); // Hatalı kullanıcı adı veya şifre durumunda hata mesajını güncelledik
      }
    } catch (error) {
      console.error("Giriş hatası:", error);
    }

    
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>
      <font size="10" color="black" face="verdana"> LOGIN </font>
      </h1>
      {error && <p className="error">{error}</p>} {/* Hata mesajını ekranda göstermek için */}
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
        Not A member?  {" "}
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
  const [error, setError] = useState("");

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username === "admin") {
      setError("Can not register as admin");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Email is not valid");
      return;
    }

    try {
      const uResponse = await axios.post("http://localhost:4000/members/username", {
        username: username,
      })

      const eResponse = await axios.post("http://localhost:4000/members/email", {
        email: email,
      })

      if (uResponse.data.success) {
        setError("Username is taken");
        return;
      }

      if (eResponse.data.success) {
        setError("Email is already registered");
        return;
      }

      await axios.post("http://localhost:4000/members", {
        username: username,
        password: password,
        email: email,
      }, { withCredentials: true });

      handleLogin("user");
      console.log("Registered user");
    } catch (error) {
      console.error("Kayıt hatası:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>SIGN UP</h2>
      {error && <p className="error">{error}</p>}
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
    if (userType === "admin") {
      return <AdminPage />;
    }

    return <HomePage />;
  }

  return (
    <div>
      
      <div className="right-section">
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
