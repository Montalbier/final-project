import { BrowserRouter, Route } from "react-router-dom";
import React from "react";
import Deck from "./Deck";
import Map from "./Map";
import Logo from "./Logo";
import Profile from "./Profile";
import ProfilePic from "./ProfilePic";
import Uploader from "./Uploader";
import axios from "./axios";
export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: false,
            flashcards: sampleFlashcards,
        };
        this.methodInApp = this.methodInApp.bind(this);
    }

    methodInApp(arg) {
        this.toggleComponent();
        // this.setState();
        this.setState({ imgUrl: arg });
    }

    componentDidMount() {
        console.log("App just mounted");
        axios
            .get("/user")
            .then(({ data }) => {
                const { first, last, email, url, id } = data;
                // console.log(data);
                this.setState({
                    id: id,
                    first: first,
                    last: last,
                    email: email,
                    imgUrl: url,
                });
                // console.log(this.state);
                // console.log("data in componentDidMount: ", data);
            })
            .catch((e) => {
                console.log("error in axios: ", e);
            });
    }

    toggleComponent() {
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    render() {
        return (
            <BrowserRouter>
                <header>
                    <Logo />
                    <div
                        className="navbar"
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            marginTop: "40px",
                        }}
                    >
                        <h4>
                            <a className="navbar-text, 1" href="/deck">
                                Flashcards
                            </a>
                        </h4>
                        <div>
                            <h4>
                                <a className="navbar-text, 2" href="/map">
                                    Map
                                </a>
                            </h4>
                        </div>
                        <div>
                            <h4>
                                <a className="navbar-text, 3" href="/logout">
                                    Log out
                                </a>
                            </h4>
                        </div>
                    </div>
                    <div
                        style={{
                            zoom: "20%",
                            marginTop: "80px",
                            marginRight: "80px",
                            overflow: "hidden",
                            zIndex: "20",
                        }}
                    >
                        <ProfilePic
                            first={this.state.first}
                            last={this.state.last}
                            imgUrl={this.state.imgUrl}
                            toggleComponent={() => this.toggleComponent()}
                        />
                    </div>
                </header>
                <div></div>
                {/* <footer>
                    thank you blablablab
                </footer> */}

                <div>
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Profile
                                imgUrl={this.state.imgUrl}
                                first={this.state.first}
                                last={this.state.last}
                                id={this.state.id}
                            />
                        )}
                    />
                </div>

                <div>
                    {this.state.uploaderIsVisible && (
                        <Uploader
                            methodInApp={this.methodInApp}
                            imgUrl={this.state.imgUrl}
                            // toggleComponent={() => this.toggleComponent()}
                        />
                    )}
                </div>
                <div>
                    <Route
                        path="/deck"
                        render={() => (
                            <Deck flashcards={this.state.flashcards} />
                        )}
                    />
                </div>
                <div>
                    <Route path="/map" render={() => <Map />} />
                </div>
            </BrowserRouter>
        );
    }
}

/*
🔄 FLASHCARDS CODE STARTS HERE 🔄
*/

const sampleFlashcards = [
    {
        id: 1,
        english: "How much does it cost?",
        spanish: "¿Cuánto cuesta?",
    },
    {
        id: 2,
        english: "How are you?",
        spanish: "¿Cómo estás?",
    },
    {
        id: 3,
        english: "Where is _____ located?",
        spanish: "¿Dónde queda _____?",
    },
    {
        id: 4,
        english: "Can you help me?",
        spanish: "¿Puedes ayudarme?",
    },
    {
        id: 5,
        english: "Where are you from?",
        spanish: "¿De dónde eres?",
    },
    {
        id: 6,
        english: "Do you speak English?",
        spanish: "¿Hablas español?",
    },
    {
        id: 7,
        english: "Good morning",
        spanish: "Buenos días",
    },
    {
        id: 8,
        english: "Have a good day",
        spanish: "Que tengas un buen día",
    },
    {
        id: 9,
        english: "I am fine, and you?",
        spanish: "Estoy bien, ¿y tú?",
    },
    {
        id: 10,
        english: "I'm sorry",
        spanish: "Lo siento",
    },
    {
        id: 11,
        english: "What time is it?",
        spanish: "¿Qué hora es?",
    },
    {
        id: 12,
        english: "Yes / No",
        spanish: "Sí / No",
    },
    {
        id: 13,
        english: "Cheers / Bless you",
        spanish: "Salud",
    },

    {
        id: 15,
        english: "I need help",
        spanish: "Necesito ayuda",
    },

    {
        id: 17,
        english: "Please",
        spanish: "Por favor",
    },
    {
        id: 18,
        english: "My name is ___ and I'm from ___",
        spanish: "Mi nombre es ___ y soy de ___",
    },
];

/*
🔄 FLASHCARDS CODE ENDS HERE 🔄
*/
