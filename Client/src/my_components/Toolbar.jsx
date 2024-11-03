import { HStack, Button, Spacer, Text, Box } from "@chakra-ui/react";
import Icon from "@mdi/react";
import { mdiEyeOff, mdiEye, mdiPlusCircleOutline } from "@mdi/js";
import { useContext } from "react";
import { ToDoListContext } from "./ToDoListOverviewProvider";
import { UserContext } from "../Users/UserProvider";

const Toolbar = () => {
  const { showArchived, setShowArchived } = useContext(ToDoListContext);
  const { loggedInUser } = useContext(UserContext);

  if (!loggedInUser) {
    return <Box w="100%" h="7vh"></Box>;
  }

  const { handleCreateNewList } = useContext(ToDoListContext);

  return (
    <HStack w="100%" h="7vh">
      <Button
        variant="subtle"
        onClick={() => setShowArchived(!showArchived)}
        w="15vw"
      >
        <Icon path={showArchived ? mdiEyeOff : mdiEye} size={1} />
        <Text textStyle="xl">
          {showArchived ? "Hide archived" : "Show archived"}
        </Text>
      </Button>

      <Spacer />

      <Button variant="subtle" onClick={handleCreateNewList}>
        <Icon path={mdiPlusCircleOutline} size={1} />
        <Text textStyle="xl">Create new list</Text>
      </Button>
    </HStack>
  );
};

export default Toolbar;
