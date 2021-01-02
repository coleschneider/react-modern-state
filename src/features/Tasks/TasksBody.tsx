import { useRef, useCallback, useState, useEffect } from "react";
import { useVirtual } from "react-virtual";
import Box from "@material-ui/core/Box";
import { TaskExcerptType } from "types/task";
import TaskItem from "./TaskItem";
import useStyles from "./styles";

// https://github.com/creativetimofficial/nextjs-material-dashboard/blob/master/components/Tasks/Tasks.js

// https://codesandbox.io/s/framer-motion-2-drag-to-reorder-fc4rt?file=/src/App.js

type TaskBodyProps = {
  data: TaskExcerptType[];
};

export default function TasksBody({ data }: TaskBodyProps) {
  const parentRef = useRef<HTMLDivElement>();
  const rowVirtualizer = useVirtual({
    size: data.length,
    parentRef,
    estimateSize: useCallback(() => 60, []),
    overscan: 5,
  });
  const classes = useStyles();

  return (
    <div ref={parentRef} className={classes.tableContainer}>
      <Box
        display="flex"
        flexDirection="column"
        position="relative"
        height={`${rowVirtualizer.totalSize}px`}
      >
        {rowVirtualizer.virtualItems.map((virtualRow) => (
          <TaskItem
            task={data[virtualRow.index]}
            key={virtualRow.index}
            virtualRow={virtualRow}
          />
        ))}
      </Box>
    </div>
  );
}
