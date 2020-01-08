import React, { Component } from 'react'
import _ from "lodash";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import renderHTML from "react-render-html";
import firebase from './../../config/firebase'
import { Icon } from 'react-icons-kit'
import { fileTextO } from 'react-icons-kit/fa/fileTextO'
import { AvForm, AvField, } from 'availity-reactstrap-validation';
import { Link, Redirect } from 'react-router-dom'
import { Alert, FormGroup, FormText, Button, Row, Col, Card, CardImg, CardBody, CustomInput, Label } from 'reactstrap';
import Navigations from './../../config/navbarAdmin'
import loading from '../../images/24.gif';
import Sidebar from './../../config/Sidebar'
import '../../Sidebar.css'
import '../../App.css'
import ReadMoreReact from 'read-more-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default class AddBlogs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            body: '',
            heading: "",
            arr: [],
            image: null,
            url: "",
            progress: 0,
            displayEmail: '',
            success: "",
            visiableError: true,
            visiablesuccess: true,
        };
        this.handleChangeBody = this.handleChangeBody.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
    }



    onDismiss() {
        this.setState({ visiableError: false });
    }
    handleChangeHeading(event) {
        this.setState({ heading: event.target.value });
    }
    handleChangeBody(e) {
        this.setState({ body: e });
        console.log(this.state.body);
    }

    handleChange = e => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState(() => ({ image }));
        }
    };

    async componentDidMount() {
        this.getBlogData();
        //  await this.authListener();

    }


    componentDidUpdate(prevProps, prevState) {
        if (this.state.visible) {
            this.turnOffRedTimeout = setTimeout(() => {
                this.setState(() => ({ visible: false }))
            }, 1000);
        }
    }
    componentWillUnmount() {
        clearTimeout(this.turnOffRedTimeout);
    }

    getBlogData = () => {
        this.firebaseRef = firebase.database().ref("BlogData");
        this.firebaseRef.on("value", snapshot => {
            let message = snapshot.val();
            console.log(message);
            var newArr = [];
            for (let word in message) {
                console.log(message[word].pushKey);
                newArr.push({
                    createAt: message[word].createAt,
                    newPostKey: message[word].newPostKey,
                    heading: message[word].heading,
                    downloadURL: message[word].downloadURL,
                    body: message[word].body
                });
            }
            this.setState({ arr: newArr });
        });
    };


    submit = () => {
        const { heading, image, body } = this.state;
        if (image == null || image.name === undefined || heading === "" || body === "") {
            // alert('please add image')
            this.setState({
                errorImage: true,
                visiableError: true
            });
        } else {
            var newPostKey = firebase
                .database()
                .ref()
                .child("BlogData")
                .push().key;
            const uploadTask = firebase
                .storage()
                .ref(`images/${image.name}`)
                .put(image)
                .then(snapshot => {
                    return snapshot.ref.getDownloadURL(); // Will return a promise with the download link
                })

                .then(downloadURL => {
                    console.log(
                        `Successfully uploaded file and got download link - ${downloadURL}`
                    );
                    // return downloadURL
                    this.setState({ url: downloadURL });

                    firebase
                        .database()
                        .ref("BlogData/" + newPostKey)
                        .set({
                            heading,
                            newPostKey,
                            body,
                            downloadURL,
                            createAt: new Date().toLocaleString()
                        })
                        .then((e) => {
                            // console.log("success", e);
                            // alert("succes");

                            this.setState({
                                success: "Successfully",
                                visible: true
                            })
                        })
                        .catch(error => {
                            // console.log("Error: ", error);
                            // alert("Error");
                            this.setState({
                                errorMessage: error.message,
                                visiableError: true
                            })
                        });
                    this.setState({
                        heading: "",
                        body: "",
                        image: ""
                    });
                })
                .catch(error => {
                    // Use to signal error if something goes wrong.
                    console.log(`Failed to upload file and get link - ${error}`);
                    this.setState({
                        errorMessage: error.message,
                        visiableError: true
                    })
                });
        }
    };
    /*==================================Delete Method======================================= */

    delete = (id) => {
        let userRef = firebase.database().ref('BlogData/' + id);
        userRef.remove().then((e) => {
            console.log('success', e)
            toast.success("Deleted Successfully !", {
                position: toast.POSITION.TOP_RIGHT
            });
        }).catch(error => {
            this.setState({
                errorMessage: error.message,
                visiableError: true
            })
        })
    }
    /*======================================================================================== */

    // render posts from firebase
    renderPosts() {
        return _.map(this.state.arr, (e, i) => {
            return (
                < Col md='6' sm="12" style={{ marginBottom: '30px' }} key={i} id={i} >
                    <Card key={i} id={e.newPostKey} className='bor'>
                        <Link to={`/AddBlogsDetails/${e.newPostKey}`} class="smallLinkButton">
                            <CardImg top src={e.downloadURL || "https://via.placeholder.com/400x300"}
                                alt="Uploaded Images" height="200"
                                width="300" />
                            <CardBody>
                                <div className='filterbox' style={{ textDecoration: 'none', color: 'rgb(118, 102, 223)' }}>
                                    <h3> {e.heading}</h3>
                                </div>
                                <div className='filterbox' >
                                    {/* <CardText className="custom-link"><ReadMoreReact text={renderHTML(e.body)}
                                        min={50}
                                        ideal={50}
                                        max={100}
                                        readMoreText="read more" /></CardText> */}
                                </div>

                            </CardBody>

                        </Link>
                        <CardBody>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: 5 }}>
                                <Link to={`/Editblog/${e.newPostKey}`} class="smallLinkButton" style={{ color: 'white', marginRight: 5 }}>   <Button color="primary" size="md" outline>Edit</Button></Link>
                                <Button color="danger" size="md" outline onClick={() => this.delete(e.newPostKey)} >Delete</Button>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            );
        });
    }





    render() {




        const { arr, heading, image, errorMessage, errorImage, success, visiableError } = this.state


        // console.log('errorImage: ', errorImage)
        // console.log('errorMessage: ', errorMessage)

        return (

            <div >
                {/* <Navigations /> */}
                <Sidebar />
                {/* <Container> */}
                <div>
                    <div id="wrapper" className="toggled">
                        <div id="page-content-wrapper">
                            <div className="container-fluid" style={{ marginTop: 65 }}>
                                {errorMessage || errorImage && <Alert style={{
                                    paddingTop: '11px',
                                    marginTop: '-17px'
                                }} color="danger" isOpen={this.state.visiableError} toggle={this.onDismiss}>
                                    <span>Please Fill All Field</span>
                                </Alert>}
                                {success && <Alert style={{
                                    paddingTop: '11px',
                                    marginTop: '-17px'
                                }} color="success" isOpen={this.state.visible} toggle={this.onDismiss}>
                                    <span >Submit Successfully</span>
                                </Alert>}
                                <div style={{ marginTop: "35" }} >

                                    <h1 className="text-center" style={{ color: 'rgb(118, 102, 223)', fontSize: 50, }}>
                                        <Icon size={32} icon={fileTextO} /> Add Blogs
                                        </h1>


                                    <AvForm>
                                        <Row>
                                            <Col md="12" xs="12">
                                                <FormGroup>
                                                    <AvField type="text" label="Heading" value={heading} name="email" id="exampleEmail" placeholder="with a placeholder" onChange={this.handleChangeHeading.bind(this)} required />
                                                </FormGroup></Col>
                                        </Row>
                                        <ReactQuill value={this.state.body}
                                            modules={AddBlogs.modules}
                                            formats={AddBlogs.formats}
                                            placeholder="Write Something Creative"
                                            onChange={this.handleChangeBody} />
                                        <br />
                                        <br />
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
                                        <Button color="success" outline onClick={this.submit}>Submit </Button>
                                    </AvForm>
                                    <br />
                                    <br />
                                    <h1 className="text-center" style={{ color: 'rgb(118, 102, 223)', fontSize: 50, }}>
                                        <Icon size={32} icon={fileTextO} /> Blogs
                                        </h1>
                                    <p>Total Number of Blogs: {arr.length}</p>
                                    <div className='view-content'>
                                        {this.renderPosts()}
                                    </div>
                                </div>
                                <ToastContainer autoClose={2000} />
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        )
    }
}







AddBlogs.modules = {

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
AddBlogs.formats = [
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



