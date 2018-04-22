import React, { PureComponent } from 'react';
// import Translated from 'views/Translated';
import { Range } from 'immutable';
import './index.less';
import gear1 from './assets/gear1.svg';
import gear2 from './assets/gear2.svg';

const gears = [gear1, gear2];
/**
 * A helper function that generates a integer in [min, max).
 *
 * @param      {int}  min     The minimum number (inclusive)
 * @param      {int}  max     The maximum number (exclusive)
 * @return     {int}  the integer within [min, max)
 */
const randInt = (min, max) =>
  min + Math.floor(Math.random() * Math.floor(max - min));

const GEAR_IDXS = Range(0, randInt(10, 13));
const GEAR_IDXS_SHUFFLED = GEAR_IDXS.sortBy(Math.random);
const BACKGROUND = GEAR_IDXS.map(idx => (
  <img
    src={gears[randInt(0, 2)]}
    key={idx}
    alt="gear icon"
    className={[
      'header-logo',
      randInt(0, 2) ? 'clockwise' : 'counter-clockwise',
    ].join(' ')}
    style={{
      height: randInt(27, 50) + 'vh',
      left: 5 + 75 * idx / GEAR_IDXS.size + '%',
      top: 5 + 75 * GEAR_IDXS_SHUFFLED.get(idx) / GEAR_IDXS.size + '%',
      filter: `
        hue-rotate(${randInt(355, 365)}deg)
        brightness(${randInt(70, 100)}%)
        saturate(${randInt(100, 130)}%)
        opacity(${randInt(90, 100)}%)
      `,
    }}
  />
));

/**
 * The Header that appears at the top of the website
 *
 * @class      Header (name)
 */
class Header extends PureComponent {
  render() {
    return <header>{BACKGROUND}</header>;
  }
}

export default Header;
