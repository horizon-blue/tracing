import React from 'react';
import { BlogListView } from '../views/Blog/BlogList';
import renderer from 'react-test-renderer';
import store from '../store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

it('renders loading', () => {
  const tree = renderer
    .create(<BlogListView data={{ loading: true }} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

const posts = {
  edges: [
    {
      node: {
        id: 1234,
        title: 'Foo Bar',
        author: {
          name: 'Xiaoyan',
        },
        excerpt: 'This is an excerpt',
        tags: {
          edges: [{ node: { id: 1233, name: '标签' } }],
        },
        category: {
          name: 'journal',
          href: 'journal',
        },
        publishDate: '2017-06-26T23:20:11',
      },
    },
    {
      node: {
        id: 124,
        title: '测试',
        author: {
          name: 'Xiaoyan',
        },
        excerpt:
          'something to test. The quick brown fox jumps over the lazy dog the quick brown fox jumps over the lazy dog.',
        tags: {
          edges: [{ node: { id: 133, name: 'test' } }],
        },
        category: {
          name: 'journal',
          href: 'journal',
        },
        publishDate: '2018-01-04T22:18:25Z',
      },
    },
  ],
};

it('render with content', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <BrowserRouter>
          <BlogListView data={{ loading: false, posts }} />
        </BrowserRouter>
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
