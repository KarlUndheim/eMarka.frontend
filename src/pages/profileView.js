import { Heading, Flex, Avatar, Box, Center, Text, Stack, Button, Link, useColorModeValue } from "@chakra-ui/react";
import { React, useState, useEffect } from "react";

import jwt_decode from "jwt-decode";
import nookies from "nookies";
import { get } from "../../utils/auth";
import { BACKEND_URL } from "../../consts";
import { EMARKA_GREEN } from "../../consts";
import Sidebar from "../components/Sidebar/Sidebar";

const ProfileView = () => {
  const [user, setUser] = useState(null);

  useEffect(async () => {
    const cookies = nookies.get();

    // No need to check for null as you would be redirected if not logged in
    const jwt = cookies.jwt;

    const { id } = jwt_decode(jwt);

    const res = await get(`/api/users/${id}`, null, true);
    setUser(res);
  }, []);



  return (
    <Flex color='grey.500'>
      <Center w='190px' bg='white'>
        <Sidebar/>
      </Center>
      <Box flex='1' bg={EMARKA_GREEN}>
    <Center py={6} height="100vh">
      <Box
        maxW={"500px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        <Avatar
          size={"xl"}
          alt={"Avatar Alt"}
          mb={4}
          pos={"relative"}
          src={user != null ? `${BACKEND_URL}${user}` : ""}
        />
        {user && (
          <div>
            <Heading fontSize={"2xl"} fontFamily={"body"}>
              {user.username}
            </Heading>
            <Text fontWeight={600} color={"gray.500"} mb={4}>
              {user.email}
            </Text>

            <Stack align={"center"} justify={"center"} direction={"row"} mt={6}></Stack>

            <Stack mt={8} direction={"row"} justify={"center"} spacing={4}>
              <Link href="/routes" _hover={{ textDecoration: "none" }}>
                <Button
                  flex={1}
                  fontSize={"sm"}
                  rounded={"full"}
                  bg={"gray.500"}
                  color={"white"}
                  _hover={{
                    bg: "gray.600",
                  }}
                  _focus={{
                    bg: "gray.500",
                  }}
                >
                  Ruteoversikt
                </Button>
              </Link>
              <Link href="profileView" _hover={{ textDecoration: "none" }}>
                <Button
                  flex={1}
                  fontSize={"sm"}
                  rounded={"full"}
                  bg={"green.300"}
                  color={"white"}
                  _hover={{
                    bg: {EMARKA_GREEN},
                  }}
                >
                  Rediger profil
                </Button>
              </Link>
              <Link href="/logout" _hover={{ textDecoration: "none" }}>
                <Button
                  flex={1}
                  fontSize={"sm"}
                  rounded={"full"}
                  bg={"green.400"}
                  color={"white"}
                  _hover={{
                    bg: {EMARKA_GREEN},
                  }}
                >
                  Logg ut
                </Button>
              </Link>
            </Stack>
          </div>
        )}
      </Box>
    </Center>
    </Box>
    </Flex>
  );
};

export default ProfileView;
