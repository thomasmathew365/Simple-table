import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useTable, useSortBy, useFilters, usePagination } from 'react-table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Row, Col, Button, Input, CustomInput } from 'reactstrap';
import { Filter, DefaultColumnFilter } from './filters';
import getColumns from './getColumns';

function ProductTable() {
  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/data')
      .then((response) => response.json())
      .then((data) => {
        setTableData(data);
      });
  }, [setTableData]);

  const deleteProduct = (index) => {
    let tableDataDeep = _.cloneDeep(tableData);
    delete tableDataDeep[index];
    let newArr = [];
    tableDataDeep.forEach((v) => {
      newArr.push(v);
    });
    setTableData(newArr);
  };

  const addProduct = () => {
    let tableDataDeep = _.cloneDeep(tableData);
    tableDataDeep.push({
      product_name: '',
      product_description: '',
      is_active: '',
      price: '',
      offer_price: '',
      offer_start_at: '',
      offer_end_at: '',
      created_at: '',
      updated_at: '',
    });
    setTableData(tableDataDeep);
  };

  const columns = getColumns({ deleteProduct });

  const generateSortingIndicator = (column) => {
    return (
      <div title='Sort'>
        {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ' ⏺️'}
      </div>
    );
  };

  const updateMyData = (index, id, value) => {
    let tableDataDeep = _.cloneDeep(tableData);
    tableDataDeep[index][id] = value;
    setTableData(tableDataDeep);
  };

  const booleanModifier = (value) => (value ? 'Yes' : 'No');

  const TableContainer = ({ columns, data }) => {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      prepareRow,
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      state: { pageIndex, pageSize },
    } = useTable(
      {
        columns,
        data,
        defaultColumn: { Filter: DefaultColumnFilter },
        updateMyData,
        booleanModifier,
        initialState: { pageIndex: 0, pageSize: 10 },
      },
      useFilters,
      useSortBy,
      usePagination
    );
    const onChangeInSelect = (event) => {
      setPageSize(Number(event.target.value));
    };

    const onChangeInInput = (event) => {
      const page = event.target.value ? Number(event.target.value) - 1 : 0;
      gotoPage(page);
    };

    return (
      <>
        <Table bordered hover {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => {
                  return (
                    <th {...column.getHeaderProps()}>
                      <div {...column.getSortByToggleProps()}>
                        {column.render('Header')}
                        {column.sortable && generateSortingIndicator(column)}
                      </div>
                      {column.filterable && <Filter column={column} />}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map(
              (row, i) =>
                prepareRow(row) || (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      );
                    })}
                  </tr>
                )
            )}
          </tbody>
        </Table>
        <Row style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          <Col md={3}>
            <Button
              color='primary'
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              {'<<'}
            </Button>
            <Button
              color='primary'
              onClick={previousPage}
              disabled={!canPreviousPage}
              style={{ marginLeft: 5 }}
            >
              {'<'}
            </Button>
          </Col>
          <Col md={2} style={{ marginTop: 7 }}>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </Col>
          <Col md={2}>
            <Input
              type='number'
              min={1}
              style={{ width: 70 }}
              max={pageOptions.length}
              defaultValue={pageIndex + 1}
              onChange={onChangeInInput}
            />
          </Col>
          <Col md={2}>
            <CustomInput
              type='select'
              value={pageSize}
              onChange={onChangeInSelect}
              id='size-select'
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </CustomInput>
          </Col>
          <Col md={3}>
            <Button color='primary' onClick={nextPage} disabled={!canNextPage}>
              {'>'}
            </Button>
            <Button
              color='primary'
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
              style={{ marginLeft: 5 }}
            >
              {'>>'}
            </Button>
          </Col>
        </Row>
        <Button
          color='success'
          onClick={addProduct}
          style={{ margin: '0px 10px 20px 20px', float: 'left' }}
        >
          Add
        </Button>{' '}
      </>
    );
  };

  return (
    <div className='main-container'>
      <div>
        <h1>
          <br></br>Available Products<br></br>
        </h1>
      </div>
      {tableData && (
        <div>
          <TableContainer columns={columns} data={tableData} />
        </div>
      )}
    </div>
  );
}

export default ProductTable;
