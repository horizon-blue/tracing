import React, { PureComponent } from 'react';
import { Container, Form } from 'semantic-ui-react';
import Translated from '../Translated';
import './index.less';

class Login extends PureComponent {
  render() {
    return (
      <Container text as="main" textAlign="center">
        <Form inverted className="login-form">
          <Form.Group widths="equal">
            <Form.Field>
              <Translated as="label" id="username" />
              <input />
            </Form.Field>
            <Form.Field>
              <Translated as="label" id="password" />
              <input type="password" />
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
