import React, { PureComponent } from 'react';
import { Container, Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import ErrorMessage from '../ErrorMessage';
import Translated from '../Translated';
import './index.less';

class Login extends PureComponent {
  static propTypes = {
    mutate: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    password: '',
  };

  /**
   * Update the current value in the input field to the state
   *
   * @param      {event}  the event being triggered
   */
  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });

  handleLogin = () => {
    const { name, password } = this.state;

    this.props
      .mutate({ variables: { name, password } })
      .then(({ data: { login: token } }) => console.log(token))
      .catch(error => this.setState({ error }));
  };

  render() {
    const { name, password, error } = this.state;

    return (
      <Container text as="main" textAlign="center">
        <Form inverted className="login-form">
          <Form.Group widths="equal">
            <Form.Field>
              <Translated as="label" id="name" />
              <input value={name} name="name" onChange={this.handleChange} />
            </Form.Field>
            <Form.Field>
              <Translated as="label" id="password" />
              <input
                type="password"
                name="password"
                value={password}
                onChange={this.handleChange}
              />
            </Form.Field>
          </Form.Group>
          <Translated
            as={Form.Button}
            inverted
            basic
            color="blue"
            type="submit"
            id="login"
            onClick={this.handleLogin}
          />
        </Form>
        {!!error && <ErrorMessage value={error} />}
      </Container>
    );
  }
}

const loginMutation = gql`
  mutation($name: String!, $password: String!) {
    login(name: $name, password: $password) {
      token
    }
  }
`;

export default graphql(loginMutation)(Login);
