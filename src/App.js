import {ChakraProvider, Flex} from '@chakra-ui/react'
import Sidebar from './components/Sidebar/Sidebar';
import Map from './components/Map';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
          <Flex w="100%">
            <Sidebar />
            <Map />
          </Flex>} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
