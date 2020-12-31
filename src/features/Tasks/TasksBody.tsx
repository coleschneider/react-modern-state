import { useRef, useCallback, useState, useEffect } from "react";
import { useTable, useFlexLayout } from "react-table";
import { useVirtual } from "react-virtual";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import useStyles from "./styles";

// https://codesandbox.io/s/react-table-virtual-wg3ki?file=/src/App.js
// https://github.com/creativetimofficial/nextjs-material-dashboard/blob/master/components/Tasks/Tasks.js

export default function TasksBody({ data }) {
  const [height, setHeight] = useState(430);

  const classes = useStyles();
  const { getTableProps, rows, prepareRow } = useTable(
    { columns, data },
    useFlexLayout
  );

  const parentRef = useRef<HTMLDivElement>();
  const rowVirtualizer = useVirtual({
    size: data.length,
    parentRef,
    estimateSize: useCallback(() => 35, []),
  });

  useEffect(() => {
    if (parentRef.current) {
      const rect = parentRef.current.getBoundingClientRect();
      const offset = globalThis.window.innerWidth < 960 ? 133 : 180; // Header is thinner for small screens
      console.log(globalThis.screen.height - rect.top - offset);
      setHeight(globalThis.screen.height - rect.top - offset);
    }
  }, [parentRef]);

  return (
    <div
      ref={parentRef}
      style={{
        display: "block",
        height: `${height}px`,
        overflow: "auto",
        width: `100%`,
      }}
    >
      <Table {...getTableProps()}>
        <TableBody
          className="ListInner"
          style={{
            display: "block",
            height: `${rowVirtualizer.totalSize}px`,
            position: "relative",
          }}
        >
          {rowVirtualizer.virtualItems.map((virtualRow) => {
            const row = rows[virtualRow.index];
            prepareRow(row);
            return (
              <TableRow
                key={virtualRow.index}
                ref={virtualRow.measureRef}
                {...row.getRowProps({
                  style: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  },
                })}
              >
                {row.cells.map((cell) => {
                  return (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

const columns = [
  {
    Header: "Index",
    accessor: "index",
  },
  {
    Header: "First Name",
    accessor: "firstName",
  },
  {
    Header: "Last Name",
    accessor: "lastName",
  },
  {
    Header: "Age",
    accessor: "age",
  },
];
