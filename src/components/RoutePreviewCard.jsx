import React from "react";
import { Box, Center, useColorModeValue, Heading, Text, Stack, Image, Badge } from "@chakra-ui/react";
import { BACKEND_URL } from "../../consts";

const Route = ({ data }) => {
  const { Title, distance } = data.attributes;
  // const image = require("../images/skogstur");


  return (
    <Center py={12}>
      <Box
        role={"group"}
        p={6}
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
      >
        <Box
          rounded={"lg"}
          mt={-12}
          pos={"relative"}
          height={"230px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            filter: "blur(15px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
        <Image rounded={"lg"} height={230} width={282} objectFit={"cover"} src={`/images/skogstur.jpeg`} />
       
        </Box>
        <Stack pt={10} align={"center"}>
          <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
            Distanse: {distance}km
          </Text>
          <Heading fontSize={"2xl"} fontFamily={"body"} color={"grey.500"} fontWeight={500}>
            {Title}
          </Heading>
          <Stack direction={"row"} align={"center"}>
            <Text fontWeight={800} fontSize={"xl"}>
               
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
};

export default Route;
