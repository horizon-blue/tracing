import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/zh-cn';

/**
 * Date visualization of the data that model contains.
 *
 * @class      DateView (name)
 */
class DateView extends PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    locale: PropTypes.string.isRequired,
  };

  /**
   * A helper function to parse the date
   *
   * @param      {string}  date    The date
   */
  static parse(date, locale) {
    moment.locale(locale);

    return moment
      .utc(date)
      .local()
      .format('LL');
  }

  render() {
    return <span>{DateView.parse(this.props.value, this.props.locale)}</span>;
  }
}

const mapStateToProps = state => ({ locale: state.locale });

export default connect(mapStateToProps)(DateView);
