import React, { useEffect, useState } from "react";
import methodModel from "../../models/method.model";
import LinkPreview from "./LinkPreview";

const LinkPreviewArr = ({ url = '' }) => {
    const [data, setData] = useState([])

    useEffect(() => {
        if (url) {
            var matches = url.match(/\bhttps?:\/\/\S+/gi);
            //("matches", matches)
            setData(matches)
        }
    }, [url])


    const isYoutubeLink = (url) => {
        let value = false
        if (url.includes('youtube.com')||url.includes('youtu.be')||url.includes('youtu.be')) value = true
        return value
    }


    return <>
        <div className="linkpreviewlist">
            {data && data.map(itm => {
                return <div className="p-2">
                    {isYoutubeLink(itm) ? <>
                        <iframe
                            id="player"
                            type="text/html"
                            style={{ width: "100%", height: "100%" }}
                            src={`https://www.youtube.com/embed/${methodModel.getYoutubeId1(itm)}?autoplay=0`}
                            frameBorder="0"
                            allow='autoplay'
                            allowFullScreen
                        ></iframe>
                    </> : <a
                        href={itm}
                        target="_blank"
                    >
                        <LinkPreview url={itm} />
                    </a>}

                </div>
            })}
        </div>
    </>
}

export default LinkPreviewArr