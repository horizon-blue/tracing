import React, { PureComponent } from 'react';
import {
  Container,
  Header,
  Icon,
  Divider,
  Label,
  Grid,
} from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import BlogContent from './BlogContent';
import Translated from '../Translated';
import Comments from './Comments';
import Loading from '../Loading';
import ErrorMessage from '../ErrorMessage';
import DateView from '../DateView';

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

    if (loading) return <Loading />;

    if (error) return <ErrorMessage value={error} />;

    if (!post) return <Redirect to="/blog" />;

    return (
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
              <DateView value={post.publishDate} />
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
                <DateView value={post.lastUpdateDate} />
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
    viewer {
      id
      isAdmin
    }
  }
`;

export { BlogPost as BlogPostView };

export default graphql(getPost, {
  options: ({ match }) => ({ variables: match.params }),
})(BlogPost);
