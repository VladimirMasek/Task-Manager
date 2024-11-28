import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { DateTime } from "luxon";

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          header: {
            appName: "ShoppingList Manager",
            date: "Today is {{date, DATE_SHORT}}",
          },
          item: {
            tooltip: "Double click to edit",
          },
          member: {
            kick: "Kick",
            leave: "Leave",
            add: "Add",
          },
          memberList: {
            owner: "Owner",
            members: "Members",
            addUsers: "Add Users",
          },
          deleteDialog: {
            tittle: "Are you sure?",
            text: "This action cannot be undone. This will permanently delete this shopping list.",
            cancelButton: "Cancel",
            deleteButton: "Delete",
          },
          toolbar: {
            hideArchived: "Hide Archived",
            showArchived: "Show Archived",
            createList: "Create new list",
            members: "Members",
          },
          createDialog: {
            createList: "Create new list",
            members: "Members",
            inputLabel: "List name",
            removeButton: "Remove",
            addUsers: "Add users",
            addButton: "Add",
            createButton: "Create",
          },
          notFoundPage: {
            errMessage: "404 Page not found",
            homepageLink: "Back to homepage",
          },
          shoppingListDetail: {
            noList: "Shopping list not found!",
            members: "Members",
            filterButton: "Filter items",
            createButton: "Create item",
          },
          errors: {
            failedToLoadList: "Failed to load overview!",
          },
        },
      },
      cs: {
        translation: {
          header: {
            appName: "Správce nákupních seznamů",
            date: "Dnes je {{date, DATE_SHORT}}",
          },
          item: {
            tooltip: "Dvojklik pro editování",
          },
          member: {
            kick: "Odstranit",
            leave: "Odejít",
            add: "Přidat",
          },
          memberList: {
            owner: "Vlastník",
            members: "Členové",
            addUsers: "Přidat členy",
          },
          deleteDialog: {
            tittle: "Opravdu chcete?",
            text: "Tuto akci nelze vrátit zpět. Tento nákupní seznam bude trvale smazán.",
            cancelButton: "Zrušit",
            deleteButton: "Vymazat",
          },
          toolbar: {
            hideArchived: "Skrýt archivované",
            showArchived: "Zobrazit archivované",
            createList: "Vytvořit nový seznam",
          },
          createDialog: {
            createList: "Vytvořit nový seznam",
            members: "Členové",
            inputLabel: "Název seznamu",
            removeButton: "Odstranit",
            addUsers: "Přidat členy",
            addButton: "Přidat",
            createButton: "Vytvořit",
          },
          notFoundPage: {
            errMessage: "404 Stránka nebyla nalezena",
            homepageLink: "Zpět na domovskou stránku",
          },
          shoppingListDetail: {
            noList: "Nákupní seznam nebyl nalezen!",
            members: "Členové",
            filterButton: "Filtrovat položky",
            createButton: "Vytvořit položku",
          },
          errors: {
            failedToLoadList: "Nepodařilo se načíst přehled seznamů!",
          },
        },
      },
    },
  });

// new usage
i18n.services.formatter.add("DATE_SHORT", (value, lng, options) => {
  return DateTime.fromJSDate(value)
    .setLocale(lng)
    .toLocaleString(DateTime.DATE_SHORT);
});

i18n.services.formatter.add("DATE_HUGE", (value, lng, options) => {
  return DateTime.fromJSDate(value)
    .setLocale(lng)
    .toLocaleString(DateTime.DATE_HUGE);
});

export default i18n;
