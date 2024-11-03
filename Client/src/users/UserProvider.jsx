import { createContext, useState } from "react";

export const UserContext = createContext();

function UserProvider({ children }) {
  const [loggedInUser, setLoggedInUser] = useState({
    id: 1,
    name: "Alice Smith",
  });
  const value = {
    userList: [
      { id: 1, name: "Alice Smith" },
      { id: 2, name: "Bob Johnson" },
      { id: 3, name: "Carol White" },
      { id: 4, name: "David Brown" },
      { id: 5, name: "Eva Garcia" },
      { id: 6, name: "Frank Wilson" },
      { id: 7, name: "Grace Lee" },
    ],
    loggedInUser,
    setLoggedInUser,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserProvider;
