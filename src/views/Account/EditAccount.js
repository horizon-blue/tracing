import React, { PureComponent } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import { Container, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Translated from '../Translated';
import Loading from '../Loading';
import ErrorMessage from '../ErrorMessage';

/**
 * The form, when submit, should change the user information
 *
 * @class      EditAccount (name)
 */
class EditAccount extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  state = {
    name: '',
    email: '',
  };

  /**
   * Update the current value in the input field to the state
   *
   * @param      {event}  the event being triggered
   */
  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });

  render() {
    const { data: { loading, error, viewer } } = this.props;

    if (loading) return <Loading />;

    if (error) return <ErrorMessage value={error} />;

    if (!viewer) return <Redirect to="/login" />;

    const { name, email } = this.state;

    return (
      <Container text as="main" className="account-editor">
        <Form inverted>
          <Form.Group widths="equal">
            <Form.Field required>
              <Translated as="label" id="name" />
              <input value={name} name="name" onChange={this.handleChange} />
            </Form.Field>
            <Form.Field>
              <Translated as="label" id="email" />
              <input value={email} name="email" onChange={this.handleChange} />
            </Form.Field>
          </Form.Group>
        </Form>
      </Container>
    );
  }
}

const viewerInfo = gql`
  {
    viewer {
      id
      name
      avatar
      email
    }
  }
`;

export default graphql(viewerInfo)(EditAccount);
