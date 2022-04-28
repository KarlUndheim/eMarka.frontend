import LoginForm from "../components/auth/LoginForm";
import Sidebar from "../components/Sidebar/Sidebar";
import { Flex, Center, Box } from "@chakra-ui/react";
import { EMARKA_GREEN } from "../../consts";
import { redirectIfLogged } from "../../utils/auth";

const Login = () => {
  return (
    <Flex color='grey.500'>
      <Center w='190px' bg='white'>
        <Sidebar/>
      </Center>
      <Box flex='1' bg={EMARKA_GREEN}>
        <LoginForm/>
      </Box>
    </Flex>
  )
};

export const getServerSideProps = async (ctx) => {
  return redirectIfLogged(ctx);
};

export default Login;

