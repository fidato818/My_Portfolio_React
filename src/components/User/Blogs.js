import React, { Component } from 'react'
import logo from '../../images/logo.jpg';
import loading from '../../images/24.gif';
import { Icon, withBaseIcon } from 'react-icons-kit'
import { facebookOfficial } from 'react-icons-kit/fa/facebookOfficial'
import { heart } from 'react-icons-kit/fa/heart'
import { whatsapp } from 'react-icons-kit/fa/whatsapp'
import { github } from 'react-icons-kit/fa/github'
import { linkedinSquare } from 'react-icons-kit/fa/linkedinSquare'
import { fileTextO } from 'react-icons-kit/fa/fileTextO'
import firebase from './../../config/firebase'
import ReadMoreReact from 'read-more-react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser';
import '../../App.css'
import {

    Container,
    DropdownIem, Row, Col,
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,


} from 'reactstrap';
import Navigations from '../../config/navbar'
class Books extends Component {
    constructor(props) {
        super(props);
        this.state = {
            heading: "",
            description: "",
            arr: [],
            image: null,
            url: "",
            progress: 0
        };
    }
    async  componentDidMount() {
        await this.getBlogData()
        //  await   this.firebasefirePad()

    }

    getBlogData = () => {
        this.firebaseRef = firebase.database().ref("BlogData");
        this.firebaseRef.on('value', (snapshot) => {
            let message = snapshot.val();
            console.log(message)
            var newArr = []
            for (let word in message) {
                console.log(message[word].pushKey);
                newArr.push({
                    createAt: message[word].createAt,
                    newPostKey: message[word].newPostKey,
                    heading: message[word].heading,
                    paragraph1: message[word].paragraph1,
                    paragraph2: message[word].paragraph2,
                    paragraph3: message[word].paragraph3,
                    paragraph4: message[word].paragraph4,
                    paragraph5: message[word].paragraph5,
                    paragraph6: message[word].paragraph6,
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
        const { arr, url } = this.state
        console.log(arr)
        return (

            <div >
                <Navigations />
                <Container>
                    <div style={{ marginTop: 65 }}>
                    </div>

                    <div style={{ marginTop: "35" }} >
                        <h1 className="text-center" style={{ color: 'rgb(118, 102, 223)', fontSize: 50, }}>
                            <Icon size={32} icon={fileTextO} /> My Blogs

                        </h1>

                        <h5 className="text-center">Here are a few recent design projects</h5>
                        {!arr.length ? (
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
                        ) : (
                                <Row className='mt-5' >
                                    {
                                        arr.map((e, i) => {
                                            return (
                                                //  console.log(i)
                                                < Col md='4' sm="12" style={{ marginBottom: '30px' }} key={i} id={i} >
                                                    <Card key={i} id={e.newPostKey} className='bor'>
                                                        <CardImg top src={e.downloadURL || "https://via.placeholder.com/400x300"}
                                                            alt="Uploaded Images" height="200"
                                                            width="300" />
                                                        <CardBody>
                                                            <div className='filterbox' style={{ textDecoration: 'none', color: 'rgb(118, 102, 223)' }}>
                                                                <h3> {e.heading}</h3>
                                                            </div>
                                                            <div className='filterbox' >
                                                                {/* <CardText className="custom-link"><ReadMoreReact text={(e.body)}
                                                                        min={50}
                                                                        ideal={50}
                                                                        max={100}
                                                                        readMoreText="read more" /></CardText> */}
                                                            </div>

                                                            {/* <Button onClick={() => this.delete(e.newPostKey)}>Delete</Button>  */}
                                                        </CardBody>

                                                        <CardBody >
                                                            <Link to={`/AddblogsDetails/${e.newPostKey}`} style={{ display: 'flex', justifyContent: 'flex-end', textDecoration: "none" }}><Button color="primary" outline block>Read</Button></Link>
                                                        </CardBody>

                                                    </Card>
                                                </Col>
                                            )
                                        })
                                    }
                                </Row>)}
                    </div>
                </Container>
            </div>

        )
    }
}

export default Books