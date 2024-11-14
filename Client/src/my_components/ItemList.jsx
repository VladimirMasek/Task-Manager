// My component
import Item from "../my_components/Item.jsx";
// UI component
import { Stack } from "@chakra-ui/react";

const itemList = ({ selectedList, showIsDone }) => {
  return (
    <Stack>
      {selectedList.itemList
        .filter((item) => (showIsDone ? !item.isDone : true))
        .map((item) => (
          <Item key={item.id} item={item} selectedList={selectedList} />
        ))}
    </Stack>
  );
};

export default itemList;
