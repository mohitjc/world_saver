import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import moment from 'moment'
import ApiClient from '../api-client'
import { apiUrl } from '../environment'

function ViewPost() {
    const [Post, SetPost] = useState({})
    const [Comments, setComment] = useState([])
    const CurrentDate = moment(Date.now()).format('DD-MM-YYYY')
    const { id } = useParams()
    const getPost = () => {
        ApiClient.get(`${apiUrl}/post?post_id=${id}`).then((res) => {
            console.log(res)
            if (res?.success) {
                SetPost(res?.data)
                setComment(res?.data?.comments)
            }
        })
    }
    useEffect(() => {
        getPost()
    }, [])
    return (
        <div className='container pb-4'>
            <h2 className='heading'>{Post?.user_post}</h2>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>

                {!Post?.videos ? <>
                    {
                        Post?.images?.map((itm) => {
                            return (
                                < img style={{ width: '660px' }} src={`${apiUrl}${itm?.imagePath}`} class="card-img-bottom" alt="..." />
                            )
                        })
                    }
                </> : <video
                    // key={`video-${i}`}
                    controls
                    // oncanplay="muted=true"
                    playsInline
                    className="w-100 mb-3 mt-2"
                    post
                    // muted="true"
                    src={`${apiUrl}${Post?.videos[0]?.videoPath}`}
                />}
                <div style={{ width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <h4>Share via</h4>
                    <div class="elfsight-app-466ea3a9-ade9-4792-94b7-fb18c4b50f29" data-elfsight-app-lazy></div>
                </div>
            </div>
            <div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={`	https://endpoint.crowdsavetheworld.com/${Post?.createdBy?.image}`} className='header_avtar' alt="" />
                    <h5 className='mt-2 ml-1'>{Post?.createdBy?.fullName}</h5>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <h5>Posted At: </h5>
                    {/* <img src="https://e7.pngegg.com/pngimages/81/570/png-clipart-profile-logo-computer-icons-user-user-blue-heroes-thumbnail.png" className='header_avtar' alt="" /> */}
                    <h5 className=' ml-1'>{moment(Post?.createdAt).format("DD-MMM-YYYY")}</h5>
                </div>
                {/* <div style={{ display: 'flex', alignItems: 'center' }}>
                    <h5>Privacy: </h5>
                  
                    <h5 className=' ml-1'>{Post?.shareWith}</h5>
                </div> */}
            </div>
            <section style={{ backgroundColor: "#f7f6f6" }}>
                <div className="container my-5 py-5 text-dark">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-12 col-lg-10 col-xl-8">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h4 className="text-dark mb-0"> Comments</h4>
                                {/* <div className="card">
                                    <div className="card-body p-2 d-flex align-items-center">
                                        <h6 className="text-primary fw-bold small mb-0 me-1">
                                            Comments "ON"
                                        </h6>
                                        <div className="form-check form-switch">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="flexSwitchCheckChecked"
                                                defaultChecked=""
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="flexSwitchCheckChecked"
                                            />
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                            {
                                Comments?.map((itm) => {
                                    return (


                                        <div className="card mb-3">
                                            <div className="card-body">
                                                <div className="d-flex flex-start">
                                                    <img
                                                        className="rounded-circle shadow-1-strong me-3"
                                                        src={itm?.createdBy?.image ? `${apiUrl}${itm?.createdBy?.image}` : "https://surgassociates.com/wp-content/uploads/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.jpg"}
                                                        s alt="avatar"
                                                        width={40}
                                                        height={40}
                                                    />
                                                    <div className="w-100">
                                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                                            <h6 className="text-primary fw-bold mb-0">
                                                                {itm?.createdBy?.fullName}
                                                                <span className="text-dark ms-2">
                                                                    {itm?.post_comment}
                                                                </span>
                                                            </h6>
                                                            {/* <p className="mb-0">{moment(CurrentDate).from(moment(Post?.updatedAt).format('DD-MM-YYYY'))} - {CurrentDate}</p> */}
                                                        </div>
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            {/* <p className="small mb-0" style={{ color: "#aaa" }}>
                                                                <a href="#!" className="link-grey">
                                                                    Remove
                                                                </a>{" "}
                                                                •
                                                                <a href="#!" className="link-grey">
                                                                    Reply
                                                                </a>{" "}
                                                                •
                                                                <a href="#!" className="link-grey">
                                                                    Translate
                                                                </a>
                                                            </p> */}
                                                            <div className="d-flex flex-row">
                                                                <i className="fas fa-star text-warning me-2" />
                                                                <i
                                                                    className="far fa-check-circle"
                                                                    style={{ color: "#aaa" }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default ViewPost
