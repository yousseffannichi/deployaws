import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactTable from 'react-table-6';
import * as actions from '../actions';
import { DeleteButton } from '../components/buttons';

import styled from 'styled-components';

import 'react-table-6/react-table.css';

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`;

class ItemsList extends Component {

    componentDidMount() {
        console.log("ItemsList: props");
        console.log(this.props);
        // if (((this.props.itemData || {}).items || []).length) return;

        this.props.fetchAllItems()
    }

    handleRemoveItem = data => {
        const itemId = data;

        this.props.deleteSingleItem(itemId)
            .then(resp => {
                console.log("handleRemoveItem: resp");
                console.log(resp);
                this.props.fetchAllItems();
            });
    }

    render() {
        const {
            items,
            loaded,
            loading
        } = this.props.itemData || {};
        console.log(items);

        const columns = [
            {
                Header: 'Image',
                accessor: 'image',
                filterable: true,
                Cell: props => {
                    console.log(props);
                    return (
                        <span data-item-isbn={props.original.image_url_s}>
                            <img src={props.original.image_url_s} alt="BookImage" />
                            {props.value}
                        </span>
                    )
                }
            },
            {
                Header: 'ISBN',
                accessor: 'isbn',
                filterable: true,
                Cell: props => {
                    return (
                        <span data-item-id={props.original.isbn}>
                            {props.original.isbn}
                        </span>
                    )
                }
            },

            {
                Header: 'Title',
                accessor: 'title',
                filterable: true,
                Cell: props => {
                    return (
                        <Link
                            data-update-isbn={props.original.isbn}
                            to={`/item/${props.original.isbn}`}
                        >
                        <span data-item-title={props.original.title}>
                            {props.value}
                        </span>
                        </Link>
                        
                    );
                }
            },
            {
                Header: 'Author',
                accessor: 'author',
                filterable: true,
                Cell: props => {
                    return (
                        <span data-title={props.original.author}>
                            {props.value}
                        </span>
                    );
                }
            },
            {
                Header: 'Publisher',
                accessor: 'publisher',
                filterable: true,
                Cell: props => {
                    return (
                        <span data-title={props.original.publisher}>
                            {props.value}
                        </span>
                    );
                }
            },
            {
                Header: 'Publication Year',
                accessor: 'publication_year',
                filterable: true,
                Cell: props => {
                    return (
                        <span data-timeframe={props.original.publication_year}>
                            {props.value || "-"}
                        </span>
                    );
                },
            },
            {
                Header: 'Copies',
                accessor: 'copies',
                filterable: true,
                Cell: props => {
                    return (
                        <span data-priority={props.original.copies}>
                            {props.value}
                        </span>
                    );
                },
            },
            {
                Header: 'Available',
                accessor: 'available',
                filterable: true,
                Cell: props => {
                    return (
                        <span data-priority={props.original.available}>
                            {props.value}
                        </span>
                    );
                },
            },
            {
                Header: 'Borrow/Return Book',
                accessor: 'borrow',
                Cell: props => {
                    return (
                        <Link
                            data-borrow-isbn={props.original.isbn}
                            to={`/item/borrow/${props.original.isbn}`}
                        >
                            Borrow/Return
                        </Link>

                    );
                },
            },
        ];


        return (
            <Wrapper>
                {(
                    (items || []).length > 0 // defeats the purpose of using `isLoading` prop?
                ) ? (
                        <ReactTable
                            data={items}
                            columns={columns}
                            isLoading={(loaded && loading)}
                            defaultPageSize={10}
                            showPageSizeOptions={true}
                            minRows={10}
                        />
                    ) : (
                        `Loading books...`
                    )}
            </Wrapper>
        );
    }

}

const mapStateToProps = state => {
    return {
        ...state
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);
