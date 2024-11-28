// Router
import { NavLink } from "react-router-dom";
// Context provider
import { useContext } from "react";
import { UserContext } from "../Users/UserProvider.jsx";
//Icons
import Icon from "@mdi/react";
import { mdiLogout } from "@mdi/js";
// UI components
import { HStack, Spacer, Heading, Text, Box, Button } from "@chakra-ui/react";
import { Avatar } from "../components/ui/avatar";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "../components/ui/menu";
import { ColorModeButton } from "../components/ui/color-mode.jsx";
// Language switcher
import { useTranslation } from "react-i18next";

const Header = () => {
  const { loggedInUser, userList, setLoggedInUser } = useContext(UserContext);
  const { t, i18n } = useTranslation();
  const lngs = {
    en: { nativeName: "English", shortName: "en" },
    cs: { nativeName: "Čeština", shortName: "cs" },
  };

  return (
    <HStack w="100%" h="10vh">
      <NavLink to={"/"}>
        <Heading size="4xl">{t("header.appName")}</Heading>
      </NavLink>
      <Spacer />
      <MenuRoot>
        <MenuTrigger asChild>
          <Button variant="outline" size="sm">
            {lngs[i18n.resolvedLanguage].shortName}
          </Button>
        </MenuTrigger>
        <MenuContent>
          {Object.keys(lngs).map((lng) => (
            <MenuItem
              key={lng}
              value={lng}
              active={i18n.resolvedLanguage === lng}
              onClick={() => i18n.changeLanguage(lng)}
            >
              {lngs[lng].nativeName}
            </MenuItem>
          ))}
        </MenuContent>
      </MenuRoot>
      <ColorModeButton />
      <Text hideBelow="md">{loggedInUser.name}</Text>
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
