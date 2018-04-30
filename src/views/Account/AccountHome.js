import React, { PureComponent } from 'react';
import { Container, Button, Grid, Image, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { graphql } from 'react-apollo';
import Loading from '../Loading';
import ErrorMessage from '../ErrorMessage';
import Translated from '../Translated';
import DateView from '../DateView';
import actions from '../../actions';

const { Column: Col, Row } = Grid;

/**
 * The page that displays all basic account info
 *
 * @class      AccountHome (name)
 */
class AccountHome extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    token: PropTypes.string,
    removeToken: PropTypes.func.isRequired,
  };

  componentDidUpdate() {
    const { data: { loading, viewer }, removeToken } = this.props;

    if (!loading && !viewer) {
      removeToken();
    }
  }

  render() {
    const { data: { loading, error, viewer }, token } = this.props;

    if (!token) return <Redirect to="/" />;

    if (loading) return <Loading />;

    if (error) return <ErrorMessage value={error} />;

    if (!viewer) return <Redirect to="/login" />;

    return (
      <Container as="main" textAlign="center" className="account-page">
        <Grid>
          <Row centered>
            <Col computer={2} tablet={4} mobile={7}>
              <Image src={viewer.avatar} rounded />
            </Col>
            <Col
              computer={5}
              tablet={7}
              mobile={13}
              verticalAlign="middle"
              textAlign="left"
              className="account-info"
            >
              <Row>
                <Header inverted as="h3">
                  {viewer.name}
                  {viewer.isAdmin && (
                    <span className="admin-label">
                      (<Translated id="admin" />)
                    </span>
                  )}
                </Header>
              </Row>
              <Row>
                <Translated id="email" />:{' '}
                {viewer.email || <Translated id="none" />}
              </Row>
              <Row>
                <Translated id="joinedAt" />:{' '}
                <DateView value={viewer.createdDate} />
              </Row>
            </Col>
          </Row>
        </Grid>
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
      email
      createdDate
      isAdmin
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

export { AccountHome as AccountHomeView };

export default connect(mapStateToProps, mapDispatchToProps)(
  graphql(viewerInfo)(AccountHome)
);
