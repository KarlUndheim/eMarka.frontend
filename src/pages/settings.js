import Sidebar from '../components/Sidebar/Sidebar';
import { Flex, Center, Text, Box, Header} from '@chakra-ui/react';
import { EMARKA_GREEN } from '../../consts';

const Settings = () => {
    return (
        <div>
            <Flex color='grey.500'>
                <Center w='190px' bg='white'>
                <Sidebar/>
                </Center>
                <Box flex='1' bg={EMARKA_GREEN}>
                <div alignitems='center' justifyContent= 'center'>
                <img src={"sti.jpeg"} alt="bilde wya;(lol"/>
                <Text>"Ingen instillinger. Send tilbakemeldinger til synnerek@stud.ntnu.no"</Text>
                </div>
                </Box>
            </Flex>
        </div>

    )
};

export default Settings;
