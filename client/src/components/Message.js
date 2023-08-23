import React, { Component } from "react";

class Message extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: "Hello",
            messageReceived: "",
        };
    }

    componentDidMount() {
        this.props.socket.on("receive_message", (data) => {
            // console.log(data);
            this.setState({
                messageReceived: data.message,
            });
        });
    }

    handleMessageChange = (e) => {
        this.setState({
            message: e.target.value,
        });
    };

    handleSubmitMessage = (e) => {
        const msg = e.target[0].value;
        // console.log(msg);
        this.props.socket.emit("send_message", { message: this.state.message });

        e.preventDefault();
    };

    render() {
        return (
            <div>
                <h1>Type Your Message</h1>
                <form onSubmit={this.handleSubmitMessage}>
                    <input
                        type="text"
                        value={this.state.message}
                        onChange={this.handleMessageChange}
                    />
                    <button type="submit">Send</button>
                </form>
                <h1>Message Received</h1>
                <p>{this.state.messageReceived}</p>
            </div>
        );
    }
}

export default Message;
