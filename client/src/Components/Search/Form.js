import React from 'react';

class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputValue: ""
        };
    }

    render = () => {
        return (
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    this.props.onSubmit(this.state.inputValue);
                }}
            >
                <input
                    type="text"
                    placeholder={this.props.placeholderText}
                    onChange={(e) => {
                        var value = e.target.value;
                        this.setState({
                            inputValue: value
                        });
                    }}
                />
                <button type="submit">Search</button>
            </form>
        );
    }
}

export default Form;
