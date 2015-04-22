import React from 'react';

let Jumbotron = React.createClass({
  getInitialState: function() {
    return {
      descriptionList: ['Eats', 'Sleeps', 'Dreams', 'Lives'],
      descriptionIndex: -1,
      description: ''
    };
  },
  componentDidMount: function() {
    this.selectDescription();
    setInterval(this.selectDescription, 2000);
  },
  selectDescription: function() {
    if (this.state.descriptionIndex < this.state.descriptionList.length - 1) {
      this.state.descriptionIndex++;
    } else {
      this.state.descriptionIndex = 0;
    }

    this.setState({
      description: this.state.descriptionList[this.state.descriptionIndex]
    });
  },
  render() {
    return(
      <div className="ui grid">
        <div className="sixteen wide column">
          <h1 className="ui center aligned header jumbotron">
            Meet the Strike Team
          </h1>
          <h1 className="ui center aligned header">
            The Strike Team <span className="faded">{this.state.description}</span> Code
          </h1>
        </div>
      </div>
    );
  }
});

export default Jumbotron;
