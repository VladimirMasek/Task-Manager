import { useContext } from "react";
import { UserContext } from "../Users/UserProvider.jsx";
import { HStack, Spacer, Heading, Text, Box } from "@chakra-ui/react";
import { Avatar } from "../components/ui/avatar";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "../components/ui/menu";
import Icon from "@mdi/react";
import { mdiLogout } from "@mdi/js";

const Header = () => {
  const { loggedInUser, userList, setLoggedInUser } = useContext(UserContext);

  return (
    <HStack w="100%" h="10vh">
      <Heading size="4xl">Task Manager</Heading>
      <Spacer />
      <Text>{loggedInUser.name}</Text>
      <MenuRoot positioning={{ placement: "right-start" }}>
        <MenuTrigger asChild>
          <Box>
            <Avatar name={loggedInUser.name} />
          </Box>
        </MenuTrigger>
        <MenuContent>
          {userList.map((user) => {
            return (
              <MenuItem
                value={user.id}
                key={user.id}
                onClick={() => setLoggedInUser(user)}
              >
                {user.name}
              </MenuItem>
            );
          })}
          <MenuItem
            key="logout"
            color="fg.error"
            onClick={() => setLoggedInUser("")}
          >
            <Text>Log out</Text>
            <Icon path={mdiLogout} size={1} />
          </MenuItem>
        </MenuContent>
      </MenuRoot>
    </HStack>
  );
};

export default Header;
