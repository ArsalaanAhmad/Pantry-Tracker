import { useState } from 'react';
import Navbar from '../src/components/Navbar';
import Auth from '../src/components/Auth';
import styles from '../app/LandingPage.module.css';

const LandingPage = () => {
  const [showAuth, setShowAuth] = useState(false);

  const handleSignInClick = () => {
    setShowAuth(true);
  };

  return (
    <div className={styles.container}>
      <Navbar />
      {showAuth ? (
        <Auth />
      ) : (
        <div className={styles.mainContent}>
          <h1 className={styles.mainTitle}>Welcome to Pantry Pie</h1>
          <p className={styles.Description}>Your ultimate pantry management tool.</p>
          <button className={styles.signInButton} onClick={handleSignInClick}>Sign In</button>
        </div>
      )}
    </div>
  );
};

export default LandingPage;