import React, {Component} from "react";
import TutorialDataService from "../services/tutorial.service";
import {withRouter} from '../common/with-router';

class Tutorial extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeGenero = this.onChangeGenero.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.getTutorial = this.getTutorial.bind(this);
        this.updatePublished = this.updatePublished.bind(this);
        this.updateTutorial = this.updateTutorial.bind(this);
        this.deleteTutorial = this.deleteTutorial.bind(this);

        this.state = {
            currentTutorial: {
                id: null,
                name: "",
                email: "",
                gender: "",
                status: ""
            },
            message: "",
            genderOptions: ["male", "female"],
            statusOptions: ["inactive", "active"]
        };

    }

    componentDidMount() {
        this.getTutorial(this.props.router.params.id);
        const {currentTutorial} = this.state;
        this.setState({
            isChecked: currentTutorial.published
        });
    }


    onChangeTitle(e) {
        const title = e.target.value;

        this.setState(function (prevState) {
            return {
                currentTutorial: {
                    ...prevState.currentTutorial, name: title
                }
            };
        });
    }

    onChangeDescription(e) {
        const description = e.target.value;

        this.setState(prevState => ({
            currentTutorial: {
                ...prevState.currentTutorial, email: description
            }
        }));
    }

    onChangeGenero(e) {
        const gender = e.target.value;

        this.setState(prevState => ({
            currentTutorial: {
                ...prevState.currentTutorial, gender: gender
            }
        }));
    }

    onChangeStatus(e) {
        const status = e.target.value;

        this.setState(prevState => ({
            currentTutorial: {
                ...prevState.currentTutorial, status: status
            }
        }));
    }


    getTutorial(id) {
        TutorialDataService.get(id)
            .then(response => {
                this.setState({
                    currentTutorial: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updatePublished(status) {
        var data = {
            id: this.state.currentTutorial.id,
            title: this.state.currentTutorial.title,
            description: this.state.currentTutorial.description,
            published: status
        };

        TutorialDataService.update(this.state.currentTutorial.id, data)
            .then(response => {
                this.setState(prevState => ({
                    currentTutorial: {
                        ...prevState.currentTutorial, published: status
                    }
                }));
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }


    updateTutorial() {
        TutorialDataService.update(this.state.currentTutorial.id, this.state.currentTutorial)
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "El usuario se ha actualizado con exito!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteTutorial() {
        TutorialDataService.delete(this.state.currentTutorial.id)
            .then(response => {
                console.log(response.data);
                this.props.router.navigate('/tutorials');
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const {currentTutorial} = this.state;

        return (<div>
            {currentTutorial ? (<div className="edit-form">
                <h4>Tutorial</h4>
                <form>
                    <div className="form-group">
                        <label htmlFor="title">Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={currentTutorial.name}
                            onChange={this.onChangeTitle}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Correo</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            value={currentTutorial.email}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="gender">Género</label>
                        {this.state.genderOptions.map(option => (<div key={option} className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value={option}
                                checked={this.state.currentTutorial.gender === option}
                                onChange={this.onChangeGenero}
                            />
                            <label className="form-check-label" htmlFor={option}>
                                {option}
                            </label>
                        </div>))}
                    </div>
                    <div className="form-group">
                        <label htmlFor="statuss">Status</label>
                        {this.state.statusOptions.map(option => (<div key={option} className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value={option}
                                checked={this.state.currentTutorial.status === option}
                                onChange={this.onChangeStatus}
                            />
                            <label className="form-check-label" htmlFor={option}>
                                {option}
                            </label>
                        </div>))}
                    </div>

                </form>

                <button
                    className="badge badge-danger mr-2"
                    onClick={this.deleteTutorial}
                >
                    Borrar
                </button>

                <button
                    type="submit"
                    className="badge badge-success"
                    onClick={this.updateTutorial}
                >
                    Actualizar
                </button>
                <p>{this.state.message}</p>
            </div>) : (<div>
                <br/>
                <p>Por favor selecciona un usuario...</p>
            </div>)}
        </div>);
    }
}

export default withRouter(Tutorial);