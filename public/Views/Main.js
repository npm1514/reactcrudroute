Main = React.createClass({
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
