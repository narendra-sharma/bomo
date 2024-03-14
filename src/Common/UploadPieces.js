import React, { useState } from "react";
import DeliverNow from "../Modals/DeliverNow";
import { connect } from "react-redux";
import { toast } from "react-toastify";

const UploadPieces = ({ requestData }) => {
    const [formdata, setFormdata] = useState({
        firstFile: '',
        secondFile: '',
        zipfile: ''
    });
    const [filepreview, setFilepreview] = useState('');
    const [secondfilepreview, setSecondfilepreview] = useState('');
    const [zipfilepreview, setZipfilepreview] = useState('');
    const [errors, setErrors] = useState({
        firstFile: '',
        secondFile: '',
        zipfile: ''
    });
    const [show, setShow] = useState(false);
    const [deliverdetail, setDeliverdetail] = useState();
    const [data, setData] = useState();

    const handleInputChange = async (e) => {
        const { name, files } = e.target;
        const allowedFileTypes = ['image/png', 'image/jpeg', 'image/jpg', 'video/mp4', 'image/gif'];
        switch (name) {
            case 'firstFile':
                const FirstFile = files[0];
                if (!FirstFile) {
                    setErrors({ ...errors, firstFile: 'Upload 9:16 .mp4' });
                } else if (!allowedFileTypes.includes(FirstFile.type)) {
                    setErrors({ ...errors, firstFile: 'Invalid file type. Please upload PNG, JPEG, JPG, MP4, or GIF files.' });
                } else if (allowedFileTypes.includes(FirstFile.type)) {
                    setErrors({ ...errors, firstFile: '' });
                    setFormdata({
                        ...formdata,
                        firstFile: FirstFile,
                    });
                    setFilepreview(FirstFile);
                }
                break;

            case 'secondFile':
                const SecondFile = files[0];
                if (!SecondFile) {
                    setErrors({ ...errors, secondFile: 'Upload 16:9 .mp4' });
                } else if (!allowedFileTypes.includes(SecondFile.type)) {
                    setErrors({ ...errors, secondFile: 'Invalid file type. Please upload PNG, JPEG, JPG, MP4, or GIF files.' });
                } else if (allowedFileTypes.includes(SecondFile.type)) {
                    setErrors({ ...errors, secondFile: '' });
                    setFormdata({
                        ...formdata,
                        secondFile: SecondFile,
                    });
                    setSecondfilepreview(SecondFile);
                }
                break;

            case 'zipfile':
                const ZipFile = files[0];
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

    const handleDeliver = (e) => {
        e.preventDefault();
        if (formdata.firstFile === '' || formdata.secondFile === '' || formdata.zipfile === '') {
            toast.error('Upload all pieces!');
            return;
        }
        if (Object.values(errors).some(error => error !== '')) {
            return;
        }
        const delieverData = {
            request_id: requestData?._id,
            landscape: formdata?.firstFile,
            portrait: formdata?.secondFile,
            zip: formdata?.zipfile
        };
        setDeliverdetail(delieverData);
        setShow(true);
    };
    return (
        <div>
            <div className="ready-to-delivery-section border border-dark p-5 bg-gray mt-4">
                <p><span className="fw-bold">Ready to Deliver?</span> Place each file in its corresponding folder</p>
                <div className="row align-items-center">
                    <div className="col-md-3 d-flex flex-column">
                        <h5 className="text-center mb-2"> <span className="uplaod-dimension border border-dark d-inline-block"></span>
                            Upload {requestData?.size[0]} .mp4
                        </h5>
                        <div className="upload-nine-mp4">
                            <div className="d-flex align-item-center justify-content-center mb-4">
                                <label class="uploadFile">
                                    {!filepreview ? <span class="filename"><i className="fa fa-plus"></i></span> : <i className="fa-solid fa-check-circle text-success"></i>}
                                    <input name="firstFile" type="file" accept="image/*" className="inputfile form-control" defaultValue={formdata.firstFile} onChange={handleInputChange}  onInput={handleInputChange}/>
                                    {errors.firstFile && <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">{errors.firstFile}</p>}
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3 d-flex flex-column">
                        <h5 className="text-center mb-2">
                            <span className="uplaod-dimension sixteen-nine border border-dark d-inline-block"></span>  Upload {requestData?.size[1]} .mp4
                        </h5>
                        <div className="upload-nine-mp4">

                            <div className="d-flex align-item-center justify-content-center mb-4">
                                <label class="uploadFile">
                                    {!secondfilepreview ? <span class="filename"><i className="fa fa-plus"></i></span> : <i className="fa-solid fa-check-circle text-success"></i>}
                                    <input name="secondFile" type="file" accept="image/*" className="inputfile form-control" defaultValue={formdata.secondFile} onChange={handleInputChange} />
                                    {errors.secondFile && <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">{errors.secondFile}</p>}
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3 d-flex flex-column">
                        <h5 className="text-center mb-2">
                            .zip and upload your .AEP
                        </h5>
                        <div className="upload-zip-file">

                            <div className="d-flex align-item-center justify-content-center mb-4">
                                <label class="uploadFile">
                                    {!zipfilepreview ? <span class="filename"><i className="fa fa-plus"></i></span> : <i className="fa-solid fa-check-circle text-success"></i>}
                                    <input name="zipfile" type="file" accept=".zip" className="inputfile form-control" defaultValue={formdata.zipfile} onChange={handleInputChange} />
                                    {errors.zipfile && <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">{errors.zipfile}</p>}
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div class="status-btn"><button class="btn pause-btn rounded-pill py-2 px-4" onClick={(e) => { handleDeliver(e); setData(requestData); }}>DELIVERY NOW</button> </div>
                    </div>

                </div>

            </div>
            <DeliverNow show={show} handleClose={() => setShow(false)} detail={deliverdetail} currentdata={data} />
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        requestData: state.requests.delieverRequestdetails,
        isLoading: state.loader.isLoading,
    };
};

export default connect(mapStateToProps)(UploadPieces);

