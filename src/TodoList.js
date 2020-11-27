import React, { Component } from "react";
import TodoItem from "./TodoItem";
import axios from "./axios";

export default class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
        };
    }

    componentDidMount() {
        console.log("component mounted!");

        axios
            .get("/getitems")
            .then((response) => {
                console.log("response in /getitems: ", response);
this.setState()
            })
            .catch((err) => console.log("ERROR in /getitems: ", err));
    }

    render() {
        const { clearList, handleDelete } = this.props;
        return (
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                }}
            >
                <ul style={{ width: "100px" }}>
                    {this.state.items.map((item) => {
                        return (
                            <TodoItem
                                key={item.id}
                                title={item.title}
                                handleDelete={() => handleDelete(item.id)}
                            />
                        );
                    })}
                    <button
                        style={{ width: "80px", marginTop: "30px" }}
                        type="button"
                        onClick={clearList}
                    >
                        Clear list
                    </button>
                </ul>
            </div>
        );
    }
}
