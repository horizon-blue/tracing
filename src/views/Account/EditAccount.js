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
    mutate: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  };

  /**
   * Initialize current account info form
   *
   * @param      {Object}  nextProps  The next properties
   * @param      {Object}  prevState  The previous state
   * @return     {Object}  The derived state from properties.
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.data.viewer) {
      const { data: { viewer: { name, email, avatar } } } = nextProps;
      return { ...prevState, name, email, avatar };
    } else return prevState;
  }

  state = {
    name: '',
    email: '',
    avatar: '',
    newPassword: '',
    confirmPassword: '',
  };

  /**
   * Update the current value in the input field to the state
   *
   * @param      {event}  the event being triggered
   */
  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });

  /**
   * check if form value are correct before submit
   */
  validateForm = (resolve, reject) => {
    if (this.state.newPassword !== this.state.confirmPassword)
      reject("Passwords don't match");
    if (!this.state.email.includes('@')) reject('Invalid email');
    resolve();
  };

  /**
   * Submit the current form value
   */
  handleSubmit = () => {
    this.setState({ loading: true });
    const { name, email, newPassword: password, avatar } = this.state;

    new Promise(this.validateForm)
      .then(() =>
        this.props.mutate({ variables: { name, password, email, avatar } })
      )
      .then(() => this.props.history.push('/account'))
      .catch(error => this.setState({ error, loading: false }));
  };

  render() {
    const { data: { loading, error, viewer } } = this.props;

    if (loading) return <Loading />;

    if (error) return <ErrorMessage value={error} />;

    if (!viewer) return <Redirect to="/account" />;

    const { name, email, newPassword, confirmPassword, avatar } = this.state;

    return (
      <Container text as="main" className="account-editor" textAlign="center">
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
          <Form.Group widths="equal">
            <Form.Field>
              <Translated as="label" id="newPassword" />
              <input
                value={newPassword}
                name="newPassword"
                onChange={this.handleChange}
                type="password"
              />
            </Form.Field>
            <Form.Field>
              <Translated as="label" id="confirmPassword" />
              <input
                value={confirmPassword}
                name="confirmPassword"
                onChange={this.handleChange}
                type="password"
              />
            </Form.Field>
          </Form.Group>
          <Form.Field>
            <Translated as="label" id="avatar" />
            <input value={avatar} name="avatar" onChange={this.handleChange} />
          </Form.Field>
          <Translated
            as={Form.Button}
            id="submit"
            inverted
            basic
            color="blue"
            onClick={this.handleSubmit}
          />
        </Form>
        {this.state.error && <ErrorMessage value={error} />}
        {this.state.loading && <Loading />}
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

const editAccountMutation = gql`
  mutation($name: String!, $password: String, $avatar: String, $email: String) {
    setUser(name: $name, password: $password, avatar: $avatar, email: $email) {
      user {
        id
        name
        avatar
        email
      }
    }
  }
`;

export default graphql(editAccountMutation)(graphql(viewerInfo)(EditAccount));
