import React, { useEffect, useState } from 'react';
import { Map, Marker } from '@vis.gl/react-google-maps';


const GoogleMap = (props) => {

    const { lat, lng, isFromCreate, latitude, setLatitude, longitude, setLongitude } = props
    const [markers, setMarkers] = useState({ lat: lat, lng: lng });

    // useEffect(() => {
    //     const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');

    //     if (!existingScript) {
    //         const script = document.createElement('script');
    //         script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDUAh9fZ3Cx2lcC1UKSxRHc0xQ23L_HhkU&callback=initMap&libraries=marker`;
    //         script.async = true;
    //         script.defer = true;
    //         window.initMap = initMap;  
    //         document.head.appendChild(script);
    //     } else {
    //         window.initMap = initMap;
    //     }

    //     // const script = document.createElement('script');
    //     // script.async = true;
    //     // script.defer = true;
    //     // window.initMap = initMap;

    //     // document.head.appendChild(script);
    //     function initMap() {

    //         const pin = { lat: lat, lng: lng };
    //         const map = new window.google.maps.Map(document.getElementById('map'), {
    //             center: pin,
    //             zoom: 15,
    //             streetViewControl: false,
    //             mapTypeControl: false,
    //             mapId: "ambient-shelter-439303-s9"
    //         });
    //         if (isFromCreate) {
    //             setMap(map);
    //             map.addListener('click', (event) => {
    //                 addMarker(event.latLng);
    //             });
    //         }
    //         else {

    //             new window.google.maps.marker.AdvancedMarkerElement({
    //                 position: pin,
    //                 map: map,
    //             });
    //         }
    //     }



    // }, []);

    // const addMarker = (location) => {
    //     const newMarker = new window.google.maps.marker.AdvancedMarkerElement({
    //         position: location,
    //         map: map,
    //     });

    //     setMarkers((currentMarkers) => [...currentMarkers, newMarker]);
    // };

    const hdlMapClick = (e) => {
        setLatitude(e.detail.latLng.lat)
        setLongitude(e.detail.latLng.lng)
    }

    return (
        <div className='w-full h-full'>
            {/* <div id="map" style={{ height: '400px', width: '100%' }}></div> */}
            <Map
                style={{ width: '100%', height: '100%' }}
                defaultCenter={{ lat: lat, lng: lng }}
                defaultZoom={15}
                // gestureHandling={'greedy'}
                disableDefaultUI={true}

                onClick={(e) => { setMarkers({ lat: e.detail.latLng.lat, lng: e.detail.latLng.lng }); hdlMapClick(e) }}
            >
                <Marker position={isFromCreate ? { lat: markers.lat, lng: markers.lng } : { lat, lng }}
                />
            </Map>

        </div>
    );
};

export default GoogleMap;