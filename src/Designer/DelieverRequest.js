import React, { useState, useEffect } from "react";
import plusImage from '../images/plus-img.png';
import { connect } from 'react-redux';
import ColorCode from "../Common/ColorCode";
import DeliverNow from "../Modals/DeliverNow";
import CountdownTimer from "../Common/CountdownTimer";
import { toast } from "react-toastify";

const { REACT_APP_BOMO_URL } = process.env;

const DelieverRequest = ({ requestData, user }) => {
    const [formdata, setFormdata] = useState({ zipfile: '' });
    const sizes = requestData?.size;
    const [deliverdata, setDeliverdata] = useState({ firstfile: '' });
    const [fileErrors, setFileErrors] = useState({});

    const [zipfilepreview, setZipfilepreview] = useState('');
    const [errors, setErrors] = useState({ zipfile: '' });
    const [show, setShow] = useState(false);
    const [deliverdetail, setDeliverdetail] = useState();
    const [data, setData] = useState();

    const handleChange = (e) => {
        const { name } = e.target;
        const file = e.target.files[0];
        console.log(file);
        const allowedFileTypes = ['image/png', 'image/jpeg', 'image/jpg', 'video/mp4', 'image/gif'];
        if (file && !allowedFileTypes.includes(file.type)) {
            setFileErrors((prevErrors) => ({
                ...prevErrors,
                [name]: 'Invalid file type. Please upload PNG, JPEG, JPG, MP4, or GIF files.',
            }));
        } else {
            setDeliverdata((prevdata) => ({
                ...prevdata,
                [name]: file,
            }));
            setFileErrors((prevErrors) => ({
                ...prevErrors,
                [name]: '',
            }));
        }
    };

    const handleZipFile = async (e) => {
        const { name, files } = e.target;
        switch (name) {
            case 'zipfile':
                const ZipFile = files[0];
                console.log(ZipFile);
                if (!ZipFile) {
                    setErrors({ ...errors, zipfile: 'Upload your .Zip' });
                } else if (ZipFile.type !== 'application/zip') {
                    setErrors({ ...errors, zipfile: 'Please upload a valid zip file' });
                } else if (ZipFile.type === 'application/zip') {
                    setErrors({ ...errors, zipfile: '' });
                    setFormdata({
                        ...formdata,
                        zipfile: ZipFile,
                    });
                    setZipfilepreview(ZipFile);
                }
                break;

            default:
                break;
        }
    };

    const validate = () => {
        const newErrors = {};
        
        requestData?.sizes?.forEach((_,index) => {
            if(!deliverdata[`firstfile${index}`]) {
                newErrors[`firstfile${index}`] = `Please upload ${requestData.size[index]} .mp4`;
            }
        })
        setFileErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()&& formdata.zipfile) {
            const deliverData = {
                request_id: requestData?._id,
                landscape: null,
                portrait: null,
                zip: formdata?.zipfile
            };
            Object.keys(deliverdata).forEach(key => {
                if (key.startsWith('firstfile')) {
                    const index = parseInt(key.replace('firstfile', ''));
                    if (index === 0) {
                        deliverData.landscape = deliverdata[key];
                    } else if (index === 1) {
                        deliverData.portrait = deliverdata[key];
                    }
                }
            });
          console.log('Form submitted successfully.',deliverData);
          setDeliverdetail(deliverData);
          setShow(true);
        } else {
            toast.error('Upload all pieces!');
        }
    };

    return (
        <>
            <div className="ml-md-auto py-4 ms-md-auto rightside-wrapper">
                <div className="main-content-wraaper px-60 pt-md-2 pt-lg-5 pb-0">
                    <div className="mx-md-0 mx-lg-4 px-60 ">
                        <div className="order-completed px-5 py-4 rounded mb-5">
                            <p className="mb-0 extra-dark-green"> DELIVER NOW. This request is in Production
                                <span className="d-block fw-bold">Delivery in
                                    <CountdownTimer requestDate={requestData?.req_mail_date} duration={20 * 60 * 60 * 1000} />
                                </span>
                            </p>
                        </div>
                        <div className="bg-white px-3 px-lg-5 py-4 review-main-content rounded pb-5">
                            <div className="row">
                                <div className="col-md-7 col-lg-6 mb-4">
                                    <h3>{requestData?.request_name}</h3>
                                    <div className="review-content mt-3">
                                        <div className="d-flex align-items-center">
                                            <ColorCode request={requestData} />
                                            <img className="rounded-circle" src={`${REACT_APP_BOMO_URL}${requestData?.brand_profile?.logo}`} alt='imga' height="33" widht="36" />
                                            {/* <p className="short0ad dor rounded-pill ms-2">{requestData?.brand_profile?.brandname ? requestData?.brand_profile?.brandname : '-'}</p> */}
                                            <p className="short0ad project-assets ms-2 px-4">Project Assets</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-5 col-lg-6 mb-3">
                                    <div className="d-flex  justify-content-end">
                                        <h3>$125</h3>
                                        <div className="delivery-date text-end ps-5">
                                            <div className="fw-bold h6">Completed<span className="d-block h6">Jan 20th</span></div>
                                        </div>
                                    </div>

                                </div>
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-4">    
                                            <p>
                                                <span className="d-block fw-bold">Description</span>
                                                <span className="d-block">{requestData?.description}</span>
                                            </p>
                                        </div>
                                        <div className="col-md-1">
                                            <p>  <span className="d-block fw-bold">Size</span>
                                             {requestData?.size?.map((item) => <span className="d-block">{item}</span>)}</p>
                                        </div>
                                        <div className="col-md-2"> <p><span className="d-block fw-bold">File Type </span> 
                                        {requestData?.file_type}</p></div>
                                        <div className="col-md-3"><p><span className="d-block fw-bold">Transparency </span> 
                                        {requestData?.transparency}</p></div>
                                        <div className="col-md-2">
                                            <p className="word-break">
                                                <span className="d-block fw-bold">References</span> {requestData?.references}</p></div>
                                            
                                    </div>
                                </div>
                            </div>
                            <div className="ready-to-delivery-section border border-dark p-5 bg-gray mt-4">
                                <p><span className="fw-bold">Ready to Deliver?</span> Place each file in its corresponding folder</p>
                                <div className="row align-items-center">
                                    {requestData?.size?.map((item, index) =>
                                        <div className="col-md-3 d-flex flex-column" key={index}>
                                            <h5 className="text-center mb-2"> <span className="uplaod-dimension border border-dark d-inline-block"></span>
                                                Upload {item} .mp4
                                            </h5>
                                            <div className="upload-nine-mp4">
                                                <div className="d-flex align-item-center justify-content-center mb-4">
                                                    <label class="uploadFile">
                                                        {!deliverdata[`firstfile${index}`] ?
                                                            <span class="filename">
                                                                <i className="fa fa-plus"></i>
                                                            </span>
                                                            : <i className="fa-solid fa-check-circle text-success"></i>}

                                                        <input
                                                            name={`firstfile${index}`}
                                                            type="file"
                                                            accept="image/*"
                                                            className="inputfile form-control"
                                                            defaultValue={deliverdata[`firstfile${index}`]}
                                                            onChange={(e) => handleChange(e)} />
                                                        {fileErrors[`firstFile${index}`] &&
                                                            <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">
                                                                {fileErrors[`firstFile${index}`]}
                                                            </p>
                                                        }
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="col-md-3 d-flex flex-column">
                                        <h5 className="text-center mb-2">
                                            .zip and upload your .AEP
                                        </h5>
                                        <div className="upload-zip-file">

                                            <div className="d-flex align-item-center justify-content-center mb-4">
                                                <label class="uploadFile">
                                                    {!zipfilepreview ? <span class="filename"><i className="fa fa-plus"></i></span> : <i className="fa-solid fa-check-circle text-success"></i>}
                                                    <input name="zipfile" type="file" accept=".zip" className="inputfile form-control" defaultValue={formdata.zipfile} onChange={handleZipFile} />
                                                    {errors.zipfile && <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">{errors.zipfile}</p>}
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div class="status-btn"><button class="btn pause-btn rounded-pill py-2 px-4" onClick={(e) => { handleSubmit(e); setData(requestData); }}>DELIVERY NOW</button> </div>
                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>
                </div>
                <DeliverNow show={show} handleClose={() => setShow(false)} detail={deliverdetail} currentdata={data} />
            </div>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        requestData: state.requests.delieverRequestdetails,
        isLoading: state.loader.isLoading,
    };
};

export default connect(mapStateToProps)(DelieverRequest);
