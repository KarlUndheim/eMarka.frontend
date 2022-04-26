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
import { Flex, Center } from '@chakra-ui/react';
import Sidebar from '../components/Sidebar/Sidebar';
import { EMARKA_GREEN } from '../../consts';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import MenuIcon from '@mui/icons-material/Menu';
// ved feilmelding: npm install @mui/icons-material
import axios from 'axios';
import GEOM_URL from  "../../consts";

mapboxgl.accessToken =
    'pk.eyJ1IjoibWFydGluYm9uZGV2aWsiLCJhIjoiY2wxd2d6aGFjMDJkZDNqbXM5aDIwZGQ4YiJ9.RCaHBfTRYPm8gAmTdk1XBQ';

export default function MapView() {
    const mapContainer = useRef(null);
    const [map, setMap] = useState(null);
    const [lng, setLng] = useState(10.421906);
    const [lat, setLat] = useState(63.446827);
    const [zoom, setZoom] = useState(12);
    const [finalPath, setFinalPath] = useState([]);
    const [path, setPath] = useState(turf.featureCollection([]));
    const [nothing, setNothing] = useState(turf.featureCollection([]));
    const [openPopover, setOpenPopover] = useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [routeName, setRouteName] = useState('');
    const [routeType, setRouteType] = useState('walking');
    const [ownRouteNames, setOwnRouteNames] = useState([]);
    const [intersectRoute, setIntersectRoute] = useState([]);

    useEffect(() => {
        const attachMap = () => {
            if (!mapContainer.current) {
                return;
            }
            const mapInit = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/outdoors-v11',
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
                        'circle-color': '#3887be',
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
                        'line-color': '#3887be',
                        'line-width': ['interpolate', ['linear'], ['zoom'], 12, 3, 22, 12],
                    },
                });

                await map.on('click', addPoints);
            });
        };

        !map && attachMap(mapContainer);
        map && fillMap(mapContainer);
    }, [map]);

    /*useEffect(async () => {
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
        console.log(nothing);
        for (let i = 0; i <= nothing.features.length; i++) {
            console.log(nothing.features[i].properties.name);
            ownRouteNames.push(nothing.features[i].properties.name);
        }
    }, []);*/

    // const displayOwnRoutes = () => {
    //     map.addSource('route_own', {
    //         type: 'geojson',
    //         data: nothing,
    //     });

    //     map.addLayer({
    //         id: 'route_own',
    //         type: 'line',
    //         source: 'route_own',
    //         layout: {
    //             'line-join': 'round',
    //             'line-cap': 'round',
    //         },
    //         paint: {
    //             'line-color': '#3887be',
    //             'line-width': ['interpolate', ['linear'], ['zoom'], 12, 3, 22, 12],
    //         },
    //     });
    // };

    const addPoints = async (event) => {
        const coordinates = map.unproject(event.point);
        const newPoint = turf.point([coordinates.lng, coordinates.lat]);
        path.features.push(newPoint);
        map.getSource('point-symbol').setData(path);
        if (path.features.length > 2) {
            generateRoute();
        }
    };

    const generateRoute = async () => {
        const query = await fetch(queryURL(), { method: 'GET' });
        const response = await query.json();
        console.log(response);

        if (response.code !== 'Ok') {
            const handleMessage =
                response.code === 'InvalidInput'
                    ? 'Refresh to start a new route. For more information: https://docs.mapbox.com/api/navigation/optimization/#optimization-api-errors'
                    : 'Try a different point.';
            alert(`${response.code} - ${response.message}\n\n${handleMessage}`);
            // Remove invalid point
            path.features.pop();
            return;
        }

        const routeGeoJSON = turf.featureCollection([turf.feature(response.trips[0].geometry)]);
        setFinalPath(routeGeoJSON);
        // Update the `route` source by getting the route source
        // and setting the data equal to routeGeoJSON
        map.getSource('route').setData(routeGeoJSON);
    };

    const queryURL = () => {
        let coordinates = [];

        for (let i = 0; i <= path.features.length - 1; i++) {
            coordinates.push(path.features[i].geometry.coordinates);
        }

        return `https://api.mapbox.com/optimized-trips/v1/mapbox/walking/${coordinates.join(
            ';',
        )}?&overview=full&steps=true&geometries=geojson&source=first&access_token=${mapboxgl.accessToken}`;
    };

    const savePath = () => {
        length = turf.length(finalPath, 'kilometers');
        const coordinates = finalPath.features[0].geometry;
        axios.post({GEOM_URL}, {
            userid: sessionStorage.getItem('id'),
            geom: coordinates,
            length: length,
            type: routeType,
            name: routeName,
        });
        handleCloseDialog();
    };

    const clearPath = () => {
        map.getSource('route').setData(turf.featureCollection([]));
        map.getSource('point-symbol').setData(turf.featureCollection([]));
        while (path.features.length) {
            path.features.pop();
        }
        while (nothing.features.length) {
            nothing.features.pop();
        }
    };

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

    const handleClickPopover = (event) => {
        setAnchorEl(event.currentTarget);
        setOpenPopover(!openPopover);
    };

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleSetRouteName = (event) => {
        setRouteName(event.target.value);
    };

    const handleSetRouteType = (event) => {
        setRouteType(event.target.value);
    };

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
                    {/*<Grid
                        style={{
                            position: 'absolute',
                            width: '100%',
                            display: 'flex',
                            alignItems: 'space-between',
                            paddingRight: 2,
                            paddingTop: 10,
                        }}
                    >
                        <Grid
                            style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                width: '50%',
                            }}
                        >
                            <IconButton
                                aria-label="open"
                                aria-describedby={'simple-popover'}
                                style={{
                                    zIndex: 1,
                                }}
                                onClick={handleClickPopover}
                            >
                                <MenuIcon />
                                <Popover
                                    id={'simple-popover'}
                                    open={openPopover}
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                >
                                    <Grid
                                        sx={{
                                            '&:hover': {
                                                background: '#E0E0E0',
                                                cursor: 'pointer',
                                            },
                                        }}
                                        onClick={displayOwnRoutes}
                                    >
                                        <Typography sx={{ p: 2 }}>Get your saved routes</Typography>
                                    </Grid>
                                    <Divider />
                                    <Grid
                                        sx={{
                                            '&:hover': {
                                                background: '#E0E0E0',
                                                cursor: 'pointer',
                                            },
                                        }}
                                    >
                                        <Typography sx={{ p: 2 }}>
                                            Get routes which intersects with your route
                                        </Typography>

                                        <TextField
                                            id="outlined-select-currency"
                                            select
                                            label="Route"
                                            sx={{ width: '30%', ml: 2, mr: 2, mb: 2 }}
                                            size="small"
                                            value={ownRouteNames[0]}
                                            // onChange={}
                                        >
                                            {ownRouteNames.map((name) => (
                                                <MenuItem key={name}>{name}</MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Divider />
                                    <Grid
                                        sx={{
                                            '&:hover': {
                                                background: '#E0E0E0',
                                                cursor: 'pointer',
                                            },
                                        }}
                                    >
                                        <Typography sx={{ p: 2 }}>
                                            Get routes which is within the given radius of your route
                                        </Typography>
                                        <TextField
                                            id="outlined-select-currency"
                                            select
                                            label="Route"
                                            sx={{ width: '30%', ml: 2, mr: 2, mb: 2 }}
                                            size="small"
                                            // value={}
                                            // onChange={}
                                        />
                                        <TextField
                                            id="outlined-select-currency"
                                            select
                                            label="Radius"
                                            sx={{ width: '30%', mr: 2, mb: 2 }}
                                            size="small"
                                            // value={}
                                            // onChange={}
                                        />
                                    </Grid>
                                </Popover>
                            </IconButton>
                        </Grid>
                        <Grid
                            style={{
                                display: 'flex',
                                alignItems: 'flex-end',
                                flexDirection: 'column',
                                width: '50%',
                            }}
                        >
                        */}
                            
                                <SaveIcon />
                            
                            {/*
                            <IconButton
                                aria-label="save"
                                style={{
                                    color: 'red',
                                    zIndex: 1,
                                    //margin: 2,
                                }}
                                onClick={() => clearPath()}
                            >
                                <DeleteForeverIcon />
                            </IconButton>
                            <Dialog open={openDialog} onClose={handleCloseDialog}>
                                <DialogTitle>Create route</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Enter the name and type of your route.
                                    </DialogContentText>
                                    <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="name"
                                            label="Name"
                                            type="name"
                                            variant="standard"
                                            onChange={handleSetRouteName}
                                        />
                                        <FormControl sx={{ mt: 2, minWidth: 120 }}>
                                            <InputLabel htmlFor="type">Type</InputLabel>
                                            <Select
                                                autoFocus
                                                value={routeType}
                                                onChange={handleSetRouteType}
                                                label="type"
                                                inputProps={{
                                                    name: 'type',
                                                    id: 'type',
                                                }}
                                            >
                                                <MenuItem value="walking ">walking</MenuItem>
                                                <MenuItem value="running">running</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleCloseDialog}>Cancel</Button>
                                    <Button onClick={savePath}>Create</Button>
                                </DialogActions>
                            </Dialog>
                        </Grid>
                    </Grid>
                                            */}
                </Box>
            </div>
        </Box>
        </Box>
  </Flex>
    );
}