import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import './styles.css';
import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

export const Table = () => {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    fetch('http://patty.scrumware.eu/shares')
      .then((response) => response.json())
      .then((items) => setData(items));
  }, []);

  const columns = [
    {
      title: 'Product ID',
      field: 'id',
    },
    {
      title: 'Market ID',
      field: 'market.id',
    },
    {
      title: 'Market code',
      field: 'market.code',
    },
    {
      title: 'Market name',
      field: 'market.marketName',
    },
    {
      title: 'Name',
      field: 'market.name',
    },
    {
      title: 'Name',
      field: 'name',
    },
    {
      title: 'Symbol',
      field: 'symbol',
    },
    {
      title: 'ISIN',
      field: 'isin',
    },
    {
      title: 'Currency',
      field: 'currency',
    },
    {
      title: 'Last price',
      field: 'lastPrice',
      type: 'date',
      render: (row) => new Date(row.lastPrice).toLocaleString(),
    },
    {
      title: 'Last pattern check',
      field: 'lastPatternCheck',
    },
  ];

  return (
    <MaterialTable
      title="Product Details"
      data={data.content}
      columns={columns}
      options={{
        //pagination
        paging: true,
        pageSize: 5, // initial page size
        emptyRowsWhenPaging: true,
        pageSizeOptions: [5, 10, 20], // rows selection options
        // styling
        headerStyle: {
          backgroundColor: '#cf8e63',
          color: '#FFF',
        },
        searchFieldStyle: {
          backgroundColor: '#cf8e63',
          color: '#FFF',
        },
        rowStyle: (rowData) => ({
          backgroundColor:
            selectedRow === rowData.tableData.id ? '#EEE' : '#FFF',
        }),
      }}
      onRowClick={(evt, selectedRow) =>
        setSelectedRow(selectedRow.tableData.id)
      }
      icons={tableIcons}
    />
  );
};
