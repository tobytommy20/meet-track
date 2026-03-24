import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/login.css";
import logo from "../style/logo.png"


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  /*const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");
    } else {
      alert("Please enter both email and password.");
    }*/




  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://207.180.246.69:7200/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const result = await res.json();
      console.log("Login response:", result);

      if (!res.ok || !result.isSuccessful) {
        throw new Error(
          result.message || "Login failed. Please check your credentials. "
        );
      }
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", result.data.role);
    
      navigate("/admin/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="login-page">
      <div className="login-header">
          <img src={logo} alt="logo" className="logo"/>  
        <h1> MeetTrack</h1>
        <p>Sign in to create meetings</p>
      </div>

      <div className="login-card">
        <form className="login-form" onSubmit={handleLogin}>
          {error && <p className="error-message">{error}</p>}

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" 
          disabled={loading} 
          className="login-btn">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>

      <footer>© 2026 SoftWorks. All rights reserved.</footer>
    </div>
  );
}

export default Login;
