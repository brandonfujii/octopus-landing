var Message = React.createClass({
	rawMarkup: function() {
    	var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    	return { __html: rawMarkup };
	},
	render: function() {
	    return(
	    	<div className="message" key={this.props.key}>
	    		<div className="user-icon">
	    			<img src={this.props.icon} />
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
           		<Message key={message.id} username={message.username} body={message.body} icon={message.icon}></ Message>
	        	);
	   }.bind(this));

	   return (
	   		<div className="MessageList">
	   			{messageNodes}
	   		</div>
	   );
	}
});

var MessageForm = React.createClass({
	getInitialState: function() {
		return { body: '' };
	},
	handleInputChange: function(e) {
		this.setState({body: e.target.value});
	},
	handleSubmit: function(e) {
		e.preventDefault();
		var msg_body = this.state.body.trim();
		if (!msg_body) {
			return;
		}
		this.props.onMessageSubmit({ body: msg_body });
		this.setState({ body: '' });
	},
	render: function() {
		return (
			<div id="input-bar">
				<form onSubmit={this.handleSubmit}>
					<input type="text" onChange={this.handleInputChange} value={ this.state.body } />
				</form>
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
	componentDidMount: function() {
		this.loadMessages();
		setInterval(this.loadMessages, 500);
	},
	getInitialState: function() {
		return { data: [] }
	},
	render: function() {
		return (
			<div className="MessageSection">
				<MessageList data={this.state.data} />
				<MessageForm onMessageSubmit={this.handleMessageSubmit} />
			</div>
		)
	}
});


ReactDOM.render(
  <MessageSection url='/api/messages'/>,
  document.getElementById('chatbox')
);
