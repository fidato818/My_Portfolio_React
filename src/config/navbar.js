import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,


} from 'reactstrap';
class NavBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
          

        };

        this.toggle = this.toggle.bind(this);
    }


    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        // const {  displayEmail } = this.state;
        return (
            <Navbar color="light" light expand="md" fixed='top'>
                <NavbarBrand href="/">Adnan Ahmed</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem className='nav-item navy'>
                            <NavLink className="text-block" onclick="return false"
                                onmousedown="autoscroll('home')"><Link style={{ color: "black", textDecoration: 'none', cursor: 'pointer' }} to="/">Home</Link></NavLink>
                        </NavItem>
                        <NavItem className='nav-item navy'>
                            <NavLink ><Link style={{ color: "black", textDecoration: 'none', cursor: 'pointer' }} to="/Books">Book Shelf</Link></NavLink>
                        </NavItem>
                        <NavItem className='nav-item navy'>
                            <NavLink ><Link style={{ color: "black", textDecoration: 'none', cursor: 'pointer' }} to="/Downloads">Downloads</Link></NavLink>
                        </NavItem>
                        {/* <NavItem className='nav-item navy'>
                            <NavLink><Link style={{ color: "black", textDecoration: 'none', cursor: 'pointer' }} to="/Blogs">Blogs</Link></NavLink>
                        </NavItem> */}
                        {/* <NavItem className='nav-item navy'>
                                    <NavLink ><Link style={{color:"black", textDecoration: 'none', cursor: 'pointer'}} to="/"></Link></NavLink>
                                </NavItem> */}
                        {/* <NavItem>
                                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                            </NavItem> */}
                        {/* <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Options
                      </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        Option 1
                        </DropdownItem>
                                    <DropdownItem>
                                        Option 2
                        </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        Reset
                        </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown> */}
                    </Nav>
                </Collapse>
            </Navbar>
        )
    }

}

export default withRouter(NavBar);