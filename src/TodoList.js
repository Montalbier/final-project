import React, { Component } from "react";
import TodoItem from "./TodoItem";

export default class TodoList extends Component {
    componentDidMount() {
        console.log("component mounted!");
    }

    render() {
        const { items, clearList, handleDelete } = this.props;
        return (
            <div>
                <ul>
                    <h3>en Todolist</h3>
                    {items.map((item) => {
                        return (
                            <TodoItem
                                key={item.id}
                                title={item.title}
                                handleDelete={() => handleDelete(item.id)}
                            />
                        );
                    })}
                    <button type="button" onClick={clearList}>
                        Clear list
                    </button>
                </ul>
            </div>
        );
    }
}
