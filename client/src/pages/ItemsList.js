import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useTable } from 'react-table';
import * as actions from '../actions';
import { DeleteButton } from '../components/buttons';

import MaUTable from '@material-ui/core/Table'
import {
    CssBaseline,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@material-ui/core';

import styled from 'styled-components';

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;

    @media screen and (max-width: 420px) {
        padding-left: 0.5em;
        padding-right: 0.5em;
    }
`;

const Button = styled.button.attrs({
    className: 'btn btn-primary',
})`
  margin: 15px 15px 15px 5px;
`;

const Table = ({ columns, data }) => {
    const {
        getTableProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({
      columns,
      data
    });

    return (
        <MaUTable {...getTableProps()}>
            <TableHead>
                {headerGroups.map(headerGroup => (
                    <TableRow {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <TableCell {...column.getHeaderProps()}>
                                {column.render('Header')}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableHead>
            <TableBody>
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <TableRow
                            data-row-item-id={row.values._id}
                            {...row.getRowProps()}
                        >
                            {row.cells.map(cell => {
                                return (
                                    <TableCell {...cell.getCellProps()}>
                                        {cell.render('Cell')}
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    )
                })}
            </TableBody>
        </MaUTable>
    )
};

class ItemsTable extends Component {

    componentDidMount() {
        console.log("ItemsList: props");
        console.log(this.props);
        // if (((this.props.itemData || {}).items || []).length) return;

        this.props.fetchAllItems()
    }

    handleRemoveItem = data => {
        const itemId = data;
        console.log('item being deleted', itemId)

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
                // filterable: true,
                Cell: props => {
                    console.log(props);
                    const { original } = props.cell.row;
                    return (
                        <span data-item-isbn={original.image_url_s}>
                            <img src={original.image_url_s} alt="BookImage"/>
                            {props.value}
                        </span>
                    )
                }
            },
            {
                Header: 'Isbn',
                accessor: 'isbn',
                // filterable: true,
                Cell: props => {
                    console.log(props);
                    const { original } = props.cell.row;
                    return (
                        <span data-item-isbn={original.isbn}>
                            {props.value}
                        </span>
                    )
                }
            },
            {
                Header: 'Title',
                accessor: 'title',
                // filterable: true,
                Cell: props => {
                    const { original } = props.cell.row;
                    return (
                        <Link
                            data-update-isbn={original.isbn}
                            to={`/item/${original.isbn}`}
                        >
                        <span data-item-title={original.title}>
                            {props.value}
                        </span>
                        </Link>
                    );
                }
            },
            {
                Header: 'Author',
                accessor: 'author',
                // filterable: true,
                Cell: props => {
                    const { original } = props.cell.row;
                    return (
                        <span data-author={original.author}>
                            {props.value}
                        </span>
                    );
                }
            },
            {
                Header: 'Year of Publication',
                accessor: 'publication_year',
                // filterable: true,
                Cell: props => {
                    const { original } = props.cell.row;
                    return (
                        <span data-author={original.publication_year}>
                            {props.value}
                        </span>
                    );
                }
            },
            {
                Header: 'Copies',
                accessor: 'copies',
                Cell: props => {
                    const { original } = props.cell.row;
                    return (
                        <span data-copies={original.copies}>
                            {props.value || "-"}
                        </span>
                    );
                },
            },
            {
                Header: 'Available',
                accessor: 'available',
                // filterable: true,
                Cell: props => {
                    const { original } = props.cell.row;
                    return (
                        <span data-available={original.available}>
                            {props.value}
                        </span>
                    );
                },
            },
            {
                Header: 'Update',
                accessor: '_update',
                Cell: props => {
                    const { original } = props.cell.row;
                    return (
                        <Link
                            data-update-isbn={original.isbn}
                            to={`/item/update/${original.isbn}`}
                        >
                            Update Item
                        </Link>
                    );
                },
            },
            {
                Header: 'Delete',
                accessor: '_delete',
                Cell: props => {
                    const { original } = props.cell.row;
                    return (
                        <span data-delete-isbn={original.isbn}>
                            <DeleteButton
                                id={original.isbn}
                                onDelete={this.handleRemoveItem}
                            />
                        </span>
                    );
                },
            },
            {
                Header: 'Borrow/Return Book',
                accessor: 'borrow',
                Cell: props => {
                    const { original } = props.cell.row;
                    return (
                        <Link
                            data-borrow-isbn={original.isbn}
                            to={`/item/borrow/${original.isbn}`}
                        >
                            Borrow/Return
                        </Link>
                        
                    );
                },
            },
        ];

        return (
            <Wrapper>
                <CssBaseline />
                {(
                    (items || []).length > 0
                ) ? (
                    <Table
                        data={items}
                        columns={columns}
                    />
                ) : (
                    `Loading books... `
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

export default connect(mapStateToProps, mapDispatchToProps)(ItemsTable);
