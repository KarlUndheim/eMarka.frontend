import RegisterForm from "../components/auth/RegisterForm";
import Sidebar from "../components/Sidebar/Sidebar";
import { Flex, Center, Box } from "@chakra-ui/react";
import { EMARKA_GREEN } from "../../consts";

const Register = () => {
  return (
    <Flex color='grey.500'>
    <Center w='190px' bg='white'>
      <Sidebar/>
    </Center>
    <Box flex='1' bg={EMARKA_GREEN}>
      <RegisterForm/>
    </Box>
  </Flex>
  );
};

export default Register;
