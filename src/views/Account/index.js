import React, { PureComponent } from 'react';
import { Container, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { graphql } from 'react-apollo';
import Loading from '../Loading';
import ErrorMessage from '../ErrorMessage';
import Translated from '../Translated';
import actions from '../../actions';
import './index.less';

class Account extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    token: PropTypes.string,
    removeToken: PropTypes.func.isRequired,
  };

  render() {
    const { data: { loading, error }, token } = this.props;

    if (!token) return <Redirect to="/" />;

    if (loading) return <Loading />;

    if (error) return <ErrorMessage value={error} />;

    return (
      <Container as="main" textAlign="center" className="account-page">
        <Translated
          inverted
          as={Button}
          id="logout"
          basic
          color="blue"
          onClick={this.props.removeToken}
        />
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
    }
  }
`;

const mapStateToProps = state => ({ token: state.token });

const mapDispatchToProps = dispatch => ({
  removeToken: token =>
    dispatch({
      type: actions.REMOVE_TOKEN,
      token,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  graphql(viewerInfo)(Account)
);
