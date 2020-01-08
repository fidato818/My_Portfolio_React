import React, { Component } from 'react'
import firebase from './../../config/firebase'
import { Icon } from 'react-icons-kit'
import { fileTextO } from 'react-icons-kit/fa/fileTextO'
// import { Icon } from 'react-icons-kit'
// import { fileTextO } from 'react-icons-kit/fa/fileTextO'
import { Card, CardImg, CardText, CardBody, } from 'reactstrap';
import Navigations from './../../config/navbar'
import _ from "lodash";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import renderHTML from "react-render-html";
import '../../App.css'
import loading from '../../images/24.gif';

export default class AddBlogDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            heading: "",
            body: "",
            key: "",
            image: null,
        }
    }

    componentDidMount() {
        const { match: { params }
        } = this.props
        this.firebaseRef = firebase.database().ref("BlogData");
        this.firebaseRef.on('value', (snapshot) => {
            snapshot.forEach((data) => {
                var movie = data.val();
                // console.log(params.id)
                // console.log(movie.newPostKey)
                if (movie.newPostKey === params.id) {
                    this.setState({
                        heading: movie.heading,
                        body: movie.body,
                        key: movie.newPostKey,
                        downloadURL: movie.downloadURL,
                        createAt: movie.createAt,
                    });
                }
            });
        });

    }

    render() {

        const { heading,
            body,
            key,
            image, createAt, downloadURL } = this.state
        // console.log(arr)

        return (




            <div style={{ marginTop: 65 }}>
                <Navigations />

                {!heading.length ? (
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
                ) : (<Card style={{ fontFamily: 'Times Roman', fontSize: 20 }}>
                    <h1 className="text-center" style={{ color: 'rgb(118, 102, 223)', fontSize: 50, }}>
                        {heading}
                    </h1>
                    <CardBody>
                        <div >

                            <span style={{ float: 'right' }}>{createAt}</span>
                        </div>
                    </CardBody>
                    <CardImg top width="100%" src={downloadURL || "https://via.placeholder.com/400x300"}
                        alt="Uploaded Images" />
                    <div class="col-md-6 mb-4 offset-md-3">
                        <CardBody>
                            {/* <CardTitle>Heading:{arr.heading}</CardTitle>
                        <CardSubtitle></CardSubtitle>
                        <CardSubtitle>Unique Id:{arr.newPostKey}</CardSubtitle> */}
                            <CardText>Description:<br />{renderHTML(body)}</CardText>
                            {/* <CardText>Description:<br />{arr.body}</CardText> */}

                            {/* <Button target="_blank" href={arr.downloadURL}>Button</Button> */}

                        </CardBody>
                    </div>
                </Card>)}
                {heading && < h2 style={{ display: 'flex', justifyContent: 'center' }}>Comment Section: Coming Soon</h2>}
            </div >
        )

    }
}