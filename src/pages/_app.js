import {ChakraProvider} from '@chakra-ui/react';
import '../../styles/global.css'

function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps}/>
    </ChakraProvider>
  );
}

export default App;
