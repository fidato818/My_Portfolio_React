import React, { Component } from 'react'
// import logo from '../../images/logo.jpg';
import { Icon } from 'react-icons-kit'
import _ from "lodash";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import renderHTML from "react-render-html";
import { fileTextO } from 'react-icons-kit/fa/fileTextO'
import { AvForm, AvField, } from 'availity-reactstrap-validation';
import firebase from './../../config/firebase'
// import ReadMoreReact from 'read-more-react';
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    FormGroup, Alert,
    // Navbar,
    // NavbarToggler,
    // NavbarBrand,
    // Nav,
    // NavItem,
    // NavLink,
    // UncontrolledDropdown,
    // DropdownToggle,
    // DropdownMenu,
    // Container,
    // DropdownItem,
    // Row,
    Col,
    Card, CardImg, CardBody,
    // CardTitle, CardSubtitle, 
    Button, CustomInput, Label, FormText


} from 'reactstrap';
import Navigations from './../../config/navbarAdmin'
import Sidebar from './../../config/Sidebar'
// import '../../downloads.css'
export default class AddDownloads extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fileName: "",
            body: '',
            heading: "",
            buttonLink: "",
            arr: [],
            image: null,
            url: "",
            progress: 0,
            success: "",
            visiableError: true,
            visiablesuccess: true,


        };
        this.onHandleChange = this.onHandleChange.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
    }

    onDismiss() {
        this.setState({ visiableError: false });
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
        const { arr } = this.state
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState(() => ({ image }));
        }
        console.log(e.target.files[0].name)
        // arr.push(e.target.files[0].name)
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.state.visible) {
            // when the state is updated (turned red), 
            // a timeout is triggered to switch it back off
            this.turnOffRedTimeout = setTimeout(() => {
                this.setState(() => ({ visible: false }))
            }, 1000);
        }
    }
    componentWillUnmount() {
        // we set the timeout to this.turnOffRedTimeout so that we can
        // clean it up when the component is unmounted.
        // otherwise you could get your app trying to modify the state on an
        // unmounted component, which will throw an error
        clearTimeout(this.turnOffRedTimeout);
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
    submit = () => {
        const { fileName, body, buttonLink, image } = this.state

        if (image == null || image.name === undefined) {
            // alert('please add image')
            this.setState({
                errorImage: true
            })
        } else {
            var newPostKey = firebase.database().ref().child('Downloads').push().key;
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
                        .ref("Downloads/" + newPostKey).set({
                            fileName,
                            body, buttonLink, newPostKey, downloadURL,
                            createAt: new Date().toLocaleString(),

                        }).then((e) => {
                            this.setState({
                                success: "Successfully",
                                visible: true
                            })
                        }).catch((error) => {
                            this.setState({
                                errorMessage: error.message,
                                visiableError: true
                            })
                        })
                    this.setState({
                        fileName: "",
                        body: "",
                        buttonLink: "",
                    });

                })
                .catch(error => {
                    // Use to signal error if something goes wrong.
                    console.log(`Failed to upload file and get link - ${error}`);
                    this.setState({
                        errorMessage: error.message,
                        visiableError: true
                    })
                })

        }
    }




    delete = (id) => {

        let userRef = firebase.database().ref('Downloads/' + id);
        userRef.remove().then((e) => {
            console.log('success', e)
            // alert('File Deleted Successfully')
            toast.success("Deleted Successfully !", {
                position: toast.POSITION.TOP_RIGHT
            });
        }).catch(error => {
            console.log('err', error)
            this.setState({
                errorMessage: error.message,
                visiableError: true
            })
        })


    }

    // render posts from firebase
    renderPosts() {
        return _.map(this.state.arr, (e, i) => {
            return (

                < Col md='6' sm="12" style={{ marginBottom: '30px' }} key={i} id={i} >
                    <Card key={i} id={e.newPostKey} className='bor'>

                        <CardImg top src={e.downloadURL || "https://via.placeholder.com/400x300"}
                            alt="Uploaded Images" height="200"
                            width="300" />
                        <CardBody>
                            <div className='filterbox' style={{ textDecoration: 'none', color: 'rgb(118, 102, 223)' }}>
                                <h3> {e.fileName}</h3>
                            </div>
                            <div className='filterbox' >
                                {/* <CardText className="custom-link"><ReadMoreReact text={renderHTML(e.body)}
                                        min={50}
                                        ideal={50}
                                        max={100}
                                        readMoreText="read more" /></CardText> */}
                            </div>

                        </CardBody>


                        <CardBody>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: 5 }}>
                                <Link to={`/EditDownloads/${e.newPostKey}`} class="smallLinkButton" style={{ color: 'white', marginRight: 5 }}>   <Button color="primary" size="md" outline>Edit</Button></Link>
                                <Button color="danger" size="md" outline onClick={() => this.delete(e.newPostKey)} >Delete</Button>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            );
        });
    }

    render() {
        const { arr, url, fileName, description, buttonLink, image, errorMessage, errorImage, success } = this.state
        console.log('Array Data: ', arr.length)
        console.log('Array Data: ', image)
        return (

            <div >
                <Navigations />
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

                                </div>
                            </div>
                            <h1 className="text-center" style={{ color: 'rgb(118, 102, 223)', fontSize: 50, }}>
                                <Icon size={32} icon={fileTextO} /> Add Downloads
                        </h1>
                            <AvForm>
                                <FormGroup>
                                    {/* <Label for="exampleEmail">Heading</Label> */}
                                    <AvField type="text" label="File Name" value={fileName} name="email" id="exampleEmail" placeholder="Book Name" onChange={this.handleChangeFileName.bind(this)} required />
                                </FormGroup>
                                <ReactQuill value={this.state.body}
                                    modules={AddDownloads.modules}
                                    formats={AddDownloads.formats}
                                    placeholder="Write Something Creative"
                                    onChange={this.onHandleChange} />
                                <br />

                                <FormGroup>
                                    {/* <Label for="exampleText">Description</Label> */}
                                    <AvField type="text" label="Button Link" value={buttonLink} id="exampleEmail" placeholder="Button Link" name="text" onChange={this.handleChangeButtonLink.bind(this)} required />
                                </FormGroup>


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
                                <Button color="success" onClick={this.submit}>Submit </Button>
                                {/* <Button color="danger" size="md" outline onClick={() => this.delete()} >Delete</Button> */}
                            </AvForm>
                            <p>Total Number of Downloads: {arr.length}</p>
                            <div className='view-content'>
                                {this.renderPosts()}
                            </div>
                        </div>
                        <ToastContainer autoClose={2000} />
                    </div>
                </div>
            </div >
        )
    }
}

AddDownloads.modules = {

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
AddDownloads.formats = [
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
