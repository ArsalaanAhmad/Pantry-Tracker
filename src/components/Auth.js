import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../../app/firebase'; // Update this path according to your directory structure
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import styles from '../../app/Auth.module.css'; // Make sure this file exists and contains the styles
import { useSpring, animated } from '@react-spring/web';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const router = useRouter();

  const animation = useSpring({
    from: { transform: 'scale(0.5)', opacity: 0 },
    to: { transform: 'scale(1)', opacity: 1 },
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push('/app');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <animated.div style={animation} className={styles.authContainer}>
      <form onSubmit={handleSubmit} className={styles.authForm}>
        <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
        <div className={styles.formGroup}>
          <label>Email address</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>
            <input type="checkbox" /> Remember me
          </label>
        </div>
        <button type="submit" className={styles.submitButton}>Submit</button>
        {error && <p className={styles.error}>{error}</p>}
        <p>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <span onClick={() => setIsSignUp(!isSignUp)} className={styles.switchText}>
            {isSignUp ? ' Sign In' : ' Sign Up'}
          </span>
        </p>
      </form>
      </animated.div>
  );
};

export default Auth;