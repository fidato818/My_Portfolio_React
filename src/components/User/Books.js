import React, { Component } from 'react'
import logo from '../../images/logo.jpg';
import { Icon, withBaseIcon } from 'react-icons-kit'
import { facebookOfficial } from 'react-icons-kit/fa/facebookOfficial'
import { heart } from 'react-icons-kit/fa/heart'
import { whatsapp } from 'react-icons-kit/fa/whatsapp'
import { github } from 'react-icons-kit/fa/github'
import { linkedinSquare } from 'react-icons-kit/fa/linkedinSquare'
import { fileTextO } from 'react-icons-kit/fa/fileTextO'
import firebase from './../../config/firebase'
import loading from '../../images/24.gif';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav, 
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    Container,
    DropdownItem, Row, Col,
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,


} from 'reactstrap';
import Navigations from '../../config/navbar'
class Books extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: [
            ]
        };


    }

    componentDidMount() {
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
            this.setState({ arr: newArr });
        }
        )

    }
    render() {
        const { arr } = this.state
        return (

            <div >
                <Navigations />
                <Container>
                    <div style={{ marginTop: 65 }}>
                    </div>

                    <div style={{ marginTop: "35" }} >
                        {/* <h1 className="text-center" style={{ color: 'rgb(118, 102, 223)', fontSize: 50, }}>
                            <Icon size={32} icon={fileTextO} /> My Book Shelf

                        </h1> */}
                        <div style={{borderBottom: '3px solid black'}}>
                            <h1 style={{color:'rgb(118, 102, 223)'}}>My Book Shelf</h1>
                        </div>

                        {/* <h5 className="text-center">Here are a few recent design projects</h5> */}
                        {!arr.length ? (
                            <div
                                style={{
                                    position: "absolute",
                                    left: "50%",
                                    top: "50%",
                                    transform: "translate(-50%, -50%)"
                                }}
                            >
                                <img src={loading} />
                            </div>
                        ) : (
                                <Row className='mt-5' >
                                    {this.state.arr.map((e) => {
                                        return (
                                            <div className="col-md-6">
                                                <div className="card  flex-md-row mb-4 shadow-sm h-md-250" style={{ borderColor: 'rgb(118, 102, 223)' }}>
                                                    <img className="card-img-right flex-auto d-none d-lg-block" alt="Thumbnail [200x250]"
                                                        src={e.downloadURL || "https://via.placeholder.com/400x300"} style={{ width: '240px', height: '250px' }} />
                                                    <div className="card-body d-flex flex-column align-items-start">

                                                        <h6 className="mb-0">
                                                            <strong class="d-inline-block mb-2  " style={{ cursor: 'pointer', color: 'rgb(118, 102, 223)' }}>{e.bookName}</strong>
                                                        </h6>
                                                        <h6 className="mb-0">
                                                            <a className="text-dark" href="#"></a>
                                                        </h6>
                                                        <div className="mb-1 text-muted small">Category: {e.category}</div>
                                                        <p className="card-text mb-auto">Author: {e.author}</p>

                                                        <a className="btn btn-outline-primary btn-md " role="button" href={e.buttonLink}
                                                            target="blank">Download</a>


                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </Row>)}
                    </div>
                </Container>
            </div>

        )
    }
}

export default Books