// @flow
import React from 'react';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormControlLabel } from 'material-ui/Form';
import styles from './styles';
import css from './styles.css';
import { RANGES } from '../../constants';

type Props = {
  handleChange: Function,
  selected: string
};

export default function TimeFrameControls({ handleChange, selected }: Props) {
  return (
    <div className={css.controls}>
      <RadioGroup
        aria-label="range"
        name="range"
        value={selected}
        onChange={handleChange}
        style={styles.root}
      >
        <FormControlLabel
          value={RANGES.WEEKLY}
          control={<Radio />}
          label="Weekly"
        />
        <FormControlLabel
          value={RANGES.DAILY}
          control={<Radio />}
          label="Daily"
        />
        <FormControlLabel
          value={RANGES.MONTHLY}
          control={<Radio />}
          label="Monthly"
        />
      </RadioGroup>
    </div>
  );
}
