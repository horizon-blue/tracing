import React, { PureComponent } from 'react';
import { Menu } from 'semantic-ui-react';

class Nav extends PureComponent {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <nav>
        <Menu inverted pointing secondary>
          <Menu.Item
            name="home"
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="messages"
            active={activeItem === 'messages'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="friends"
            active={activeItem === 'friends'}
            onClick={this.handleItemClick}
          />
        </Menu>
      </nav>
    );
  }
}

export default Nav;
