import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Polyglot from 'node-polyglot';
import { connect } from 'react-redux';
import translations from './translations';

/**
 * A helper component that render translation with current locale setting from
 * redux store
 *
 * @class      Translated (name)
 */
class Translated extends PureComponent {
  static propTypes = {
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    id: PropTypes.string.isRequired,
    translator: PropTypes.instanceOf(Polyglot).isRequired,
    variables: PropTypes.object,
    defaultMessage: PropTypes.string,
  };

  static defaultProps = {
    as: 'span',
  };

  render() {
    const {
      id,
      locale,
      as: RenderElement,
      variables,
      defaultMessage,
      ...otherProps
    } = this.props;

    const translator =
      locale in translations ? translations[locale] : translations['en'];

    return (
      <RenderElement {...otherProps} dispatch={undefined}>
        {translator.t(id, variables) || defaultMessage}
      </RenderElement>
    );
  }
}

const mapStateToProps = state => ({ locale: state.get('locale') });

export default connect(mapStateToProps)(Translated);
