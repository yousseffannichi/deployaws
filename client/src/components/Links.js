import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from './Logo';

import './../styles/tohover.css';
const HomeWrapper = styled.div``;

const Collapse = styled.div.attrs({
    // className: 'collapse navbar-collapse',
})`

    @media screen and (max-width: 1000px) {
        display: flex;
        flex-grow: 1;
    }
`;

const List = styled.div.attrs({
    className: 'navbar-nav mr-auto',
})`
    @media screen and (max-width: 1000px) {
        flex-direction: row;
        justify-content: space-between;
        /* justify-content: flex-start; */
        width: 100%;
    }
`;

const Item = styled.div.attrs({
    // className: 'collapse navbar-collapse',
})`
    @media screen and (max-width: 1000px) {
        /* margin-right: 2em; */
    }
`;

const homeStyles = {
    marginLeft: `1em`
};

const logoStyles = {
    height: '40px',
    width: '40px',
};

class Links extends Component {
    render() {
        return (

            <React.Fragment>
                <HomeWrapper>
                    <Logo logoStyles={logoStyles} />
                </HomeWrapper>
                <Collapse>
                    <List>
                        <Item>
                            <Link
                                to="/"
                                className="nav-link"
                                style={homeStyles}
                            >
                                Home
                    </Link>
                        </Item>
                        <Item>
                            <Link to="/items/react-table-v6" className="nav-link">
                                Books
                                                        </Link>
                        </Item>
                        <Item>
                            <Link
                                to="/item/create"
                                className="nav-link"
                            >
                                Admin
                                                           </Link>
                        </Item>
                      
                        <Item>
                            <Link to="/About" className="nav-link">
                                About US
                                                        </Link>
                        </Item>

                    </List>
                </Collapse>
            </React.Fragment>

        );
    }
}

export default Links;
