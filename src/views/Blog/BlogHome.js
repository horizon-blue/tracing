import React, { PureComponent } from 'react';
import BlogList from './BlogList';
import { Container, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import Translated from '../Translated';

class BlogHome extends PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  /**
   * Initialize current search bar by the query string (from url)
   *
   * @param      {Object}  nextProps  The next properties
   * @param      {Object}  prevState  The previous state
   * @return     {Object}  The derived state from properties.
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    const query = queryString.parse(nextProps.location.search).query;
    return {
      ...prevState,
      text: query || '',
      query: query,
    };
  }

  state = {};

  /**
   * Update query to state
   */
  handleChangeQuery = ({ target: { value } }) => this.setState({ text: value });

  /**
   * Fire the query
   *
   */
  handleSearch = () =>
    this.props.history.push({
      search: queryString.stringify({ query: this.state.text }),
    });

  render() {
    return (
      <Container>
        <Form inverted className="search-box">
          <Form.Group inline>
            <Form.Field>
              <Translated as="label" id="keyword" />
              <input
                value={this.state.text}
                name="name"
                onChange={this.handleChangeQuery}
              />
            </Form.Field>
            <Translated
              as={Form.Button}
              id="search"
              inverted
              basic
              onClick={this.handleSearch}
              color="blue"
              size="tiny"
            />
          </Form.Group>
        </Form>
        <BlogList query={this.state.query} />
      </Container>
    );
  }
}

export default BlogHome;
