// src/components/SkinnyFooter.jsx
import React from 'react';
import facebookIcon from '../assets/facebook.svg';
import instagramIcon from '../assets/instagram.svg';
import linkedinIcon from '../assets/linkedin.svg';
import notionIcon from '../assets/notion.svg';
import spotifyIcon from '../assets/spotify.svg';

const SkinnyFooter = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.left}>
        <p>© 2024 小保. All rights reserved.</p>
      </div>
      <div style={styles.icons}>
        <a href="https://www.facebook.com/chihpaoo/?locale=zh_TW" target="_blank" rel="noopener noreferrer">
          <img src={facebookIcon} alt="Facebook" style={styles.icon} />
        </a>
        <a href="https://www.instagram.com/bobbie__moel" target="_blank" rel="noopener noreferrer">
          <img src={instagramIcon} alt="Instagram" style={styles.icon} />
        </a>
        <a href="https://www.linkedin.com/in/chihpao-chang-1745a423a" target="_blank" rel="noopener noreferrer">
          <img src={linkedinIcon} alt="LinkedIn" style={styles.icon} />
        </a>
        <a href="https://chihpao.notion.site/" target="_blank" rel="noopener noreferrer">
          <img src={notionIcon} alt="Notion" style={styles.icon} />
        </a>
        <a href="https://open.spotify.com/show/2gMSpNkgeKlE2Nyu8Ru4gw?si=17941dfb650a48eb" target="_blank" rel="noopener noreferrer">
          <img src={spotifyIcon} alt="Spotify" style={styles.icon} />
        </a>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '10px',
    backgroundColor: '#ffffff',
    zIndex: 10,
    position: 'relative',
  },
  left: {
    textAlign: 'left',
  },
  icons: {
    display: 'flex',
  },
  icon: {
    width: '24px',
    height: '24px',
    marginLeft: '10px',
  },
}

export default SkinnyFooter;