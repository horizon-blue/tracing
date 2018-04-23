import React, { PureComponent } from 'react';
import { Container, Form } from 'semantic-ui-react';
import SimpleMDE from 'react-simplemde-editor';
import 'simplemde/dist/simplemde.min.css';
import Translated from '../Translated';

const editorSetting = { spellChecker: false };

class Editor extends PureComponent {
  state = {
    title: '',
    content: '',
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

  render() {
    const { title, content, category, tags, excerpt } = this.state;

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
          />
        </Form>
      </Container>
    );
  }
}

export default Editor;
