import { useEffect, useState } from "react"
import ApiClient from "../api-client"
import load from "../components/loaderMethod"
import { apiUrl } from "../environment"

export default function Terms(){
    const [data, setData] = useState('')
    useEffect(() => {
        getData()
    }, [])


    const getData = () => {
        load(true)
        ApiClient.get(apiUrl + '/page', { slug: 'terms-conditions', status: 'active' }).then(res => {
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