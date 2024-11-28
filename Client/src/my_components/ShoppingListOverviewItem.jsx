//Router
import { NavLink } from "react-router-dom";
// Context providers
import { useContext } from "react";
import { UserContext } from "../Users/UserProvider.jsx";
import { ShoppingListContext } from "./ShoppingListOverviewProvider.jsx";
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
} from "../components/ui/dialog.jsx";
import {
  ProgressCircleRing,
  ProgressCircleRoot,
  ProgressCircleValueText,
} from "../components/ui/progress-circle.jsx";
// Language switcher
import { useTranslation } from "react-i18next";

const ShoppingListOverviewItem = ({ shoppingListData }) => {
  const { loggedInUser } = useContext(UserContext);
  const { handleArchiveShoppingList, handleDeleteShoppingList, isMobile } =
    useContext(ShoppingListContext);
  const { t } = useTranslation();

  return (
    <>
      <Card.Root
        w="100%"
        bg={{
          base: shoppingListData.archived ? "gray.200" : "white",
          _dark: shoppingListData.archived ? "cyan.950" : "black",
        }}
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
                <NavLink
                  key={shoppingListData.id}
                  to={`/${shoppingListData.id}`}
                >
                  <Heading>{shoppingListData.name}</Heading>
                </NavLink>
                <Text>{shoppingListData.owner.name}</Text>
                <Text>{shoppingListData.dateOfCreation}</Text>
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
                colorPalette={shoppingListData.archived ? "red" : ""}
                value={
                  shoppingListData.itemList.length === 0
                    ? 0
                    : (shoppingListData.itemList.filter((item) => item.isDone)
                        .length /
                        shoppingListData.itemList.length) *
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
                  {shoppingListData.owner.id === loggedInUser.id ? (
                    <>
                      <DialogTrigger asChild>
                        <IconButton colorPalette="red" variant="subtle">
                          <Icon path={mdiTrashCanOutline} size={1} />
                        </IconButton>
                      </DialogTrigger>

                      {shoppingListData.archived ? null : (
                        <IconButton variant="subtle">
                          <Icon
                            onClick={() =>
                              handleArchiveShoppingList({
                                id: shoppingListData.id,
                              })
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
                    <DialogTitle>{t("deleteDialog.tittle")}</DialogTitle>
                  </DialogHeader>
                  <DialogBody>
                    <Text>{t("deleteDialog.text")}</Text>
                  </DialogBody>
                  <DialogFooter>
                    <DialogActionTrigger asChild>
                      <Button variant="outline">
                        {t("deleteDialog.cancelButton")}
                      </Button>
                    </DialogActionTrigger>
                    <Button
                      colorPalette="red"
                      onClick={() =>
                        handleDeleteShoppingList({
                          id: shoppingListData.id,
                        })
                      }
                    >
                      {t("deleteDialog.deleteButton")}
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

export default ShoppingListOverviewItem;
