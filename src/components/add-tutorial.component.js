import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";

export default class AddTutorial extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeGenero = this.onChangeGenero.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.saveTutorial = this.saveTutorial.bind(this);
        this.newTutorial = this.newTutorial.bind(this);

        this.state = {
            name: "",
            email: "",
            gender: "",
            status: "",
            genderOptions: ["male", "female"],
            statusOptions: ["inactive", "active"],
            submitted: false,
            emailError: ""
        };
    }

    onChangeTitle(e) {
        const title = e.target.value;
        this.setState({ name: title });
    }

    onChangeDescription(e) {
        const description = e.target.value;
        this.setState({ email: description });
    }

    onChangeGenero(e) {
        const gender = e.target.value;
        this.setState({ gender: gender });
    }

    onChangeStatus(e) {
        const status = e.target.value;
        this.setState({ status: status });
    }

    validateEmail(email) {
        // Expresión regular para validar el formato del correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    saveTutorial() {
        const { name, email, gender, status } = this.state;

        if (!name || !email || !gender || !status) {
            // Verificar si todos los campos están llenos
            alert("Por favor, complete todos los campos");
            return;
        }

        if (!this.validateEmail(email)) {
            // Verificar si el correo electrónico tiene un formato válido
            this.setState({ emailError: "Por favor, ingrese un correo electrónico válido" });
            return;
        }

        var data = {
            name: name,
            email: email,
            gender: gender,
            status: status
        };

        TutorialDataService.create(data)
            .then(response => {
                this.setState({
                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newTutorial() {
        this.setState({
            name: "",
            email: "",
            gender: "",
            status: "",
            submitted: false,
            emailError: ""
        });
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>El usuario se creó con éxito!</h4>
                        <button className="btn btn-success" onClick={this.newTutorial}>
                            Añadir usuario
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="title">Nombre</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                value={this.state.name}
                                onChange={this.onChangeTitle}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Correo</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                value={this.state.email}
                                onChange={this.onChangeDescription}
                            />
                            {this.state.emailError && <div className="error">{this.state.emailError}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="gender">Género</label>
                            {this.state.genderOptions.map(option => (
                                <div key={option} className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="gender"
                                        value={option}
                                        checked={this.state.gender === option}
                                        onChange={this.onChangeGenero}
                                    />
                                    <label className="form-check-label" htmlFor={option}>
                                        {option}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div className="form-group">
                            <label htmlFor="status">Status</label>
                            {this.state.statusOptions.map(option => (
                                <div key={option} className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="status"
                                        value={option}
                                        checked={this.state.status === option}
                                        onChange={this.onChangeStatus}
                                    />
                                    <label className="form-check-label" htmlFor={option}>
                                        {option}
                                    </label>
                                </div>
                            ))}
                        </div>

                        <button onClick={this.saveTutorial} className="btn btn-success">
                            Añadir usuario
                        </button>
                    </div>
                )}
            </div>
        );
    }
}
