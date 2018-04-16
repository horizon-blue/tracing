import React, { PureComponent } from 'react';
import {
  Container,
  Header,
  Icon,
  Divider,
  Label,
  Grid,
  Loader,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import BlogContent from './BlogContent';
import Translated from '../Translated';
import Comments from './Comments';

/**
 * The content to show on blog post page (for each post)
 *
 * @class      BlogPost (name)
 */
class BlogPost extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  /**
   * Render each tag as a DOM node
   *
   * @param      {String}  name    The name of the tag
   * @return     {Node}  The Node corresponds to the tag
   */
  renderTag({ node: tag }) {
    return (
      <Label basic color="blue" horizontal key={tag.id}>
        {tag.name}
      </Label>
    );
  }

  render() {
    const { data: { loading, error, post } } = this.props;

    return loading ? (
      <Loader inline="centered" size="big" inverted active={loading} />
    ) : !post ? (
      <div>{error}</div>
    ) : (
      <Container as="article" className="blog-post">
        <Container text as="section" textAlign="center">
          <Header as="h1" inverted>
            {post.title}
          </Header>
          <div className="blog-post-meta">
            <span>
              <Icon name="user outline" />
              {post.author.name}
            </span>
            <span>
              <Icon name="calendar outline" />
              {post.publishDate.slice(0, 10)}
            </span>
          </div>
        </Container>
        <BlogContent content={post.content} />
        <Divider inverted />
        <Container as="section">
          <Grid inverted divided padded columns="equal">
            <Grid.Row>
              <Grid.Column>
                <Translated id="tags" />: {post.tags.edges.map(this.renderTag)}
              </Grid.Column>
              <Grid.Column>
                <Translated id="category" />: {post.category.name}
              </Grid.Column>
              <Grid.Column>
                <Translated id="updatedAt" />:{' '}
                {post.lastUpdateDate.slice(0, 10)}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
        <Divider inverted />
        <Comments comments={post.comments.edges} />
      </Container>
    );
  }
}

const getPost = gql`
  query($postId: ID!) {
    post(id: $postId) {
      id
      title
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
      lastUpdateDate
      content
      comments {
        edges {
          node {
            id
            author {
              id
              name
              avatar
            }
            createDate
            content
          }
        }
      }
    }
  }
`;

export { BlogPost as BlogPostView };

export default graphql(getPost, {
  options: ({ match }) => ({ variables: match.params }),
})(BlogPost);
