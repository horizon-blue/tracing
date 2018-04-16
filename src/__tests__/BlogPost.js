import React from 'react';
import { BlogPostView } from '../views/Blog/BlogPost';
import renderer from 'react-test-renderer';
import store from '../store';
import { Provider } from 'react-redux';

it('renders loading', () => {
  const tree = renderer
    .create(<BlogPostView data={{ loading: true }} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

const post = {
  id: 1234,
  title: 'Foo Bar',
  author: {
    name: 'Xiaoyan',
  },
  href: 'foo-bar',
  publishDate: '2017-06-26T23:20:11',
  lastUpdateDate: '2017-08-23T10:20:11',
  tags: {
    edges: [{ node: { id: 123, name: 'Test' } }],
  },
  category: {
    id: 'foo',
    name: 'journal',
  },
  comments: {
    edges: [],
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

it('render with content', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <BlogPostView data={{ loading: false, post }} />
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
