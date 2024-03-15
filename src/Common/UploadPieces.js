import React, { useState } from "react";
import DeliverNow from "../Modals/DeliverNow";
import { connect } from "react-redux";
import { toast } from "react-toastify";

const UploadPieces = ({ requestData }) => {
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

    requestData?.sizes?.forEach((_, index) => {
      if (!deliverdata[`firstfile${index}`]) {
        newErrors[`firstfile${index}`] = `Please upload ${requestData.size[index]} .mp4`;
      }
    })
    setFileErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate() && formdata.zipfile) {
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
      console.log('Form submitted successfully.', deliverData);
      setDeliverdetail(deliverData);
      setShow(true);
    } else {
      toast.error('Upload all files!');
    }
  };
  return (
    <div>
      <div className="ready-to-delivery-section border border-dark p-5 bg-gray mt-4">
        <p><span className="fw-bold">Ready to Deliver?</span> Place each file in its corresponding folder</p>
        <div className="row align-items-center">
          {requestData?.size?.map((item, index) =>
            <div className="col-md-3 d-flex flex-column" key={index}>
              <h5 className="text-center mb-2">
                <span className={item === '16:9' ?
                  'uplaod-dimension sixteen-nine border border-dark d-inline-block' :
                  item === '9:16' ?
                    'uplaod-dimension border border-dark d-inline-block'
                    : 'upload-dimension one-one border border-dark d-inline-block'}>
                </span>
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

