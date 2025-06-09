import React, { useState, useEffect } from "react";
import ApiClient from "../../api-client";
import './style.scss'
import { apiUrl } from "../../environment";

const LinkPreview = ({ url = '' }) => {
    const [data, setData] = useState()
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        Linkurl()
    }, [url])

    const getLocation = (href) => {
        var l = document.createElement("a");
        l.href = href;
        return l;
    };



    const stringToHTML = function (str) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(str, 'text/html');
        return doc;
    };

    const Linkurl = () => {
        setLoader(true)
        // let u =`https://cors-anywhere.herokuapp.com/${url}`
        let u = `${apiUrl}/getHTMLFromURL`
        ApiClient.get(u, { url }).then(response => {
            let res = response?.data
            if (stringToHTML(res).head) {
                let html = stringToHTML(res).head.querySelectorAll('meta')
                let title = stringToHTML(res).querySelector('title') ? stringToHTML(res).querySelector('title').innerHTML : ''
                let arr = []
                for (let index = 0; index < html.length; index++) {
                    arr.push({
                        name: html[index].name ? html[index].name : '',
                        property: html[index].attributes[0] ? html[index].attributes[0].value : '',
                        content: html[index].content ? html[index].content : ''
                    })
                }

                let description = arr.find(itm => itm.property == 'description') ? arr.find(itm => itm.property == 'description').content : ''
                let description2 = arr.find(itm => itm.name == 'description') ? arr.find(itm => itm.name == 'description').content : ''
                let image = arr.find(itm => itm.property == "og:image") ? arr.find(itm => itm.property == "og:image").content : ''
                let favicon = stringToHTML(res).querySelector('link[rel="shortcut icon"]') ? stringToHTML(res).querySelector('link[rel="shortcut icon"]').href : ''
                if (!favicon) favicon = stringToHTML(res).querySelector('link[rel="icon"]') ? stringToHTML(res).querySelector('link[rel="icon"]').href : ''
                let parms = {
                    title: arr.find(itm => itm.property == 'title') ? arr.find(itm => itm.property == 'title').content : title,
                    description: description ? description : description2 ? description2 : title,
                    image,
                    favicon
                }
                // console.log("Linkurl", html)
                // console.log("title", title)
                // console.log("arr", arr)
                setData(parms)
            }


            setLoader(false)
        })
    }

    const fav = () => {
        let host = window.location.host
        let value = data && data.favicon ? data && data.favicon : `https://${getLocation(url).host}/favicon.ico`
        if (value.includes(host)) value = value.replace(host, getLocation(url).host)
        return value
    }

    return <>
        <div>
            {loader ? <div className="linkPreview border p-2">
                <h5 className="shine"></h5>
                <p className="shine"></p>
            </div> : <div className="linkPreview border">
                {data && data.image ? <img src={data.image} className="w-100" /> : <></>}

                <div className="p-2">
                    <h5 className="mb-1">{data && data.title}</h5>
                    <p className="mb-2">{data && data.description}</p>
                    <a className="lpBottom" href={url} target="_new">
                        <img src={fav()} className="favImg" /> {getLocation(url).host}
                    </a>
                </div>

            </div>}
        </div>
    </>
}

export default LinkPreview;