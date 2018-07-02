// @flow
import * as React from 'react';
import Grid from 'material-ui/Grid';
import { SectionTitle } from './../';
import styles from './styles.css';

type Props = {
  title: string,
  children: React.Node
};

function Section({ title, children }: Props) {
  return (
    <div className={styles.container}>
      <Grid container spacing={24} justify={'center'}>
        <Grid item xs={12}>
          <SectionTitle title={title} />
        </Grid>
        {children}
      </Grid>
    </div>
  );
}

export default Section;
