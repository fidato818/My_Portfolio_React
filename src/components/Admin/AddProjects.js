import React, { Component } from 'react'
// import logo from '../../images/logo.jpg';
import { Icon, } from 'react-icons-kit'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import _ from "lodash";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// import renderHTML from "react-render-html";
import { fileTextO } from 'react-icons-kit/fa/fileTextO'
import { AvForm, AvField, } from 'availity-reactstrap-validation';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import firebase from './../../config/firebase'
// import loading from '../../images/24.gif';
import ReadMoreReact from 'read-more-react';
import githubLogo from '../../images/github-p-500.png'
import {
    FormGroup,
    Row, Col,
    Button, CustomInput, Label, FormText,
    Alert, Card, CardImg, CardBody, Input

} from 'reactstrap';
import Navigations from './../../config/navbarAdmin'
import Sidebar from './../../config/Sidebar'
import '../../Sidebar.css'
export default class AddProjects extends Component {
    constructor(props) {
        super(props);

        this.state = {
            headingName: "",
            category: "htmlandcss",
            body: "",
            githubLink: "",
            buttonLink: "",
            arr: [],
            image: null,
            url: "",
            progress: 0,


        };

        this.onHandleChange = this.onHandleChange.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
    }

    onDismiss() {
        this.setState({ visiableError: false });
    }
    handleChangeheadingName(event) {
        this.setState({ headingName: event.target.value })
    }
    handleChangecategory(event) {
        this.setState({ category: event.target.value })
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
    submit = () => {
        var currentUser = firebase.auth().currentUser.uid
        const { arr, url, headingName, body, githubLink, buttonLink, image , category} = this.state
        if (image == null || image.name === undefined) {
            // alert('please add image')
            this.setState({
                errorImage: true
            })
        } else {
            var newPostKey = firebase.database().ref().child('Projects').push().key;
            const uploadTask = firebase.storage().ref(`Projects/${image.name}`).put(image)
                .then(snapshot => {
                    return snapshot.ref.getDownloadURL();   // Will return a promise with the download link
                })

                .then(downloadURL => {
                    console.log(`Successfully uploaded file and got download link - ${downloadURL}`);
                    // return downloadURL
                    this.setState({ url: downloadURL })
                    if (headingName == '' && body == '' && uploadTask == '') {
                        alert('Please Fill All field')
                    }
                    else {
                        firebase
                            .database()
                            .ref("Projects/" + newPostKey).set({
                                currentUser,
                                headingName, category,
                                body, githubLink, buttonLink, newPostKey, downloadURL,
                                createAt: new Date().toLocaleString(),

                            }).then((e) => {
                                this.setState({
                                    success: "Successfully",
                                    visible: true
                                })
                            }).catch((error) => {
                                console.log('Error: ', error)
                                this.setState({
                                    errorMessage: error.message,
                                    visiableError: true
                                })
                            })
                        this.setState({
                            headingName: "",
                            body: "",
                            githubLink: "",
                            buttonLink: "",
                        });
                    }
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




    delete = (asd) => {

        let userRef = firebase.database().ref('Projects/' + asd);
        userRef.remove().then((e) => {
            console.log('success', e)
            alert('Book Deleted Successfully')
            toast.success("Deleted Successfully !", {
                position: toast.POSITION.TOP_RIGHT
            });
        }).catch(error => {
            console.log('error', error)
            alert('Error: ', error)
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
                                <Link to={`/EditProjects/${e.newPostKey}`}>  <Button className="float-right" style={{ display: 'inline', marginRight: 5 }} href={e.buttonLink} target="_blank" color="primary" outline>Edit</Button></Link>
                                <Button color="danger" size="md" outline onClick={() => this.delete(e.newPostKey)} >Delete</Button>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            );
        });
    }
    render() {
        const { arr, url, headingName, body, githubLink, buttonLink, category, image, errorMessage, errorImage, success } = this.state
        console.log('Array Data: ', category)
        // console.log('Array Data: ', arr.heading)
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
                                    <h1 className="text-center" style={{ color: 'rgb(118, 102, 223)', fontSize: 50, }}>
                                        <Icon size={32} icon={fileTextO} /> Add Projects

                        </h1>
                                    <AvForm>
                                        <Row>
                                            <Col md="4">
                                                <FormGroup>
                                                    {/* <Label for="exampleEmail">Heading</Label> */}
                                                    <AvField type="text" label="Heading Name" value={this.state.headingName} name="email" id="exampleEmail" placeholder="Heading Name" onChange={this.handleChangeheadingName.bind(this)} required />
                                                </FormGroup>
                                            </Col>
                                            <Col md="4">
                                                <FormGroup>
                                                    <Label for="exampleSelect">Category</Label>
                                                    <Input type="select" name="select" id="exampleSelect" value={category}
                                                        onChange={this.handleChangecategory.bind(this)}  >
                                                        <option value="htmlandcss">Html and CSS</option>
                                                        <option value="javascript">JavaScript</option>
                                                        <option value="react">React</option>
                                                        <option value="react native">React Native</option>
                                                    </Input>

                                                </FormGroup>
                                            </Col>
                                            <Col md="4">
                                                <FormGroup>
                                                    {/* <Label for="exampleText">body</Label> */}
                                                    <AvField type="text" label="Button Link" value={this.state.buttonLink} placeholder="Button Link" name="text" id="exampleText" onChange={this.handleChangeButtonLink.bind(this)} required />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <ReactQuill value={this.state.body}
                                            modules={AddProjects.modules}
                                            formats={AddProjects.formats}
                                            placeholder="Write Something Creative"
                                            onChange={this.onHandleChange} />
                                        <br />
                                        {/* <FormGroup>
                                            <Label for="exampleEmail">Heading</Label>
                                            <AvField type="text" label="Category" value={this.state.category} name="email" id="exampleEmail" placeholder="React, React Native, Javascript etc" onChange={this.handleChangecategory.bind(this)} required />
                                        </FormGroup> */}

                                        <Row>
                                            <Col md="6">
                                                <FormGroup>
                                                    {/* <Label for="exampleEmail">Heading</Label> */}
                                                    <AvField type="text" label="Github Link" value={this.state.githubLink} name="email" id="exampleEmail" placeholder="Github Link" onChange={this.handleChangegithubLink.bind(this)} required />
                                                </FormGroup>
                                            </Col>
                                            <Col md="6">
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
                                            </Col>
                                        </Row>

                                        <br />
                                        <Button color="success" onClick={this.submit}>Submit </Button>
                                    </AvForm>

                                    <p>Total Number of Downloads: {arr.length}</p>
                                    <div className='view-content'>
                                        {this.renderPosts()}
                                    </div>
                                </div>
                                <ToastContainer autoClose={2000} />
                            </div>
                        </div>
                        {/* </Container> */}
                    </div >

                </div >
            </div >

        )
    }
}

AddProjects.modules = {

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
AddProjects.formats = [
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
