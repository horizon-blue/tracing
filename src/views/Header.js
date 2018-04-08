import React, { PureComponent } from 'react';
import gear1 from './assets/gear1.svg';
import gear2 from './assets/gear2.svg';

class Header extends PureComponent {
    render() {
        return (
            <div>
                <img src={gear1} alt="logo" className="header-logo" />
                <img src={gear2} alt="logo" className="header-logo" />
            </div>
        );
    }
}

export default Header;
