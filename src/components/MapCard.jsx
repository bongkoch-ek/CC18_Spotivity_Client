import React, { useEffect } from 'react'
import { SearchIcon } from '../icons'
import GoogleMap from './GoogleMap';
import { Map } from '@vis.gl/react-google-maps';

export default function MapCard(props) {
    const { activity } = props
    const [map, setMap] = React.useState(null)

    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    // useEffect(() => {
    //     function initMap() {
    //       const center = { lat: 13.7563, lng: 100.5018 };  

    //       const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
    //         center: center,
    //         zoom: 10,
    //       });
    //     }

    //     if (window.google && window.google.maps) {
    //       initMap(); 
    //     } else {
    //       window.initMap = initMap;  
    //     }
    //   }, []);

    return (
        <div className="w-full bg-base-100 shadow-md">
            <div className="">
                <div className='flex items-center gap-2 px-5 pt-5'>
                    <SearchIcon className='w-4 h-4' />
                    <p>{new Date(activity.startDate).toLocaleDateString('en-US', options)}</p>
                </div>
                <div className='flex items-center gap-2 px-5 pt-2'>
                    <SearchIcon className='w-4 h-4' />
                    <p>{new Date(activity.startDate).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })} - {new Date(activity.endDate).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
                <div className='flex items-center gap-2 px-5 pt-2 pb-3'>
                    <SearchIcon className='w-4 h-4' />
                    <p>{activity.mapName}</p>

                </div>
            </div>
            <div className='bg-slate-400 w-full h-[400px]' >

                <GoogleMap lat={activity.latitude} lng={activity.longitude}/>
               
            </div>
        </div>
    )
}
