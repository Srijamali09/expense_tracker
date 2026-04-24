import { useState } from 'react';
import { login } from '../api';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      localStorage.setItem('token', res.data.token);
      window.location.href = '/dashboard';
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Welcome back 👋</h2>
        <p>Login to your expense tracker</p>
        {error && <div className="error-msg">{error}</div>}
        <form onSubmit={handleLogin}>
          <input className="auth-input" type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className="auth-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button className="btn-primary" type="submit">Login →</button>
        </form>
        <div className="auth-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;