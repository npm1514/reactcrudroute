Thing = React.createClass({
  getInitialState: function() {
    return {updatedthing: ''};
  },
  handleUpdatedThingChange: function(e) {
    this.setState({updatedthing: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var updatedthing = {
      thing: this.state.updatedthing,
      _id: this.props.id
    };
    if (!updatedthing) {
      return;
    }
    this.props.onThingChange(updatedthing);
    this.setState({updatedthing: ''});
  },
  handleDelete: function(){
    this.props.onThingDelete(this.props.id);
  },
  render: function() {
    return (
      <div>
        <h2>{this.props.thing}</h2>
        <button onClick={this.handleDelete}>DELETE</button>
        <form onSubmit={this.handleSubmit}>
          <input
            type="input"
            placeholder="updated thing"
            value={this.state.updatedthing}
            onChange={this.handleUpdatedThingChange}
          />
        </form>
      </div>
    );
  }
});
