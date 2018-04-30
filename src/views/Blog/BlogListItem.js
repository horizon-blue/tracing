import React, { PureComponent } from 'react';
import { Container, Grid, Header, Label } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Translated from '../Translated';
import DateView from '../DateView';

/**
 * Class for blog list item.
 *
 * @class      BlogListItem (name)
 */
class BlogListItem extends PureComponent {
  static propTypes = {
    post: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired,
  };

  /**
   * Render each tag as a DOM node
   *
   * @param      {String}  name    The name of the tag
   * @return     {Node}  The Node corresponds to the tag
   */
  renderTag({ node: tag }) {
    return (
      <Link to={`/blog/tag/${tag.id}`} key={tag.id}>
        <Label basic color="blue" horizontal>
          {tag.name}
        </Label>
      </Link>
    );
  }

  render() {
    const { post, locale } = this.props;

    return (
      <Container as="section" className="blog-list">
        <Grid inverted>
          <Grid.Row>
            <Grid.Column computer={12} mobile={16}>
              <Link to={`/blog/post/${post.id}`}>
                <Header inverted as="h2">
                  {post.title}
                </Header>
              </Link>
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
                    date: DateView.parse(post.publishDate, locale),
                  }}
                />
                <span className="blog-meta-divider">|</span>
                <Link to={`/blog/category/${post.category.id}`}>
                  <i>{post.category.name}</i>
                </Link>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => ({ locale: state.locale });

export default withRouter(connect(mapStateToProps)(BlogListItem));
