import React, { Component } from 'react'
import logo from '../../images/logo.jpg';
import { Icon, withBaseIcon } from 'react-icons-kit'
// import { facebookOfficial } from 'react-icons-kit/fa/facebookOfficial'
// import { heart } from 'react-icons-kit/fa/heart'
// import { whatsapp } from 'react-icons-kit/fa/whatsapp'
// import { github } from 'react-icons-kit/fa/github'
// import { linkedinSquare } from 'react-icons-kit/fa/linkedinSquare'
import { fileTextO } from 'react-icons-kit/fa/fileTextO'
import firebase from './../../config/firebase'
// import ReadMoreReact from 'read-more-react';
// import renderHTML from "react-render-html";
import ReactHtmlParser from 'react-html-parser';
import loading from '../../images/24.gif';
import {
    Container,
    Row, Button,

} from 'reactstrap';
import Navigations from '../../config/navbar'
class Downloads extends Component {
    constructor(props) {
        super(props);

        this.state = {
            arr: [],
            modal: false,
            backdrop: 'static',
            id: null, fileName: null, body: null, link: null
        };


    }

    toggle = (id, fileName, body, link) => {
        this.setState({
            modal: !this.state.modal,
            id: id,
            fileName: fileName,
            body: body,
            link: link
        });
    }
    close = (e) => {
        this.setState({
            modal: false,

        });
        // console.log(e)
    }
    executeOnClick(isExpanded) {
        console.log(isExpanded);
    }
    componentDidMount() {
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
            this.setState({ arr: newArr });
        }
        )

    }
    render() {
        const { arr, fileName, body, link } = this.state

        const html = body

        return (

            <div >
                <Navigations />
                <Container>
                    <div style={{ marginTop: 65 }}>
                    </div>

                    <div style={{ marginTop: "35" }} >
                        <h1 className="text-center" style={{ color: 'rgb(118, 102, 223)', fontSize: 50, }}>
                            <Icon size={32} icon={fileTextO} /> My Downloads

                        </h1>

                        {/* <h5 className="text-center"></h5> */}
                        {!arr.length ? (
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
                            {arr && arr.map((e, i) => {
                                return (
                                    <div class="col-xl-4 mb-4 col-md-4 col-sm-12">
                                        <div class="card downloadCardClass">
                                            <img class="card-img-top" src={e.downloadURL} alt="Card image cap" height="200" />
                                            <div class="card-body">
                                                <h2 class="card-title border-bottom pb-3">{e.fileName}</h2>
                                                <div>

                                                    {/* <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop={this.state.backdrop}>
                                                        <ModalHeader toggle={this.toggle}>{fileName} </ModalHeader>
                                                        <ModalBody>
                                                            {ReactHtmlParser(html)}
                                                            <Button className="float-right" href={link} target="_blank" color="primary" outline block>Download</Button>
                                                        </ModalBody>
                                                        <ModalFooter style={{ display: 'flex', justifyContent: 'space-between' }}>

                                                            <Button style={{ justifyContent: 'flex-start' }} href={link} target="_blank" color="primary" outline >Download</Button>
                                                            <Button style={{ justifyContent: 'flex-end' }} color="secondary" onClick={() => this.close()} outline>Close</Button>

                                                        </ModalFooter>
                                                    </Modal> */}
                                                    <div class="modal fade" style={{ fontFamily: "Times-Roman" }} id="exampleModalScrollable" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
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
                                                                    {ReactHtmlParser(html)}
                                                                    <Button className="float-right" href={link} target="_blank" color="primary" outline block>Download</Button>
                                                                </div>
                                                                <div class="modal-footer" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                    <Button style={{ justifyContent: 'flex-start' }} href={link} target="_blank" color="primary" outline >Download</Button>
                                                                    <button style={{ justifyContent: 'flex-end' }} type="button" class="btn btn-outline-dark" data-dismiss="modal">Close</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button onClick={() => this.toggle(e.newPostKey, e.fileName, e.body, e.buttonLink)} type="button" class="btn btn-block btn-outline-primary" data-toggle="modal" data-target="#exampleModalScrollable">
                                                    View
                                                </button>
                                                {/* <Button onClick={() => this.toggle(e.newPostKey, e.fileName, e.body, e.buttonLink)} className="float-right" color="primary" outline block></Button> */}
                                                {/* <Button className="float-right" style={{ display: 'inline', marginRight: 5 }} href={e.buttonLink} target="_blank" color="primary" outline>Edit</Button> */}


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

export default Downloads