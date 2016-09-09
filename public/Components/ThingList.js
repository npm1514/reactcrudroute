ThingList = React.createClass({
  handleThingDelete: function(key){
    this.props.onThingDelete(key);
  },
  handleThingChange: function(thing){
    this.props.onThingChange(thing);
  },
  render: function() {
    var self = this;
    var somethingNodes = this.props.things.map(function(something) {
      return (
        <Thing
          thing={something.thing}
          key={something._id}
          id={something._id}
          onThingDelete={self.handleThingDelete}
          onThingChange={self.handleThingChange}
        />
      );
    });
    return (
      <div className="somethingList">
        {somethingNodes}
      </div>
    );
  }
});
