import React, { PureComponent } from 'react';
import { Header as SemHeader, Container } from 'semantic-ui-react';
import Translated from 'views/Translated';
import './index.css';
import gear2 from './assets/gear2.svg';

class Header extends PureComponent {
  render() {
    return (
      <Container as="header" textAlign="center">
        <SemHeader as="h1" inverted color="blue">
          <img src={gear2} alt="logo" className="header-logo" />
          <Translated
            as={SemHeader.Content}
            className="header-title"
            id="header"
          />
          <img src={gear2} alt="logo" className="header-logo" />
        </SemHeader>
      </Container>
    );
  }
}

export default Header;
