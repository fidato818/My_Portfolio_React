import React, { Component } from 'react'
// import ReactQuill, { Quill, Mixin, Toolbar } from 'react-quill';
import firebase from './../../config/firebase'
import { Icon } from 'react-icons-kit'
import { fileTextO } from 'react-icons-kit/fa/fileTextO'
import { AvForm, AvField, } from 'availity-reactstrap-validation';
import { FormGroup, Label, Button, CustomInput, FormText } from 'reactstrap';
import '../../App.css'
import '../../Sidebar.css'
import Sidebar from './../../config/Sidebar'
export default class EditBooks extends Component {
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
            key: ''
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
        const { match: { params }
        } = this.props
        this.firebaseRef = firebase.database().ref("Books");
        this.firebaseRef.on('value', (snapshot) => {
            snapshot.forEach((data) => {
                var movie = data.val();
                console.log("movie.newPostKey", movie.newPostKey)
                console.log("movie", movie)
                console.log(" params.id", params.id)
                if (movie.newPostKey === params.id) {
                    this.setState({
                        key: movie.newPostKey,
                        bookName: movie.bookName,
                        category: movie.category,
                        author: movie.author,
                        buttonLink: movie.buttonLink,
                        downloadURL: movie.downloadURL
                    });
                }
            });
        });

    }


    submit = () => {
        const { bookName, category, author, buttonLink, image, key } = this.state
        if (image == null || image.name === undefined) {
            // alert('please add image')
            this.setState({
                errorImage: true
            })
        } else {
            const uploadTask = firebase.storage().ref(`Books/${image.name}`).put(image)
                .then(snapshot => {
                    return snapshot.ref.getDownloadURL();   // Will return a promise with the download link
                })

                .then(downloadURL => {
                    console.log(`Successfully uploaded file and got download link - ${downloadURL}`);
                    // return downloadURL
                    this.setState({ url: downloadURL })

                    firebase
                        .database()
                        .ref("Books/" + key).update({
                            bookName,
                            category, author, buttonLink, downloadURL,
                            createAt: new Date().toLocaleString(),

                        }).then((e) => {
                            this.props.history.push("/Addbooks")
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



        const { arr, url, bookName, category, author, buttonLink, image } = this.state
        // console.log('Array Data: ', arr.heading, arr.description)
        // console.log('heading: ', heading)
        // console.log('downloadURL: ', downloadURL)
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
                                    <Icon size={32} icon={fileTextO} /> Edit Books

                        </h1>
                                {/* <ReactQuill
                            onChange={this.handleChange}

                            modules={AddBLogs.modules}
                            formats={AddBLogs.formats} /> */}
                                <AvForm>
                                    <FormGroup>
                                        {/* <Label for="exampleEmail">Heading</Label> */}
                                        <AvField type="email" label="Book Name" value={bookName} name="email" id="exampleEmail" placeholder="Book Name" onChange={this.handleChangeBookName.bind(this)} />
                                    </FormGroup>
                                    <FormGroup>
                                        {/* <Label for="exampleEmail">Heading</Label> */}
                                        <AvField type="email" label="Category" value={category} name="email" id="exampleEmail" placeholder="Category" onChange={this.handleChangeCategory.bind(this)} />
                                    </FormGroup>
                                    <FormGroup>
                                        {/* <Label for="exampleEmail">Heading</Label> */}
                                        <AvField type="email" label="Author" value={author} name="email" id="exampleEmail" placeholder="Author / Writer" onChange={this.handleChangeAuthor.bind(this)} />
                                    </FormGroup>
                                    <FormGroup>
                                        {/* <Label for="exampleText">Description</Label> */}
                                        <AvField type="text" label="Button Link" value={buttonLink} placeholder="Button Link" name="text" id="exampleText" onChange={this.handleChangeButtonLink.bind(this)} />
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







EditBooks.modules = {

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
EditBooks.formats = [
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