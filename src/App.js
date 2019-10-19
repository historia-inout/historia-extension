/*global chrome*/
import React, { Component } from 'react';
import { Loader, Dimmer, Image,List, Segment, Input,Container, Divider, Grid, Header, Icon } from 'semantic-ui-react'
import logo from './logo.png';
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      query:"",
      results:[],
      loading: false
    }
    this.onSearchChange = this.onSearchChange.bind(this);
    this.search = this.search.bind(this);
  }

  openUrl(url){
    chrome.tabs.create({url: url});
  }

  search(){
    this.setState({loading:true});
    console.log(this.state.query);
    fetch('http://localhost:8000/query/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: this.state.query
        }),
      })
      .then(response => {
        console.log(response);
        return response.json()
      })
      .then(data => {
        console.log(data);
        this.setState({results:data,loading:false});
      })
  }

  onSearchChange(e){
    this.setState({query:e.target.value,results:[]})
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
      <Image src={logo}/>
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
    <br/>
        {this.state.loading?
        <Segment inverted>
        <Dimmer>
          <br/>
          <Loader />
          <br/>
        </Dimmer>
        </Segment>
        :
        this.state.results.length!==0?
        <div>
        <Header as='h2' inverted textAlign='center'>
          Results
        </Header>
        <Segment inverted>
        <List divided inverted relaxed>
          {this.state.results.map((item)=>{
            return (
              <List.Item>
                <List.Content>
                  <List.Header onClick={()=>{this.openUrl(item.sourceUrl)}}>{item.sourceUrl}</List.Header>
                </List.Content>
              </List.Item>
            )
          })}
        </List>
        </Segment>
        </div>
        :""
      }
  </Container>
    );
  }
}

export default App;