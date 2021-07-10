import React from "react";
import {
  useTable,
  useSortBy,
  usePagination
} from "react-table";

import { Table } from "reactstrap";
import {
  Pagination,
  PaginationItem,
  PaginationLink
} from "reactstrap";
import classNames from "classnames";
import "./assets/Table.css";
import sortasc from "./assets/sort_asc.png";
import sortdesc from "./assets/sort_desc.png";
import sortboth from "./assets/sort_both.png";
import loaderimage from "./assets/loader-table.gif";
import ModalAddEdit from "../Modals/ModalAddEdit";
import ModalConfirmDelete from "../Modals/ModalConfirmDelete";

const XTable = ({ 
  columns, 
  data, 
  updateState,
  deleteItemFromState,
  loading = true }) => {
 
  const defaultColumn = React.useMemo(
    () => ({
      
    }),
    []
  );

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
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
      defaultColumn
    },
    useSortBy,
    usePagination
  );

  return (
    <>
      <Table {...getTableProps()} hover bordered responsive>
        <thead>
          {headerGroups.map((headerGroup) => (
            <>
              <tr className="theader" {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <span className="float-right">
                      {!column.notShowSortingDisplay ? (
                        column.isSorted ? (
                          column.isSortedDesc ? (
                            <img src={sortdesc} alt="descending" />
                          ) : (
                            <img src={sortasc} alt="ascending" />
                          )
                        ) : (
                          <img src={sortboth} alt="sorting" />
                        )
                      ) : (
                        ""
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            </>
          ))}
        </thead>
        {loading ? (
          <tbody>
            <tr>
              <td colSpan="10000" className="text-center">
                <img src={loaderimage} alt="Loading..." />
              </td>
            </tr>
          </tbody>
        ) : (
          <>
            {page.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan="10000" className="text-left">
                     -- No recrods to show --
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {

                        const header = cell.column.Header
                        if(header === 'Actions'){
                          return (
                            <td
                              {...cell.getCellProps({
                                className: cell.column.className
                              })}
                            >
                              {
                              
                              
                              <div style={{ width: "110px"}}>
                              <ModalAddEdit
                                buttonLabel="Edit"
                                item={data[i]}
                                updateState={updateState}
                            
                              />{" "}
                              <ModalConfirmDelete
                                buttonLabel="Delete"
                                item={data[i]}
                                deleteItemFromState={deleteItemFromState}
                              ></ModalConfirmDelete>
                          </div>
                              
                              }
                            </td>
                          );
                        }
                        else {
                        return (
                          <td
                            {...cell.getCellProps({
                              className: cell.column.className
                            })}
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                          }
                      })}
                    </tr>
                  );
                })}
              </tbody>
            )}
          </>
        )}
      </Table>

      {page.length > 0 && (
        <div className={classNames("div-pagination", { "d-none": loading })}>
          <div className="div-pagination-2">
            <div className="div-pagination-2-2">
              Showing{" "}
              <select
                className="selectan"
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
              >
                {[10, 20, 30, 50, 100].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>{" "}
              record per-page
            </div>
          </div>

          <div className="div-pagination-1">
            Page : {pageIndex + 1} from {pageOptions.length}{" "}
            <Pagination className="pagina">
              <PaginationItem disabled={!canPreviousPage}>
                <PaginationLink onClick={() => gotoPage(0)}>
                  {"<<"}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem disabled={!canPreviousPage}>
                <PaginationLink onClick={() => previousPage()}>
                  {"<"}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem disabled={!canNextPage}>
                <PaginationLink onClick={() => nextPage()}>
                  {">"}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem disabled={!canNextPage}>
                <PaginationLink onClick={() => gotoPage(pageCount - 1)}>
                  {">>"}
                </PaginationLink>
              </PaginationItem>
            </Pagination>
            
          </div>
        </div>
      )}
    </>
  );
};

export default XTable;
