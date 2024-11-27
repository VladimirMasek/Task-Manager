// Context provider
import { useContext } from "react";
import { ShoppingListContext } from "../my_components/ShoppingListOverviewProvider";
// Icons
import Icon from "@mdi/react";
import { mdiLogout } from "@mdi/js";
// UI components
import { Button, HStack, Spacer, Text } from "@chakra-ui/react";
import { Avatar } from "../components/ui/avatar";

const Member = ({ member, isMember, selectedList, loggedInUser }) => {
  const { handleKickMember, handleAddMember } = useContext(ShoppingListContext);

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
                {selectedList.owner.id === loggedInUser.id ? "Kick" : "Leave"}
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
            <Text>Add</Text>
          </Button>
        )}
      </HStack>
    </>
  );
};

export default Member;
