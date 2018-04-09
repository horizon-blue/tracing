import React, { PureComponent } from 'react';
import { Container, Grid, Header, Label, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Translated from 'views/Translated';

const { Row, Column: Col } = Grid;

class BlogListItem extends PureComponent {
  static propTypes = {
    post: PropTypes.object.isRequired,
  };

  renderTag(name) {
    return (
      <Label basic color="blue" horizontal key={name}>
        {name}
      </Label>
    );
  }

  render() {
    const { post } = this.props;

    return (
      <Link to={`/blog/${post.href}`}>
        <Container as="section" className="blog-list">
          <Grid inverted>
            <Row>
              <Col computer={12} mobile={16}>
                <Header inverted as="h2">
                  {post.title}
                </Header>
              </Col>
              <Col
                computer={4}
                mobile={16}
                floated="right"
                className="tag-container"
              >
                {post.tags.map(this.renderTag)}
              </Col>
            </Row>
            <Row>
              <Col>
                <summary>{post.excerpt}</summary>
              </Col>
            </Row>
            <Row>
              <Col>
                <div>
                  <Translated
                    as="span"
                    id="blogPostedAt"
                    variables={{
                      name: post.author.name,
                      date: post.createdAt.slice(0, 10),
                    }}
                  />
                  <span className="blog-meta-divider">|</span>
                  <i>{post.category}</i>
                </div>
              </Col>
            </Row>
          </Grid>
        </Container>
      </Link>
    );
  }
}

export default BlogListItem;
