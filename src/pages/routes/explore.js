import React, { useEffect, useState } from "react";
import Link from "next/link";
import RoutePreviewCard from "../../components/RoutePreviewCard";
import Sidebar from "../../components/Sidebar/Sidebar";
import { EMARKA_GREEN } from "../../../consts";
import { Flex, Box, Heading, Container, Divider, Center } from "@chakra-ui/react";
//import { get } from "../../../utils/auth";
//import { matchRoutes } from "react-router-dom";

const Explore = ({ posts }) => {
  const [routes, setRoute] = useState(null);

  useEffect (async () => {
    const response = await fetch('https://emarka-backend.herokuapp.com/api/routes');
    const data = await response.json();
    setRoute(data.data);
    console.log(data.data);
  }, [])

  return (
    <Flex color='grey.500'>
    <Box w='190px' bg='white' position='fixed'>
      <Sidebar z-index='1001'/>
    </Box>
    <Box flex='1' bg={EMARKA_GREEN}>
    <Container maxW={"1200px"} mt={5} mr={15}>
      <Box maxW={{ sm: "90%" }} m={{ sm: "0 auto" } }>
        <Heading>Ruter</Heading>
        <Divider mt={5} mb={3} />
      </Box>
      <Flex justify="space-around" maxW="100vw" wrap="wrap" flex-direction="row" align="center">
        {
        routes && routes.map((route, key) => {
          return <Link href={`/routes/${route.id}`} key={key}>
                <a>
                  <Box padding="10px">
                    <RoutePreviewCard data={route} />
                  </Box>
                </a>
              </Link>
          })
        }
      </Flex>
    </Container>
    </Box>
  </Flex>
  );
};


export default Explore;
