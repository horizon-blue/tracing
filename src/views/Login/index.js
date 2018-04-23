import React, { PureComponent } from 'react';
import { Container, Form } from 'semantic-ui-react';
import Translated from '../Translated';
import './index.less';

class Login extends PureComponent {
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

  render() {
    const { name, password } = this.state;

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
          />
        </Form>
      </Container>
    );
  }
}

export default Login;
