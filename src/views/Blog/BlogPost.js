import React, { PureComponent } from 'react';
import { Container, Header, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import BlogContent from './BlogContent';

// static data used for render test
const post = {
  id: 1234,
  title: 'Foo Bar',
  author: {
    name: 'Xiaoyan',
  },
  href: 'foo-bar',
  createdAt: '2017-06-26T23:20:11',
  content: `
## This is a Markdown Test

See if this can be *rendered* **correctly**

- This one
- And This one

![test img](/favicon.png)

### Inline HTML

<i style="color:orange;">I should be orange</i>

<iframe width="560" height="315"
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

print gradients d(out)/dx
  `,
};

class BlogPost extends PureComponent {
  static propTypes = {
    post: PropTypes.object.isRequired,
  };

  static defaultProps = {
    post,
  };

  render() {
    const { post } = this.props;

    return (
      <Container text as="article" className="blog-post" textAlign="center">
        <Header as="h2" inverted>
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
        <BlogContent content={post.content} />
      </Container>
    );
  }
}

export default BlogPost;
