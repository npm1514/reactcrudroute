ThingBox = React.createClass({
  getThingsFromServer: function() {
    $.ajax({
      method: "GET",
      url: "/thing",
      success: function(things) {
        console.log(things);
        this.setState({things: things});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this)
    });
  },
  handleThingPost: function(newthing) {
    console.log(newthing);
    var thingy = {
      thing: newthing
    };
    $.ajax({
      method: "POST",
      url: "/thing",
      data: thingy,
      success: function(thing) {
        this.getThingsFromServer();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this)
    });
  },
  handleThingChange: function(updatedThing){
    $.ajax({
      method: "PUT",
      url: "/thing/" + updatedThing._id,
      data: updatedThing,
      success: function(thing) {
        this.getThingsFromServer();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this)
    });
  },
  handleThingDelete: function(id){
    $.ajax({
      method: "DELETE",
      url: "/thing/" + id,
      success: function(thing) {
        this.getThingsFromServer();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {things: []};
  },
  componentDidMount: function() {
    this.getThingsFromServer();
  },
  render: function() {
    return (
      <div className="somethingBox">
        <h1>This suddenly turned into a THING thing!!</h1>
        <ThingForm onThingSubmit={this.handleThingPost}/>
        <ThingList
          things={this.state.things}
          onThingDelete={this.handleThingDelete}
          onThingChange={this.handleThingChange}
        />
      </div>
    );
  }
});
