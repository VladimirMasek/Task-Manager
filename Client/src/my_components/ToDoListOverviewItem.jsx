//Router
import { NavLink } from "react-router-dom";
// Context providers
import { useContext } from "react";
import { UserContext } from "../Users/UserProvider.jsx";
import { ToDoListContext } from "./ToDoListOverviewProvider";
// Icons
import Icon from "@mdi/react";
import { mdiArchiveOutline, mdiTrashCanOutline } from "@mdi/js";
// UI components
import {
  IconButton,
  Stack,
  Card,
  Text,
  Heading,
  Grid,
  GridItem,
  Button,
} from "@chakra-ui/react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  ProgressCircleRing,
  ProgressCircleRoot,
  ProgressCircleValueText,
} from "../components/ui/progress-circle";

const ToDoListOverviewItem = ({ toDoListData }) => {
  const { loggedInUser } = useContext(UserContext);
  const { handleArchiveToDoList, handleDeleteToDoList, isMobile } =
    useContext(ToDoListContext);

  return (
    <>
      <Card.Root
        w="100%"
        bg={toDoListData.archived ? "gray.200" : ""}
        mb="10px"
      >
        <Card.Body>
          <Grid
            w="100%"
            templateRows="repeat(3, 1fr)"
            templateColumns="repeat(10, 1fr)"
          >
            <GridItem colSpan={5} rowSpan={3}>
              <Stack>
                <NavLink key={toDoListData.id} to={`/${toDoListData.id}`}>
                  <Heading>{toDoListData.name}</Heading>
                </NavLink>
                <Text>{toDoListData.owner.name}</Text>
                <Text>{toDoListData.dateOfCreation}</Text>
              </Stack>
            </GridItem>

            <GridItem
              colSpan={{ lgDown: 5, base: 3 }}
              rowSpan={{ lgDown: 2, base: 3 }}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <ProgressCircleRoot
                colorPalette={toDoListData.archived ? "red" : ""}
                value={
                  toDoListData.itemList.length === 0
                    ? 0
                    : (toDoListData.itemList.filter((item) => item.isDone)
                        .length /
                        toDoListData.itemList.length) *
                      100
                }
                size="xl"
              >
                <ProgressCircleValueText />
                <ProgressCircleRing cap="round" />
              </ProgressCircleRoot>
            </GridItem>

            <GridItem
              colSpan={{ lgDown: 5, base: 2 }}
              rowSpan={{ lgDown: 1, base: 3 }}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <DialogRoot role="alertdialog">
                <Stack direction={{ lgDown: "row", base: "column" }}>
                  {toDoListData.owner.id === loggedInUser.id ? (
                    <>
                      <DialogTrigger asChild>
                        <IconButton colorPalette="red" variant="subtle">
                          <Icon path={mdiTrashCanOutline} size={1} />
                        </IconButton>
                      </DialogTrigger>

                      {toDoListData.archived ? null : (
                        <IconButton variant="subtle">
                          <Icon
                            onClick={() =>
                              handleArchiveToDoList({ id: toDoListData.id })
                            }
                            path={mdiArchiveOutline}
                            size={1}
                          />
                        </IconButton>
                      )}
                    </>
                  ) : null}
                </Stack>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                  </DialogHeader>
                  <DialogBody>
                    <Text>
                      This action cannot be undone. This will permanently delete
                      this shopping list.
                    </Text>
                  </DialogBody>
                  <DialogFooter>
                    <DialogActionTrigger asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogActionTrigger>
                    <Button
                      colorPalette="red"
                      onClick={() =>
                        handleDeleteToDoList({
                          id: toDoListData.id,
                        })
                      }
                    >
                      Delete
                    </Button>
                  </DialogFooter>
                  <DialogCloseTrigger />
                </DialogContent>
              </DialogRoot>
            </GridItem>
          </Grid>
        </Card.Body>
      </Card.Root>
    </>
  );
};

export default ToDoListOverviewItem;
