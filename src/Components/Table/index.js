import React, { useEffect, useState } from 'react';
import ReactTable, { useTable } from 'react-table';
import useFetch from '../../Actions/useFetch';

function Landing() {
  const {
    data: { data, isLoading },
  } = useFetch('http://localhost:8080/data');
  return <div>{!isLoading && <Table productData={data} />}</div>;
}

function Table({ productData }) {
  const data = productData;
  const columns = [
    {
      header: 'Name',
      accessor: 'product_name',
    },
    {
      header: 'Description',
      accessor: 'product_description',
    },
    {
      header: 'In Stock',
      accessor: 'is_active',
      Cell: ({ value }) => <div>{value ? 'Yes' : 'No'}</div>,
    },
    {
      header: 'Price',
      accessor: 'price',
    },
    {
      header: 'Offer Price',
      accessor: 'offer_price',
    },
    {
      header: 'Offer Starts',
      accessor: 'offer_start_at',
    },
    {
      header: 'Offer Ends',
      accessor: 'offer_end_at',
    },
    {
      header: 'Created At',
      accessor: 'created_at',
    },
    {
      header: 'Updated At',
      accessor: 'updated_at',
    },
  ];

  const tableInstance = useTable({ columns, data });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: 'solid 3px red',
                  background: 'aliceblue',
                  color: 'black',
                  fontWeight: 'bold',
                }}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: '10px',
                      border: 'solid 1px gray',
                      background: 'papayawhip',
                    }}
                  >
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Landing;
