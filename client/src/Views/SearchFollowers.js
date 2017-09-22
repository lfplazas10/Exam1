import React from 'react'
import '../App.css';
import '../PlayerStats.css';
import ReactDOM from 'react-dom'
import axios from 'axios';
import AddFollower from './AddFollower'
import PopularFollowers from "./PopularFollowers";

class SearchPlayer extends React.Component {

  constructor(props) {
    super(props);
    this.state =
      {
        value: '',
        users: [],
        followers: [],
        displayingBest: false
      }
    ;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.handleFollowerClick = this.handleFollowerClick.bind(this);
    this.displayBest = this.displayBest.bind(this);
    this.handleSuperiorClick = this.handleSuperiorClick.bind(this);
  }

  setFollowers(followers) {
    this.state.followers = followers;
    this.render();
    this.forceUpdate();
  }

  updateInputValue(event) {
    this.setState({value: event.target.value});
  }

  handleSuperiorClick(name){
    this.state.displayingBest = false;
    this.state.users = [];
    this.state.users.push(name);
    this.updateUserList(name);
  }

  handleFollowerClick(name) {
    this.state.displayingBest = false;
    this.state.users.push(name);
    this.updateUserList(name);
  }

  addUserToPath(user) {
    this.state.users.push(user);
  }

  updateUserList(name) {
    var upperClass = this;
    axios.get('/getFollowers/' + name)
      .then(function (response) {
        upperClass.setFollowers(response.data.data);
        var newFollower = {name: name, followers: response.data.data.length};
        axios.post('/followers/' + name, newFollower)
          .then(function (resp) {
            console.log('Recorded');
          })
      })
      .catch(function (error) {
        alert(error);
      });
  }

  handleSubmit(event) {
    this.state.displayingBest = false;
    this.state.users = [];
    var name = this.state.value;
    this.state.users.push(name);
    var upperClass = this;
    this.updateUserList(name);
    event.preventDefault();
  }

  displayBest() {
    this.state.displayingBest = true;
    this.render();
    this.forceUpdate();
  }

  render() {
    return (
      <div>
        <div className="row">
          <form onSubmit={this.handleSubmit} style={{width : '60%'}}>
            <div className="col-md-8" style={{width : '60%'}}>
              <input type="text" className="form-control" value={this.state.value} onChange={this.updateInputValue}/>
            </div>
            <div className="col-md-8" style={{width : '60%'}}>
              <input type="submit" className="btn btn-primary" value="Search followers" disabled={!this.state.value}/>
            </div>
          </form>
          <div className="col-md-4">
            <button className="btn btn-info" onClick={this.displayBest} style={{width: '100%'}}>
              Viewed profiles ranking
            </button>
          </div>
        </div>

        {this.state.displayingBest == true ? <PopularFollowers action={this.handleSuperiorClick}/> :
          <div>
            <div>
              {this.state.users.map((user, i) =>
                <span style={{marginLeft: 8 + 'px'}}> {user} </span>
              )}
            </div>

            <div className="row text-center">
              {this.state.followers.map((user, i) =>
                <AddFollower key={i} name={user.login} url={user.avatar_url} action={this.handleFollowerClick}/>
              )}
            </div>
          </div>
        }
      </div>
    );
  }
}
;


export default SearchPlayer;