import React, { PureComponent } from 'react';
import { Menu, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import actions from 'actions';
import Translated from './Translated';

const TranslatedNavLink = props => <Translated as={Link} {...props} />;

class Nav extends PureComponent {
  static propTypes = {
    toggleLocale: PropTypes.func.isRequired,
  };

  state = {};

  handleItemClick = (e, { id }) => this.setState({ activeItem: id });

  render() {
    const { activeItem } = this.state;

    return (
      <Container as="nav">
        <Menu inverted pointing secondary size="large">
          <Menu.Item
            as={TranslatedNavLink}
            active={activeItem === 'menuBlog'}
            onClick={this.handleItemClick}
            id="menuBlog"
            to="/blog"
          />
          <Menu.Menu position="right">
            <Menu.Item
              as={TranslatedNavLink}
              active={activeItem === 'menuLogin'}
              onClick={this.handleItemClick}
              id="menuLogin"
              to="/login"
            />
            <Translated
              as={Menu.Item}
              id="menuOtherLanguage"
              onClick={this.props.toggleLocale}
            />
          </Menu.Menu>
        </Menu>
      </Container>
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
