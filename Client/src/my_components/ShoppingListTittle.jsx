// Icons
import { Icon } from "@mdi/react";
import { mdiPencilOutline, mdiClose, mdiCheck } from "@mdi/js";
// UI components
import { HStack, Editable, IconButton } from "@chakra-ui/react";

const ShoppingListTittle = ({ list, handleUpdateListName, loggedInUser }) => {
  return (
    <HStack p="4">
      <Editable.Root
        key={list.id}
        maxLength={25}
        defaultValue={list.name}
        activationMode="disabled"
        disabled={loggedInUser.id !== list.owner.id}
        onValueChange={(newName) =>
          handleUpdateListName(list.id, newName.value)
        }
      >
        <Editable.Preview />
        <Editable.Input
          onKeyDown={(e) => {
            if (e.key === "Enter") e.preventDefault();
          }}
        />
        <Editable.Control>
          <Editable.EditTrigger asChild>
            <IconButton variant="ghost" size="xs">
              <Icon path={mdiPencilOutline} size={1} />
            </IconButton>
          </Editable.EditTrigger>
          <Editable.CancelTrigger asChild>
            <IconButton variant="outline" size="xs">
              <Icon path={mdiClose} size={1} />
            </IconButton>
          </Editable.CancelTrigger>
          <Editable.SubmitTrigger asChild>
            <IconButton variant="outline" size="xs">
              <Icon path={mdiCheck} size={1} />
            </IconButton>
          </Editable.SubmitTrigger>
        </Editable.Control>
      </Editable.Root>
    </HStack>
  );
};

export default ShoppingListTittle;
