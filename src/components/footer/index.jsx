// @flow
import * as React from 'react';
import classnames from 'classnames/bind';
import styles from './styles.css';
import { LANGUAGES } from './../../constants';

type Props = {
  currentLanguage?: string
};

type LegalLink = {
  to: string,
  text: string
};

const cx = classnames.bind(styles);

export default function Footer({ currentLanguage = 'en' }: Props) {
  const legalLinks: Array<LegalLink> = [
    { to: '', text: 'Terms & Conditions' },
    { to: '', text: 'Imprint' },
    { to: '', text: 'Private Policy' },
    { to: '', text: 'Pricing' },
    { to: '', text: 'Support' },
    { to: 'http://www.orderbird.com', text: 'orderbird.com' }
  ];

  const renderLegalLink = (to: string, text: string): React.Element<'a'> => (
    <a className={styles.link} href={to} key={text}>
      {text}
    </a>
  );

  // TODO create a language-switcher component when support for other languages is implemented
  const renderLanguageLink = (
    to: string,
    text: string,
    currentLanguage: boolean
  ): React.Element<'a'> => {
    const classes = cx({ link: true, currentLang: currentLanguage });
    return (
      <a className={classes} href={to} key={text}>
        {text}
      </a>
    );
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.legal}>
        {legalLinks.map(({ to, text }) => renderLegalLink(to, text))}
      </div>
      <div className={styles.languages}>
        {LANGUAGES.map(({ to, text, code }) =>
          renderLanguageLink(to, text, currentLanguage === code)
        )}
      </div>
      <div className={styles.company}>
        <div>orderbird AG ©</div>
        <div>{new Date().getFullYear()}</div>
      </div>
    </footer>
  );
}
