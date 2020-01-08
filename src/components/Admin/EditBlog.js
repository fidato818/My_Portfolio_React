import React, { Component } from 'react'
import _ from "lodash";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import renderHTML from "react-render-html";
import firebase from './../../config/firebase'
import { Icon } from 'react-icons-kit'
import { fileTextO } from 'react-icons-kit/fa/fileTextO'
import { AvForm, AvField, } from 'availity-reactstrap-validation';
import { FormGroup, Label, Button, Row, Col, CustomInput, FormText, CardBody } from 'reactstrap';
import '../../App.css'
import '../../Sidebar.css'
import Sidebar from './../../config/Sidebar'
export default class EditBlogs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            heading: "",
            body: "",
            key: "",
            image: null,
            errorImage: false


        };
        this.onHandleChange = this.onHandleChange.bind(this);

    }
    onHandleChange(e) {
        // const { body } = this.state
        this.setState({ body: e });
        // this.setState({ body: e.target.value })
        // console.log(body);
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
        this.firebaseRef = firebase.database().ref("BlogData");
        this.firebaseRef.on('value', (snapshot) => {
            snapshot.forEach((data) => {
                var movie = data.val();
                console.log("movie.newPostKey", movie.newPostKey)
                console.log("movie", movie)
                console.log(" params.id", params.id)
                if (movie.newPostKey === params.id) {
                    this.setState({
                        heading: movie.heading,
                        body: movie.body,
                        key: movie.newPostKey,
                        downloadURL: movie.downloadURL
                    });
                }
            });
        });

    }


    handleChangeHeading(event) {
        this.setState({ heading: event.target.value })
    }


    submit = () => {

        const { heading, body, key, image, errorImage } = this.state
        if (image == null || image.name === undefined) {
            // alert('please add image')
            this.setState({
                errorImage: true
            })
        } else {
            const uploadTask = firebase.storage().ref(`images/${image.name}`).put(image)
                .then(snapshot => {
                    return snapshot.ref.getDownloadURL();   // Will return a promise with the download link
                })

                .then(downloadURL => {
                    console.log(`Successfully uploaded file and got download link - ${downloadURL}`);
                    // return downloadURL
                    this.setState({ url: downloadURL })

                    firebase
                        .database()
                        .ref("BlogData/" + key).update({
                            heading,
                            body, key, downloadURL,
                            createAt: new Date().toLocaleString(),

                        }).then((e) => {
                            this.props.history.push("/addblogs")
                            console.log('success', e)
                            // alert('succes')
                        }).catch((error) => {
                            console.log('Error: ', error)
                            alert('Error :', error)
                        })
                    this.setState({
                        heading: "",
                        body: "",

                    });
                })
        }

    }
    render() {



        const { heading, body,
            image, } = this.state

        // console.log(arr.heading)

        return (

            <div >
                {/* <Navigations /> */}
                <Sidebar />
                {/* <Container> */}
                <div>
                    <div id="wrapper" className="toggled">
                        <div id="page-content-wrapper">
                            <div className="container-fluid" style={{ marginTop: 65 }}></div>
                            <div style={{ marginTop: 65 }}>
                            </div>

                            <div style={{ marginTop: "35" }} >
                                <h1 className="text-center" style={{ color: 'rgb(118, 102, 223)', fontSize: 50, }}>
                                    <Icon size={32} icon={fileTextO} /> Edit Blogs
                                </h1>
                                <AvForm>
                                    <Row>
                                        <Col md="12" xs="12">
                                            <FormGroup>
                                                <AvField type="email" label="Heading" value={heading} name="email" id="exampleEmail" placeholder="with a placeholder" onChange={this.handleChangeHeading.bind(this)} />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <ReactQuill value={body}
                                        modules={EditBlogs.modules}
                                        formats={EditBlogs.formats}
                                        placeholder="Write Something Creative"
                                        onChange={this.onHandleChange} />
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
                                    <Button color="success" onClick={this.submit}>Update</Button>
                                </AvForm>

                                <br />
                                <br />
                            </div>
                        </div>


                    </div>

                </div>
                {/* </Container> */}

            </div >

        )
    }
}







EditBlogs.modules = {

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
EditBlogs.formats = [
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