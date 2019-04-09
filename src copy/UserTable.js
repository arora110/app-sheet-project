import React from 'react';
import 'react-table/react-table.css';
import ReactTable from 'react-table';
import './UserTable.css';

// pre: Takes in an array of Users and a Title (for the table)
// post: Returns a table that displays User information
export function UserTable(props) {
  const columns = [
    {
      Header: props.title || 'Displaying Users',
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
    <div className="white">
      <ReactTable
        data={props.data || []}
        columns={columns}
        showPagination={false}
        minRows={0}
        verticalAlign="middle"
        className="-striped -highlight"
      />
    </div>
  );
}
