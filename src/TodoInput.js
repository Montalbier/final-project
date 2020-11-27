import React, { Component } from "react";
import axios from "./axios";

export default class TodoInput extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.packlist = this.packlist.bind(this);
    }

    // methodInInput() {
    //     console.log("this.state in TodoInput: ", this.state);
    //     this.props.methodInApp(this.state);
    // }

    packlist(e) {
        if (e.key === "Enter") {
            console.log("this.state in packlist: ", this.props);
            axios
                .post("/packlist", this.props.item)
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
