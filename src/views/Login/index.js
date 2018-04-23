import React, { PureComponent } from 'react';
import { Container, Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ErrorMessage from '../ErrorMessage';
import Translated from '../Translated';
import actions from '../../actions';
import './index.less';

class Login extends PureComponent {
  static propTypes = {
    mutate: PropTypes.func.isRequired,
    setToken: PropTypes.func.isRequired,
    token: PropTypes.string,
    history: PropTypes.object.isRequired,
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
    const { setToken } = this.props;

    this.props
      .mutate({ variables: { name, password } })
      .then(({ data: { login: { token } } }) => setToken(token))
      .catch(error => this.setState({ error }));
  };

  render() {
    if (this.props.token) return <Redirect to="/" />;

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

const mapStateToProps = state => ({ token: state.get('token') });

const mapDispatchToProps = dispatch => ({
  setToken: token =>
    dispatch({
      type: actions.SET_TOKEN,
      token,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  graphql(loginMutation)(Login)
);
