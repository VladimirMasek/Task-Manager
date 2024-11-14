// Context providers
import { useState, useContext } from "react";
import { UserContext } from "../Users/UserProvider";
import { ToDoListContext } from "./ToDoListOverviewProvider";
// React component
import { Form } from "react-router-dom";
// Icons
import Icon from "@mdi/react";
import { mdiEyeOff, mdiEye, mdiPlusCircleOutline, mdiClose } from "@mdi/js";
// UI components
import {
  HStack,
  Button,
  Spacer,
  Text,
  Box,
  Input,
  Stack,
  IconButton,
} from "@chakra-ui/react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogRoot,
} from "../components/ui/dialog";
import { Avatar } from "../components/ui/avatar";
import { Field } from "../components/ui/field";

const Toolbar = () => {
  const { showArchived, setShowArchived, handleCreateNewList } =
    useContext(ToDoListContext);
  const { loggedInUser, userList } = useContext(UserContext);

  const [listName, setListName] = useState("");
  const [error, setError] = useState("");
  const [addedUsers, setAddedUsers] = useState([]);

  const nonAddedUsers = userList.filter(
    (user) =>
      !addedUsers.some((addedUser) => addedUser.id === user.id) &&
      user.id !== loggedInUser.id
  );

  function handleRemoveUser({ addeduserId }) {
    setAddedUsers((current) =>
      current.filter((user) => user.id !== addeduserId)
    );
  }

  function handleAddUser({ user }) {
    setAddedUsers((current) => [...current, user]);
  }

  if (!loggedInUser) {
    return <Box w="100%" h="7vh"></Box>;
  }

  const onSubmit = (event) => {
    event.preventDefault();
    if (listName.trim()) {
      handleCreateNewList(listName, addedUsers);
      handleClose();
    } else {
      setError("List name is required");
    }
  };

  const handleClose = () => {
    setListName("");
    setError("");
    setAddedUsers([]);
  };

  return (
    <DialogRoot>
      <HStack w="100%" h="7vh">
        <Button variant="subtle" onClick={() => setShowArchived(!showArchived)}>
          <Icon path={showArchived ? mdiEyeOff : mdiEye} size={1} />
          <Text textStyle="xl" hideBelow="md">
            {showArchived ? "Hide archived" : "Show archived"}
          </Text>
        </Button>

        <Spacer />
        <DialogTrigger asChild>
          <Button variant="subtle">
            <Icon path={mdiPlusCircleOutline} size={1} />
            <Text textStyle="xl" hideBelow="md">
              Create new list
            </Text>
          </Button>
        </DialogTrigger>
      </HStack>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Shopping List</DialogTitle>
        </DialogHeader>
        <Form onSubmit={onSubmit}>
          <DialogBody pb="4">
            <Stack gap="4" align="flex-start" maxW="sm">
              <Field label="List Name" invalid={!!error} errorText={error}>
                <Input
                  value={listName}
                  onChange={(e) => {
                    setListName(e.target.value);
                    setError(
                      e.target.value.trim() ? "" : "List name is required"
                    );
                  }}
                />
              </Field>
            </Stack>

            {addedUsers.length === 0 ? null : <Text>Members</Text>}

            {addedUsers.map((addeduser) => (
              <HStack key={addeduser.id} mb="2px">
                <Avatar name={addeduser.name} />
                <Text>{addeduser.name}</Text>
                <Spacer />
                <Button
                  variant="subtle"
                  colorPalette="red"
                  onClick={() =>
                    handleRemoveUser({ addeduserId: addeduser.id })
                  }
                >
                  <Text>Remove</Text>
                </Button>
              </HStack>
            ))}

            <Box mt="40px">
              {nonAddedUsers.length === 0 ? null : <Text>Add Users</Text>}
              {nonAddedUsers.map((user) => (
                <HStack key={user.id} mb="2px">
                  <Avatar name={user.name} />
                  <Text>{user.name}</Text>
                  <Spacer />
                  <Button
                    variant="subtle"
                    colorPalette="green"
                    onClick={() => handleAddUser({ user })}
                  >
                    <Text>Add</Text>
                  </Button>
                </HStack>
              ))}
            </Box>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button type="submit" disabled={!listName.trim()}>
                Create List
              </Button>
            </DialogActionTrigger>
          </DialogFooter>
        </Form>
        <DialogCloseTrigger asChild>
          <IconButton variant="ghost" onClick={handleClose}>
            <Icon path={mdiClose} size={1} />
          </IconButton>
        </DialogCloseTrigger>
      </DialogContent>
    </DialogRoot>
  );
};

export default Toolbar;
