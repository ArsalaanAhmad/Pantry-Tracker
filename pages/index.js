import { useState } from 'react';
import Navbar from '../src/components/Navbar';
import Auth from '../src/components/Auth';
import styles from '../app/LandingPage.module.css';
import { Typewriter } from 'react-simple-typewriter';

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
          <h1 className={styles.mainTitle}>Welcome to Pantry Pal</h1>
          <p className={styles.Description}>
            <Typewriter
              words={[
                "Your ultimate pantry management tool.",
                "Manage your items in real-time database storage.",
                "Get suggestions on what to make with my new AI feature."
              ]}
              loop={false}
              cursor
              cursorStyle="_"
              typeSpeed={40}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </p>
          <button className={styles.signInButton} onClick={handleSignInClick}>Sign In</button>
        </div>
      )}
    </div>
  );
};

export default LandingPage;