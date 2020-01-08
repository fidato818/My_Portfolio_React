import React, { Component } from 'react'
import logo from '../../images/logo.jpg';
import { Icon, withBaseIcon } from 'react-icons-kit'
// import { facebookOfficial } from 'react-icons-kit/fa/facebookOfficial'
// import { heart } from 'react-icons-kit/fa/heart'
// import { whatsapp } from 'react-icons-kit/fa/whatsapp'
// import { github } from 'react-icons-kit/fa/github'
// import { linkedinSquare } from 'react-icons-kit/fa/linkedinSquare'
import { fileTextO } from 'react-icons-kit/fa/fileTextO'
import { AvForm, AvField, } from 'availity-reactstrap-validation';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import firebase from './../../config/firebase'
import loading from '../../images/24.gif';
import {
    FormGroup,
    Row, Button, CustomInput, Label, FormText, Alert
} from 'reactstrap';
import Navigations from './../../config/navbarAdmin'
import Sidebar from './../../config/Sidebar'
import '../../Sidebar.css'
export default class AddBooks extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bookName: "",
            category: "",
            author: "",
            buttonLink: "",
            arr: [],
            image: null,
            url: "",
            progress: 0,
            success: "",
            visiableError: true,
            visiablesuccess: true,


        };


    }
    handleChangeBookName(event) {
        this.setState({ bookName: event.target.value })
    }
    handleChangeCategory(event) {
        this.setState({ category: event.target.value })
    }
    handleChangeAuthor(event) {
        this.setState({ author: event.target.value })
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
        this.firebaseRef = firebase.database().ref("Books");
        this.firebaseRef.on('value', (snapshot) => {
            let message = snapshot.val();
            console.log(message)
            var newArr = []
            for (let word in message) {
                console.log(message[word].pushKey);
                newArr.push({
                    createAt: message[word].createAt,
                    newPostKey: message[word].newPostKey,
                    bookName: message[word].bookName,
                    category: message[word].category,
                    author: message[word].author,
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
        const { arr, url, bookName, category, author, buttonLink, image } = this.state
        if (image == null || image.name === undefined) {
            // alert('please add image')
            this.setState({
                errorImage: true,
                visiableError: true
            })
        } else {
            var newPostKey = firebase.database().ref().child('Books').push().key;
            const uploadTask = firebase.storage().ref(`Books/${image.name}`).put(image)
                .then(snapshot => {
                    return snapshot.ref.getDownloadURL();   // Will return a promise with the download link
                })

                .then(downloadURL => {
                    console.log(`Successfully uploaded file and got download link - ${downloadURL}`);
                    // return downloadURL
                    this.setState({ url: downloadURL })
                    if (bookName == '' && category == '' && uploadTask == '') {
                        this.setState({
                            errorImage: true,
                            visiableError: true
                        });
                    }
                    else {
                        firebase
                            .database()
                            .ref("Books/" + newPostKey).set({
                                bookName,
                                category, author, buttonLink, newPostKey, downloadURL,
                                createAt: new Date().toLocaleString(),

                            }).then((e) => {
                                console.log('success', e)
                                alert('succes')
                            }).catch((error) => {
                                console.log('Error: ', error)
                                alert('Error')
                            })
                        this.setState({
                            bookName: "",
                            category: "",
                            author: "",
                            buttonLink: "",
                        });
                    }
                })
                .catch(error => {
                    // Use to signal error if something goes wrong.
                    console.log(`Failed to upload file and get link - ${error}`);
                })

        }
    }




    delete = (asd) => {

        let userRef = firebase.database().ref('Books/' + asd);
        userRef.remove().then((e) => {
            console.log('success', e)
            alert('Book Deleted Successfully')
        }).catch(err => {
            console.log('err', err)
            alert('Error: ', err)
        })

    }
    render() {
        const { success, arr, bookName, category, author, buttonLink, image, errorMessage, errorImage } = this.state

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
                                        <Icon size={32} icon={fileTextO} /> Add Books
                                    </h1>
                                    <AvForm>
                                        <FormGroup>
                                            <AvField type="email" label="Book Name" value={bookName} name="email" id="exampleEmail" placeholder="Book Name" onChange={this.handleChangeBookName.bind(this)} required />
                                        </FormGroup>
                                        <FormGroup>
                                            <AvField type="email" label="Category" value={category} name="email" id="exampleEmail" placeholder="Category" onChange={this.handleChangeCategory.bind(this)} required />
                                        </FormGroup>
                                        <FormGroup>
                                            <AvField type="email" label="Author" value={author} name="email" id="exampleEmail" placeholder="Author / Writer" onChange={this.handleChangeAuthor.bind(this)} required />
                                        </FormGroup>
                                        <FormGroup>
                                            <AvField type="text" label="Button Link" value={buttonLink} placeholder="Button Link" name="text" id="exampleText" onChange={this.handleChangeButtonLink.bind(this)} required />
                                        </FormGroup>
                                        {/* <progress value={this.state.progress} max="100" className="progress" /> */}
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
                                    </AvForm>
                                    <h5 className="text-center">Downloads Files</h5>
                                    <Row className='mt-5' >
                                        {arr.map((e) => {
                                            return (
                                                <div className="col-md-6 ">
                                                    <div className="card  border-primary flex-md-row mb-4 shadow-sm h-md-250">
                                                        <img className="card-img-right flex-auto d-none d-lg-block" alt="Thumbnail [200x250]"
                                                            src={e.downloadURL || "https://via.placeholder.com/400x300"} style={{ width: '200px', height: '250px' }} />
                                                        <div className="card-body d-flex flex-column align-items-start">
                                                            <h6 className="mb-0">
                                                                <strong class="d-inline-block mb-2 text-primary " style={{ cursor: 'pointer' }}>{e.bookName}</strong>
                                                            </h6>
                                                            <h6 className="mb-0">
                                                                <a className="text-dark" href="#"></a>
                                                            </h6>
                                                            <div className="mb-1 text-muted small">Category: {e.category}</div>
                                                            <p className="card-text mb-auto">Author: {e.author}</p>
                                                            <div style={{ display: 'inline-block', marginTop: 5, }}>
                                                                {/* <a className="btn btn-outline-primary " style={{ display: 'inline', marginRight: 5 }}  role="button" href={e.buttonLink}
                                                                    target="blank">Download</a> */}
                                                                <Button color='danger' outline style={{ float: 'right', display: 'inline', marginRight: 5 }} onClick={() => this.delete(e.newPostKey)}>Delete</Button>
                                                                <Link to={`/EditBooks/${e.newPostKey}`}><Button style={{ float: 'right', display: 'inline', marginRight: 5 }} color='primary' outline >Edit</Button></Link>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </Row>
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

