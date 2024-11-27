// React hooks
import { createContext, useContext, useMemo, useState, useEffect } from "react";
// UI hook
import { useBreakpointValue } from "@chakra-ui/react";
// Context provider
import { UserContext } from "../Users/UserProvider.jsx";

export const ShoppingListContext = createContext();

function ShoppingListOverviewProvider({ children }) {
  // ShoppingListOverviewProvider
  const { loggedInUser } = useContext(UserContext);
  // Toolbar
  const [showArchived, setShowArchived] = useState(false);
  // ShoppingListDetail
  const [showIsDone, setShowIsDone] = useState(true);
  // shoppingList data
  const [shoppingListList, setShoppingListList] = useState([
    {
      id: 1,
      name: "Weekly Groceries",
      owner: { id: 1, name: "Alice Smith" },
      members: [
        { id: 2, name: "Bob Johnson" },
        { id: 3, name: "Carol White" },
        { id: 4, name: "David Brown" },
      ],
      archived: false,
      dateOfCreation: "2024-10-15",
      itemList: [
        { id: 101, name: "Milk", isDone: false },
        { id: 102, name: "Bread", isDone: true },
        { id: 103, name: "Eggs", isDone: false },
        { id: 104, name: "Cheese", isDone: false },
        { id: 105, name: "Apples", isDone: true },
      ],
    },
    {
      id: 2,
      name: "Party Supplies",
      owner: { id: 2, name: "Bob Johnson" },
      members: [
        { id: 1, name: "Alice Smith" },
        { id: 5, name: "Eva Garcia" },
        { id: 6, name: "Frank Wilson" },
        { id: 7, name: "Grace Lee" },
      ],
      archived: false,
      dateOfCreation: "2024-10-20",
      itemList: [
        { id: 201, name: "Paper plates", isDone: false },
        { id: 202, name: "Cups", isDone: false },
        { id: 203, name: "Napkins", isDone: true },
        { id: 204, name: "Snacks", isDone: false },
        { id: 205, name: "Soda", isDone: false },
        { id: 206, name: "Ice", isDone: true },
        { id: 207, name: "Decorations", isDone: false },
      ],
    },
    {
      id: 3,
      name: "Camping Trip",
      owner: { id: 3, name: "Carol White" },
      members: [
        { id: 4, name: "David Brown" },
        { id: 1, name: "Alice Smith" },
      ],
      archived: true,
      dateOfCreation: "2024-09-15",
      itemList: [
        { id: 301, name: "Tent", isDone: false },
        { id: 302, name: "Sleeping bags", isDone: false },
        { id: 303, name: "Flashlights", isDone: true },
        { id: 304, name: "First aid kit", isDone: false },
        { id: 305, name: "Water bottles", isDone: false },
        { id: 306, name: "Matches", isDone: true },
      ],
    },
    {
      id: 4,
      name: "Office Supplies",
      owner: { id: 4, name: "David Brown" },
      members: [
        { id: 5, name: "Eva Garcia" },
        { id: 7, name: "Grace Lee" },
      ],
      archived: false,
      dateOfCreation: "2024-10-25",
      itemList: [
        { id: 401, name: "Printer paper", isDone: false },
        { id: 402, name: "Pens", isDone: true },
        { id: 403, name: "Staples", isDone: false },
        { id: 404, name: "Notebooks", isDone: false },
      ],
    },
    {
      id: 5,
      name: "Home Improvement",
      owner: { id: 5, name: "Eva Garcia" },
      members: [
        { id: 6, name: "Frank Wilson" },
        { id: 1, name: "Alice Smith" },
        { id: 2, name: "Bob Johnson" },
      ],
      archived: false,
      dateOfCreation: "2024-10-18",
      itemList: [
        { id: 501, name: "Paint", isDone: false },
        { id: 502, name: "Brushes", isDone: false },
        { id: 503, name: "Tape", isDone: true },
        { id: 504, name: "Drop cloth", isDone: false },
        { id: 505, name: "Sandpaper", isDone: true },
      ],
    },
    {
      id: 6,
      name: "Holiday Shopping",
      owner: { id: 6, name: "Frank Wilson" },
      members: [
        { id: 7, name: "Grace Lee" },
        { id: 1, name: "Alice Smith" },
        { id: 3, name: "Carol White" },
        { id: 4, name: "David Brown" },
      ],
      archived: false,
      dateOfCreation: "2024-10-28",
      itemList: [
        { id: 601, name: "Gift wrap", isDone: false },
        { id: 602, name: "Cards", isDone: false },
        { id: 603, name: "Ribbons", isDone: true },
        { id: 604, name: "Tape", isDone: false },
        { id: 605, name: "Gift bags", isDone: false },
        { id: 606, name: "Tags", isDone: true },
        { id: 607, name: "Scissors", isDone: false },
      ],
    },
    {
      id: 7,
      name: "Pet Supplies",
      owner: { id: 7, name: "Grace Lee" },
      members: [
        { id: 5, name: "Eva Garcia" },
        { id: 6, name: "Frank Wilson" },
      ],
      archived: false,
      dateOfCreation: "2024-10-22",
      itemList: [
        { id: 701, name: "Dog food", isDone: false },
        { id: 702, name: "Cat litter", isDone: true },
        { id: 703, name: "Pet toys", isDone: false },
        { id: 704, name: "Treats", isDone: false },
        { id: 705, name: "Brush", isDone: true },
      ],
    },
    {
      id: 8,
      name: "Back to School",
      owner: { id: 1, name: "Alice Smith" },
      members: [
        { id: 2, name: "Bob Johnson" },
        { id: 3, name: "Carol White" },
      ],
      archived: true,
      dateOfCreation: "2024-09-01",
      itemList: [
        { id: 801, name: "Backpack", isDone: false },
        { id: 802, name: "Notebooks", isDone: false },
        { id: 803, name: "Pencils", isDone: true },
        { id: 804, name: "Calculator", isDone: false },
        { id: 805, name: "Lunch box", isDone: false },
        { id: 806, name: "Water bottle", isDone: true },
      ],
    },
    {
      id: 9,
      name: "Movie Night",
      owner: { id: 2, name: "Bob Johnson" },
      members: [
        { id: 4, name: "David Brown" },
        { id: 5, name: "Eva Garcia" },
        { id: 6, name: "Frank Wilson" },
      ],
      archived: false,
      dateOfCreation: "2024-10-27",
      itemList: [
        { id: 901, name: "Popcorn", isDone: false },
        { id: 902, name: "Candy", isDone: true },
        { id: 903, name: "Soda", isDone: false },
        { id: 904, name: "Chips", isDone: false },
      ],
    },
  ]);
  // break point value for mobile
  const [isMobile, setIsMobile] = useState(false);
  const mobileBreakpoint = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    setIsMobile(mobileBreakpoint);
  }, [mobileBreakpoint]);

  // ShoppingListOverviewList
  const filteredshoppingListList = useMemo(() => {
    return shoppingListList.filter((shoppingList) => {
      const isOwnerOrMember =
        shoppingList.owner.id === loggedInUser.id ||
        shoppingList.members.some((member) => member.id === loggedInUser.id);
      return showArchived
        ? isOwnerOrMember
        : !shoppingList.archived && isOwnerOrMember;
    });
  }, [shoppingListList, loggedInUser.id, showArchived]);

  // shoppingList -archive -delete -create - updateName

  // ShoppingListOverviewItem
  function handleArchiveShoppingList({ id }) {
    setShoppingListList((current) => {
      const shoppingListIndex = current.findIndex((shoppingList) => shoppingList.id === id);
      current[shoppingListIndex] = { ...current[shoppingListIndex], archived: true };
      return current.slice();
    });
  }
  // ShoppingListOverviewItem
  function handleDeleteShoppingList({ id }) {
    setShoppingListList((current) => {
      const shoppingListIndex = current.findIndex((shoppingList) => shoppingList.id === id);
      current.splice(shoppingListIndex, 1);
      return current.slice();
    });
  }
  // Toolbar
  function handleCreateNewList(name, addedUsers) {
    const newList = {
      id: Date.now(),
      name: name || "New List",
      owner: loggedInUser,
      members: addedUsers || [],
      archived: false,
      dateOfCreation: new Date().toISOString().split("T")[0],
      itemList: [],
    };
    setShoppingListList((current) => [...current, newList]);
  }
  // ShoppingListDetail -> ShoppingListTittle
  function handleUpdateListName(shoppingListId, newName) {
    setShoppingListList((current) =>
      current.map((list) =>
        list.id === shoppingListId ? { ...list, name: newName } : list
      )
    );
  }

  // item -add -delete -check -updateName

  //ShoppingListDetail
  function handleAddItem({ shoppingListId }) {
    setShoppingListList((current) => {
      return current.map((list) => {
        if (list.id === shoppingListId) {
          const newItem = {
            id: Date.now(),
            name: "New item",
            isDone: false,
          };
          return {
            ...list,
            itemList: [...list.itemList, newItem],
          };
        }
        return list;
      });
    });
  }
  // Item
  function handleDeleteItem({ shoppingListId, itemId }) {
    setShoppingListList((current) => {
      return current.map((list) => {
        if (list.id === shoppingListId) {
          return {
            ...list,
            itemList: list.itemList.filter((item) => item.id !== itemId),
          };
        }
        return list;
      });
    });
  }
  // Item
  function handleCheck({ shoppingListId, itemId }) {
    setShoppingListList((current) =>
      current.map((list) => {
        if (list.id === shoppingListId) {
          return {
            ...list,
            itemList: list.itemList.map((item) =>
              item.id === itemId ? { ...item, isDone: !item.isDone } : item
            ),
          };
        }
        return list;
      })
    );
  }
  // Item
  const handleUpdateItemName = (listId, itemId, newName) => {
    setShoppingListList((current) =>
      current.map((list) =>
        list.id === listId
          ? {
              ...list,
              itemList: list.itemList.map((item) =>
                item.id === itemId ? { ...item, name: newName } : item
              ),
            }
          : list
      )
    );
  };

  // member -add -kick

  // Member
  function handleAddMember({ shoppingListId, addMember }) {
    setShoppingListList((current) => {
      const listIndex = current.findIndex((list) => list.id === shoppingListId);
      if (listIndex !== -1) {
        const updatedList = { ...current[listIndex] };
        updatedList.members.push({ id: addMember.id, name: addMember.name });
        const newList = [...current];
        newList[listIndex] = updatedList;
        return newList;
      }
      return current;
    });
  }
  // Member
  function handleKickMember({ shoppingListId, memberId }) {
    setShoppingListList((current) => {
      return current.map((list) => {
        if (list.id === shoppingListId) {
          return {
            ...list,
            members: list.members.filter((member) => member.id !== memberId),
          };
        }
        return list;
      });
    });
  }

  return (
    <ShoppingListContext.Provider
      value={{
        shoppingListList: filteredshoppingListList,
        showArchived,
        setShowArchived,
        showIsDone,
        setShowIsDone,
        setShoppingListList,
        handleArchiveShoppingList,
        handleDeleteShoppingList,
        handleCheck,
        handleKickMember,
        handleDeleteItem,
        handleAddItem,
        handleCreateNewList,
        handleAddMember,
        handleUpdateListName,
        handleUpdateItemName,
        isMobile,
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
}

export default ShoppingListOverviewProvider;
