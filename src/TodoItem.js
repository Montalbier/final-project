import React, { Component } from "react";

export default class TodoItem extends Component {
    render() {
        const { title } = this.props;
        return (
            <div>
                <li>
                    <h6>{title}</h6>
                </li>
            </div>
        );
    }
}
