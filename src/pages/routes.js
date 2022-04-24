import React from "react";
import Link from "next/link";
import RoutePreviewCard from "../components/RoutePreviewCard";

import { Flex, Box, Heading, Container, Divider } from "@chakra-ui/react";

import { get } from "../../utils/auth";
import { matchRoutes } from "react-router-dom";
//import FilterDropdown from "../../components/FilterDropdown";

const Explore = ({ posts }) => {
  const routes = posts.data;
  console.log(routes);

  return (
    <Container maxW={"1200px"} mt={5}>
      <Box maxW={{ sm: "90%" }} m={{ sm: "0 auto" }}>
        <Heading>Ruter</Heading>
        <Divider mt={5} mb={3} />
      </Box>
      <Flex justify="space-around" maxW="100vw" wrap="wrap" flex-direction="row" align="center">
        {routes.map((route, key) => {
          return (
            route.attributes.isAvailable && (
              <Link href={`/routes/${route.id}`} key={key}>
                <a>
                  <Box padding="10px">
                    <RoutePreviewCard data={route} />
                  </Box>
                </a>
              </Link>
            )
          );
        })}
      </Flex>
    </Container>
  );
};

export const getServerSideProps = async () => {
  const data = await get(`/api/routes`);

  return {
    props: {
      posts: data,
    },
  };
};


export default Explore;
