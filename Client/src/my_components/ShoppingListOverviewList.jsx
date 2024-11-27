// React
import { useContext } from "react";
// Router
import { Outlet, useLocation } from "react-router-dom";
// Context provider
import { ShoppingListContext } from "./ShoppingListOverviewProvider";
// My components
import ShoppingListOverviewItem from "./ShoppingListOverviewItem";
// UI components
import { Grid, GridItem, Box } from "@chakra-ui/react";

const ShoppingListOverviewList = () => {
  const { shoppingListList, isMobile } = useContext(ShoppingListContext);

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
            {shoppingListList.map((shoppingListData) => (
              <ShoppingListOverviewItem
                key={shoppingListData.id}
                shoppingListData={shoppingListData}
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

export default ShoppingListOverviewList;
