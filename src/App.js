/*global chrome*/
import React, { Component } from 'react';
import { List, Segment, Input,Container, Divider, Grid, Header, Icon } from 'semantic-ui-react'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      query:"",
    }
    this.onSearchChange = this.onSearchChange.bind(this);
    this.search = this.search.bind(this);
  }

  search(){
    console.log(this.state.query);
  }

  onSearchChange(e){
    this.setState({query:e.target.value})
  }

  render() {
    return (
      <Container>
    {/* Heads up! We apply there some custom styling, you usually will not need it. */}
    <style>
      {`
      html, body {
        background-color: #252839 !important;
      }
      p {
        align-content: center;
        background-color: #495285;
        color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-height: 6em;
      }
      p > span {
        opacity: 0.4;
        text-align: center;
      }
    }
    `}
    </style>

    <Header as='h2' icon inverted textAlign='center'>
      <Icon name='grid layout' />
        Historia
      <Header.Subheader>
        Search Any content in your history instantly!
      </Header.Subheader>
    </Header>
    <Divider />

    <Grid centered>
      <Grid.Column>
        <Input 
          fluid
          onKeyPress={e => {
            if (e.key === 'Enter') {
              this.search()
            }
          }} 
          onChange={this.onSearchChange} icon='search' placeholder='Search...' />
      </Grid.Column>
    </Grid>

    <Header as='h2' inverted textAlign='center'>
      Results
    </Header>
    <Segment inverted>
    <List divided inverted relaxed>
      <List.Item>
        <List.Content>
          <List.Header>Snickerdoodle</List.Header>
          An excellent companion
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Content>
          <List.Header>Poodle</List.Header>A poodle, its pretty basic
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Content>
          <List.Header>Paulo</List.Header>
          He's also a dog
        </List.Content>
      </List.Item>
    </List>
  </Segment>
  </Container>
    );
  }
}

export default App;