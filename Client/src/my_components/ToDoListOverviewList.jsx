import { useContext } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { ToDoListContext } from "./ToDoListOverviewProvider";
import ToDoListOverviewItem from "./ToDoListOverviewItem";

const ToDoListOverviewList = () => {
  const { toDoListList } = useContext(ToDoListContext);

  return (
    <Grid width="100%" templateColumns="repeat(8, 1fr)" gap="6">
      <GridItem colSpan={3}>
        {toDoListList.map((toDoListData) => (
          <ToDoListOverviewItem
            key={toDoListData.id}
            toDoListData={toDoListData}
          />
        ))}
      </GridItem>
      <GridItem colSpan={5}>
        <Outlet />
      </GridItem>
    </Grid>
  );
};

export default ToDoListOverviewList;
