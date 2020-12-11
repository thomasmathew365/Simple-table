import RenderEditable from './editableCell';

function getColumns({ deleteProduct }) {
  return [
    {
      Header: 'Actions',
      filterable: false,
      sortable: false,
      accessor: 'onemptied',
      Cell: ({ row: { index } }) => (
        <div
          style={{ cursor: 'pointer' }}
          title='Delete'
          onClick={() => deleteProduct(index)}
        >
          {'❌'}
        </div>
      ),
    },
    {
      Header: 'Name',
      accessor: 'product_name',
      filterable: true,
      sortable: true,

      Cell: RenderEditable,
    },
    {
      Header: 'Description',
      accessor: 'product_description',
      filterable: true,
      sortable: true,

      Cell: RenderEditable,
      filterMethod: (filter, row) => {
        return row[filter.id].includes(filter.value);
      },
    },
    {
      Header: 'In Stock',
      accessor: 'is_active',
      Cell: RenderEditable,
      filterable: true,
      sortable: true,
    },
    {
      Header: 'Price',
      accessor: 'price',
      filterable: true,
      sortable: true,

      Cell: RenderEditable,
    },
    {
      Header: 'Offer Price',
      accessor: 'offer_price',
      filterable: true,
      sortable: true,

      Cell: RenderEditable,
    },
    {
      Header: 'Offer Starts',
      accessor: 'offer_start_at',
      filterable: true,
      sortable: true,

      Cell: RenderEditable,
    },
    {
      Header: 'Offer Ends',
      accessor: 'offer_end_at',
      filterable: true,
      sortable: true,

      Cell: RenderEditable,
    },
    {
      Header: 'Created At',
      accessor: 'created_at',
      filterable: true,
      sortable: true,

      Cell: RenderEditable,
    },
    {
      Header: 'Updated At',
      accessor: 'updated_at',
      filterable: true,
      sortable: true,

      Cell: RenderEditable,
    },
  ];
}

export default getColumns;
