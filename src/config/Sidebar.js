import React, { Component } from 'react'
import logo from '../images/logo.jpg';
import { Icon, withBaseIcon } from 'react-icons-kit'
import { facebookOfficial } from 'react-icons-kit/fa/facebookOfficial'
import { heart } from 'react-icons-kit/fa/heart'
import { whatsapp } from 'react-icons-kit/fa/whatsapp'
import { github } from 'react-icons-kit/fa/github'
import { linkedinSquare } from 'react-icons-kit/fa/linkedinSquare'
import { fileTextO } from 'react-icons-kit/fa/fileTextO'
import firebase from './firebase'
import '../Sidebar.css'
import Navigations from './navbarAdmin'
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

class Books extends Component {
    constructor(props) {
        super(props);

        this.state = {
            blogs: [],
            books: [],
            downloads: []

        };


    }

    componentDidMount() {
        this.blogData()

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
    render() {
        const { blogs, books, downloads } = this.state
        return (
            <div >
                <Navigations />
                {/* <Container> */}
                <div >
                </div>
                <div  >
                    <div id="wrapper" className="toggled">
                        <div id="sidebar-wrapper">
                            <ul className="sidebar-nav">
                                <li className="sidebar-brand">
                                    <a href="#">
                                        Start Bootstrap
                                 </a>
                                </li>
                                <li>
                                    <a href="/admin">Dashboard</a>
                                </li>
                                <li>
                                    <a href="/AddBlogs">Add Blogs</a>
                                </li>
                                <li>
                                    <a href="/addDownloads">Add Downloads</a>
                                </li>
                                <li>
                                    <a href="/addbooks">Add Books</a>
                                </li>
                                <li>
                                    <a href="/addProjects">Add Projects</a>
                                </li>
                                {/* <li>
                                    <a href="#">Services</a>
                                </li>
                                <li>
                                    <a href="#">Contact</a>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}


export default Books 
