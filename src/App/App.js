import React from 'react';
import {
  Box,
  Grommet, 
} from "grommet";
// import './App.css';
import Editor from './Editor';
import Header from './Header';
import List from './List';
import Menu from './Menu';

const theme = {
  global: {
    colors: {
      brand: '#474443',
    },
    font: {
      family: 'Roboto',
      size: '14px',
      height: '20px',
    },
  },
};

const AppBar = (props) => (
  <Box
    tag='header'
    direction='row'
    align='center'
    justify='between'
    background='brand'
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    elevation='medium'
    style={{ zIndex: '1' }}
    {...props}
  />
);

function App() {
  return (
    <div className="App">
      <Grommet theme={theme} full>
        <Box fill>
          <AppBar>
            <Header/>
          </AppBar>

          <Box direction='row' flex overflow={{ horizontal: 'hidden' }}>

            <Box 
              width='small'
              background='light-2'
              elevation='small'
              align='center'
              justify='center' 
            >
              <Menu/>
            </Box>

            <Box direction='row' flex>
              <Box 
                width='medium'
                elevation='small'
                align='center'
                justify='center' 
              >
                <List/>
              </Box>

              <Box 
                flex
                elevation='small'
                align='center'
                justify='center' 
              >
                <Editor/>
              </Box>
            </Box>
          </Box>
        </Box>
       
      </Grommet>
    </div>
  );
}

export default App;
