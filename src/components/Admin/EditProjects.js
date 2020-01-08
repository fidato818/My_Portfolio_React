import React, { Component } from 'react'
import firebase from './../../config/firebase'
import { Icon } from 'react-icons-kit'
import { fileTextO } from 'react-icons-kit/fa/fileTextO'
import { AvForm, AvField, } from 'availity-reactstrap-validation';
import { FormGroup, Label, Button, FormText, Row, Col, CustomInput } from 'reactstrap';
import _ from "lodash";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Navigations from './../../config/navbarAdmin'
import '../../App.css'
import '../../Sidebar.css'
import Sidebar from './../../config/Sidebar'
export default class EditProjects extends Component {
    constructor(props) {
        super(props);

        this.state = {
            headingName: "",
            body: "",
            githubLink: "",
            buttonLink: "",
            arr: [],
            image: null,
            url: "",
            progress: 0,
            key: ''


        };

        this.onHandleChange = this.onHandleChange.bind(this);
    }
    handleChangeheadingName(event) {
        this.setState({ headingName: event.target.value })
    }
    onHandleChange(e) {
        this.setState({ body: e });
        console.log(this.state.body);
    }
    handleChangegithubLink(event) {
        this.setState({ githubLink: event.target.value })
    }
    handleChangeButtonLink(event) {
        this.setState({ buttonLink: event.target.value })
    }



    handleChange = e => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState(() => ({ image }));
        }
    };
    componentDidMount() {
        const { match: { params }
        } = this.props
        this.firebaseRef = firebase.database().ref("Projects");
        this.firebaseRef.on('value', (snapshot) => {
            snapshot.forEach((data) => {
                var movie = data.val();
                console.log("movie.newPostKey", movie.newPostKey)
                console.log("movie", movie)
                console.log(" params.id", params.id)
                if (movie.newPostKey === params.id) {
                    this.setState({
                        key: movie.newPostKey,
                        headingName: movie.headingName,
                        body: movie.body,
                        githubLink: movie.githubLink,
                        buttonLink: movie.buttonLink,
                        downloadURL: movie.downloadURL
                    });
                }
            });
        });

    }


    submit = () => {
        const { key, headingName, body, githubLink, buttonLink, image } = this.state
        var currentUser = firebase.auth().currentUser.uid
        if (image == null || image.name === undefined) {
            // alert('please add image')
            this.setState({
                errorImage: true
            })
        } else {
            const uploadTask = firebase.storage().ref(`Projects/${image.name}`).put(image)
                .then(snapshot => {
                    return snapshot.ref.getDownloadURL();   // Will return a promise with the download link
                })

                .then(downloadURL => {
                    console.log(`Successfully uploaded file and got download link - ${downloadURL}`);
                    // return downloadURL
                    this.setState({ url: downloadURL })

                    firebase
                        .database()
                        .ref("Projects/" + key).update({
                            currentUser,
                            headingName,
                            body, githubLink, buttonLink, downloadURL,
                            createAt: new Date().toLocaleString(),

                        }).then((e) => {
                            this.props.history.push("/AddProjects")
                            console.log('success', e)
                            // alert('succes')
                        }).catch((error) => {
                            console.log('Error: ', error)
                            alert('Error')
                        })
                    // this.setState({
                    //     heading: "",
                    //     body: "",

                    // });
                })

        }
    }
    render() {



        const { headingName, body, githubLink, buttonLink, image } = this.state
        // console.log('Array Data: ', arr.heading, arr.body)
        // console.log('heading: ', heading)
        // console.log('downloadURL: ', downloadURL)
        // console.log(arr.heading)

        return (
            <div >
                <Navigations />
                <Sidebar />
                {/* <Container> */}
                <div>
                    <div id="wrapper" className="toggled">
                        <div id="page-content-wrapper">
                            <div className="container-fluid" style={{ marginTop: 65 }}>

                                <div style={{ marginTop: "35" }} >
                                    <h1 className="text-center" style={{ color: 'rgb(118, 102, 223)', fontSize: 50, }}>
                                        <Icon size={32} icon={fileTextO} /> Edit Projects

                    </h1>
                                    <AvForm>
                                        <FormGroup>
                                            {/* <Label for="exampleEmail">Heading</Label> */}
                                            <AvField type="text" label="Heading Name" value={headingName} name="email" id="exampleEmail" placeholder="Heading Name" onChange={this.handleChangeheadingName.bind(this)} required />
                                        </FormGroup>
                                        <ReactQuill value={this.state.body}
                                            modules={EditProjects.modules}
                                            formats={EditProjects.formats}
                                            placeholder="Write Something Creative"
                                            onChange={this.onHandleChange} />
                                        <br />
                                        <Row>
                                            <Col md="6">
                                                <FormGroup>
                                                    {/* <Label for="exampleEmail">Heading</Label> */}
                                                    <AvField type="text" label="Github Link" value={githubLink} name="email" id="exampleEmail" placeholder="Github Link" onChange={this.handleChangegithubLink.bind(this)} required />
                                                </FormGroup>
                                            </Col>
                                            <Col md="6">
                                                <FormGroup>
                                                    {/* <Label for="exampleText">body</Label> */}
                                                    <AvField type="text" label="Button Link" value={buttonLink} placeholder="Button Link" name="text" id="exampleText" onChange={this.handleChangeButtonLink.bind(this)} required />
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <FormGroup>
                                            <Label for="exampleCustomFileBrowser">Choose File</Label>
                                            <CustomInput type="file" id="exampleCustomFileBrowser" name="customFile" label={image && image.name} onChange={this.handleChange} />
                                            {image && image.name || this.state.errorImage ? (<FormText color="danger">
                                                {image && image.name ? " " : "Please Add Image"}
                                            </FormText>) : (
                                                    <FormText color="danger">

                                                    </FormText>
                                                )}
                                        </FormGroup>
                                        <br />
                                        <Button color="success" onClick={this.submit}>Update </Button>
                                    </AvForm>

                                </div>
                            </div>
                            {/* </Container> */}
                        </div >
                    </div >
                </div >
            </div >

        )
    }
}

EditProjects.modules = {

    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        ['clean']
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
    // theme: 'snow',

}
/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
EditProjects.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
]

/*
 * PropType validation
 */
//   Editor.propTypes = {
//     placeholder: PropTypes.string,
//   }