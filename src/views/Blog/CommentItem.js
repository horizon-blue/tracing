import React, { PureComponent } from 'react';
import { Comment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Translated from '../Translated';

/**
 * The component that is used to display a single comment
 *
 * @class      CommentItem (name)
 */
class CommentItem extends PureComponent {
  static propTypes = {
    comment: PropTypes.object.isRequired,
  };

  render() {
    const { comment } = this.props;

    return (
      <Comment className="comment-container">
        <Comment.Avatar src={comment.author.avatar} />
        <Comment.Content>
          <Comment.Author as="span" className="comment-username">
            {comment.author.name}
          </Comment.Author>
          <Comment.Metadata as="div" className="comment-meta">
            {comment.createDate.slice(0, 10)}
          </Comment.Metadata>
          <Comment.Text as="p">{comment.content}</Comment.Text>
          <Comment.Actions className="comment-action">
            <Translated as={Comment.Action} id="reply" />
          </Comment.Actions>
        </Comment.Content>
      </Comment>
    );
  }
}

export default CommentItem;
