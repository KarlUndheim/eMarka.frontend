import {ChakraProvider} from '@chakra-ui/react';
import '../../styles/global.css'

function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps}/>
      <link href='https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css' rel='stylesheet' />
    </ChakraProvider>
  );
}

export default App;
