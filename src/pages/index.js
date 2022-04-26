// import Sidebar from '../components/Sidebar/Sidebar'
// import { Flex, Text, IconButton } from '@chakra-ui/react'
// import { FiMenu } from 'react-icons/fi'
// import dynamic from 'next/dynamic'
// import Map from '../components/Map'

// export default function Home() {
//   return (
//     <Flex w="100%">
//       <Sidebar />
//       <Map />
//       <Flex
//         pos="absolute"
//         top="50%"
//         left="50%"
//         transform="translate(-50%, -50%)"
//       >
//       </Flex>
//     </Flex>
//   )
// }
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import * as turf from '@turf/turf';
import {
    Button,
    IconButton,
    Grid,
    Box,
    Popover,
    Typography,
    Divider,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
} from '@mui/material';
import SaveIcon from '@material-ui/icons/Save';
import { Flex, Center, Text } from '@chakra-ui/react';
import Sidebar from '../components/Sidebar/Sidebar';
import { EMARKA_GREEN } from '../../consts';

mapboxgl.accessToken =
    'pk.eyJ1IjoibWFydGluYm9uZGV2aWsiLCJhIjoiY2wxd2d6aGFjMDJkZDNqbXM5aDIwZGQ4YiJ9.RCaHBfTRYPm8gAmTdk1XBQ';

export default function Home() {
    const mapContainer = useRef(null);
    const [map, setMap] = useState(null);
    const [lng, setLng] = useState(10.4885);
    const [lat, setLat] = useState(63.3945);
    const [zoom, setZoom] = useState(12);
   
    useEffect(() => {
        const attachMap = () => {
            if (!mapContainer.current) {
                return;
            }
            const mapInit = new mapboxgl.Map({
                container: mapContainer.current,
                style: "mapbox://styles/audunrb/cl2fy759q00ct17prdgffafrf",
                center: [lng, lat],
                zoom: zoom,
            });
            setMap(mapInit);
        };
        !map && attachMap(mapContainer);
    }, [map]);

    return (
        <Flex color='grey.500'>
    <Center w='190px' bg='white'>
      <Sidebar/>
    </Center>
    <Box flex='1' bg={EMARKA_GREEN}>
        <Box width={1} style={{ paddingTop: '30px' }}>
            <div
                id="comparison-container"
                style={{
                    position: 'relative',
                    height: '80vh',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Box
                    ref={mapContainer}
                    className="map-container"
                    style={{
                        position: 'absolute',
                        top: '0',
                        bottom: '0',
                        width: '90%',
                        height: '80vh',
                        border: 3,
                        borderRadius: 8,
                        borderColor: 'primary.main',
                    }}
                >                        
                                <SaveIcon />  
                </Box>
            </div>
        </Box>
        </Box>
  </Flex>
    );
}