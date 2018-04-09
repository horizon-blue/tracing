import React, { PureComponent } from 'react';
import { Comment, Container, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Translated from 'views/Translated';
import CommentItem from './CommentItem';

const H2Header = props => <Header as="h2" {...props} />;

const comments = [
  {
    id: 123,
    author: {
      name: 'Xiaoyan',
      avatar: 'https://avatars2.githubusercontent.com/u/18493382?s=460&v=4',
    },
    createdAt: '2017-02-26T23:20:11',
    content: 'This is a comment test',
  },
  {
    id: 234,
    author: {
      name: 'Anonymous',
      avatar:
        'https://thehorizon.blue/img/resized/small/cb027948-2783-47da-9c1e-f0428205b1ab.jpg',
    },
    createdAt: '2017-02-28T23:20:11',
    content: 'This is another comment test',
  },
];

/**
 * Display a list of comments as a comment section
 *
 * @class      Comments (name)
 */
class Comments extends PureComponent {
  static propTypes = {
    comments: PropTypes.array.isRequired,
  };

  static defaultProps = {
    comments: comments,
  };

  /**
   * Given a comment, render it as an entry in the comment list
   *
   * @param      {Object}  comment  The comment
   * @return     {Node}  The DOM Node corresponds to the comment item
   */
  renderCommentItem(comment) {
    return <CommentItem comment={comment} key={comment.id} />;
  }

  render() {
    const { comments } = this.props;
    return (
      <Container text className="blog-comments">
        <Comment.Group size="large">
          <Translated as={H2Header} dividing id="comments" />
          {comments.map(this.renderCommentItem)}
        </Comment.Group>
      </Container>
    );
  }
}

export default Comments;
