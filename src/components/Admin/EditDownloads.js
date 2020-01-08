import React, { Component } from 'react'
// import ReactQuill, { Quill, Mixin, Toolbar } from 'react-quill';
import firebase from './../../config/firebase'
import { Icon } from 'react-icons-kit'
import { fileTextO } from 'react-icons-kit/fa/fileTextO'
import { AvForm, AvField, } from 'availity-reactstrap-validation';
import _ from "lodash";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import renderHTML from "react-render-html";
import { FormGroup, Label, Button, CustomInput, FormText, } from 'reactstrap';
import Navigations from './../../config/navbarAdmin'
// import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import '../../App.css'
import '../../Sidebar.css'
import Sidebar from './../../config/Sidebar'
export default class EditDownloads extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fileName: "",
            body: "",
            buttonLink: "",
            arr: [],
            image: "",
            url: "",
            progress: 0,
            key: '',
            downloadURL: ""


        };

        this.onHandleChange = this.onHandleChange.bind(this);
    }
    handleChangeFileName(event) {
        this.setState({ fileName: event.target.value })
    }
    onHandleChange(e) {
        this.setState({ body: e });
        console.log(this.state.body);
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
        this.firebaseRef = firebase.database().ref("Downloads");
        this.firebaseRef.on('value', (snapshot) => {
            snapshot.forEach((data) => {
                var movie = data.val();
                console.log("movie.newPostKey", movie.newPostKey)
                console.log("movie", movie)
                console.log(" params.id", params.id)
                if (movie.newPostKey === params.id) {
                    this.setState({
                        key: movie.newPostKey,
                        fileName: movie.fileName,
                        body: movie.body,
                        buttonLink: movie.buttonLink,
                        downloadURL: movie.downloadURL
                    });
                }
            });
        });

    }


    submit = () => {
        const { key, arr, url, fileName, body, buttonLink, image } = this.state

        var currentUser = firebase.auth().currentUser.uid
        if (image == null || image.name === undefined) {
            // alert('please add image')
            this.setState({
                errorImage: true
            })
        } else {
            const uploadTask = firebase.storage().ref(`Downloads/${image.name}`).put(image)
                .then(snapshot => {
                    return snapshot.ref.getDownloadURL();   // Will return a promise with the download link
                })

                .then(downloadURL => {
                    console.log(`Successfully uploaded file and got download link - ${downloadURL}`);
                    // return downloadURL
                    this.setState({ url: downloadURL })

                    firebase
                        .database()
                        .ref("Downloads/" + key).update({
                            currentUser,
                            fileName,
                            body, buttonLink, downloadURL,
                            createAt: new Date().toLocaleString(),

                        }).then((e) => {
                            this.props.history.push("/AddDownloads")
                            console.log('success', e)
                            // alert('succes')
                        }).catch((error) => {
                            console.log('Error: ', error)
                            alert('Error')
                        })
                    // this.setState({
                    //     heading: "",
                    //     description: "",

                    // });
                })
        }


    }

    render() {



        const { fileName, body, buttonLink, downloadURL, image } = this.state
        // console.log('Array Data: ', arr.heading, arr.description)
        // console.log('heading: ', heading)
        console.log('downloadURL: ', image)
        // console.log(arr.heading)
        var imageUrl = downloadURL.replace('https://firebasestorage.googleapis.com/v0/b/adnan-ahmed.appspot.com/o/Downloads%2F', "")
        console.log(imageUrl)
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
                                        <Icon size={32} icon={fileTextO} /> Edit Downloads
                        </h1>
                                    <AvForm>
                                        <FormGroup>
                                            {/* <Label for="exampleEmail">Heading</Label> */}
                                            <AvField type="email" label="File Name" value={fileName} name="email" id="exampleEmail" placeholder="Book Name" onChange={this.handleChangeFileName.bind(this)} required />
                                        </FormGroup>
                                        <ReactQuill value={this.state.body}
                                            modules={EditDownloads.modules}
                                            formats={EditDownloads.formats}
                                            placeholder="Write Something Creative"
                                            onChange={this.onHandleChange} />
                                        <br />
                                        <FormGroup>
                                            {/* <Label for="exampleText">Description</Label> */}
                                            <AvField type="text" label="Button Link" value={buttonLink} placeholder="Button Link" name="text" id="exampleText" onChange={this.handleChangeButtonLink.bind(this)} required />
                                        </FormGroup>
                                        {/* <progress value={this.state.progress} max="100" className="progress" /> */}
                                        <br />

                                        <FormGroup>
                                            <Label for="exampleCustomFileBrowser">Choose File</Label>
                                            <CustomInput type="file" id="exampleCustomFileBrowser" name="customFile" label={image && image.name || imageUrl} onChange={this.handleChange} />
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
EditDownloads.modules = {

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
EditDownloads.formats = [
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
