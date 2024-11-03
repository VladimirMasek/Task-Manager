import { useState } from "react";
import { VStack, Center } from "@chakra-ui/react";
import Header from "../my_components/Header";
import ToDoListOverviewList from "../my_components/ToDoListOverviewList";
import Toolbar from "../my_components/Toolbar";

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
