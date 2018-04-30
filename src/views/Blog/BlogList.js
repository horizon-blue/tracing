import React, { PureComponent } from 'react';
import { Container } from 'semantic-ui-react';
import { Seq } from 'immutable';
import PropTypes from 'prop-types';
import BlogListItem from './BlogListItem';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo';
import Loading from '../Loading';
import ErrorMessage from '../ErrorMessage';

/**
 * The content to shows on the blog list page
 *
 * @class      BlogList (name)
 */
class BlogList extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    query: PropTypes.string,
  };

  /**
   * Given each post, render it as an entry in the blog list
   *
   * @param      {object}  post    The post
   * @return     {Node}  the rendered React component
   */
  renderPostItem({ node: post }) {
    return <BlogListItem key={post.id} post={post} />;
  }

  render() {
    const { data: { loading, posts, error } } = this.props;

    if (loading) return <Loading />;

    if (error) return <ErrorMessage value={error} />;

    return (
      <Container as="main">
        {Seq(posts.edges)
          .reverse()
          .map(this.renderPostItem)}
      </Container>
    );
  }
}

const postField = `
edges {
  node {
    id
    title
    excerpt
    category {
      id
      name
    }
    tags {
      edges {
        node {
          id
          name
        }
      }
    }
    author {
      id
      name
    }
    publishDate
  }
}`;

const getPostWithTag = gql`
query ($tagId: ID!){
  tag(id: $tagId) {
    posts {
      ${postField}
    }
  }
}
`;

const getPostWithCategory = gql`
query ($categoryId: ID!){
  category(id: $categoryId) {
    posts {
      ${postField}
    }
  }
}
`;

const getAllPosts = gql`
  query($query: String) {
    posts(query: $query) {
      ${postField}
    }
  }
`;

export { BlogList as BlogListView };
export default withRouter(
  graphql(getPostWithCategory, {
    skip: ({ match: { params: { categoryId } } }) => !categoryId,
    options: ({ match: { params: { categoryId } } }) => ({
      variables: { categoryId },
    }),
    props: ({ data: { category, ...restData }, ...rest }) => ({
      ...rest,
      data: {
        ...restData,
        posts: category ? category.posts : { edges: [] },
      },
    }),
  })(
    graphql(getPostWithTag, {
      skip: ({ match: { params: { tagId } } }) => !tagId,
      options: ({ match: { params: { tagId } } }) => ({
        variables: { tagId },
      }),
      props: ({ data: { tag, ...restData }, ...rest }) => ({
        ...rest,
        data: {
          ...restData,
          posts: tag ? tag.posts : { edges: [] },
        },
      }),
    })(
      graphql(getAllPosts, {
        skip: ({ match: { params: { tagId, categoryId } } }) =>
          tagId || categoryId,
        options: ({ query }) => ({
          variables: { query },
        }),
      })(BlogList)
    )
  )
);
