import React, { useState } from 'react'
import {
    Flex,
    Text,
    IconButton,
    Divider,
    Avatar,
    Heading
} from '@chakra-ui/react'
import {
    FiMenu,
    FiHome,
    FiCalendar,
    FiUser,
    FiActivity,
    FiMapPin,
    FiNavigation,
    FiSettings
} from 'react-icons/fi'
import NavItem from './NavItem'

function Sidebar() {
    const [navSize, changeNavSize] = useState("large")
    return (
        <Flex
            pos="sticky"
            left="5"
            h="95vh"
            marginTop="2.5vh"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            borderRadius={navSize == "small" ? "15px" : "30px"}
            w={navSize == "small" ? "75px" : "200px"}
            flexDir="column"
            justifyContent="space-between"
        >
            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                as="nav"
            >
                <IconButton
                    background="none"
                    mt={5}
                    _hover={{ background: 'none' }}
                    icon={<FiMenu />}
                    onClick={() => {
                        if (navSize == "small")
                            changeNavSize("large")
                        else
                            changeNavSize("small")
                    }}
                />
                <NavItem navSize={navSize} icon={FiHome} title="Hjem" />
                <NavItem navSize={navSize} icon={FiUser} title="Din profil" />
                <NavItem navSize={navSize} icon={FiMapPin} title="Interessepunkter" />
                <NavItem navSize={navSize} icon={FiActivity} title="Dine ruter" />
                <NavItem navSize={navSize} icon={FiNavigation} title="Lag rute" description="Opprett ruten du akkurat har gått, eller tegn din drømmetur." />
                <NavItem navSize={navSize} icon={FiSettings} title="Instillinger" />
            </Flex>

            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                mb={4}
            >
                <Divider display={navSize == "small" ? "none" : "flex"} />
                <Flex mt={4} align="center">
                    <Avatar size="sm" src="avatar-1.jpg" />
                    <Flex flexDir="column" ml={4} display={navSize == "small" ? "none" : "flex"}>
                        <Heading as="h3" size="sm">Martin Bondevik</Heading>
                        <Text color="gray">Bruker</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Sidebar;