var Message = React.createClass({
	rawMarkup: function() {
    	var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    	return { __html: rawMarkup };
	},
	render: function() {
	    return(
	    	<div className="message" key={this.props.key}>
	    		<div className="user-icon">
	    			<img src="http://socialmediaweek.org/wp-content/blogs.dir/1/files/slack-pattern-940x492.jpg" />
	    		</div>
	    		<div className="body">
	    			<div className="username">{this.props.username}</div>
	    			<div className="text">{this.props.body}</div>
	    		</div>
	    	</div>
	    );
	}
});

var MessageList = React.createClass({
	render: function() {
    	var messageNodes = this.props.data.map(function(message) {
 
        	return (
           		<Message key={message.id} username={message.username} body={message.body} ></ Message>
	        	);
	   }.bind(this));

	   return (
	   		<div className="MessageList">
	   			{messageNodes}
	   		</div>
	   );
	}
});

var MessageSection = React.createClass({
	loadMessages: function() {
		$.ajax({
	      url: this.props.url,
	      dataType: 'json',
	      cache: false,
	      success: function(data) {
	        this.setState({data: data});
	      }.bind(this),
	      error: function(xhr, status, err) {
	        console.error(this.props.url, status, err.toString());
	      }.bind(this)
	    });
	},
	componentDidMount: function() {
		this.loadMessages();
	},
	getInitialState: function() {
		return { data: [] }
	},
	render: function() {
		return (
			<div className="MessageSection">
				<MessageList data={this.state.data} />
			</div>
		)
	}
});

var MessageForm = React.createClass({
	getInitialState: function() {
		return { body: '' };
	},
	handleInputChange: function(e) {
		this.setState({body: e.target.value});
	},
	handleSubmit: function() {
		e.preventDefault();
		var msg_body = this.state.body.trim();
		if (!msg_body) {
			return;
		}
		this.props.handleMessageSubmit({ body: body });
		this.setState({ body: '' });
	},
	render: function() {
		return (
			<form onSubmit={this.handleSubmit}>
				<input type="text" onChange={this.handleInputChange} />
			</form>
		);
	}
})

var MessageFormContainer = React.createClass({
	getInitialState: function() {
		return { data: [] };
	},
	handleMessageSubmit: function(message) {
		 var messages = this.state.data;
	     message.id = Date.now();
	     var newMessages = messages.concat([message]);
	     this.setState({data: newMessages});
	    $.ajax({
	      url: this.props.url,
	      dataType: 'json',
	      type: 'POST',
	      data: message,
	      success: function(data) {
	        this.setState({data: messages});
	      }.bind(this),
	      error: function(xhr, status, err) {
	        console.error(this.props.url, status, err.toString());
	      }.bind(this)
	    });
	},
	render: function() {
		return (
			<MessageForm data={this.props.url} />
		);
	}
})

ReactDOM.render(
  <MessageSection url='/api/messages'/>,
  document.getElementById('chatbox')
);

ReactDOM.render(
	<MessageFormContainer url='/api/messages' />,
	document.getElementById('input-bar')
);