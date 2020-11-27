import React, { Component } from "react";

export default class TodoItem extends Component {
    render() {
        const { title, handleDelete } = this.props;
        return (
            <div>
                <li>
                    <h6>{title}</h6>
                    <div>
                        <span onClick={handleDelete}>
                            <i className="trash" />
                        </span>
                    </div>
                </li>
            </div>
        );
    }
}
