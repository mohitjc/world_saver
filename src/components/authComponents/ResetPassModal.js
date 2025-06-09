import 'react-datepicker/dist/react-datepicker.css';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    validatePassword,
} from '../../utilities/regex';
import logo from './../../assets/img/logo.png';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import { resetpassword } from '../../actions/user';
import { Link } from 'react-router-dom';
import methodModel from '../../models/method.model';

const ResetModal = ({ }) => {
    const dispatch = useDispatch();
    let code=methodModel.getParams('code')
    const [form, setForm] = useState({ password: '', confirm_password: '', code: code, });
    const [submitted, setSubmitted] = useState(false);
    const [exist, setExist] = useState(false);
    const [loading, setLoading] = useState(false);
    const [eyes, setEyes] = useState({ password: false });
    const [eyes1, setEyes1] = useState({ password: false });

    // check password
    const checkPassword = (password, confirmPass) => {
        if (password === confirmPass) {
            return true;
        } else {
            return false;
        }
    };

    // var subtitle;



    // handle form submit
    const handleSubmit = e => {

        e.preventDefault()
        setSubmitted(true)
        let values = form

        if (!form.confirm_password || !form.password) {
            toast.error('All fields are required', {

                autoClose: 2000,
            });
        }

        if (!validatePassword(form.password) || !checkPassword(form.password, form.confirm_password)) return

        let saveObj = { ...form };

        if (!exist) {
            dispatch(resetpassword(saveObj, res => {
                if (res) {
                    document.getElementById("closereset").click()
                }
            }))
        }

    };


    return (
        <>
            <a data-toggle="modal" id='resetModalOpen' data-target="#resetModal"></a>
            <div className="modal fade signup-modal" id="resetModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="text-right">
                            <i className="fa fa-times signupClose" data-dismiss="modal" aria-label="Close"></i>
                        </div>

                        <div className="p-3">
                            <Link to="/dashboard">
                                <img src={logo} className="modal-logo" />
                            </Link>
                            <div className="text-center color-white mb-4">
                                <h4>Reset Password</h4>
                                <button type="button" className="close d-none" id="closereset" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="form-row">

                                    <div className="col-md-12 mb-3">
                                        <input type="text" minLength={3} className="form-control" placeholder="Code" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} />
                                    </div>

                                    <div className="col-md-12 mb-3">
                                        <input type={eyes.password ? 'text' : 'password'} minLength={8} className="form-control" placeholder="New Password" maxLength="30" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
                                        <i className={eyes.password ? 'fa fa-eye eyeicon' : 'fa fa-eye-slash iconslash'} onClick={() => setEyes({ ...eyes, password: !eyes.password })}></i>
                                        {submitted && !validatePassword(form.password) ? <div className="text-danger">A password should be between eight and thirty characters long.</div> : <></>}
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <input type={eyes1.password ? 'text' : 'password'} minLength={8} className="form-control" placeholder="Confirm Password" value={form.confirm_password} onChange={(e) => setForm({ ...form, confirm_password: e.target.value })} required />
                                        <i className={eyes1.password ? 'fa fa-eye eyeicon' : 'fa fa-eye-slash iconslash'} onClick={() => setEyes1({ ...eyes1, password: !eyes1.password })}></i>
                                        {submitted && !checkPassword(form.password, form.confirm_password) ? <div className="text-danger">The password confirmation did not match.</div> : <></>}

                                    </div>



                                    <div className="col-md-12">
                                        <button className="btn btn-primary text-center w-100 rounded" disabled={loading}>Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ResetModal;
