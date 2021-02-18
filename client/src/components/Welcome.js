/* eslint-disable semi */
import React from 'react';
import styled from 'styled-components';

import background from '../styles/Library.jpg';
/* import { Text, StyleSheet } from 'react-native'; */

/* <Text style={{backgroundColor: 'blue', alignSelf: 'flex-start'}}> */
const Welcome = () =>

    <div className="welcome--container">

        <div id='background' style={{
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover', width: '100%', position: 'absolute',
            height: '800px', backgroundColor: 'transparent'
        }} >
                
            <h2 className="welcome--message-text" style={{ paddingTop: '100px'}}>
                <span style={{
                color: '#D1D2D1', textAlign: 'center',
                fontFamily: 'verdana', fontSize: '50px', fontWeight: 'bold', backgroundColor: 'rgba(52, 52, 52, 0.5)'
            }} >Welcome to our community cafe and library Happy reading!</span></h2>
            <h3 className="welcome--description-text">
            <span style={{ color: '#D1D2D1', fontWeight: 'bold', backgroundColor: 'rgba(52, 52, 52, 0.6)' }} >At Hack.Diversity we like to hack things, like libraries, </span></h3>
            <h3 className="welcome--description-text" >
                <span style={{ color: '#D1D2D1', fontWeight: 'bold',  backgroundColor: 'rgba(52, 52, 52, 0.6)' }} >and we like to drink coffee while doing so!</span></h3>
        </div>
    </div>

export default Welcome;
