import React, { PureComponent } from 'react';
import { Menu, Container, Visibility } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import actions from 'actions';
import Translated from '../Translated';
import './index.css';

const TranslatedNavLink = props => <Translated as={Link} {...props} />;

class Nav extends PureComponent {
  static propTypes = {
    toggleLocale: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
  };

  state = {
    fix: null,
  };

  hideFixedMenu = () => this.setState({ fixed: null });
  showFixedMenu = () => this.setState({ fixed: 'top' });

  render() {
    const activePath = this.props.location.pathname.split('/')[1];

    return (
      <Visibility
        as="nav"
        once={false}
        onTopPassed={this.showFixedMenu}
        onTopPassedReverse={this.hideFixedMenu}
      >
        <Menu inverted pointing secondary size="large" fixed={this.state.fixed}>
          <Container>
            <Menu.Item
              as={TranslatedNavLink}
              id="menuBlog"
              to="/blog"
              active={activePath === 'blog'}
            />
            <Menu.Item
              as={TranslatedNavLink}
              id="menuAbout"
              to="/about"
              active={activePath === 'about'}
            />
            <Menu.Menu position="right">
              <Menu.Item
                as={TranslatedNavLink}
                id="menuLogin"
                to="/login"
                active={activePath === 'login'}
              />
              <Translated
                as={Menu.Item}
                id="menuOtherLanguage"
                onClick={this.props.toggleLocale}
              />
            </Menu.Menu>
          </Container>
        </Menu>
      </Visibility>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  toggleLocale: () =>
    dispatch({
      type: actions.TOGGLE_LOCALE,
    }),
});

export default withRouter(connect(null, mapDispatchToProps)(Nav));
