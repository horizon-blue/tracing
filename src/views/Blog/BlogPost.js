import React, { PureComponent } from 'react';
import {
  Container,
  Header,
  Icon,
  Divider,
  Label,
  Grid,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import BlogContent from './BlogContent';
import Translated from 'views/Translated';
import Comments from './Comments';

// static data used for render test
const post = {
  id: 1234,
  title: 'Foo Bar',
  author: {
    name: 'Xiaoyan',
  },
  href: 'foo-bar',
  createdAt: '2017-06-26T23:20:11',
  updatedAt: '2017-08-23T10:20:11',
  tags: ['test', '标签'],
  category: {
    name: 'journal',
  },
  content: `
## This is a Markdown Test

See if this can be *rendered* **correctly**

- This one
- And This one

![test img](/favicon.png)

### Inline HTML

<i style="color:orange;">I should be orange</i>

<iframe width="300" height="200"
src="https://www.youtube-nocookie.com/embed/ZXsQAXx_ao0?rel=0"
frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

### LaTeX

$$\\frac{1}{N}\\sum_{n=1}^{N}e^{n}$$

### Code Block

\`\`\`python
import antigravity

print("Hello, world")
\`\`\`

\`\`\`jsx
import React, { PureComponent } from 'react';
\`\`\`

## Jupyter Notebook

I didn't find any good Jupyter Notebook rendering library.
However, exporting Jupyter Notebook as Markdown works fairly
weel and renders properly.

e.g.

Gradients
---------
let's backprop now
\`\`out.backward()\`\` is equivalent to doing \`\`out.backward(torch.Tensor([1.0]))\`\`




\`\`\`python
out.backward()
\`\`\`

print gradients $\\frac{\\partial out}{\\partial x}$
`,
};

class BlogPost extends PureComponent {
  static propTypes = {
    post: PropTypes.object.isRequired,
  };

  static defaultProps = {
    post,
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
              {post.createdAt.slice(0, 10)}
            </span>
          </div>
        </Container>
        <BlogContent content={post.content} />
        <Divider inverted />
        <Container as="section">
          <Grid inverted divided padded columns="equal">
            <Grid.Row>
              <Grid.Column>
                <Translated id="tags" />: {post.tags.map(this.renderTag)}
              </Grid.Column>
              <Grid.Column>
                <Translated id="category" />: {post.category.name}
              </Grid.Column>
              <Grid.Column>
                <Translated id="updatedAt" />: {post.updatedAt.slice(0, 10)}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
        <Divider inverted />
        <Comments />
      </Container>
    );
  }
}

export default BlogPost;
