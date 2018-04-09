import React, { PureComponent } from 'react';
import { Menu, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
          <Translated
            as={Menu.Item}
            id="menuBlog"
            name="blog"
            active={activeItem === 'blog'}
            onClick={this.handleItemClick}
          />
          <Menu.Menu position="right">
            <Translated
              as={Menu.Item}
              id="menuLogin"
              name="login"
              active={activeItem === 'login'}
              onClick={this.handleItemClick}
            />
            <Translated
              as={Menu.Item}
              id="menuOtherLanguage"
              name="language"
              active={activeItem === 'language'}
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
