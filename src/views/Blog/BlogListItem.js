import React from 'react';
import { Container, Grid, Header, Label } from 'semantic-ui-react';

const { Row, Column: Col } = Grid;

const BlogListItem = post => (
  <Container as="section" key={post.id} className="blog-list">
    <Grid inverted>
      <Row>
        <Col width={10}>
          <Header inverted as="h2">
            {post.title}
          </Header>
        </Col>
        <Col width={4} floated="right" textAlign="right">
          {post.tags.map(name => (
            <Label basic color="blue" horizontal key={name}>
              {name}
            </Label>
          ))}
        </Col>
      </Row>
    </Grid>
  </Container>
);

export default BlogListItem;
