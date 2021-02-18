
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fetchSingleItem } from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import background from '../styles/tabbag.jpg';
import './../styles/tohover.css';



class about extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {

  };




  render() {


    return (
      <div id='background' style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover', width: '100%', position: 'absolute',
        height: '800px', backgroundColor: 'transparent'
      }} >
        <div className='align-items-left float-center'>
          <br />
          <u><span style={{ fontWeight: 'bold', backgroundColor: 'rgba(52, 52, 52, 0.6)', color:'white' }}>About</span></u>
          <table style={{ width: 600, height: 230, border: '2px solid black', marginLeft: 340, marginBottom: 10, marginTop:30 , backgroundColor: 'lightgray' }}>
            This application is built to help students browse, borrow, and return books to the library with ease.
            It also allows the library’s workers to update the stock of books and hide the books that are out of
            stock by simply deleting a book.
        <br />
        The books page provides an advanced level of granularity when searching for a book.
        It offers searching by author, ISBN, Name and more…
        <br />
        This application is part of our project at Hack. Diversity. We want to take this
        opportunity to thank all of hack. Diversity members that offer unlimited number of opportunities and
        try their best to help fellows like us reach success.

        </table>
          <Link to="items/react-table-v6" className="bttttn">
            Go back
        </Link>
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
    itemId: ownProps.match.params.id,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({ fetchSingleItem }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(about);

{/* <div>
<span style={{ fontWeight:'bold'}}>About:</span>
<p>
This application is built to help students browse, borrow, and return books to the library with ease.
It also allows the library’s workers to update the stock of books and hide the books that are out of
stock by simply deleting a book.

The search books page provides an advanced level of granularity when searching for a book.
It offers searching by author, ISBN, Name and more…

This application is part of our project at Hack. Diversity. For this occasion, we want to take this
opportunity to thank all of hack. Diversity members that offer unlimited number of opportunities and
try their best to help fellows like us reach success.
</p>
<button className='btnabout'> Go back </button>
</div>
 */}
