//- ThingBox
//  - ThingForm
//  - ThingList
//    - Thing

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
