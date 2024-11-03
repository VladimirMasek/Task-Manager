import { useContext } from "react";
import { UserContext } from "../Users/UserProvider.jsx";
import { ToDoListContext } from "./ToDoListOverviewProvider";
import Icon from "@mdi/react";
import { mdiArchiveOutline, mdiTrashCanOutline } from "@mdi/js";
import {
  IconButton,
  Stack,
  Card,
  Text,
  Heading,
  Grid,
  GridItem,
  VStack,
} from "@chakra-ui/react";
import {
  ProgressCircleRing,
  ProgressCircleRoot,
  ProgressCircleValueText,
} from "../components/ui/progress-circle";
import { NavLink } from "react-router-dom";

const ToDoListOverviewItem = ({ toDoListData }) => {
  const { loggedInUser } = useContext(UserContext);
  const { handleArchiveToDoList, handleDeleteToDoList } =
    useContext(ToDoListContext);

  return (
    <>
      <Card.Root
        w="100%"
        bg={toDoListData.archived ? "gray.200" : ""}
        mb="10px"
      >
        <Card.Body>
          <Grid w="100%" templateColumns="repeat(10, 1fr)">
            <GridItem colSpan={5}>
              <Stack>
                <NavLink key={toDoListData.id} to={`/${toDoListData.id}`}>
                  <Heading>{toDoListData.name}</Heading>
                </NavLink>
                <Text>{toDoListData.owner.name}</Text>
                <Text>{toDoListData.dateOfCreation}</Text>
              </Stack>
            </GridItem>

            <GridItem
              colSpan={3}
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
              colSpan={2}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <VStack>
                {toDoListData.owner.id === loggedInUser.id ? (
                  <>
                    <IconButton
                      onClick={() =>
                        handleDeleteToDoList({
                          id: toDoListData.id,
                        })
                      }
                      colorPalette="red"
                      variant="subtle"
                    >
                      <Icon path={mdiTrashCanOutline} size={1} />
                    </IconButton>

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
              </VStack>
            </GridItem>
          </Grid>
        </Card.Body>
      </Card.Root>
    </>
  );
};

export default ToDoListOverviewItem;
