import React, { PureComponent } from 'react';
import { Container, Form } from 'semantic-ui-react';
import SimpleMDE from 'react-simplemde-editor';
import PropTypes from 'prop-types';
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
  };

  state = {
    title: '',
    content: '',
    excerpt: '',
    tags: '',
    category: '',
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
          title,
          content,
          excerpt,
          category,
          tags: tags.split(',').map(tag => tag.trim()),
        },
      })
      .then(({ data: { createNewPost: { post: { id } } } }) =>
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

const createPostMutation = gql`
  mutation(
    $title: String!
    $content: String!
    $excerpt: String!
    $category: String!
    $tags: [String!]
  ) {
    createNewPost(
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

export default graphql(createPostMutation)(Editor);
