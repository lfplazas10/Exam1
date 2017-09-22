import React from 'react'
import AddFollower from './AddFollower'
import axios from 'axios';

class PopularFollowers extends React.Component {
  //
  constructor(props) {
    super(props);
    this.state =
      {
        popularFollowers : []
      }
    ;
    this.setPopularFollowers = this.setPopularFollowers.bind(this);
  }

  setPopularFollowers(followers) {
    this.state.popularFollowers = followers;
    this.render();
    this.forceUpdate();
  }

  componentDidMount(){
    var upperClass = this;
    axios.get('/followers/best')
      .then(function (response) {
        console.log(response)
        upperClass.setPopularFollowers(response.data);
      })
      .catch(function (error) {
        alert(error);
      });
  }

  handleButtonClick(){
    this.props.action(this.props.name)
  }

  render() {
    console.log(this.state.popularFollowers);
    return (
      <div className="row text-center">
        {this.state.popularFollowers.map((user, i) =>
          <AddFollower key={i} name={user.name} url={user.avatar_url} />
        )}
      </div>
    );
  }
}

export default PopularFollowers;