import React, { PureComponent } from 'react';
import { Container, Grid, Header, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Translated from 'views/Translated';

/**
 * Class for blog list item.
 *
 * @class      BlogListItem (name)
 */
class BlogListItem extends PureComponent {
  static propTypes = {
    post: PropTypes.object.isRequired,
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
    const { post } = this.props;

    return (
      <Link to={`/blog/${post.category.name}/${post.href}`}>
        <Container as="section" className="blog-list">
          <Grid inverted>
            <Grid.Row>
              <Grid.Column computer={12} mobile={16}>
                <Header inverted as="h2">
                  {post.title}
                </Header>
              </Grid.Column>
              <Grid.Column
                computer={4}
                mobile={16}
                floated="right"
                className="tag-container"
              >
                {post.tags.edges.map(this.renderTag)}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <summary>{post.excerpt}</summary>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <div>
                  <Translated
                    as="span"
                    id="blogPostedAt"
                    variables={{
                      name: post.author.name,
                      date: post.publishDate.slice(0, 10),
                    }}
                  />
                  <span className="blog-meta-divider">|</span>
                  <i>{post.category.name}</i>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Link>
    );
  }
}

export default BlogListItem;
