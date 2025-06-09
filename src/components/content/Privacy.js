import React, { useState, useEffect, useRef } from 'react';
import ApiClient from '../../api-client';
import { apiUrl } from '../../environment';
import load from '../loaderMethod';

const AboutPage = () => {

    const [data, setData] = useState('')
    useEffect(() => {
        getData()
    }, [])


    const getData = () => {
        load(true)
        ApiClient.get(apiUrl + '/page', { slug: 'privacy-policies', status: 'active' }).then(res => {
            if (res.success) {
                setData(res.data)
            }
            load(false)
        })
    }

    return <>
        <div className="py-3 container">
            <h2 className="text-center text-capitalize">{data && data.title}</h2>

            <div dangerouslySetInnerHTML={{ __html: data && data.description }}></div>
        </div>
    </>
}

export default AboutPage