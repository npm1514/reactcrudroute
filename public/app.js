//- ThingBox
//  - ThingForm
//  - ThingList
//    - Thing

var ReactRouter    = window.ReactRouter;
var Router         = ReactRouter.Router,
    Route          = ReactRouter.Route,
    IndexRoute     = ReactRouter.IndexRoute,
    Link           = ReactRouter.Link,
    browserHistory = ReactRouter.browserHistory;

var ThingBox = React.createClass({
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

var ThingForm = React.createClass({
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

var ThingList = React.createClass({
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

var Thing = React.createClass({
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

var Main = React.createClass({
  render: function(){
    return (
      <div>
        <header>
          This is a header
          <Link to='/'>
						<button>Home</button>
					</Link>
					<Link to='things'>
						<button>All The Things</button>
					</Link>
        </header>
        {this.props.children}
        <footer>
          This is a footer
        </footer>
      </div>
    );
  }
});

var Home = React.createClass({
  render: function(){
    return (
      <div>
        <h2> This is an awesome home page </h2>
        <p> Click on the links above to navigaget elsewhere </p>
      </div>
    );
  }
});

ReactDOM.render(
  (
    <Router history={browserHistory}>
      <Route path="/" component={Main}>
        <IndexRoute component={Home}/>
        <Route path="things" component={ThingBox}/>
      </Route>
    </Router>
  ),
  document.getElementById('content')
);
