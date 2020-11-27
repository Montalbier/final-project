import React, { Component } from "react";

export default class TodoItem extends Component {
    render() {
        const { title, handleDelete } = this.props;
        return (
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                }}
            >
                <li style={{ textAlign: "link" }}>
                    <p style={{ fontSize: "16px" }}>{title}</p>
                    <div>
                        <span onClick={handleDelete}>
                            <i className="far fa-check-circle"></i>
                        </span>
                    </div>
                </li>
            </div>
        );
    }
}
