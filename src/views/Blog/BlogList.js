import React, { PureComponent } from 'react';
import { Container } from 'semantic-ui-react';
import { List } from 'immutable';
import PropTypes from 'prop-types';
import BlogListItem from './BlogListItem';

// static data used for render test
const posts = [
  {
    id: 1234,
    title: 'Foo Bar',
    excerpt: 'This is an excerpt',
    tags: ['test', 'blah'],
    category: 'journal',
    createdAt: '2017-06-26T23:20:11',
  },
  {
    id: 124,
    title: '测试',
    excerpt: 'something to test',
    tags: ['test'],
    category: 'journal',
    createdAt: '2018-01-04T22:18:25Z',
  },
];

class BlogList extends PureComponent {
  static propTypes = {
    posts: PropTypes.instanceOf(List),
  };

  static defaultProps = {
    posts: List(posts),
  };

  render() {
    const { posts } = this.props;

    return <Container as="main">{posts.map(BlogListItem)}</Container>;
  }
}

export default BlogList;
