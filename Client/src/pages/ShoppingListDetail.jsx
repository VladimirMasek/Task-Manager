import { useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../Users/UserProvider.jsx";
import { ToDoListContext } from "../my_components/ToDoListOverviewProvider";
import {
  Card,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Spacer,
  Stack,
  Text,
  Box,
  Button,
  Link,
  Tabs,
  Badge,
  Editable,
} from "@chakra-ui/react";
import { Avatar } from "../components/ui/avatar";
import { Tooltip } from "../components/ui/tooltip";
import { Icon } from "@mdi/react";
import {
  mdiPencilOutline,
  mdiTrashCanOutline,
  mdiFilterOutline,
  mdiAccountMultiple,
  mdiPlusCircleOutline,
  mdiLogout,
  mdiClose,
  mdiCheck,
  mdiCheckboxBlankOutline,
  mdiCheckboxMarkedOutline,
  mdiFilterOffOutline,
} from "@mdi/js";

const ShoppingListDetail = () => {
  const params = useParams();
  const toDoListId = parseInt(params.toDoListId);

  const {
    toDoListList,
    showIsDone,
    setShowIsDone,
    handleCheck,
    handleKickMember,
    handleDeleteItem,
    handleAddItem,
    handleAddMember,
  } = useContext(ToDoListContext);

  const selectedList = toDoListList.find((list) => list.id === toDoListId);
  if (!selectedList) {
    return <div>Shopping list not found!</div>;
  }

  const { loggedInUser, userList } = useContext(UserContext);

  const nonMembers = userList.filter(
    (user) =>
      !selectedList.members.some((member) => member.id === user.id) &&
      user.id !== selectedList.owner.id
  );

  const newName = "";
  return (
    <Box w="100%" h="80vh">
      <Card.Root w="100%" h="100%">
        <Tabs.Root defaultValue="members">
          <Card.Header>
            <Tabs.List>
              <Tabs.Trigger value="items" asChild>
                <Link unstyled href="#items">
                  <HStack p="4">
                    <Editable.Root
                      maxLength={25}
                      defaultValue={selectedList.name}
                      activationMode="disabled"
                      disabled={
                        loggedInUser.id === selectedList.owner.id ? false : true
                      }
                    >
                      <Editable.Preview />
                      <Editable.Input />
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
                          <IconButton
                            variant="outline"
                            size="xs"
                            //onClick={(e) => console.log(e.target.value)}
                          >
                            <Icon path={mdiCheck} size={1} />
                          </IconButton>
                        </Editable.SubmitTrigger>
                      </Editable.Control>
                    </Editable.Root>
                  </HStack>
                </Link>
              </Tabs.Trigger>
              <Tabs.Trigger value="members" asChild>
                <Link unstyled href="#members">
                  <Text>Members</Text>
                  <Icon path={mdiAccountMultiple} size={1} />
                </Link>
              </Tabs.Trigger>
            </Tabs.List>
          </Card.Header>
          <Card.Body>
            <Grid width="100%" templateColumns="repeat(7, 1fr)" gap="6">
              <GridItem colSpan={5}>
                <Tabs.Content value="items">
                  <Stack>
                    {selectedList.itemList
                      .filter((item) => (showIsDone ? !item.isDone : true))
                      .map((item) => (
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
                                item.isDone
                                  ? mdiCheckboxMarkedOutline
                                  : mdiCheckboxBlankOutline
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
                              defaultValue={item.name}
                              activationMode="dblclick"
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
                      ))}
                  </Stack>
                </Tabs.Content>
                <Tabs.Content value="members">
                  <Box>
                    <Text>Owner</Text>
                    <HStack mb="20px">
                      <Badge colorPalette="purple">
                        <Avatar
                          key={selectedList.owner.id}
                          name={selectedList.owner.name}
                        />
                        <Text>{selectedList.owner.name}</Text>
                      </Badge>
                    </HStack>
                    <Text>Members</Text>
                    {selectedList.members.map((member) => (
                      <HStack key={member.id}>
                        <Avatar name={member.name} />
                        <Text>{member.name}</Text>
                        <Spacer />
                        {(selectedList.owner.id === loggedInUser.id ||
                          member.id === loggedInUser.id) && (
                          <Button
                            variant="subtle"
                            colorPalette="red"
                            onClick={() =>
                              handleKickMember({
                                toDoListId: selectedList.id,
                                memberId: member.id,
                              })
                            }
                          >
                            <Icon path={mdiLogout} size={1} />
                            <Text>
                              {selectedList.owner.id === loggedInUser.id
                                ? "Kick"
                                : "Leave"}
                            </Text>
                          </Button>
                        )}
                      </HStack>
                    ))}
                  </Box>
                  {loggedInUser.id === selectedList.owner.id ? (
                    <Box mt="40px">
                      <Text>Add Users</Text>
                      {nonMembers.map((user) => (
                        <HStack key={user.id}>
                          <Avatar name={user.name} />
                          <Text>{user.name}</Text>
                          <Spacer />
                          <Button
                            variant="subtle"
                            colorPalette="green"
                            onClick={() =>
                              handleAddMember({
                                toDoListId: selectedList.id,
                                user: user,
                              })
                            }
                          >
                            <Text>Add</Text>
                          </Button>
                        </HStack>
                      ))}
                    </Box>
                  ) : null}
                </Tabs.Content>
              </GridItem>

              <GridItem colSpan={2}>
                <Stack>
                  <Button
                    variant="subtle"
                    onClick={() => setShowIsDone(!showIsDone)}
                  >
                    <Icon
                      path={showIsDone ? mdiFilterOutline : mdiFilterOffOutline}
                      size={1}
                    />
                    <Text>Filter items</Text>
                  </Button>

                  <Button
                    variant="subtle"
                    onClick={() =>
                      handleAddItem({ toDoListId: selectedList.id })
                    }
                  >
                    <Icon path={mdiPlusCircleOutline} size={1} />
                    <Text>Create new item</Text>
                  </Button>
                </Stack>
              </GridItem>
            </Grid>
          </Card.Body>
        </Tabs.Root>
      </Card.Root>
    </Box>
  );
};

export default ShoppingListDetail;
