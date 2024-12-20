// Router
import { useParams } from "react-router-dom";
// Context Providers
import { useContext } from "react";
import { UserContext } from "../Users/UserProvider.jsx";
import { ShoppingListContext } from "../my_components/ShoppingListOverviewProvider";
// My components
import ItemList from "../my_components/itemList.jsx";
import MemberList from "../my_components/MemberList.jsx";
import ShoppingListTittle from "../my_components/ShoppingListTittle.jsx";
// Icons
import { Icon } from "@mdi/react";
import {
  mdiFilterOutline,
  mdiAccountMultiple,
  mdiPlusCircleOutline,
  mdiFilterOffOutline,
} from "@mdi/js";
// UI components
import {
  Card,
  Grid,
  GridItem,
  Text,
  Box,
  Button,
  Link,
  Tabs,
  Spacer,
  HStack,
} from "@chakra-ui/react";
// Language switcher
import { useTranslation } from "react-i18next";

const ShoppingListDetail = () => {
  const params = useParams();
  const shoppingListId = parseInt(params.shoppingListId);
  const { t } = useTranslation();

  const {
    shoppingListList,
    showIsDone,
    setShowIsDone,
    handleAddItem,
    handleUpdateListName,
  } = useContext(ShoppingListContext);

  const selectedList = shoppingListList.find(
    (list) => list.id === shoppingListId
  );
  if (!selectedList) {
    return (
      <Box>
        <Text>{t("shoppingListDetail.noList")}</Text>
      </Box>
    );
  }

  const { loggedInUser, userList } = useContext(UserContext);

  return (
    <Box w="100%" h="80vh">
      <Card.Root w="100%" h="100%" overflowY="auto">
        <Tabs.Root defaultValue="members">
          {/* Tabs Header */}
          <Card.Header>
            <Tabs.List>
              <Tabs.Trigger value="items" asChild>
                <Link unstyled href="#items">
                  <ShoppingListTittle
                    list={selectedList}
                    handleUpdateListName={handleUpdateListName}
                    loggedInUser={loggedInUser}
                  />
                </Link>
              </Tabs.Trigger>
              <Tabs.Trigger value="members" asChild>
                <Link unstyled href="#members">
                  <Text hideBelow="md">{t("shoppingListDetail.members")}</Text>
                  <Icon path={mdiAccountMultiple} size={1} />
                </Link>
              </Tabs.Trigger>
            </Tabs.List>
          </Card.Header>

          {/* Tabs Content */}
          <Card.Body>
            <Tabs.Content value="items">
              {/* Actions Section */}
              <HStack mb="15px">
                <Button
                  variant="subtle"
                  onClick={() => setShowIsDone(!showIsDone)}
                >
                  <Icon
                    path={showIsDone ? mdiFilterOutline : mdiFilterOffOutline}
                    size={1}
                  />
                  <Text hideBelow="sm">
                    {t("shoppingListDetail.filterButton")}
                  </Text>
                </Button>
                <Spacer />
                <Button
                  variant="subtle"
                  onClick={() =>
                    handleAddItem({ shoppingListId: selectedList.id })
                  }
                >
                  <Icon path={mdiPlusCircleOutline} size={1} />
                  <Text hideBelow="sm">
                    {t("shoppingListDetail.createButton")}
                  </Text>
                </Button>
              </HStack>
              {/* ItemList Section */}
              <ItemList selectedList={selectedList} showIsDone={showIsDone} />
            </Tabs.Content>
            <Tabs.Content value="members">
              <MemberList
                selectedList={selectedList}
                loggedInUser={loggedInUser}
                userList={userList}
              />
            </Tabs.Content>
          </Card.Body>
        </Tabs.Root>
      </Card.Root>
    </Box>
  );
};

export default ShoppingListDetail;
