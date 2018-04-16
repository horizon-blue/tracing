import React, { PureComponent } from 'react';
import { Comment, Container, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Translated from '../Translated';
import CommentItem from './CommentItem';

const H2Header = props => <Header as="h2" {...props} />;

/**
 * Display a list of comments as a comment section
 *
 * @class      Comments (name)
 */
class Comments extends PureComponent {
  static propTypes = {
    comments: PropTypes.array.isRequired,
  };

  /**
   * Given a comment, render it as an entry in the comment list
   *
   * @param      {Object}  comment  The comment
   * @return     {Node}  The DOM Node corresponds to the comment item
   */
  renderCommentItem({ node: comment }) {
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
