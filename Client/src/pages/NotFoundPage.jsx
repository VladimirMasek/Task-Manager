//UI components
import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
// Language switcher
import { useTranslation } from "react-i18next";

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Text>{t("notFoundPage.errMessage")}</Text>
      <Link to="/">{t("notFoundPage.homepageLink")}</Link>
    </>
  );
};

export default NotFoundPage;
