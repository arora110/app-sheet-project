import React from 'react';
import 'react-table/react-table.css';
import ReactTable from 'react-table';

// A class that displays multiple User's details as a table. Takes in an array of Users
// and a Title for the table.
export default class UserTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title ? this.props.title : 'Displaying Users',
      data: this.props.data ? this.props.data : [],
    };
  }

  render() {
    const columns = [
      {
        Header: this.state.title,
        columns: [
          {
            Header: 'ID',
            accessor: 'id',
            width: 50,
          },
          {
            Header: 'Name',
            accessor: 'name',
          },
          {
            Header: 'Photo',
            Cell: row => (
              <div>
                <img
                  className="img-responsive"
                  src={row.original.photo}
                  height={34}
                  alt={'photoOf' + row.original.name}
                />
              </div>
            ),
          },
          {
            Header: 'Age',
            accessor: 'age',
          },
          {
            Header: 'Number',
            accessor: 'number',
          },
        ],
      },
    ];
    return (
      <ReactTable
        data={this.state.data}
        columns={columns}
        showPagination={false}
        minRows={0}
        verticalAlign="middle"
        className="-striped -highlight"
      />
    );
  }
}
