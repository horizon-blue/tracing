import React, { PureComponent } from 'react';
import { Container, Header, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

// static data used for render test
const post = {
  id: 1234,
  title: 'Foo Bar',
  author: {
    name: 'Xiaoyan',
  },
  href: 'foo-bar',
  createdAt: '2017-06-26T23:20:11',
  content: `
      # This is a Markdown Test
      See if you can render correctly

      - this one
      - and this one
    `,
};

class BlogPost extends PureComponent {
  static propTypes = {
    post: PropTypes.object.isRequired,
  };

  static defaultProps = {
    post,
  };

  render() {
    const { post } = this.props;

    return (
      <Container text as="article" className="blog-post" textAlign="center">
        <Header as="h2" inverted>
          {post.title}
        </Header>
        <div className="blog-post-meta">
          <span>
            <Icon name="user outline" />
            {post.author.name}
          </span>
          <span>
            <Icon name="calendar outline" />
            {post.createdAt.slice(0, 10)}
          </span>
        </div>
        <main>{post.content}</main>
      </Container>
    );
  }
}

export default BlogPost;
