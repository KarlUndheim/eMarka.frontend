import { Flex, Text, IconButton } from '@chakra-ui/react'
import { FiMenu } from 'react-icons/fi'
import Sidebar from '../components/Sidebar/Sidebar'
import Map from '../components/Map'


const Home = () => {
  return (
    <Flex width="100%">
      <Sidebar />
      <Flex
        pos="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
      >
        <Text>Click the
          <IconButton
            background="none"
            _hover={{ background: 'none' }}
            icon={<FiMenu />}
          />
        to resize the vertical fab bar.</Text>
      </Flex>
    </Flex>
  )
}

const Map = dynamic(() => import("../components/Map"), {
  loading: () => "Loading...",
  ssr: false
});

export default Home