// My components
import Header from "../my_components/Header";
import ToDoListOverviewList from "../my_components/ToDoListOverviewList";
import Toolbar from "../my_components/Toolbar";
// UI components
import { VStack, Center } from "@chakra-ui/react";

const ToDoListOverview = () => {
  return (
    <Center>
      <VStack width="80%">
        <Header />
        <Toolbar />
        <ToDoListOverviewList />
      </VStack>
    </Center>
  );
};

export default ToDoListOverview;
