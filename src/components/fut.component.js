import React, { Component } from "react";
import futDataService from "../services/fut.service";
import Reactions from './reactions.component';
import CommentBox from './comments.component'

export default class Tutorial extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.updatePublished = this.updatePublished.bind(this);
        this.updateTutorial = this.updateTutorial.bind(this);
        this.deleteTutorial = this.deleteTutorial.bind(this);

        this.state = {
            currentTutorial: {
                id: null,
                title: "",
                description: "",
                image: "",
                published: false,
            },
        message: "",
        };
    }
    
    static getDerivedStateFromProps(nextProps, prevState) {
        const { tutorial } = nextProps;
        if (prevState.currentTutorial.id !== tutorial.id) {
            return {
                currentTutorial: tutorial,
                message: ""
            };
        }

        return prevState.currentTutorial;
    }
    
    componentDidMount() {
        this.setState({
            currentTutorial: this.props.tutorial,
        });
    }
    
    onChangeTitle(e) {
        const title = e.target.value;

        this.setState(function (prevState) {
            return {
                currentTutorial: {
                    ...prevState.currentTutorial,
                    title: title,
                },
            };
        });
    }

    onChangeDescription(e) {
        const description = e.target.value;

        this.setState((prevState) => ({
            currentTutorial: {
                ...prevState.currentTutorial,
                description: description,
            },
        }));
    }

    updatePublished(status) {
        futDataService.update(this.state.currentTutorial.id, {
            published: status,
        })
        .then(() => {
            this.setState((prevState) => ({
                currentTutorial: {
                    ...prevState.currentTutorial,
                    published: status,
                },
                message: "The status was updated successfully!",
            }));
        })
        .catch((e) => {
            console.log(e);
        });
    }
    
    updateTutorial() {
        const data = {
            title: this.state.currentTutorial.title,
            description: this.state.currentTutorial.description,
        };

        futDataService.update(this.state.currentTutorial.id, data)
        .then(() => {
            this.setState({
                message: "The File was updated successfully!",
            });
        })
        .catch((e) => {
            console.log(e);
        });
    }

    deleteTutorial() {
        futDataService.delete(this.state.currentTutorial.id)
        .then(() => {
            this.props.refreshList();
        })
        .catch((e) => {
            console.log(e);
        });
    }
    
    render() { 
        const { currentTutorial } = this.state;

        return (
        <div>
            <h4>-------------------------------------------------------</h4>
            {currentTutorial ? (
            <div className="edit-form">
                <form>
                    <div className="form-group">
                        <label htmlFor="title">Titulo</label>
                        <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={currentTutorial.title}
                        onChange={this.onChangeTitle}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Descriccion</label>
                        <input
                        type="text"
                        className="form-control"
                        id="description"
                        value={currentTutorial.description}
                        onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                    <label htmlFor="url"> Imagen: </label>
                                <img src={currentTutorial.url} alt="Pic" width="540" height="280"></img>
                            </div>
                            <div className="form-group">
                                <label>
                                    <strong>Estado:</strong>
                                </label>
                                {currentTutorial.published ? "Published" : "Pending"}
                            </div>
                        </form>

                        {currentTutorial.published ? (
                            <button
                                class="btn btn-outline-secondary"
                                onClick={() => this.updatePublished(false)}
                            >
                                UnPublish
                            </button>
                        ) : (
                            <button
                                class="btn btn-success"
                                onClick={() => this.updatePublished(true)}
                            >
                                Publicar
                            </button>
                        )}

                        <button
                            class="btn btn-danger"
                            onClick={this.deleteTutorial}
                        >
                            Eliminar
                        </button>

                        <button
                            type="submit"
                            class="btn btn-primary"
                            onClick={this.updateTutorial}
                        >
                            actualizar
                        </button>
                        <p>{this.state.message}</p>

                        <Reactions />
                        <CommentBox />
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a file...</p>
                    </div>
                )}
            </div>
        );
    }
}