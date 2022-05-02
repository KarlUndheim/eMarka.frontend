import {
    Link,
    FormControl,
    FormLabel,
    Flex,
    Box,
    Input,
    Stack,
    Button,
    Heading,
    Alert,
    Text,
    AlertIcon,
    useColorModeValue,
  } from "@chakra-ui/react";
  import { useRouter } from "next/router";
  import { validateEmail } from "../../../utils/validation";
  import axios from "axios";
  import { useToast } from "@chakra-ui/react";
  import { useState, useEffect } from "react";
  import { EMARKA_GREEN } from "../../../consts";
  
  const RegisterForm = () => {
    const router = useRouter();
  
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const [repeatPassword, setRepeatPassword] = useState("");
  
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
  
    const handleSubmit = async (e) => {
      setSubmitted(true);
  
      if (username.length < 3) {
        setError({ message: "Username is too short. Minimum 3 characters" });
        setSubmitted(false);
        return;
      }
  
      if (!validateEmail(email)) {
        setError({ message: "Email is not valid" });
        setSubmitted(false);
        return;
      }
  
      if (password.length < 6) {
        setError({ message: "Password has to be at least 6 characters long" });
        setSubmitted(false);
        return;
      }
  
      if (repeatPassword != password) {
        console.log(repeatPassword);
        console.log(password);
        setError({ message: "Passwords do not match" });
        setSubmitted(false);
        return;
      }
  
      await newUser();
    };
  
    const newUser = async (e) => {
      const body = {
        
          username: username,
          email: email,
          password: password,
        
      };
  
      const req = await axios.post('https://emarkabackend.herokuapp.com/api/users', body);

      console.log(JSON.stringify(body))
  
      console.log(req)

      if (req.status == 400) {
        setError({ message: "Brukernavnet/eposten er allerede i bruk"});
        setIsError(true)
        setSubmitted(false);
        return;
      }

      const success = req.status == 201;
  
      if (success) {
        setError({});
        setIsError(false);
        router.push("/");
        
        
        ({
          title: "Welcome! Account created successfully!",
          status: "success",
          isClosable: true,
          duration: 3000,
        });
        return;
      }
  
      setSubmitted(false);
  
      const apiError =
        req.data.message == "An error occurred during account creation" ? "Username is already taken" : req.data.message;
  
      setError({ message: apiError });
    };
  
    return (
      <Flex minH={"81vh"} align={"center"} justify={"center"}>
        <Stack spacing={3} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Registrer ny bruker</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              for å benytte deg av eMarka🏞
            </Text>
          </Stack>
  
          <Alert status="warning" visibility={isError ? "visible" : "hidden"}>
            <AlertIcon />
            {isError && error.message}
          </Alert>
          <Box rounded={"lg"} boxShadow={"lg"} p={8} bg={useColorModeValue("white", "gray.700")}>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel htmlFor="username">Brukernavn</FormLabel>
                <Input
                  id="username"
                  type="text"
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setSubmitted(false);
                  }}
                  onKeyPress={(e) => {
                    submitOnEnter(e);
                  }}
                  placeholder="Ola Nordmann"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="email">E-postadresse</FormLabel>
                <Input
                  id="email"
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setSubmitted(false);
                  }}
                  onKeyPress={(e) => {
                    submitOnEnter(e);
                  }}
                  placeholder="ola@emarka.no"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="password">Passord</FormLabel>
                <Input
                  id="password"
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setSubmitted(false);
                  }}
                  onKeyPress={(e) => {
                    submitOnEnter(e);
                  }}
                  placeholder="Passord"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="password">Gjenta passord</FormLabel>
                <Input
                  id="password"
                  type="password"
                  onChange={(e) => {
                    setRepeatPassword(e.target.value);
                    setSubmitted(false);
                  }}
                  onKeyPress={(e) => {
                    submitOnEnter(e);
                  }}
                  placeholder="Passord"
                />
              </FormControl>
              <Stack spacing={10} mt={5}>
                <Button
                  colorScheme="teal"
                  bg={"green.300"}
                  _hover={{
                    bg: {EMARKA_GREEN},
                  }}
                  isLoading={submitted}
                  onClick={handleSubmit}
                  variant="solid"
                >
                  Registrer
                </Button>
              </Stack>
            </Stack>
            <Stack align={"center"} mt={4}>
              <Text>
                Har du allerede en bruker?{" "}
                <Link href={"/login"} color={EMARKA_GREEN}>
                  Logg inn her
                </Link>
              </Text>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  };
  
  export default RegisterForm;
  