import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Modal from 'react-modal';
import { Media, Col, Button } from 'reactstrap';
import Image from 'react-bootstrap/Image';
import userImg from './user.png';
import { apiUrl } from '../../environment';
import ApiClient from '../../api-client';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        height: '22rem',
    },
};

const NewJAdminModal = ({
    isOpen,
    handleModal,
    projectMembers,
    projectData,
    getProject,
    toggleModal,

}) => {

    const [selectedOption, setSelectedOption] = useState();
    const token100 = localStorage.getItem('headertoken');

    console.log("projectMembers", projectMembers)

    const userid = localStorage.getItem("userID")
    const submitForm = () => {
        ApiClient.put(
            `${apiUrl}/updateProjectcreatedby`,
            { createdBy: selectedOption, id: projectData.id, userId: userid },
            `Bearer ${token100}`)
            //   props.user.access_token,
            .then((result) => {
                getProject();
                toggleModal(false);

            })
    }


    const handleChange = (value, selectOptionSetter) => {
        selectOptionSetter(value)
        // handle other stuff like persisting to store etc
    }


    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleModal}
            // style={customStyles}
            contentLabel="Example Modal"
        >

            <div>
                <h3 className="email-tital">{'Select User Emails'}</h3>

                <div className="px-3">
                    <label>Please select users</label>
                    <select
                        className="form-control"
                        placeholder="Select Project..."

                        value={selectedOption}
                        onChange={e => handleChange(e.target.value, setSelectedOption)}
                    >
                        <option value="">Select Member</option>
                        {projectMembers && projectMembers.map(item => (
                            <>
                                <option value={item.member_id.id} >{item.member_id.fullName}</option>
                            </>

                        ))}

                    </select>



                    {/* <label className="p-3">Please select a role</label>
                        <select className="form-control">
                            <option value="Journey owner">Journey owner</option>
                        </select> */}


                </div>

                <div className="text-right p-3">
                    <Button variant="secondary" onClick={handleModal}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        className="invite primary-btn ml-3"
                        onClick={() =>
                            submitForm()
                        }

                    >
                        Submit
                    </Button>
                </div>

            </div>



        </Modal>
    );
};

export default NewJAdminModal;
