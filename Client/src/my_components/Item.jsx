// Context provider
import { useContext } from "react";
import { ToDoListContext } from "./ToDoListOverviewProvider";
// Icons
import Icon from "@mdi/react";
import {
  mdiCheckboxBlankOutline,
  mdiCheckboxMarkedOutline,
  mdiTrashCanOutline,
} from "@mdi/js";
// UI components
import { Editable, HStack, IconButton, Spacer } from "@chakra-ui/react";
import { Tooltip } from "../components/ui/tooltip";

const Item = ({ item, selectedList }) => {
  const { handleCheck, handleDeleteItem, handleUpdateItemName } =
    useContext(ToDoListContext);

  return (
    <HStack key={item.id}>
      <IconButton
        variant="ghost"
        onClick={() =>
          handleCheck({
            toDoListId: selectedList.id,
            itemId: item.id,
          })
        }
      >
        <Icon
          path={
            item.isDone ? mdiCheckboxMarkedOutline : mdiCheckboxBlankOutline
          }
          size={1}
        />
      </IconButton>
      <Tooltip
        content="Double click to edit"
        positioning={{
          offset: { mainAxis: 4, crossAxis: 4 },
        }}
      >
        <Editable.Root
          key={item.id}
          fontSize={{ mdDown: "xs", base: "md" }}
          defaultValue={item.name}
          activationMode="dblclick"
          onValueChange={(newName) =>
            handleUpdateItemName(selectedList.id, item.id, newName.value)
          }
        >
          <Editable.Preview />
          <Editable.Input />
        </Editable.Root>
      </Tooltip>
      <Spacer />
      <IconButton
        colorPalette="red"
        variant="subtle"
        onClick={() =>
          handleDeleteItem({
            toDoListId: selectedList.id,
            itemId: item.id,
          })
        }
      >
        <Icon path={mdiTrashCanOutline} size={1} />
      </IconButton>
    </HStack>
  );
};

export default Item;
