ThingForm = React.createClass({
  getInitialState: function() {
    return {newthing: ''};
  },
  handleNewThingChange: function(e) {
    this.setState({newthing: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var newthing = this.state.newthing;
    if (!newthing) {
      return;
    }
    this.props.onThingSubmit(newthing);
    this.setState({newthing: ''});
  },
  render: function() {
    return (
      <form className="thingForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Thing Something"
          value={this.state.newthing}
          onChange={this.handleNewThingChange}
        />
        <input type="submit" />
      </form>
    );
  }
});
