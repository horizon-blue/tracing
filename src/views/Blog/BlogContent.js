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

/**
 * The component that renders blog post content (Markdown string) into
 * DOM nodes
 *
 * @class      BlogContent (name)
 */
class BlogContent extends PureComponent {
  static propTypes = {
    content: PropTypes.string.isRequired,
  };

  /**
   * Helper function to render content
   *
   * @param      {<type>}  text    The text
   * @return     {<type>}  { description_of_the_return_value }
   */
  static renderPost(text) {
    return md.render(text);
  }

  render() {
    return (
      <Container text textAlign="left">
        <main
          dangerouslySetInnerHTML={{
            __html: BlogContent.renderPost(this.props.content),
          }}
        />
      </Container>
    );
  }
}

export default BlogContent;
