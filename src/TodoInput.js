import React, { Component } from "react";

export default class TodoInput extends Component {
    render() {
        const { item, handleChange, handleSubmit } = this.props;
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div>
                            <i className="plus"></i>
                        </div>
                        <div>
                            <input
                                type="text"
                                className="input-item"
                                placeholder="Add an item"
                                value={item}
                                onChange={handleChange}
                            ></input>
                        </div>
                        <div>
                            <button type="submit">Add item</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
