import { useState } from 'react';
import Navbar from '../src/components/Navbar';
import Auth from '../src/components/Auth';
import styles from '../app/LandingPage.module.css';
import { Typewriter } from 'react-simple-typewriter';
import ContactForm from '../src/components/ContactForm';


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
          <h1 className={styles.mainTitle}>MyPantryMan</h1>
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
      {!showAuth && (
        <div className={styles.additionalSections}>
          <div className={styles.sectionBox}>
            <div className={styles.contactSection}>
              <ContactForm />
            </div>
          </div>
          <div className={styles.sectionBox}>
            <h2>Features</h2>
            <ul className={styles.list}>
              <li>Real-Time Inventory Management with Firebase</li>
              <li>AI-Powered Recipe Suggestions with GroqAPI</li>
              <li>Multi-User Support</li>
              <li>Cloud Storage Integration</li>
              <li>Reliable and powerful authentication for Security</li>
              <li>Secure Contact Form for valid Customer Support</li>
              <li>Completely made with efficient Next.js and React</li>
              <li>Seamless Cross-Platform Access</li>
              <li>Advanced Analytics & Insights!</li>
            </ul>
          </div>
          <div className={styles.sectionBox}>
            <h2>About</h2>
            <p className='BoxDesc'>MyPantryMan is your ultimate kitchen assistant, designed to streamline pantry management and reduce food waste. With real-time inventory tracking powered by Firebase, youll always know what ingredients you have on hand, eliminating the need for last-minute grocery runs.

Our app goes beyond basic management by offering AI-driven recipe suggestions through GroqAPI, helping you create delicious meals with the items already in your pantry. Whether youre cooking for yourself or your family, MyPantryMan provides personalized recipe ideas tailored to your available ingredients.

MyPantryMan is built for modern households, featuring multi-user support and secure cloud storage, ensuring your data is accessible. With user-friendly design and robust security, it makes managing your kitchen easier.</p>
          </div>
        </div>
      )}
    </div>
  );
}; // Add closing curly brace here

export default LandingPage;