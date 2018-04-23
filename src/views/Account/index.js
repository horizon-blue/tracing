import React, { PureComponent } from 'react';
import { Container } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class Account extends PureComponent {
  render() {
    console.log(this.props);
    return <div>foo</div>;
  }
}

const viewerInfo = gql`
  {
    viewer {
      id
      name
    }
  }
`;

export default graphql(viewerInfo)(Account);
