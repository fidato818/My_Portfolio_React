import React, { Component } from 'react'
import loading from '../../images/24.gif';
import firebase from './../../config/firebase'
import '../../Sidebar.css'
import Sidebar from './../../config/Sidebar'
import { update_user } from '../../store/actions/actions';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom'
import {
    Row, Col,
} from 'reactstrap';
import Navigations from './../../config/navbarAdmin'
class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogs: [],
            books: [],
            download: [],
            project: [],
            displayEmail: '',
            uid: "",
            loginUser: this.props.user.user.uid
        };
    }

    async componentDidMount() {
        this.blogData()
        this.bookData()
        this.downloadData()
        this.projectData()
        // this.authListener();
        console.log("this.props in Admin", this.props.user)
    }

    authListener() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log("user changed..", user);
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
    blogData = () => {
        this.firebaseRef = firebase.database().ref("BlogData");
        this.firebaseRef.on('value', (snapshot) => {
            let message = snapshot.val();
            console.log(message)
            var newArr = []
            for (let word in message) {
                console.log(message[word].pushKey);
                newArr.push({
                    createAt: message[word].createAt,
                    newPostKey: message[word].newPostKey,
                    heading: message[word].heading,
                    description: message[word].description,
                    downloadURL: message[word].downloadURL,
                });
            }
            // console.log(message);
            // // arr.push(message)
            this.setState({ blogs: newArr });
        }
        )
    }

    bookData = () => {
        this.firebaseRef = firebase.database().ref("Books");
        this.firebaseRef.on('value', (snapshot) => {
            let message = snapshot.val();
            console.log(message)
            var newArr = []
            for (let word in message) {
                console.log(message[word].pushKey);
                newArr.push({
                    createAt: message[word].createAt,
                    newPostKey: message[word].newPostKey,
                    bookName: message[word].bookName,
                    category: message[word].category,
                    author: message[word].author,
                    buttonLink: message[word].buttonLink,
                    downloadURL: message[word].downloadURL,
                });
            }
            // console.log(message);
            // // arr.push(message)
            this.setState({ books: newArr });
        }
        )

    }
    downloadData = () => {
        this.firebaseRef = firebase.database().ref("Downloads");
        this.firebaseRef.on('value', (snapshot) => {
            let message = snapshot.val();
            console.log(message)
            var newArr = []
            for (let word in message) {
                console.log(message[word].pushKey);
                newArr.push({
                    createAt: message[word].createAt,
                    newPostKey: message[word].newPostKey,
                    fileName: message[word].fileName,
                    body: message[word].body,

                    buttonLink: message[word].buttonLink,
                    downloadURL: message[word].downloadURL,
                });
            }
            // console.log(message);
            // // arr.push(message)
            this.setState({ download: newArr });
        }
        )

    }
    projectData = () => {
        this.firebaseRef = firebase.database().ref("Projects");
        this.firebaseRef.on('value', (snapshot) => {
            let message = snapshot.val();
            console.log(message)
            var newArr = []
            for (let word in message) {
                console.log(message[word].pushKey);
                newArr.push({
                    createAt: message[word].createAt,
                    newPostKey: message[word].newPostKey,
                    headingName: message[word].headingName,
                    description: message[word].description,
                    githubLink: message[word].githubLink,
                    buttonLink: message[word].buttonLink,
                    downloadURL: message[word].downloadURL,
                });
            }
            // console.log(message);
            // // arr.push(message)
            this.setState({ project: newArr });
        }
        )

    }



    render() {
        const { blogs, books, download, project, displayEmail, uid, loginUser } = this.state
        const { user } = this.props
        if (!loginUser)
            return <Redirect to="/login" />
        console.log("this.props in Admin  in render", this.props.user.user.uid)
        return (
            <div >
                <Navigations />
                <Sidebar />
                {/* <Container> */}

                <div>
                    <div id="wrapper" className="toggled">
                        <div id="page-content-wrapper">
                            <div className="container-fluid" style={{ marginTop: 65 }}>
                                {/* <h1>Simple Sidebar</h1>
                                <p>This template has a responsive menu toggling system. The menu will appear collapsed on smaller screens, and will appear non-collapsed on larger screens. When toggled using the button below, the menu will appear/disappear. On small screens, the page content will be pushed off canvas.</p>
                                <p>Make sure to keep all page content within the <code>#page-content-wrapper</code>.</p> */}
                                <div style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    {!download.length ? (
                                        <div
                                            style={{
                                                position: "absolute",
                                                left: "50%",
                                                // top: "100%",


                                                transform: "translate(-50%, -50%)"
                                            }}
                                        >
                                            <img src={loading} />
                                        </div>
                                    ) : (
                                            <Row className='mt-5' >
                                                <Col md='3' sm="12" style={{ marginBottom: 30 }}>
                                                    <div class="card border-info mx-sm-1 p-3">


                                                        <div class="text-info text-center mt-3"><h4>Blogs</h4></div>
                                                        <div class="text-info text-center mt-2"><h1>{blogs.length}</h1></div>
                                                    </div>
                                                </Col>

                                                <Col md='3' sm="12" >

                                                    <div class="card border-success mx-sm-1 p-3">
                                                        {/* <div class="card border-success shadow text-success p-3 my-card"><span class="fa fa-eye" aria-hidden="true"></span></div> */}
                                                        <div class="text-success text-center mt-3"><h4>Books</h4></div>
                                                        <div class="text-success text-center mt-2"><h1>{books.length}</h1></div>
                                                    </div>
                                                </Col>
                                                <Col md='3' sm="12" >

                                                    <div class="card border-danger mx-sm-1 p-3">
                                                        {/* <div class="card border-danger shadow text-danger p-3 my-card" ><span class="fa fa-heart" aria-hidden="true"></span></div> */}
                                                        <div class="text-danger text-center mt-3"><h4> Downloads</h4></div>
                                                        <div class="text-danger text-center mt-2"><h1>{download.length}</h1></div>
                                                    </div>

                                                </Col>
                                                <Col md='3' sm="12" >


                                                    <div class="card border-warning mx-sm-1 p-3">
                                                        {/* <div class="card border-warning shadow text-warning p-3 my-card" ><span class="fa fa-inbox" aria-hidden="true"></span></div> */}
                                                        <div class="text-warning text-center mt-3"><h4>Projects</h4></div>
                                                        <div class="text-warning text-center mt-2"><h1>{project.length}</h1></div>
                                                    </div>

                                                </Col>
                                            </Row>
                                        )}
                                </div>
                            </div>
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


export default withRouter(connect(mapStateToProps, null)(Admin));

