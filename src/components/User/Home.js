import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import './Home/Home.css'
// import $ from 'jquery'
import Typed from 'react-typed';
// import '../../style.css';
// import OwlCarousel from 'react-owl-carousel';
import loading from '../../images/24.gif';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.css';
import logo from '../../images/logo.jpg';
import myPhoto from '../../images/white_background.JPG';
import githubLogo from '../../images/github-p-500.png'
import { Icon, } from 'react-icons-kit'
import { facebookOfficial } from 'react-icons-kit/fa/facebookOfficial'
// import { locationArrow } from 'react-icons-kit/fa/locationArrow'
import { heart } from 'react-icons-kit/fa/heart'
import { whatsapp } from 'react-icons-kit/fa/whatsapp'
import { github } from 'react-icons-kit/fa/github'
import { linkedinSquare } from 'react-icons-kit/fa/linkedinSquare'
import ReactTooltip from 'react-tooltip'
import Navigations from '../../config/navbar'
// import ReadMoreReact from 'read-more-react';
import firebase from './../../config/firebase'
import ReactHtmlParser from 'react-html-parser';

import {
    // Button, 
    Container, Row, Col, Button
} from 'reactstrap';
import { fileTextO } from 'react-icons-kit/fa/fileTextO'
// const SideIconContainer =
//     withBaseIcon({ size: 16, style: { color: '#EF233C' }, marginLeft: '100' })

// var sectionStyle = {
//     width: "100%",
//     height: "400px",
//     backgroundImage: `url(${logo})`
// };





class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            backdrop: 'static',
            id: null,
            fileName: null,
            body: null,
            buttonLink: null,
            githubLink: null,
            imagePage: null,
            selectedPostIndex: "",
            arr: [],


        };

    }


    toggle = (id, fileName, body, buttonLink, githubLink, imagePage) => {
        this.setState({
            modal: !this.state.modal,
            id: id,
            fileName: fileName,
            body: body,
            buttonLink: buttonLink,
            githubLink: githubLink,
            imagePage: imagePage
        });
        // console.log(id)
        // console.log(fileName)
        // console.log(body)
        // console.log(buttonLink)
        // console.log(githubLink)
    }




   componentDidMount() {
        this.firebaseRef = firebase.database().ref("Projects").limitToFirst(2);
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



    render() {
        const { arr, fileName, body, buttonLink, githubLink, imagePage } = this.state;
        console.log(arr)

        const html = body

        return (
            <div >

                <Navigations />

                <br id="home" />
                <ReactTooltip place="top" type="dark" effect="float" />
                <div className="bacgroundimage">
                    <div className="text-block  ">
                        <div className="abs ">
                            <h2 style={{ fontSize: '70px', borderBottom: '2px solid rgb(118, 102, 223)' }}> Adnan Ahmed<i
                                style={{ color: 'rgb(118, 102, 223)' }}>'</i> </h2>


                            <p className="business" id="simpleUsage">
                                {/* freelance developer & designer */}

                                I am  <Typed
                                    strings={[
                                        ' FreeLancer',
                                        ' Mobile App Developer',

                                        ' Web Developer',
                                        ' freelance developer and designer']}
                                    typeSpeed={40}
                                    backSpeed={50}
                                // loop 
                                />
                            </p>
                            <div>
                                <a className='asd' style={{ marginLeft: 8, color: 'rgb(118, 102, 223)' }} href="https://api.whatsapp.com/send?phone=923453048496&text=&source=&data=" target="blank" data-tip="Whatsapp" data-place="left"><Icon size={32} icon={whatsapp} /></a>
                                <a className='asd' style={{ marginLeft: 8, color: 'rgb(118, 102, 223)' }} href="https://github.com/fidato818" target="blank" data-tip="Github"><Icon size={32} icon={github} /></a>
                                <a className='asd' style={{ marginLeft: 8, color: 'rgb(118, 102, 223)' }} href="https://www.facebook.com/millions818" target="blank" data-tip="Facebook"><Icon size={32} icon={facebookOfficial} /></a>
                                <a className='asd' style={{ marginLeft: 8, color: 'rgb(118, 102, 223)' }} href="https://www.linkedin.com/in/adnan-ahmed-28160298/" target="blank" data-tip="linkedn" ><Icon size={32} icon={linkedinSquare} /></a>

                                {/* <i className="fab fa-twitter-square fa-2x"></i> */}
                            </div>
                            {/* <button type="button" className="btn ">classNameName */}
                        </div>
                    </div>
                </div >


                <div style={{ marginTop: '100' }}>
                </div>
                <Container>


                    <div className='mt-5'>
                        <h1 className="text-center" style={{ color: 'rgb(118, 102, 223)', fontSize: 50, }}>
                            <Icon size={32} icon={fileTextO} /> My Recent Work

                        </h1>

                        <h5 className="text-center">Here are a few recent design projects</h5>

                        {!arr.length ? (
                            <div
                                style={{
                                    position: "absolute",
                                    left: "50%",
                                    marginTop: '10%',

                                    // top: "50%",
                                    transform: "translate(-50%, -50%)"
                                }}
                            >
                                <img src={loading} />
                            </div>
                        ) : (<Row className='mt-5' >
                            {this.state.arr.map((e) => {
                                return (
                                    // <div class="col-lg-4 col-md-6  mb-4">
                                    //     <div class="card" id={e.newPostKey}>
                                    //         <div class="box13" style={{ textAlign: 'center' }}>
                                    //             <img src={e.downloadURL} style={{ height: 400 }} />
                                    //             <div class="box-content">
                                    //                 <h3 class="title">{e.headingName}</h3>
                                    //                 {/* <span class="post">{e.description} </span> */}
                                    //                 <ul class="social" style={{ display: 'flex', justifyContent: 'space-around' }}>
                                    //                     {/* <a className='asd' style={{ color: 'white' }} href={e.githubLink} target="_blank" data-tip="github" data-place="left"><Icon size={32} icon={github} /></a> */}
                                    //                     <a className='asd' style={{ color: 'white' }} onClick={() => this.toggle(e.newPostKey, e.headingName, e.body, e.buttonLink, e.githubLink, e.downloadURL)} data-toggle="modal" data-target="#exampleModalScrollable" data-tip="link" data-place="right"><Icon size={32} icon={locationArrow} /></a>

                                    //                 </ul>
                                    //             </div>

                                    //         </div>

                                    // </div>

                                    // </div>
                                    // </div>
                                    // <div class="container mt-40">
                                    // <div class="row mt-30">
                                    <div class="col-sm-12 col-md-6 ">
                                        {/* <h2 class="sector">Education - Permanent</h2> */}
                                        <div class="box20 " style={{ marginBottom: 30 }}>
                                            <img src={e.downloadURL} style={{ height: 300, }} />
                                            <div class="box-content">
                                                <i class="fas fa-university circle-icon"></i>
                                                <span style={{display: 'none'}}>{e.category}
                                                </span>
                                                <h3 class="title">{e.headingName}</h3>
                                                <br />
                                                <button type="button" class="btn btn-outline-light" onClick={() => this.toggle(e.newPostKey, e.headingName, e.body, e.buttonLink, e.githubLink, e.downloadURL)} data-toggle="modal" data-target="#exampleModalScrollable" data-tip="link" data-place="right">Learn More</button>
                                                {/* <a className='asd' style={{ color: 'white' }} ><Icon size={32} icon={locationArrow} /></a> */}
                                            </div>
                                        </div>

                                        <div class="modal fade" id="exampleModalScrollable" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                                            {/* aria-labelledby="staticBackdropLabel"  */}
                                            <div class="modal-dialog modal-dialog-scrollable" role="document">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title" id="exampleModalScrollableTitle">{fileName}</h5>
                                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>

                                                    <div class="modal-body">
                                                        <img src={imagePage} class="img-thumbnail" alt="Responsive image"></img>
                                                        <p>Description:  {ReactHtmlParser(html)}</p>
                                                        <a href={buttonLink} target="_blank" type="button" class="btn btn-outline-primary btn-block">View</a>
                                                        <br/>
                                                    </div>
                                                    <div class="modal-footer" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <a href={githubLink} target="_blank">
                                                            <img style={{ justifyContent: 'flex-start', cursor: 'pointer', height: 40 }} src={githubLogo} />
                                                        </a>

                                                        {/* <Button style={{ justifyContent: 'flex-start' }} href='{link}' target="_blank" color="primary" outline >Download</Button> */}
                                                        <button style={{ justifyContent: 'flex-end' }} type="button" class="btn btn-outline-dark" data-dismiss="modal">Close</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    // </div>
                                    // </div>

                                )
                            })}
                        </Row>)}
                        <div class="col-sm-12 col-md-6 offset-md-3" >
                            <button type="button" class="btn btn-outline-dark btn-block" onClick={() => this.props.history.push('allprojects')}>View More Projects</button>
                    </div>
                    </div>
                <div className="aboutme" >

                    <div >
                        <Row >
                            <Col md={{ size: 7, order: 0, offset: 2 }} sm={{ size: 10, order: 0, offset: 2 }} className="">
                                <div >
                                    <img style={{ marginTop: 50, width: '30%', borderRadius: '50%', }} src={myPhoto} alt="Adnan Ahmed" />
                                </div>


                            </Col>
                            <Col md={{ size: 8, order: 1, offset: 2 }} sm={{ size: 10, order: 1, offset: 2 }}>

                                <h2 className="text-center" style={{ color: 'rgb(118, 102, 223)' }}>

                                    About Us
                                </h2>
                                <p >

                                    As a designer and developer, I understand the perfect user
                                    interface should look good and work even better. Alongside my
                                    clients, I uncover problems and solve them. In short, I create
                                    bolder online experiences.
                        </p>
                            </Col>
                        </Row>
                    </div>
                </div>

                </Container>
            <div className="bagroundimage" >
                <div className="container-flux" id="contact">
                    <div className="abs ">
                        <h1 className="text-center " style={{ color: 'white' }}> Want to work together?</h1>
                        <h4 className="text-center"> +92 345 304 8496</h4>

                    </div>
                </div>
            </div>


            <div className="container-flux " style={{ margin: '7px' }}>
                <div className="float-left">
                    <h4>Handcrafted by Me <Icon style={{ color: 'rgb(118, 102, 223)' }} size={32} icon={heart} data-tip="Adnan Ahmed" /> <b data-toggle="tooltip" data-placement="top"
                        title="Adnan Ahmed">twentytwenty</b> </h4>
                </div>
                <div className="float-right" >




                    <a className='asd' style={{ marginLeft: 8, color: 'rgb(118, 102, 223)' }} href="https://api.whatsapp.com/send?phone=923453048496&text=&source=&data=" target="blank" data-tip="Whatsapp" data-place="left"><Icon size={32} icon={whatsapp} /></a>
                    <a className='asd' style={{ marginLeft: 8, color: 'rgb(118, 102, 223)' }} href="https://github.com/fidato818" target="blank" data-tip="Github"><Icon size={32} icon={github} /></a>
                    <a className='asd' style={{ marginLeft: 8, color: 'rgb(118, 102, 223)' }} href="https://www.facebook.com/millions818" target="blank" data-tip="Facebook"><Icon size={32} icon={facebookOfficial} /></a>
                    <a className='asd' style={{ marginLeft: 8, color: 'rgb(118, 102, 223)' }} href="https://www.linkedin.com/in/adnan-ahmed-28160298/" target="blank" data-tip="linkedn" ><Icon size={32} icon={linkedinSquare} /></a>
                </div>
            </div>
            </div >
        );
    }
}


Container.propTypes = {
    fluid: PropTypes.bool
    // applies .container-fluid className
}



export default withRouter(Home);






