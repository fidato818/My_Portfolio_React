import React, { Component } from 'react'
import { Icon, } from 'react-icons-kit'
import { AvForm, AvField, } from 'availity-reactstrap-validation';
import { fileTextO } from 'react-icons-kit/fa/fileTextO'
import firebase from '../../config/firebase'
import { Redirect } from 'react-router-dom'

import {
    // Container,
    // Row, Col,
    Button,
    FormGroup, FormText, Form, Label, Input, Alert
} from 'reactstrap';
import '../../Login.css'
import { update_user, remove_user } from '../../store/actions/actions';
import { connect } from 'react-redux';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            signinState: false,
            errorMessage: "",
            // loginUser: this.props.userlogin.user.uid
            visible: true
        };
        this.onDismiss = this.onDismiss.bind(this);
    }

    onDismiss() {
        this.setState({ visible: false });
    }

    submitSignup = () => {
        const { history } = this.props;
        const { name, password, email } = this.state;
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(res => {
                var userId = firebase.auth().currentUser.uid;
                firebase
                    .database()
                    .ref("Users/" + userId)
                    .set({
                        name,
                        email,
                        password,
                        userId
                    })
                    .then((e) => {
                        console.log("Document successfully written!", e);
                        alert("Successfully Register");
                        history.push('admin');
                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                    });
            });
    }


    handleKeyPress = (e) => {
        // if (event.charCode == 13) {
        //     this.submitLogin()
        // }
        if (e.charCode == 13) {
            this.submitLogin()
        }
        if (e.keyCode == 13) {
            alert('Enter... (KeyDown, use keyCode)');
        }
    }
    submitLogin = (event) => {
        // event.preventDefault();
        const { history } = this.props;
        const { email, password } = this.state;
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((user) => {
                this.props.store_user(user);

                console.log("Document successfully written!");
                history.push('admin');
            })
            .catch((error) => {
                // console.error("Error writing document: ", `${error}`);
                // alert(`${error}`)
                this.setState({
                    errorMessage: error.message,
                    visible: true
                })

            });
        // console.log("succ");
    }

    loginState() {
        this.setState({
            signinState: !this.state.signinState
        })
        console.log('sc', !this.state.signinState)
    }
    authListener() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log("user changed..", user.email);
                this.setState({
                    uid: user.uid,
                    displayEmail: user.email
                });
            } else {
                // No user is signed in.
                // browserHistory.push("/signin");
            }
        });
    }

    componentDidMount() {
        this.authListener();

    }



    render() {
        const { uid, loginUser, errorMessage } = this.state
        console.log(errorMessage)
        if (loginUser || uid)
            return <Redirect to="/Admin" />
        function handleName(event) {
            this.setState({ name: event.target.value });
        }
        function handleEmail(event) {
            this.setState({ email: event.target.value });
        }
        function handlePassword(event) {
            this.setState({ password: event.target.value });
        }
        return (
            <div>

                <div class="sidenav">
                    <div class="login-main-text">
                        <h2>Adnan Ahmed | Portfolio <br /> Admin</h2>
                        <p>Login or register from here to access.</p>
                    </div>
                </div>
                <div class="main">
                    {errorMessage && <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                        {errorMessage}
                    </Alert>}
                    <div class="col-md-6 col-sm-12">

                        <div class="login-form">
                            {!this.state.signinState && <AvForm>
                                <h1 className="text-center" style={{ color: 'rgb(118, 102, 223)', fontSize: 50, }}>
                                    <Icon size={32} icon={fileTextO} /> Login
                                   </h1>
                                {/* With AvField */}


                                <AvField name="email" label="Email" id="exampleEmail" placeholder="adnan@gmail.com" required onChange={handleEmail.bind(this)} onKeyPress={this.handleKeyPress}/>

                                <AvField name="password" id="examplePassword" type="password" label="Password" placeholder="*******" required onChange={handlePassword.bind(this)} onKeyPress={this.handleKeyPress} />


                                {/* <AvField name="name" label="Name (default error message)" type="text" errorMessage="Invalid name" validate={{
                                       required: { value: true },
                                       pattern: { value: '^[A-Za-z0-9]+$' },
                                       minLength: { value: 6 },
                                       maxLength: { value: 16 }
                                   }} />
                                   <AvField name="nameCustomMessage" label="Name (custom error message)" type="text" validate={{
                                       required: { value: true, errorMessage: 'Please enter a name' },
                                       pattern: { value: '^[A-Za-z0-9]+$', errorMessage: 'Your name must be composed only with letter and numbers' },
                                       minLength: { value: 6, errorMessage: 'Your name must be between 6 and 16 characters' },
                                       maxLength: { value: 16, errorMessage: 'Your name must be between 6 and 16 characters' }
                                   }} /> */}
                                {/* With AvGroup AvInput and AvFeedback to build your own */}
                                <FormGroup>
                                    {/* <Button style={{ float: 'left' }} onClick={this.loginState.bind(this)}>Signup</Button> */}
                                    <Button style={{ float: 'right' }} onClick={this.submitLogin} color="primary" outline block>Submit</Button>
                                </FormGroup>
                            </AvForm>}
                            {this.state.signinState && <AvForm>
                                {/* With AvField */}
                                <h1 className="text-center" style={{ color: 'rgb(118, 102, 223)', fontSize: 50, }}>
                                    <Icon size={32} icon={fileTextO} /> Signup
                                   </h1>
                                <AvField name="name" label="Name" id="exampleName" value={this.state.name}
                                    onChange={handleName.bind(this)} type="text" placeholder="Adnan Ahmed" required />
                                <AvField name="email" label="Email" id="exampleEmail" value={this.state.email}
                                    onChange={handleEmail.bind(this)} type="text" placeholder="adnan@gmail.com" required />
                                <AvField name="password" id="examplePassword" value={this.state.password}
                                    onChange={handlePassword.bind(this)} type="password" label="Password" placeholder="*******" required />
                                {/* <AvField name="name" label="Name (default error message)" type="text" errorMessage="Invalid name" validate={{
                                        required: { value: true },
                                        pattern: { value: '^[A-Za-z0-9]+$' },
                                        minLength: { value: 6 },
                                        maxLength: { value: 16 }
                                    }} />
                                    <AvField name="nameCustomMessage" label="Name (custom error message)" type="text" validate={{
                                        required: { value: true, errorMessage: 'Please enter a name' },
                                        pattern: { value: '^[A-Za-z0-9]+$', errorMessage: 'Your name must be composed only with letter and numbers' },
                                        minLength: { value: 6, errorMessage: 'Your name must be between 6 and 16 characters' },
                                        maxLength: { value: 16, errorMessage: 'Your name must be between 6 and 16 characters' }
                                    }} /> */}
                                {/* With AvGroup AvInput and AvFeedback to build your own */}

                                <FormGroup>
                                    <Button style={{ float: 'left' }} onClick={this.loginState.bind(this)}>Login</Button>
                                    <Button style={{ float: 'right' }} onClick={this.submitSignup}>Submit</Button>
                                </FormGroup>
                            </AvForm>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}



const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        store_user: (userlogin) => dispatch(update_user(userlogin)),
        logout_user: () => dispatch(remove_user()),
    }
}
// export default withRouter(connect()(withStyles(styles)(Navbar)));
export default connect(mapStateToProps, mapDispatchToProps)(Login);

// export default withRouter(connect(null, mapDispatchToProps)(Login));