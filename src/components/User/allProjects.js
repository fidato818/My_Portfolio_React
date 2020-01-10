import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import './Home/Home.css'
// import $ from 'jquery'
import Typed from 'react-typed';
// import '../../style.css';
// import OwlCarousel from 'react-owl-carousel';
// import shuffle from "lodash.shuffle";
import { Flipper, Flipped } from 'react-flip-toolkit';
import loading from '../../images/24.gif';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.css';
import logo from '../../images/logo.jpg';
import githubLogo from '../../images/github-p-500.png'
import { Icon, } from 'react-icons-kit'
import { facebookOfficial } from 'react-icons-kit/fa/facebookOfficial'
import { locationArrow } from 'react-icons-kit/fa/locationArrow'
import { heart } from 'react-icons-kit/fa/heart'
import { whatsapp } from 'react-icons-kit/fa/whatsapp'
import { github } from 'react-icons-kit/fa/github'
import { linkedinSquare } from 'react-icons-kit/fa/linkedinSquare'
import ReactTooltip from 'react-tooltip'
// import ReadMoreReact from 'read-more-react';
import firebase from './../../config/firebase'
import ReactHtmlParser from 'react-html-parser';
import {

    Container,
    Row, Button,


} from 'reactstrap';
import Navigations from '../../config/navbar'
class Books extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            backdrop: 'static',
            id: null,
            fileName: null,
            body: null,
            buttonLink: null,
            githubLink: null,
            imagePage: null,
            selectedPostIndex: "",
            arr: [],
            result: [],
            textSearch: "",


        }
    }
    toggle = (id, fileName, body, buttonLink, githubLink, imagePage) => {
        this.setState({
            modal: !this.state.modal,
            id: id,
            fileName: fileName,
            body: body,
            buttonLink: buttonLink,
            githubLink: githubLink,
            imagePage: imagePage
        });
        // console.log(id)
        // console.log(fileName)
        // console.log(body)
        // console.log(buttonLink)
        // console.log(githubLink)
    }
    all(e) {
        const { arr } = this.state;
        const textSearch = "";
        // console.log(list)
        const result = arr.filter(elem => {
            // return elem.name.substring(0, textSearch.length).toUpperCase() == textSearch.toUpperCase()
            return elem.category.toLowerCase().indexOf(textSearch) >= 0;
        });
        this.setState({
            result,
            textSearch
        });
    }
    htmlAndCss(e) {
        const { arr } = this.state;
        const textSearch = "htmlandcss";
        // console.log(list)
        const result = arr.filter(elem => {
            // return elem.name.substring(0, textSearch.length).toUpperCase() == textSearch.toUpperCase()
            return elem.category.toLowerCase().indexOf(textSearch) >= 0;
        });
        this.setState({
            result,
            textSearch
        });
    }
    javaScript(e) {
        const { arr } = this.state;
        const textSearch = "javascript";
        // console.log(list)
        const result = arr.filter(elem => {
            // return elem.name.substring(0, textSearch.length).toUpperCase() == textSearch.toUpperCase()
            return elem.category.toLowerCase().indexOf(textSearch) >= 0;
        });
        this.setState({
            result,
            textSearch
        });
    }
    reactjs(e) {
        const { arr } = this.state;
        const textSearch = "react";
        // console.log(list)
        const result = arr.filter(elem => {
            // return elem.name.substring(0, textSearch.length).toUpperCase() == textSearch.toUpperCase()
            return elem.category.toLowerCase().indexOf(textSearch) >= 0;
        });
        this.setState({
            result,
            textSearch
        });
    }
    reactNative(e) {
        const { arr } = this.state;
        const textSearch = "react native";
        // console.log(list)
        const result = arr.filter(elem => {
            // return elem.name.substring(0, textSearch.length).toUpperCase() == textSearch.toUpperCase()
            return elem.category.toLowerCase().indexOf(textSearch) >= 0;
        });
        this.setState({
            result,
            textSearch
        });
    }

    componentDidMount() {
        this.firebaseRef = firebase.database().ref("Projects");
        this.firebaseRef.on('value', (snapshot) => {
            let message = snapshot.val();
            console.log(message)
            var newArr = []
            for (let word in message) {
                console.log(message[word].pushKey);
                newArr.push({
                    createAt: message[word].createAt,
                    category: message[word].category,
                    newPostKey: message[word].newPostKey,
                    headingName: message[word].headingName,
                    body: message[word].body,
                    githubLink: message[word].githubLink,
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

    // shuffle = () =>
    // this.setState(({ data }) => ({
    //   data: shuffle(data)
    // }));
    render() {
        const { arr, fileName, body, buttonLink, githubLink, imagePage, category, result, textSearch } = this.state;
        console.log(category)
        const list = textSearch.length ? result : arr;
        const html = body
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
                        <div style={{ borderBottom: '3px solid black' }}>
                            <h1 style={{ color: 'rgb(118, 102, 223)' }}>My Projects</h1>
                        </div>
                        <br />
                        <Flipper flipKey={this.state.result.join("")}>
                            {/* <button onClick={this.shuffle}> shuffle</button> */}
                            <div class="col-sm-12 col-md-6 offset-md-3" style={{ display: 'inline' }}>
                                <button style={{ marginRight: 10 }} type="button" class="btn btn-outline-dark " onClick={this.all.bind(this)}>All</button>
                                <button style={{ marginRight: 10 }} type="button" class="btn btn-outline-dark " onClick={this.htmlAndCss.bind(this)}>HTML & CSS</button>
                                <button style={{ marginRight: 10 }} type="button" class="btn btn-outline-dark " onClick={this.javaScript.bind(this)}>JavaScript</button>
                                <button style={{ marginRight: 10 }} type="button" class="btn btn-outline-dark " onClick={this.reactjs.bind(this)}>REACT</button>
                                <button style={{ marginRight: 10 }} type="button" class="btn btn-outline-dark " onClick={this.reactNative.bind(this)}>REACT NATIVE</button>
                            </div>

                            {!list.length ? (
                                <div
                                    style={{
                                        position: "absolute",
                                        left: "50%",
                                        marginTop: '10%',

                                        // top: "50%",
                                        transform: "translate(-50%, -50%)"
                                    }}
                                >
                                    <img src={loading} />
                                </div>
                            ) : (<Row className='mt-5' >
                                {list.map((e, i) => {
                                    return (
                                        <Flipped key={e} flipId={e} id={i}>
                                            <div class="col-sm-12 col-md-6 ">
                                                {/* <h2 class="sector">Education - Permanent</h2> */}
                                                <div class="box20 " style={{ marginBottom: 30 }}>
                                                    <img src={e.downloadURL} style={{ height: 300, }} />
                                                    <div class="box-content">
                                                        <i class="fas fa-university circle-icon"></i>
                                                        <span style={{ display: 'none' }}>{e.category}
                                                        </span>
                                                        <h3 class="title">{e.headingName}</h3>
                                                        <br />
                                                        <button type="button" class="btn btn-outline-light" onClick={() => this.toggle(e.newPostKey, e.headingName, e.body, e.buttonLink, e.githubLink, e.downloadURL)} data-toggle="modal" data-target="#exampleModalScrollable" data-tip="link" data-place="right">Learn More</button>
                                                        {/* <a className='asd' style={{ color: 'white' }} ><Icon size={32} icon={locationArrow} /></a> */}
                                                    </div>
                                                </div>

                                                <div class="modal fade" id="exampleModalScrollable" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                                                    {/* aria-labelledby="staticBackdropLabel"  */}
                                                    <div class="modal-dialog modal-dialog-scrollable" role="document">
                                                        <div class="modal-content">
                                                            <div class="modal-header">
                                                                <h5 class="modal-title" id="exampleModalScrollableTitle">{fileName}</h5>
                                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>

                                                            <div class="modal-body">
                                                                <img src={imagePage} class="img-thumbnail" alt="Responsive image"></img>
                                                                <p>Description:  {ReactHtmlParser(html)}</p>
                                                                <span style={{ display: 'none' }}>{category}
                                                                </span>
                                                                <Button className="float-right" href={buttonLink} target="_blank" color="primary" outline block>View</Button>
                                                            </div>
                                                            <div class="modal-footer" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                <a href={githubLink} target="_blank">
                                                                    <img style={{ justifyContent: 'flex-start', cursor: 'pointer', height: 40 }} src={githubLogo} />
                                                                </a>

                                                                {/* <Button style={{ justifyContent: 'flex-start' }} href='{link}' target="_blank" color="primary" outline >Download</Button> */}
                                                                <button style={{ justifyContent: 'flex-end' }} type="button" class="btn btn-outline-dark" data-dismiss="modal">Close</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Flipped>
                                        // </div>
                                        // </div>

                                    )
                                })}
                            </Row>)}
                        </Flipper>
                    </div>
                </Container>
            </div>

        )
    }
}

export default Books
