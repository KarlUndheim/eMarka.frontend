import React, { useEffect, useRef, useState, Component } from 'react';
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
import Footer from '../components/Footer/Footer';
import { EMARKA_GREEN } from '../../consts';
import { render } from "react-dom";
import MapGL, {
    Marker,
    Popup,
    NavigationControl,
    FullscreenControl
  } from "react-map-gl";

mapboxgl.accessToken =
    'pk.eyJ1IjoiYXVkdW5yYiIsImEiOiJjbDJoaHVucGcwNjh5M2NxNmh4M3V4ZWQzIn0.2LIVev9IGIpuGHvAzUJ62w';

export default function Observation() {
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
            map.on('click', (event) => {
                // If the user clicked on one of your markers, get its information.
                const features = map.queryRenderedFeatures(event.point, {
                  layers: ['YOUR_LAYER_NAME'] // replace with your layer name
                });
                if (!features.length) {
                  return;
                }
                const feature = features[0];
              
                // Code from the next step will go here.
                /* 
    Create a popup, specify its options 
    and properties, and add it to the map.
  */
                const popup = new mapboxgl.Popup({ offset: [0, -15] })
                .setLngLat(feature.geometry.coordinates)
                .setHTML(
                `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
                )
                .addTo(map);
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
                    height: '90vh',
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
                        width: '95%',
                        height: '93vh',
                        border: 3,
                        borderRadius: 8,
                        borderColor: 'primary.main',
                    }}
                >                        
                                <SaveIcon />  
                </Box>
                <div
                    style={{
                        position: "fixed",
                        left: 0,
                        bottom: 0,
                        right: 15,
                        backgroundColor: "primary.main"
                    }}
                    >
                    <Footer/>
                </div>               
            </div>        
        </Box>      
        </Box>
  </Flex>
    );
}