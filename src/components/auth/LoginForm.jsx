import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    Alert,
    Text,
    AlertIcon,
    Link,
  } from "@chakra-ui/react";
  
  import { useRouter } from "next/router";
  import axios from "axios";
  import { useToast } from "@chakra-ui/react";
  import { useState, useEffect } from "react";
  
  const LoginForm = () => {
    const router = useRouter();
  
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const [error, setError] = useState({});
    const [isError, setIsError] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const toast = useToast();
  
    useEffect(() => {
      Object.keys(error).length != 0 ? setIsError(true) : setError(false);
      Object.keys(error).length != 0 &&
        toast({
          title: error.message,
          status: "warning",
          isClosable: true,
          duration: 3000,
        });
    }, [error]);
  
    const submitOnEnter = (e) => {
      if (e.key === "Enter") handleSubmit();
    };
  
    const handleSubmit = async () => {
      setSubmitted(true);
  
      if (username.length == 0) {
        setError({ message: "Please enter your username or email" });
        setSubmitted(false);
  
        return;
      }
  
      if (password.length == 0) {
        setError({ message: "Please enter your password" });
        setSubmitted(false);
        return;
      }
  
      await authenticateUser();
    };
  
    const authenticateUser = async () => {
      const body = {
        identifier: username,
        password: password,
      };
  
      const req = await axios.post("/api/login", body);
  
      const success = req.data.jwt != null;
  
      if (success) {
        setError({});
        toast({
          title: "Successfully logged in!",
          status: "success",
          isClosable: true,
          duration: 3000,
        });
        router.push("/");
        return;
      }
  
      setSubmitted(false);
  
      const apiError =
        req.data.message == "Invalid identifier or password" ? "Invalid username or password" : req.data.message;
  
      setError({ message: apiError });
    };
  
    const handleTest = (e) => {
      e.preventDefault();
      if (e.key === "Enter") {
        location.assign("http://www.mozilla.org");
      }
    };
  
    return (
      <Flex minH={"81vh"} align={"center"} justify={"center"} >
        <Stack spacing={3} mx={"auto"} maxW={"lg"} py={12} px={6} bg="white">
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Logg inn på din bruker</Heading>
            <Text fontSize={"lg"} color={"gray.600"}> 
              for å benytte deg av eMarka🏞
            </Text>
          </Stack>
  
          <Alert status="warning" visibility={isError ? "visible" : "hidden"} >
            <AlertIcon />
            {isError && error.message}
          </Alert>
          <Box rounded={"lg"} boxShadow={"lg"} p={8} mt={"10px"} pt={0} >
            <form onSubmit={handleTest}>
              <Stack spacing={4} >
                <FormControl id="email" >
                  <FormLabel>Brukernavn eller epostadresse</FormLabel>
                  <Input
                    type="email" 
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setSubmitted(false);
                    }}
                    onKeyPress={(e) => {
                      submitOnEnter(e);
                    }}
                  />
                </FormControl>
                <FormControl id="password" >
                  <FormLabel>Passord</FormLabel>
                  <Input
                    type="password" 
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setSubmitted(false);
                    }}
                    onKeyPress={(e) => {
                      submitOnEnter(e);
                    }}
                  />
                </FormControl>
                <Stack spacing={10} >
                  <Button
                    isLoading={submitted}
                    bg={"green.300"}
                    color={"white"}
                    _hover={{
                      bg: "green.500",
                    }}
                    onClick={handleSubmit}
                  >
                    Logg inn
                  </Button>
                </Stack>
                <Stack align={"center"} mt={0} > 
                  <Text>
                    Har du ikke bruker?{" "}
                    <Link href={"/register"} color={"blue.500"}>
                      Opprett bruker her
                    </Link>
                  </Text>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    );
  };
  export default LoginForm;
  