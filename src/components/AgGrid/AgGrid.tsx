import TableEditableservice from "./TableEditable.service";
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Edit from '../../svgIcons/Tableedit';
import Delete from '../../svgIcons/Tabledelete';
import Close from '../../svgIcons/Tableclose';
import Save from '../../svgIcons/Tablesave';

let queryParams = new URLSearchParams();

const TableEditable = (props: any) => {
  const gridRef = useRef<any>({});
  const [paginationCurrentPage, setPaginationCurrentPage] = useState(1);
  const [inputRow, setInputRow] = useState<any>({});

  useEffect(() => {
    if (props.enableAction && props.columnDefs.filter((x: any) => x.colId === "action")?.length <= 0) {
      props.columnDefs.push({
        headerName: "Action",
        cellRenderer: (params: any) => actionCellRenderer(params, props),
        editable: false,
        colId: "action"
      })
    }
  }, [])

  const onaddClicked = () => {

    gridRef.current?.api.startEditingCell({
      rowIndex: 0,
      rowPinned: 'top',
      colKey: gridRef.current?.columnApi.getDisplayedCenterColumns()[0].colId
    });
  }

  const onEditClicked = (params: any) => {
    params.api.startEditingCell({
      rowIndex: params.node.rowIndex,
      colKey: params.columnApi.getDisplayedCenterColumns()[0].colId
    });
  }
  const onCancelClicked = (params: any) => {
    params.api.stopEditing(true);

  }
  const onUpdateClicked = (params: any) => {
    let data = params.data;
    let id = params.data.key
    params.api.stopEditing(false);
    if (props.enableAction && props.enableApiCalls && props.url) {
      TableEditableservice.putData(props.url + "/" + id, data)
    }
  }
  const onAddClicked = (params: any) => {
    params.api.stopEditing(false)
    let data = params.data;
    if (props.enableAction && props.enableApiCalls && props.url) {
      TableEditableservice.postData(props.url, data)
        .then((data) => {
          ;
          props.setRowData(data.data)
        })
    } else {
      props.setRowData((curr: any) => [...curr, data]);

    }
    setInputRow({});
  }
  const onDeleteClicked = (params: any) => {
    let id = params.data.key
    if (props.enableAction && props.enableApiCalls && props.url) {
      TableEditableservice.deleteData(props.url + "/" + id).then(() => {
        params.api.applyTransaction({
          remove: [params.node.data]
        });

      })
    } else {
      params.api.applyTransaction({
        remove: [params.node.data]
      });
    }
  }

  function actionCellRenderer(params: any, props: any, action?: string,) {
    let editingCells = params.api.getEditingCells();
    let temp;
    let isCurrentRowEditing = editingCells.some((cell: any) => {
      return cell.rowIndex === params.node.rowIndex;
    });
    if ((isCurrentRowEditing || params.node.rowPinned) && action !== "cancel") {
      temp =
        <>
          <IconButton onClick={() => { props.onUpdateClicked ? props.onUpdateClicked(params) : params.node.rowPinned ? onAddClicked(params) : onUpdateClicked(params) }} data-action={params.node.rowPinned ? "add" : "update"}> {props.saveIcon ? props.saveIcon : <Save data-action={params.node.rowPinned ? "add" : "update"} />} </IconButton>
          <IconButton onClick={() => { props.onCancelClicked ? props.onCancelClicked(params) : onCancelClicked(params) }} data-action="cancel" > {props.closeIcon ? props.closeIcon : <Close data-action="cancel" />} </IconButton>
        </>

    } else {
      temp =
        <>
          <IconButton onClick={() => { props.onEditClicked ? props.onEditClicked(params) : onEditClicked(params) }} data-action="edit"> {props.editIcon ? props.editIcon : <Edit data-action="edit" />}   </IconButton>
          <IconButton onClick={() => { props.onDeleteClicked ? props.onDeleteClicked(params) : onDeleteClicked(params) }} data-action="delete" > {props.deleteIcon ? props.deleteIcon : <Delete data-action="delete" />}   </IconButton>
        </>
    }

    return temp;
  }
  const defaultColDef = {
    flex: 1,
    editable: true,
    valueFormatter: (params: any) =>
      isEmptyPinnedCell(params)
        ? createPinnedCellPlaceholder(params)
        : undefined,
  }

  function isEmptyPinnedCell({ node, value }: any) {
    return (
      (node.rowPinned === 'top' && value == null) ||
      (node.rowPinned === 'top' && value == '')
    );
  }

  function createPinnedCellPlaceholder({ colDef }: any) {
    if (colDef.colId !== "action")
      return colDef.field[0].toUpperCase() + colDef.field.slice(1) + '...';
  }

  const fetchData = () => {
    if (props.url) {
      if (queryParams) {
        TableEditableservice.fetchDataWithParams(props.url, queryParams)
          .then((data) => { props.setRowData(data.data) });
      } else {
        TableEditableservice.fetchData(props.url)
          .then((data) => { props.setRowData(data.data) });
      }
    }

  }

  const onGridReady = useCallback((params: any) => {
    fetchData()
  }, []);

  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    props.setSelectedRows(
      selectedRows)
  }, []);




  const onSortChanged = () => {
    const sortModel = gridRef.current?.columnApi.getColumnState().find((s: { sort: null; }) => s.sort != null)
    if (sortModel) {
      queryParams.set("sortColumn", sortModel?.colId);
      queryParams.set("sortValue", sortModel?.sort ? sortModel.sort : "");
      fetchData()
    }
  };

  const onFilterChanged = () => {
    const filters = gridRef.current?.api.getFilterModel();
    if (props.filterModel)
      props.filterModel(filters)
  };
  const onPaginationChanged = () => {
    const currentPage = gridRef.current?.api?.paginationGetCurrentPage();
    setPaginationCurrentPage(currentPage + 1);

  }
  useEffect(() => {
    queryParams.set("page", paginationCurrentPage.toString())
    queryParams.set("size", props.paginationPageSize ? props.paginationPageSize : 5);
    fetchData();
  }, [paginationCurrentPage]);

  return (
    <>
      <Button style={{ display: props.enableAction ? "block" : "none", marginBottom: "10px", float: "right" }} variant="contained" onClick={onaddClicked}>Add</Button>

      <div className={props.className ? props.className : "ag-theme-alpine"} style={{
        display: "flex", flexDirection: "column",
        height: props.height ? props.height : 400, width: props.width ? props.width : '100%'
      }}>

        <AgGridReact
          ref={gridRef}
          {...props}
          onGridReady={onGridReady}
          pagination={props.pagination}
          paginationPageSize={props.paginationPageSize ? props.paginationPageSize : 5}
          onPaginationChanged={props.onPaginationChanged ? props.onPaginationChanged : props.serverSidePagination ? onPaginationChanged : ""}
          onSelectionChanged={props.onSelectionChanged ? props.onSelectionChanged : props.selectedRows && props.setSelectedRows ? onSelectionChanged : ''}
          onSortChanged={props.onSortChanged ? props.onSortChanged : props.serverSideSorting ? onSortChanged : ""}
          serverSideSorting={props.serverSideSorting}
          onFilterChanged={props.onFilterChanged ? props.onFilterChanged : props.serverSideFiltering ? onFilterChanged : ""}
          serverSideFiltering={props.serverSideFiltering}
          rowDragManaged={props.rowDragManaged}

          defaultColDef={props.defaultColDef ? props.defaultColDef : props.enableAction ?  defaultColDef:""}
          pinnedTopRowData={props.pinnedTopRowData ? props.pinnedTopRowData : props.enableAction ? [inputRow] : []}
          editType={props.editType ? props.editType : props.enableAction ? "fullRow" : ""}
          suppressClickEdit={props.suppressClickEdit ? props.suppressClickEdit : props.enableAction ?
            true : false}
        ></AgGridReact>

      </div>
    </>


  );
}
export default TableEditable
