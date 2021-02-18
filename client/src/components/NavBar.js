import React, { Component } from 'react';
import styled from 'styled-components';

import Links from './Links';

const Container = styled.div.attrs({
    className: 'container',
})`
    max-width: 100%;
    padding-left: 0px;
    padding-right: 0px;

`;

const Nav = styled.nav.attrs({
    className: 'navbar navbar-expand-lg navbar-dark bg-dark',
})`
    linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)
    fontSize: 14px;

    font: Mulish
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;

    @media screen and (min-width: 992px) {
        padding: 0.5em 25%;
    }

`;

class NavBar extends Component {
    render() {
        return (
            <Container>
                <Nav>
                    <Links />
                </Nav>
            </Container>
        );
    }
}

export default NavBar;
