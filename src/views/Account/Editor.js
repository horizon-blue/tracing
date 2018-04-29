import React, { PureComponent } from 'react';
import { Container, Form } from 'semantic-ui-react';
import SimpleMDE from 'react-simplemde-editor';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import 'simplemde/dist/simplemde.min.css';
import Translated from '../Translated';
import ErrorMessage from '../ErrorMessage';
import Loading from '../Loading';

const editorSetting = { spellChecker: false };

class Editor extends PureComponent {
  static propTypes = {
    mutate: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    data: PropTypes.object,
  };

  state = {
    title: '',
    content: '',
    excerpt: '',
    tags: '',
    category: '',
  };

  componentDidMount() {
    if (this.props.data && this.props.data.post)
      this.loadPost(this.props.data.post);
  }

  componentDidUpdate(prevProps) {
    // load post content to editor
    if (this.props.data && prevProps.data.post !== this.props.data.post) {
      this.loadPost(this.props.data.post);
    }
  }

  /**
   * Load the pre-existed post to editor
   *
   * @param      {object}  post    The post
   */
  loadPost = post => {
    this.setState({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      tags: post.tags.edges.map(({ node: { name } }) => name).join(', '),
      category: post.category.name,
    });
  };

  /**
   * Update the current value in the input field to the state
   *
   * @param      {event}  the event being triggered
   */
  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });
  handleChangeText = content => this.setState({ content });

  /**
   * Submit the current content in post editor
   */
  handleSubmit = () => {
    this.setState({ loading: true });
    const { title, content, excerpt, category, tags } = this.state;

    this.props
      .mutate({
        variables: {
          id: this.props.match.params.postId,
          title,
          content,
          excerpt,
          category,
          tags: tags.split(',').map(tag => tag.trim()),
        },
      })
      .then(({ data: { setPost: { post: { id } } } }) =>
        this.props.history.push(`/blog/post/${id}`)
      )
      .catch(error => this.setState({ error, loading: false }));
  };

  render() {
    const {
      title,
      content,
      category,
      tags,
      excerpt,
      error,
      loading,
    } = this.state;

    if (this.props.data) {
      // Editing post
      const { data: { loading, error, post } } = this.props;

      if (loading) return <Loading />;

      if (error) return <ErrorMessage value={error} />;

      if (!post) return <Redirect to="/account/editor" />;
    }

    return (
      <Container as="main" className="editor-page">
        <Form inverted size="massive">
          <Form.Field
            name="title"
            control="input"
            placeholder="Title"
            value={title}
            onChange={this.handleChange}
          />
        </Form>
        <SimpleMDE
          onChange={this.handleChangeText}
          value={content}
          options={editorSetting}
        />
        <Form inverted>
          <Form.Field>
            <Translated as="label" id="excerpt" />
            <textarea
              value={excerpt}
              name="excerpt"
              rows={3}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Group widths="equal">
            <Form.Field>
              <Translated as="label" id="category" />
              <input
                value={category}
                name="category"
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Translated as="label" id="tags" />
              <input value={tags} name="tags" onChange={this.handleChange} />
            </Form.Field>
          </Form.Group>
          <Translated
            as={Form.Button}
            inverted
            basic
            color="blue"
            type="submit"
            id="submit"
            onClick={this.handleSubmit}
          />
          {!!error && <ErrorMessage value={error} />}
          {loading && <Loading />}
        </Form>
      </Container>
    );
  }
}

const setPostMutation = gql`
  mutation(
    $id: ID
    $title: String!
    $content: String!
    $excerpt: String!
    $category: String!
    $tags: [String!]
  ) {
    setPost(
      id: $id
      title: $title
      content: $content
      category: $category
      tags: $tags
      excerpt: $excerpt
    ) {
      post {
        id
      }
    }
  }
`;

/**
 * Load pre-existed post
 */
const getPost = gql`
  query($postId: ID!) {
    post(id: $postId) {
      id
      title
      excerpt
      category {
        id
        name
      }
      tags {
        edges {
          node {
            id
            name
          }
        }
      }
      content
    }
  }
`;

export default graphql(getPost, {
  skip: ({ match: { params: { postId } } }) => !postId,
  options: ({ match: { params: variables } }) => ({ variables }),
})(graphql(setPostMutation)(Editor));
