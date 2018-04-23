import React from 'react';
import { Loader, Container } from 'semantic-ui-react';

/**
 * The Loading component that display when fetching contents
 *
 * @class      Loading (name)
 */
const Loading = () => (
  <Container>
    <Loader inline="centered" size="big" inverted active />
  </Container>
);

export default Loading;
