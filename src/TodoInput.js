import React, { Component } from "react";

export default class TodoInput extends Component {
    render() {
        const { item, handleChange, handleSubmit } = this.props;
        return (
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                }}
            >
                <div>
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: "flex" }}>
                            <div>
                                <i className="plus"></i>
                            </div>
                            <div>
                                <input
                                    style={{
                                        marginTop: "0px",
                                        marginRight: "20px",
                                    }}
                                    type="text"
                                    className="input-item"
                                    placeholder="Add an item"
                                    value={item}
                                    onChange={handleChange}
                                ></input>
                            </div>
                            <div>
                                <button style={{ width: "60px" }} type="submit">
                                    Add
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
