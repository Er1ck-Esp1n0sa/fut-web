import React, { Component } from "react";
import firebase from "firebase/compat/app";
import FutDataService from "../services/fut.service";
import "firebase/compat/storage";

export const storage = firebase.storage();

export default class AddTutorial extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.saveTutorial = this.saveTutorial.bind(this);
        this.newTutorial = this.newTutorial.bind(this);
        this.onChangefile = this.onChangeFile.bind(this);

        this.state = {
            name :"",
            title: "",
            description: "",
            published: false,
            submitted: false,
            file: null,
            url: ""
        };
    }

    onChangeFile(e){
        console.log(e.target.files[0]);
        this.setState ({
            file: e.target.files[0]
        });
    }

    handleUpload(e, file) {
        e.preventDefault();
        console.log(file);
        alert(file.name);
        const uploadTask = storage.ref(`/images/${file.name}`).put(file);
        uploadTask.on("state_changed", console.log, console.error, () =>  {
            storage
                .ref("images")
                .child(file.name)
                .getDownloadURL()
                .then((myurl) =>  { 
                    this.state.url=myurl;
                });    
        });
    }

    onChangeName(e) {
        this.setState({
            name : e.target.value,
        });
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value,
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value,
        });
    }

    saveTutorial() {
        let name = this.state.name;

        let data = {
            title: this.state.title,
            description: this.state.description,
            published: false,
            url: this.state.url,
        };

        FutDataService.create(data, name)
            .then(() => {
                console.log("Created new item successfully!");
                this.setState({
                    submitted: true,
                });
            })
            .catch((e) => {
                console.log(e);
            });
    }

    newTutorial() {
        this.setState({
            name: "",
            title: "",
            description: "",
            published: false,
            url: "",
            submitted: false,
        });
    }

    render() { 
        return (
        <div className="submit-form">
            {this.state.submitted ? (
            <div>
                <h4>You submitted successfully!</h4>
                <button className="btn btn-success" onClick={this.newTutorial}>
                    Agregar
                </button>
            </div>
            ) : (
            <div>

                <div className="form-group">
                    <label htmlFor="title">Titulo</label>
                    <input
                    type="text"
                    className="form-control"
                    id="title"
                    required
                    value={this.state.title}
                    onChange={this.onChangeTitle}
                    name="title"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Descripcion</label>
                    <input
                    type="text"
                    className="form-control"
                    id="description"
                    required
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                    name="description"
                />
                </div>

                <div>
                    <form onSubmit={ (event) => {
                        this.handleUpload(event, this.state.file)
                        }}>
                        <input type="file" onChange={(event)=> { 
                            this.onChangeFile(event) 
                        }}/>

                        <button disabled={!this.state.file}>Atualizar firebase</button>

                    </form>
                    <img src={this.url} alt="" />
                </div>

                
                <button onClick={this.saveTutorial} className="btn btn-success">
                    Subir
                </button>
            </div>
            )}
        </div>
        );
    }
}