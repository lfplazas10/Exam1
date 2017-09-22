import React from 'react'
import '../App.css';

class AddFollower extends React.Component {
  //
  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick(){
    this.props.action(this.props.name)
  }

  render() {
    console.log(this.props);
    return <div className="col-lg-3 col-md-6 mb-4">
      <div className="card">
        <img className="card-img-top" src={this.props.url} alt="Profile pic"></img>
        <div className="card-body">
          <h4 className="card-title">{this.props.name}</h4>
        </div>
        <div className="card-footer">
          <button onClick={this.handleButtonClick} className="btn btn-primary">See this user followers</button>
        </div>
      </div>
    </div>;
  }
}



export default AddFollower;