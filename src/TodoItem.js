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
                    <div>
                        <p style={{ fontSize: "16px" }}>{title}</p>
                        <i
                            style={{ cursor: "pointer" }}
                            onClick={handleDelete}
                            className="far fa-check-circle"
                        ></i>
                    </div>
                </li>
            </div>
        );
    }
}
