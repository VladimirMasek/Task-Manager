import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
      <Text>404 Page not found</Text>
      <Link to="/">Find homepage</Link>
    </>
  );
};

export default NotFoundPage;
