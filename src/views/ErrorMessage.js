import React, { PureComponent } from 'react';
import { Message, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/**
 * Display error message using correct format
 *
 * @class      ErrorMessage (name)
 */
class ErrorMessage extends PureComponent {
  static propTypes = {
    value: PropTypes.object.isRequired,
  };

  render() {
    const { value: error } = this.props;

    return (
      <Container textAlign="center">
        <Message color="black">{error.message}</Message>
      </Container>
    );
  }
}

export default ErrorMessage;
