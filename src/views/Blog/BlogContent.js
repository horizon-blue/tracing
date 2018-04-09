import React, { PureComponent } from 'react';
import markdownIt from 'markdown-it';
import mk from 'markdown-it-katex';
import prism from 'markdown-it-prism';
import { Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './prism-atom-dark.css';

const md = markdownIt({ html: true, typographer: true, xhtmlOut: true })
  .use(mk)
  .use(prism);

class BlogContent extends PureComponent {
  static propTypes = {
    content: PropTypes.string.isRequired,
  };

  render() {
    return (
      <Container text textAlign="left">
        <main
          dangerouslySetInnerHTML={{ __html: md.render(this.props.content) }}
        />
      </Container>
    );
  }
}

export default BlogContent;
