import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom'
import Books from '../components/User/Books'
import Home from '../components/User/Home'
import Downloads from '../components/User/Downloads'
import Blogs from '../components/User/Blogs'
import Admin from '../components/Admin/Admin'
import Login from '../components/Admin/Login'
import AddBlogs from '../components/Admin/AddBlogs'
import EditBlog from '../components/Admin/EditBlog'
import EditBooks from '../components/Admin/EditBooks'
import EditProjects from '../components/Admin/EditProjects'
import EditDownloads from '../components/Admin/EditDownloads'
import AddDownloads from '../components/Admin/AddDownloads'
import AddBooks from '../components/Admin/AddBooks'
import addProjects from '../components/Admin/AddProjects'
import AddBlogsDetails from '../components/Admin/AddBlogsDetails'
import ScrollToTop from 'react-router-scroll-top'
import allprojects from '../components/User/allProjects'
// import firebase from './firebase'
import { connect } from 'react-redux';
import PrivateRoute from './PrivateRoute'

// const NoMatch = () => (
//     <p>404 Not Found</p>
// );

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            displayEmail: ''
        };
    }



    render() {
        // console.log("routes", this.props.user.user)

        return (
            <Router>
                <Switch>
                    <ScrollToTop>
                        {/* <Route exact path="/" component={All} /> */}
                        {/* <Route path="*" component={NoMatch} /> */}

                        <Route exact path="/" component={Home} />
                        <Route path="/Books" component={Books} />
                        <Route path="/Downloads" component={Downloads} />
                        <Route path="/allprojects" component={allprojects} />
                        <PrivateRoute path="/Blogs" component={Blogs} authed={this.props.user} />
                        <Route path="/AddblogsDetails/:id" component={AddBlogsDetails} />
                        <Route exact path="/Login" component={Login} />
                        {/* <Route exact path="/Admin" component={Admin} /> */}
                        <PrivateRoute exact path="/Admin" component={Admin} authed={this.props.user} />
                        <PrivateRoute exact path="/Blogs/:id" component={Blogs} authed={this.props.user}/>
                        <PrivateRoute exact path="/Addblogs" component={AddBlogs} authed={this.props.user}/>
                        <PrivateRoute exact path="/addprojects" component={addProjects} authed={this.props.user}/>
                        <PrivateRoute exact path="/Editblog/:id" component={EditBlog} authed={this.props.user}/>
                        <PrivateRoute exact path="/EditProjects/:id" component={EditProjects} authed={this.props.user}/>
                        <PrivateRoute exact path="/EditDownloads/:id" component={EditDownloads} authed={this.props.user}/>
                        <PrivateRoute exact path="/AddDownloads" component={AddDownloads} authed={this.props.user}/>
                        <PrivateRoute exact path="/Addbooks" component={AddBooks} authed={this.props.user}/>
                        <PrivateRoute exact path="/EditBooks/:id" component={EditBooks} authed={this.props.user}/>


                    </ScrollToTop>
                </Switch>
            </Router >
        )
    }
}


const mapStateToProps = state => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps, null)(Navbar);
