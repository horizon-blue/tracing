import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import BlogHome from './BlogHome';
import BlogPost from './BlogPost';
import './index.less';

/**
 * The Blog Section.
 *
 * @class      Blog (name)
 */
class Blog extends PureComponent {
  render() {
    return (
      <Switch>
        <Route exact path="/blog" component={BlogHome} />
        <Route path="/blog/post/:postId" component={BlogPost} />
      </Switch>
    );
  }
}

export default Blog;
