import React from 'react'
import { useLocation } from 'react-router-dom'
import Services from './Services'
import ServicesOnly from './ServicesOnly';

function AllServices({ search }) {
    const location = useLocation();
    console.log(location);
    return (
        <div>
            {
                location.state ? <Services search={search} /> : <ServicesOnly search={search} />
            }

        </div>
    )
}

export default AllServices