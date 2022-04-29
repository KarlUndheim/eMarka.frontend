import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import * as turf from '@turf/turf';
import {
    // Button,
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
import { 
    Flex,
    Center,
    Stack,
    InputGroup,
    InputLeftElement,
    Input,
    InputRightElement,
    Button
} from '@chakra-ui/react';
import Sidebar from '../components/Sidebar/Sidebar';
import Footer from '../components/Footer/Footer';
import { EMARKA_GREEN } from '../../consts';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import MenuIcon from '@mui/icons-material/Menu';
// ved feilmelding: npm install @mui/icons-material
import axios from 'axios';
import GEOM_URL from  "../../consts";
import { useHistory } from "react-router";
import { useRouter } from "next/router";

mapboxgl.accessToken =
    'pk.eyJ1IjoiYXVkdW5yYiIsImEiOiJjbDJoaHVucGcwNjh5M2NxNmh4M3V4ZWQzIn0.2LIVev9IGIpuGHvAzUJ62w';

export default function MapView() {
    const mapContainer = useRef(null);
    const [map, setMap] = useState(null);
    const [lng, setLng] = useState(10.4885);
    const [lat, setLat] = useState(63.3945);
    const [zoom, setZoom] = useState(12);
    const [finalPath, setFinalPath] = useState([]);
    const [path, setPath] = useState(turf.featureCollection([]));
    const [nothing, setNothing] = useState(turf.featureCollection([]));
    const [openPopover, setOpenPopover] = useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [routeName, setRouteName] = useState('');
    const [routeDescription, setRouteDescription] = useState('');
    const [ownRouteNames, setOwnRouteNames] = useState([]);
    const [intersectRoute, setIntersectRoute] = useState([]);
    const router = useRouter();


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

        const fillMap = () => {
            if (!mapContainer.current) {
                return;
            }
            map.on('load', async () => {
                map.addLayer({
                    id: 'point-symbol',
                    type: 'circle',
                    source: {
                        data: path,
                        type: 'geojson',
                    },
                    paint: {
                        'circle-radius': 10,
                        'circle-color': '#1967d2',
                    },
                });
                map.addSource('route', {
                    type: 'geojson',
                    data: nothing,
                });

                map.addLayer({
                    id: 'route',
                    type: 'line',
                    source: 'route',
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round',
                    },
                    paint: {
                        'line-color': '#1967d2',
                        'line-width': ['interpolate', ['linear'], ['zoom'], 12, 3, 22, 12],
                    },
                });

                await map.on('click', null);
            });
        };

        !map && attachMap(mapContainer);
        map && fillMap(mapContainer);
    }, [map]);

    const fetchRoute = async () => {
        clearPath();

        await axios
            .get({GEOM_URL})
            .then(function (response) {
                let owned_path = response.data.features.filter(
                    (path) => path.properties.userid === sessionStorage.getItem('id'),
                );
                for (let i = 0; i <= owned_path.length - 1; i++) {
                    nothing.features.push(owned_path[i]);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const displayOwnRoutes = () => {
        map.getSource('route').setData(nothing);
    };

     //HER MÅ VI ENDRE PÅ SOURCE tror jeg

    // const handleClickPopover = (event) => {
    //     setAnchorEl(event.currentTarget);
    //     setOpenPopover(!openPopover);
    // };
    

    // const handleSetRouteName = (event) => {
    //     setRouteName(event.target.value);
    // };

    // const handleSetRouteDescription = (event) => {
    //     setRouteDescription(event.target.value);
    // };

    return (
        <Box
                    ref={mapContainer}
                    className="map-container"
                >
                    
                 <SaveIcon />
                                  
                </Box>
    );
}
