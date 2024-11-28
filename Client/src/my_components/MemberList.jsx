// My components
import Member from "./Member.jsx";
// UI components
import { Badge, Box, HStack, Text } from "@chakra-ui/react";
import { Avatar } from "../components/ui/avatar";
// Language switcher
import { useTranslation } from "react-i18next";

const MemberList = ({ selectedList, loggedInUser, userList }) => {
  const nonMembers = userList.filter(
    (user) =>
      !selectedList.members.some((member) => member.id === user.id) &&
      user.id !== selectedList.owner.id
  );
  const { t } = useTranslation();

  return (
    <Box>
      <Text>{t("memberList.owner")}</Text>
      <HStack mb="20px">
        <Badge colorPalette="purple">
          <Avatar key={selectedList.owner.id} name={selectedList.owner.name} />
          <Text>{selectedList.owner.name}</Text>
        </Badge>
      </HStack>

      {selectedList.members.length === 0 ? null : (
        <Text>{t("memberList.members")}</Text>
      )}
      {selectedList.members.map((member) => (
        <Member
          key={member.id}
          member={member}
          isMember={true}
          selectedList={selectedList}
          loggedInUser={loggedInUser}
        />
      ))}

      {loggedInUser.id === selectedList.owner.id ? (
        <Box mt="40px">
          {nonMembers.length === 0 ? null : (
            <Text>{t("memberList.addUsers")}</Text>
          )}

          {nonMembers.map((nonMember) => (
            <Member
              key={nonMember.id}
              member={nonMember}
              isMember={false}
              selectedList={selectedList}
              loggedInUser={loggedInUser}
            />
          ))}
        </Box>
      ) : null}
    </Box>
  );
};

export default MemberList;
