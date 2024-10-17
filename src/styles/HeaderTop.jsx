import React from 'react';
import facebookIcon from '../assets/facebook.svg';
import instagramIcon from '../assets/instagram.svg';
import linkedinIcon from '../assets/linkedin.svg';
import notionIcon from '../assets/notion.svg';
import spotifyIcon from '../assets/spotify.svg';

const HeaderTop = () => (
  <div style={styles.headerTop}>
    <div style={styles.icons}>
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <img src={facebookIcon} alt="Facebook" style={styles.icon} />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
        <img src={instagramIcon} alt="Instagram" style={styles.icon} />
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
        <img src={linkedinIcon} alt="LinkedIn" style={styles.icon} />
      </a>
      <a href="https://notion.so" target="_blank" rel="noopener noreferrer">
        <img src={notionIcon} alt="Notion" style={styles.icon} />
      </a>
      <a href="https://spotify.com" target="_blank" rel="noopener noreferrer">
        <img src={spotifyIcon} alt="Spotify" style={styles.icon} />
      </a>
    </div>
  </div>
);

const styles = {
  headerTop: {
    backgroundColor: '#ffffff', // 預設背景為白色
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #ddd' // 增加底部邊框以區分區塊
  },
  title: {
    margin: 0 // 確保標題沒有額外的外邊距
  },
  icons: {
    display: 'flex',
    marginLeft: 'auto' // 將圖標移到右邊
  },
  icon: {
    width: '24px',
    height: '24px',
    marginLeft: '10px'
  }
};

export default HeaderTop;