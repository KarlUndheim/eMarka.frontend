import Sidebar from '../components/Sidebar/Sidebar';
import { Flex, Center, Box, Header} from '@chakra-ui/react';

const Settings = () => {
    return (
        <div>
            <Flex color='grey.500'>
                <Center w='190px' bg='white'>
                <Sidebar/>
                </Center>
                <img src={"../public/images/estenstadhytta.png"} alt="bilde wya;(lol"/>
                "Ingen instillinger. Send tilbakemeldinger til synnerek@stud.ntnu.no"
            </Flex>
        </div>

    )
};

export default Settings;
