import React, { PureComponent } from 'react';
import { Menu, Container, Visibility } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import actions from 'actions';
import Translated from 'views/Translated';
import './index.css';

/**
 * A shorthand that combine link and translation into a single component
 *
 * @class      TranslatedNavLink (name)
 */
const TranslatedNavLink = props => <Translated as={Link} {...props} />;

/**
 * The Navigation bar that enable user to navigate across pages
 *
 * @class      Nav (name)
 */
class Nav extends PureComponent {
  static propTypes = {
    toggleLocale: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
  };

  state = {
    fix: null,
  };

  /**
   * Cancel menu fixed property
   */
  hideFixedMenu = () => this.setState({ fixed: null });

  /**
   * Fix the menu on top of the page
   */
  showFixedMenu = () => this.setState({ fixed: 'top' });

  render() {
    const activePath = this.props.location.pathname.split('/')[1];

    return (
      <nav>
        <Visibility
          once={false}
          onTopPassed={this.showFixedMenu}
          onTopPassedReverse={this.hideFixedMenu}
        >
          <Menu
            inverted
            pointing
            secondary
            size="large"
            fixed={this.state.fixed}
          >
            <Container className="nav-menu">
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
        {this.state.fixed && <Menu inverted pointing secondary size="large" />}
      </nav>
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
