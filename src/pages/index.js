import Sidebar from '../components/Sidebar/Sidebar'
import { Flex, Text, IconButton } from '@chakra-ui/react'
import { FiMenu } from 'react-icons/fi'
import dynamic from 'next/dynamic'
import Map from '../components/Map'

export default function Home() {
  return (
    <Flex w="100%">
      <Sidebar />
      <Map />
      <Flex
        pos="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
      >
      </Flex>
    </Flex>
  )
}
