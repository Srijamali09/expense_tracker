import { useState } from 'react';
import { signup } from '../api';
import { Link } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup({ email, password });
      window.location.href = '/login';
    } catch (err) {
      setError('Signup failed. Email may already exist.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create account ✨</h2>
        <p>Start tracking your expenses today</p>
        {error && <div className="error-msg">{error}</div>}
        <form onSubmit={handleSignup}>
          <input className="auth-input" type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className="auth-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button className="btn-primary" type="submit">Create Account →</button>
        </form>
        <div className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;