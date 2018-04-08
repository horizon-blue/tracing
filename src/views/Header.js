import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

class Header extends PureComponent {
    render() {
        return <div style={{ color: 'white' }}>{this.props.title}</div>;
    }
}

const mapStateToProps = state => ({ title: state.get('test') });

export default connect(mapStateToProps)(Header);
