import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import BlogList from './BlogList';
import BlogPost from './BlogPost';
import './index.css';

class Blog extends PureComponent {
  render() {
    return (
      <Switch>
        <Route exact path="/blog" component={BlogList} />
        <Route path="/blog/:category/:post" component={BlogPost} />
      </Switch>
    );
  }
}

export default Blog;
