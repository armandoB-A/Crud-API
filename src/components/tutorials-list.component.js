import React, {Component} from "react";
import TutorialDataService from "../services/tutorial.service";
import {Link} from "react-router-dom";
import tutorialService from "../services/tutorial.service";

export default class TutorialsList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveTutorials = this.retrieveTutorials.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveTutorial = this.setActiveTutorial.bind(this);
        this.removeAllTutorials = this.removeAllTutorials.bind(this);

        this.removeUser = this.removeUser.bind(this);
        this.searchTitle = this.searchTitle.bind(this);

        this.state = {
            tutorials: [],
            currentTutorial: null,
            currentIndex: -1,
            searchTitle: ""
        };
    }

    componentDidMount() {
        this.retrieveTutorials();
    }

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle
        });
    }

    retrieveTutorials() {
        TutorialDataService.getAll()
            .then(response => {
                this.setState({
                    tutorials: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveTutorials();
        this.setState({
            currentTutorial: null,
            currentIndex: -1
        });
    }

    setActiveTutorial(tutorial, index) {
        this.setState({
            currentTutorial: tutorial,
            currentIndex: index
        });
    }

    removeUser(index) {
        tutorialService.delete(index).then(r => {
            console.log(r);
            this.refreshList();
        }).catch(e=>{
           console.log(e)
        });
    }

    removeAllTutorials() {
        TutorialDataService.deleteAll()
            .then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }

    searchTitle() {
        this.setState({
            currentTutorial: null,
            currentIndex: -1
        });

        TutorialDataService.findByTitle(this.state.searchTitle)
            .then(response => {
                this.setState({
                    tutorials: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { tutorials, currentTutorial, currentIndex} = this.state;

        return (
            <div className="list row">
                <div className="col-md-6">
                    <h4>LISTA DE USUARIOS</h4>

                    <ul className="list-group">
                        {tutorials &&
                            tutorials.map((tutorial, index) => (
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActiveTutorial(tutorial, tutorial.id)}
                                    key={index}
                                >
                                    {tutorial.name}
                                    <button
                                        className="m-3 btn btn-sm btn-danger"
                                        onClick={()=>this.removeUser(tutorial.id)}
                                    >
                                        Eliminar
                                    </button>
                                </li>
                            ))}
                    </ul>
                </div>
                <div className="col-md-6">
                    {currentTutorial ? (
                        <div>
                            <h3>USUARIO</h3>
                            <div>
                                <label>
                                    <strong>Nombre:</strong>
                                </label>{" "}
                                {currentTutorial.name}
                            </div>
                            <div>
                                <label>
                                    <strong>Correo:</strong>
                                </label>{" "}
                                {currentTutorial.email}
                            </div>
                            <div>
                                <label>
                                    <strong>Genero:</strong>
                                </label>{" "}
                                {currentTutorial.gender}
                            </div>
                            <div>
                                <label>
                                    <strong>Status:</strong>
                                </label>{" "}
                                {currentTutorial.status}
                            </div>

                            <Link
                                to={"/tutorials/" + currentTutorial.id}
                                className="badge badge-warning"
                            >
                                Editar
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br/>
                            <p>Selecciona un usuario...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
