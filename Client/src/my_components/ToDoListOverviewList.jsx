// React
import { useContext } from "react";
// Router
import { Outlet, useLocation } from "react-router-dom";
// Context provider
import { ToDoListContext } from "./ToDoListOverviewProvider";
// My components
import ToDoListOverviewItem from "./ToDoListOverviewItem";
// UI components
import { Grid, GridItem, Box } from "@chakra-ui/react";

const ToDoListOverviewList = () => {
  const { toDoListList, isMobile } = useContext(ToDoListContext);

  const location = useLocation();
  const isDetailPage = location.pathname !== "/";

  return (
    <Grid
      width="100%"
      templateColumns={isMobile ? "1fr" : "repeat(8, 1fr)"}
      gap="6"
    >
      {!isMobile || !isDetailPage ? (
        <GridItem colSpan={isMobile ? 1 : 3} h="80vh">
          <Box overflowY="auto" h="100%" pr="10px">
            {toDoListList.map((toDoListData) => (
              <ToDoListOverviewItem
                key={toDoListData.id}
                toDoListData={toDoListData}
              />
            ))}
          </Box>
        </GridItem>
      ) : null}

      {!isMobile || isDetailPage ? (
        <GridItem colSpan={isMobile ? 1 : 5} h="80vh">
          <Outlet />
        </GridItem>
      ) : null}
    </Grid>
  );
};

export default ToDoListOverviewList;
