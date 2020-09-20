import React from "react";

class TestPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            test: false,
        };
    }

    render() {
        return (
            <div>TEST</div>
        );
    }
}

export default TestPage;