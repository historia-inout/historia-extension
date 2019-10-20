/*global chrome*/
import React, { Component } from 'react';
import { Loader, Dimmer, Image,List, Segment, Input,Container, Divider, Grid, Header, Icon } from 'semantic-ui-react'
import logo from './logo.png';
import {CopyToClipboard} from 'react-copy-to-clipboard';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      query:"",
      results:[],
      loading: false,
      copied: false,
      history: true
    }
    this.onSearchChange = this.onSearchChange.bind(this);
    this.search = this.search.bind(this);
    this.handleDropdown = this.handleDropdown.bind(this);
  }

  componentDidMount(){
    fetch('http://localhost:8000/history/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      console.log(response);
      return response.json()
    })
    .then(data => {
      console.log(data);
        let results=[]
        data.collection.map((item)=>{
          let d = {
            url: item.sourceUrl,
            title: item.title,
            icon: item.icon
          }
          results.push(d);
        });
        this.setState({results:results,loading:false,copied:false,dropdown: new Array(10)});
    })
  }

  handleDropdown(index){
    let dropdown = this.state.dropdown;
    dropdown[index]=!dropdown[index];
    this.setState({dropdown});
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
        let results=[]
        Object.keys(data).forEach(function(key) {
            let item = {
              url: key
            }
            const collection = data[key].collection;
            item.collection = collection;
            item.icon = data[key].icon;
            item.title = data[key].title;
            console.log(item);
            results.push(item);
        });
        this.setState({results:results,loading:false,copied:false,dropdown: new Array(results.length)});
      })
  }

  onSearchChange(e){
    this.setState({query:e.target.value,results:[],copied:false,history:false,loading:true})
  }

  render() {
    return (
      <Container>
        <style>
          {`
          html, body {
            background-color: #252839 !important;
            max-height: 500px;
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
            <Loader />
        :
          this.state.results.length!==0?
            <div>
            {/* <Header as='h2' inverted textAlign='center'>
              Results
            </Header> */}
            {this.state.copied?
            <Header as='h5' inverted textAlign='center'>
              Copied
            </Header>
            :""}
            <Segment inverted>
            <List divided inverted relaxed>
              {this.state.results.map((item,index)=>{
                return (
                  <List.Item>
                     <Grid>
                        <Grid.Row>
                          <Grid.Column verticalAlign="middle" width={3}>
                          <Image src={item.icon} avatar verticalAlign='middle'/>
                          </Grid.Column>
                          <Grid.Column verticalAlign="middle" width={this.state.history?10:9}>
                            <List.Content onClick={()=>this.openUrl(item.url)} verticalAlign='middle'>
                              {item.title} 
                            </List.Content>
                          </Grid.Column>
                          <Grid.Column verticalAlign="middle" width={1}>
                            <List.Content verticalAlign='middle' floated='right'>
                              <CopyToClipboard onCopy={() => this.setState({copied: true})} text={item.url}>
                                <Icon name="copy outline" size="large"/>
                              </CopyToClipboard>
                            </List.Content>
                          </Grid.Column>
                          {!this.state.history?
                          <Grid.Column verticalAlign="middle" width={1}>
                            <List.Content verticalAlign='middle' floated='right'>
                              {this.state.dropdown[index]?<Icon onClick={()=>this.handleDropdown(index)} name="angle up" size="large"/>:<Icon onClick={()=>this.handleDropdown(index)} name="angle down" size="large"/>}
                            </List.Content>
                          </Grid.Column>  
                          :""}
                        </Grid.Row>
                     </Grid>
                    
                    {/* <List.Icon name='connectdevelop' size='large' verticalAlign='middle' /> */}
                    
                    
                    {this.state.dropdown[index]?
                    <div><br/><br/>
                    {item.collection.map((i)=>{
                      if(i.imageUrl)
                      return;
                      else {
                        return (
                          <List.Content>
                            {i.summary}
                          </List.Content>
                        )
                      }
                    })}
                    </div>
                    :""}
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