import React, { Component } from 'react';
import { Button, Segment } from 'semantic-ui-react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Segment inverted>
            <Button inverted>Standard</Button>
            <Button inverted color="red">
              Red
            </Button>
            <Button inverted color="orange">
              Orange
            </Button>
            <Button inverted color="yellow">
              Yellow
            </Button>
            <Button inverted color="olive">
              Olive
            </Button>
            <Button inverted color="green">
              Green
            </Button>
            <Button inverted color="teal">
              Teal
            </Button>
            <Button inverted color="blue">
              Blue
            </Button>
            <Button inverted color="violet">
              Violet
            </Button>
            <Button inverted color="purple">
              Purple
            </Button>
            <Button inverted color="pink">
              Pink
            </Button>
            <Button inverted color="brown">
              Brown
            </Button>
            <Button inverted color="grey">
              Grey
            </Button>
            <Button inverted color="black">
              Black
            </Button>
          </Segment>
        </header>

        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
