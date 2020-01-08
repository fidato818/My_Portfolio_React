import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { withRouter, Redirect } from 'react-router-dom'
import firebase from './firebase'
import { update_user, remove_user } from '../store/actions/actions';
import { connect } from 'react-redux';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
class NavBarAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            displayEmail: '',
            user: this.props.user.user.uid
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }


    logout = () => {
        const { history } = this.props;
        firebase.auth().signOut()
            .then(() => {
                history.push("/Login");
                // Sign-out successful.
            }).catch(function (error) {
                // An error happened.
                console.log(error.message)
            });
        this.props.logout_user()
    }

    authListener() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log("user changed..", user.email);
                this.setState({
                    uid: user.uid,
                    displayEmail: user.email
                });
            } else {
                // No user is signed in.
                // browserHistory.push("/signin");
            }
        });
    }

    componentDidMount() {
        this.authListener();

    }

    render() {
        const { displayEmail, loginUser, user } = this.state;
        // const { user } = this.props


        if (!user)
            return <Redirect to="/login" />

        return (
            <Navbar color="dark" light expand="md" fixed='top'>
                <NavbarBrand style={{ color: 'white' }} href="/admin">Adnan Ahmed | Admin </NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        {/* <NavItem className='nav-item navy'>
                                    <NavLink className="text-block" onclick="return false"
                                        onmousedown="autoscroll('home')"><Link style={{color:"black", textDecoration: 'none', cursor: 'pointer'}} to="/">User</Link></NavLink>
                                </NavItem> */}
                        {/* <NavItem className='nav-item navy'>
                            <NavLink ><Link style={{ color: "black", textDecoration: 'none', cursor: 'pointer' }} to="/Addblogs">Add Blogs</Link></NavLink>
                        </NavItem>
                        <NavItem className='nav-item navy'>
                            <NavLink ><Link style={{ color: "black", textDecoration: 'none', cursor: 'pointer' }} to="/addDownloads">Add Downloads</Link></NavLink>
                        </NavItem>
                        <NavItem className='nav-item navy'>
                            <NavLink><Link style={{ color: "black", textDecoration: 'none', cursor: 'pointer' }} to="/addbooks">Add Books</Link></NavLink>
                        </NavItem> */}
                        {/* <NavItem className='nav-item navy'>
                                    <NavLink ><Link style={{color:"black", textDecoration: 'none', cursor: 'pointer'}} to="/"></Link></NavLink>
                                </NavItem> */}
                        {/* <NavItem>
                                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                            </NavItem> */}
                        {displayEmail && <UncontrolledDropdown nav inNavbar >
                            <DropdownToggle style={{ color: 'white' }} nav caret>
                                {displayEmail}
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    Profile
                        </DropdownItem>
                                {/* <DropdownItem>
                                    Option 2
                        </DropdownItem> */}
                                <DropdownItem divider />
                                <DropdownItem onClick={this.logout}>
                                    Logout
                        </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>}
                    </Nav>
                </Collapse>
            </Navbar>
        )
    }

}
const mapStateToProps = state => {
    return {
        user: state.user
    }
}


const mapDispatchToProps = dispatch => {
    return {
        store_user: (user) => dispatch(update_user(user)),
        logout_user: () => dispatch(remove_user()),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBarAdmin));