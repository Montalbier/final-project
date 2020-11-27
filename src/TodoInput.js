import React, { Component } from "react";
import axios from "./axios";

export default class TodoInput extends Component {
    constructor() {
        super();
        this.state = {};
        this.packlist = this.packlist.bind(this);
    }

    // methodInInput() {
    //     console.log("this.state in TodoInput: ", this.state);
    //     this.props.methodInApp(this.state);
    // }

    packlist(e) {
        console.log("packlist!");
        if (e.key === "Enter") {
            axios
                .post("/packlist", this.state.item)
                .then((response) => {
                    console.log("axios response from packlist: ", response);
                    // if (response.data.imageurl) {
                    //     ("response.data.img is truthy!");
                    //     this.setState({
                    //         url: response.data.imageurl,
                    //     });
                    //     this.methodInUploader();
                    // } else {
                    //     this.setState({
                    //         error: true,
                    //     });
                    // }
                })
                .catch((err) => {
                    console.log("axios ERROR in packlist: ", err);
                });
        }
    }

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
                    <div className="good-pack">
                        <img
                            style={{ width: "300px", margin: "20px 0 20px 0" }}
                            src="/assets/goodpack.png"
                        />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <div>
                                <i className="plus"></i>
                            </div>
                            <div>
                                <input
                                    style={{
                                        marginTop: "0px",
                                        marginRight: "10px",
                                    }}
                                    type="text"
                                    className="input-item"
                                    placeholder="Add an item"
                                    value={item}
                                    onChange={handleChange}
                                    onKeyDown={this.packlist}
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
