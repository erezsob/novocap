// @flow
import React from 'react';
import CloudUploadIcon from 'material-ui-icons/CloudUpload';
import styles from './styles.css';
import { roundedWhiteBox, extraPadding } from './../styles.css';

export default function LogoUploader() {
  return (
    <div className={extraPadding}>
      <div className={roundedWhiteBox}>
        <div className={styles.dashedBox}>
          <CloudUploadIcon className={styles.cloudLogo} />
          <span className={styles.text1}>Drag & Drop your logo here!</span>
          <span className={styles.text2}>or</span>
          <span className={styles.text3}>browse your computer</span>
        </div>
      </div>
    </div>
  );
}
