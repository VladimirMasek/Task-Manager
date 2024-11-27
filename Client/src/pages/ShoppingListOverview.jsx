// My components
import Header from "../my_components/Header";
import ShoppingListOverviewList from "../my_components/ShoppingListOverviewList";
import Toolbar from "../my_components/Toolbar";
// UI components
import { VStack, Center } from "@chakra-ui/react";

const ShoppingListOverview = () => {
  return (
    <Center>
      <VStack width="80%">
        <Header />
        <Toolbar />
        <ShoppingListOverviewList />
      </VStack>
    </Center>
  );
};

export default ShoppingListOverview;
