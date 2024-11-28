// Context provider
import { useContext } from "react";
import { ShoppingListContext } from "../my_components/ShoppingListOverviewProvider";
// Icons
import Icon from "@mdi/react";
import { mdiLogout } from "@mdi/js";
// UI components
import { Button, HStack, Spacer, Text } from "@chakra-ui/react";
import { Avatar } from "../components/ui/avatar";
// Language switcher
import { useTranslation } from "react-i18next";

const Member = ({ member, isMember, selectedList, loggedInUser }) => {
  const { handleKickMember, handleAddMember } = useContext(ShoppingListContext);
  const { t } = useTranslation();

  return (
    <>
      <HStack key={member.id} mb="3px">
        <Avatar name={member.name} />
        <Text>{member.name}</Text>
        <Spacer />
        {isMember ? (
          (selectedList.owner.id === loggedInUser.id ||
            member.id === loggedInUser.id) && (
            <Button
              variant="subtle"
              colorPalette="red"
              onClick={() =>
                handleKickMember({
                  shoppingListId: selectedList.id,
                  memberId: member.id,
                })
              }
            >
              <Icon path={mdiLogout} size={1} />
              <Text>
                {selectedList.owner.id === loggedInUser.id
                  ? `${t("member.kick")}`
                  : `${t("member.leave")}`}
              </Text>
            </Button>
          )
        ) : (
          <Button
            variant="subtle"
            colorPalette="green"
            onClick={() =>
              handleAddMember({
                shoppingListId: selectedList.id,
                addMember: member,
              })
            }
          >
            <Text>{t("member.add")}</Text>
          </Button>
        )}
      </HStack>
    </>
  );
};

export default Member;
