import React, { PureComponent } from 'react';
import { Menu, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import actions from 'actions';
import Translated from './Translated';

class Nav extends PureComponent {
  static propTypes = {
    toggleLocale: PropTypes.func.isRequired,
  };
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Container as="nav">
        <Menu inverted pointing secondary size="large">
          <Menu.Item
            name="blog"
            as="span"
            active={activeItem === 'blog'}
            onClick={this.handleItemClick}
          >
            <Translated id="menuBlog" as={Link} to="/blog" />
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item
              name="login"
              as="span"
              active={activeItem === 'login'}
              onClick={this.handleItemClick}
            >
              <Translated id="menuLogin" as={Link} to="/login" />
            </Menu.Item>
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

export default connect(null, mapDispatchToProps)(Nav);
