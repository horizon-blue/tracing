import React, { PureComponent } from 'react';
import marked from 'marked';
import { Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class BlogContent extends PureComponent {
  static propTypes = {
    content: PropTypes.string.isRequired,
  };

  render() {
    return (
      <Container text textAlign="left">
        <main
          dangerouslySetInnerHTML={{ __html: marked(this.props.content) }}
        />
      </Container>
    );
  }
}

export default BlogContent;
