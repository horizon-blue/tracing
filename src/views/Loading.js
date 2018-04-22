import React from 'react';
import { Loader, Container } from 'semantic-ui-react';

const Loading = () => (
  <Container>
    <Loader inline="centered" size="big" inverted active />
  </Container>
);

export default Loading;
