import {
    Box,
    Container,
    Stack,
    Text,
    Image,
    Flex,
    Avatar,
    Button,
    Heading,
    SimpleGrid,
    StackDivider,
    useColorModeValue,
    Center,
    Badge,
  } from "@chakra-ui/react";
  import { BACKEND_URL, EMARKA_GREEN } from "../../consts";
  import { useState, useEffect } from "react";
  import nookies from "nookies";
  import Sidebar from "./Sidebar/Sidebar";
  import axios from "axios";
  import MapView from "../pages/mapView";
  
  
  const RouteView = ({ post }) => {
    const postID = post.id;
  
    const {
      Title,
      distance,
      route,
      description
    } = post.attributes;
  
    const [apiToken, setAPIToken] = useState("");
  
    useEffect(() => {
      const cookies = nookies.get();
      const jwt = cookies.jwt || null;
      setAPIToken(jwt);
    }, []);
  
     const handleDelete = async () => {
       const formData = {
         data: {
           deleted: true,
         },
       };
  
      const res = await axios.put(`${BACKEND_URL}/api/routes/${postID}`, formData, {
        headers: { Authorization: `Bearer ${apiToken}` },
      });
  
      if (res.status != 200) {
        setSubmitted(false);
        setError({ message: "An error has occurred. Please try again" });
        return;
      }
    };
  
    return (
        <Flex color='grey.500'>
      <Center w='190px' bg='white'>
        <Sidebar/>
      </Center>
      <Box flex='1' bg={EMARKA_GREEN}>
      <Container
        maxW={"7xl"}
        height={{ lg: "90vh" }}
        mb={{ sm: 10, lg: 0 }}
        mt={{ sm: 5, lg: 0 }}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box rounded={"lg"} boxShadow={"lg"} p={8} mt={"10px"} bg={useColorModeValue("white", "gray.700")}>
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 8, md: 10 }}>
            
              <MapView ></MapView>
            <Stack spacing={{ base: 6, md: 10 }}>
              <Box as={"header"}>
                {/* {isAvailable ? (
                  <Badge colorScheme={forSale ? "green" : "yellow"}>{forSale ? "For sale" : "Want to buy"}</Badge>
                ) : (
                  <Badge colorScheme={"gray"}>Sold</Badge>
                )} */}
                <Heading
                  lineHeight={1.1}
                  fontWeight={600}
                  fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
                  
                  display={"block"}
                >
                  {Title}
                </Heading>
                <Text color={useColorModeValue("gray.900", "gray.400")} fontWeight={300} fontSize={"2xl"}>
                  Distanse {distance}km
                </Text>
              </Box>
  
              <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={"column"}
                divider={<StackDivider borderColor={useColorModeValue("gray.200", "gray.600")} />}
              >
                <Box>
                  <Text
                    fontSize={{ base: "20px", lg: "18px" }}
                    color={useColorModeValue("yellow.500", "yellow.300")}
                    fontWeight={"500"}
                    textTransform={"uppercase"}
                    mb={"4"}
                  >
                    Time & Location
                  </Text>
                  <Text fontSize="1xl">
                    Trondheim @ 2022
                  </Text>
                </Box>
                <Box>
                  <Text
                    fontSize={{ base: "16px", lg: "18px" }}
                    color={useColorModeValue("yellow.500", "yellow.300")}
                    fontWeight={"500"}
                    textTransform={"uppercase"}
                    mb={"4"}
                  >
                    Beskrivelse
                  </Text>
                  <Text>{description}</Text>
                </Box>
              </Stack>
              { (
                <Button
                  loadingText="Uploading ticket"
                  size="lg"
                  bg={EMARKA_GREEN}
                  color={"white"}
                  _hover={{
                    bg: "green.300",
                  }}
                  
                >
                  Skal vi se her nå
                </Button>
              )}
  
              <Stack direction="row" alignItems="center" justifyContent={"center"}></Stack>
            </Stack>
          </SimpleGrid>
        </Box>
      </Container>
      </Box>
    </Flex>
    );
  };
  
  export default RouteView;
  