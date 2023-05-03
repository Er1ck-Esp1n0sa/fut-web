import React, { Component } from "react";
import HyperDataService from "../services/hyper.services";
import Hyper from "./hyper.component";

export default class HyperList extends Component {
    constructor(props) {
        super(props);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveTutorial = this.setActiveTutorial.bind(this);
        this.onDataChange = this.onDataChange.bind(this);

        this.state = {
            tutorials: [],
            currentTutorial: null,
            currentIndex: -1,
        };

        this.unsubscribe = undefined;
    }

    componentDidMount() {
        this.unsubscribe = HyperDataService.getAll().orderBy("title", "asc").onSnapshot(this.onDataChange);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onDataChange(items) {
        let tutorials = [];

        items.forEach((item) => {
            let id = item.id;
            let data = item.data();
            tutorials.push({
                id: id,
                title: data.title,
                description: data.description,
                published: data.published,
                url: data.url
            });
        });

        this.setState({
            tutorials: tutorials,
        });
    }

    refreshList() {
        this.setState({
            currentTutorial: null,
            currentIndex: -1,
        });
    }

    setActiveTutorial(tutorial, index) {
        this.setState({
            currentTutorial: tutorial,
            currentIndex: index,
        });
    }


    // ...

    render() {
        const { tutorials, currentTutorial, currentIndex } = this.state;

        return (
            <div className="list-row">
                <div className="col-md-6 bg-dark mx-auto">
                    <h4>Lista de Hypercars</h4>

                    <ul className="list-group">
                        {tutorials &&
                            tutorials.map((tutorial, index) => (
                                <li
                                    className={"list-group-item" + (index === currentIndex ? "active" : "")}
                                    onClick={() => this.setActiveTutorial(tutorial, index)}
                                    key={index}
                                >
                                    {tutorial.title}
                                </li>
                            ))}
                    </ul>
                </div>
                <div className="col-md-6 bg-dark mx-auto" >
                    {currentTutorial ? (
                        <Hyper
                            tutorial={currentTutorial}
                            refreshList={this.refreshList}
                        />
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a Hypercar...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}