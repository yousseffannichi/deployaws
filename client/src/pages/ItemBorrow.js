import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchSingleItem, updateSingleItem } from '../actions';


import styled from 'styled-components';

const Title = styled.h1.attrs({
    className: 'h1',
})``;

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin-top: 0 30px;
`;

const Label = styled.label`
    margin: 5px;
    max-width: 30%;
`;

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px auto;
    max-width: 30%;
    text-align: center;
`;

const Button = styled.button.attrs({
    className: 'btn btn-primary',
})`
  margin: 15px 15px 15px 5px;
`;

const CancelButton = styled.a.attrs({
    className: 'btn btn-danger',
})`
  margin: 15px 15px 15px 5px;
`;

class ItemUpdate extends Component {
    constructor(props) {
        /**
         * Currently deprecated and now known as the "legacy context":
         * - https://reactjs.org/docs/legacy-context.html
         *
         * TODO: refactor to use new Context API:
         * - https://reactjs.org/docs/context.html
         */
        super(props);
        this.state = {
            _id: '',
            isbn: '',
            title: '',
            author: '',
            publication_year: 0,
            publisher:'',
            image_url_s: '',
            image_url_m: '',
            image_url_l: '',
            copies: 0,
            available: 0,
        };
    }

    componentDidMount() {
        this.props.fetchSingleItem(this.props.itemId)
            .then(resp => {
                const { item } = resp.data;
                this.setState({ ...item });
            });
    }

    changeAvailable = () => {
        this.setState((prevState) => {
          return { available: prevState.available - 1}
        })
      }

    handleChangeInputAvailable = event => {
        if (this.state.available > 0) {
            this.setState({ available: this.state.available - 1 }, () => 
            this.handleUpdateItem(this.state)
            )
            
        } else {
            window.alert(`No books available at the moment`);
        }
        
    }
    handleReturnBook = event => {
        if (this.state.available < this.state.copies) {
            this.setState({ available: this.state.available + 1 }, () => 
            this.handleUpdateItem(this.state)
            )
            
        } else {
            window.alert(`Error cannot return book`);
        }
        
    }

    handleUpdateItem = event => {
        const {
            _id,
            isbn,
            title,
            author,
            publication_year,
            publisher,
            image_url_s,
            image_url_m,
            image_url_l,
            copies,
            available,
        } = this.state;
        const item = { _id,
            isbn,
            title,
            author,
            publication_year,
            publisher,
            image_url_s,
            image_url_m,
            image_url_l,
            copies,
            available };

        return this.props.updateSingleItem(item)
            .then(resp => {
                console.log("handleUpdateItem: resp");
                console.log(resp);
                if (typeof resp === "object" && (resp.status < 300 && resp.status >= 200)) {
                    // window.alert('Book borrowed successfully');
                    return true;
                } else {
                    throw resp;
                }
            })
            .catch(err => {
                window.alert(`There was an error updating the item... :(`);
                console.error("handleUpdateItem: err");
                console.error(err);
            });
    }

    confirmUpdateItem = event => {
        if (window.confirm(`Are you sure you want to borrow this book? ${this.state.title}`)) {
            return this.handleUpdateItem(event);
        }
    }

    render() {
        const {
            _id,
            isbn,
            title,
            author,
            publication_year,
            publisher,
            image_url_s,
            image_url_m,
            image_url_l,
            copies,
            available
        } = this.state;

        return _id && (
            <Wrapper>
                <Title>Borrow Book</Title>
                <Label>Title: </Label>
                <td>{ this.state.title }</td>
                <Label>Author: </Label>
                <td>{ this.state.author }</td>
                <Label>Copies </Label>
                <td>{ this.state.copies }</td>

                <Label>Available </Label>
                <td>{ this.state.available }</td>

                <Button 
                //value={this.state.available}
                onClick={this.handleChangeInputAvailable}>
                    Borrow</Button>
                <Button 
                onClick={this.handleReturnBook}>
                    Return Book</Button>
                <CancelButton href={'/items/list'}>Cancel</CancelButton>
            </Wrapper>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...state,
        itemId: ownProps.match.params.id,
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({ fetchSingleItem, updateSingleItem }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ItemUpdate);
