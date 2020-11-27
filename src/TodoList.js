import React, { Component } from "react";
import TodoItem from "./TodoItem";

export default class TodoList extends Component {
    componentDidMount() {
        console.log("component mounted!");
    }

    render() {
        const { items, clearList, handleDelete } = this.props;
        return (
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                }}
            >
                <ul style={{ width: "100px" }}>
                    {items.map((item) => {
                        return (
                            <TodoItem
                                key={item.id}
                                title={item.title}
                                handleDelete={() => handleDelete(item.id)}
                            />
                        );
                    })}
                    {/* <button
                        style={{ width: "80px", marginTop: "30px" }}
                        type="button"
                        onClick={clearList}
                    >
                        Clear list
                    </button> */}
                </ul>
            </div>
        );
    }
}
