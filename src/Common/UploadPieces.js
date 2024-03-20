import React, { useEffect, useState } from "react";
import DeliverNow from "../Modals/DeliverNow";
import { connect } from "react-redux";
import { toast } from "react-toastify";

const UploadPieces = () => {

  const [requestData, setRequestData] = useState();
  const checkfile_type = requestData?.file_type;
  const [filetype, setFiletype] = useState('');


  useEffect(() => {
    let requestdetails = JSON.parse(localStorage.getItem('requestData'));
    setRequestData(requestdetails);

    if (checkfile_type === 'Mov') {
      setFiletype('video/quicktime');
    } else if (checkfile_type === 'Mp4') {
      setFiletype('video/mp4');
    } else if (checkfile_type === 'gif') {
      setFiletype('image/gif');
    }
  }, [checkfile_type]);


  const [formdata, setFormdata] = useState({ zipfile: '' });
  const [deliverdata, setDeliverdata] = useState({ firstfile: '' });
  const [fileErrors, setFileErrors] = useState({});

  const [zipfilepreview, setZipfilepreview] = useState('');
  const [errors, setErrors] = useState({ zipfile: '' });
  const [show, setShow] = useState(false);
  const [deliverdetail, setDeliverdetail] = useState();
  const [data, setData] = useState();
  const [isWrong, setIsWrong] = useState(Array(requestData?.size?.length).fill(false));

  const handleChange = (e, index) => {
    const { name } = e.target;
    const file = e.target.files[0];
    console.log(file);
    console.log(filetype);

    if (file?.type === filetype) {
      // const video = document.createElement('video');
      // video.onloadedmetadata = () => {
      //   const aspectRatio = (video.videoWidth / video.videoHeight);
      //   console.log(aspectRatio);

      //   const sizeRatios = requestData?.size?.map(item => item.replace(/:/g, '/'));
      //   const convertedArray = sizeRatios.map(item => {
      //     const [numerator, denominator] = item.split('/').map(Number);
      //     return numerator / denominator;
      //   });
      //   const checkratio = convertedArray.includes(aspectRatio);
      //   if (!checkratio) {
      //     setFileErrors((prevErrors) => ({
      //       ...prevErrors,
      //       [name]: 'Please upload videos with aspect ratios of 16:9, 9:16, 1:1, or 4:5.',
      //     }));
      //     console.log("invalid file");
      //   } else {
      //     setDeliverdata((prevdata) => ({
      //       ...prevdata,
      //       [name]: file,
      //     }));
      //     setFileErrors((prevErrors) => ({
      //       ...prevErrors,
      //       [name]: '',
      //     }));
      //     setIsWrong(prev => {
      //       const newstate = [...prev];
      //       newstate[index] = false;
      //       return newstate;
      //     });
      //   }
      // };
      // video.src = URL.createObjectURL(file);
      setDeliverdata((prevdata) => ({
        ...prevdata,
        [name]: file,
      }));
      setFileErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
      setIsWrong(prev => {
        const newstate = [...prev];
        newstate[index] = false;
        return newstate;
      });
    } else {
      // toast.error("Invalid File Type");
      setIsWrong(prev => {
        const newstate = [...prev];
        newstate[index] = true;
        return newstate;
      });
      setDeliverdata((prevdata) => ({
        ...prevdata,
        [name]: null,
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
        <div className="row align-items-center mb-3">
          {requestData?.size?.map((item, index) =>
            <div className="col-md-3 d-flex flex-column" key={index}>
              <h5 className="text-center mb-2">
                <span className={item === '16:9' ?
                  'uplaod-dimension sixteen-nine border border-dark d-inline-block' :
                  item === '9:16' ?
                    'uplaod-dimension border border-dark d-inline-block'
                    : item === '4:5' ?
                      'uplaod-dimension four-five border border-dark d-inline-block'
                      : item === '1:1' ?
                        'uplaod-dimension one-one border border-dark d-inline-block'
                        : 'uplaod-dimension sixteen-nine custom-size border border-dark d-inline-block'}>
                </span>
                <span className="ps-2"> Upload {item} .{requestData?.file_type.toLowerCase()}</span>
              </h5>
              <div className="upload-nine-mp4">
                <div className="d-flex align-items-center justify-content-center">
                  <label class={`${isWrong[index] ? 'bg-red w-100 text-center' : !deliverdata[`firstfile${index}`] ? 'uploadFile' : 'bg-green w-100 text-center'} uploadFile d-flex align-items-center justify-content-center`}>
                    {
                      isWrong[index] ?
                        <span className="after-uploaded">
                          <span className="d-block h6 text-black fw-bold mb-1">WRONG FILE</span>
                          <span class="filename"> <i className="fa-solid fa-xmark cancel"></i></span>
                        </span>
                        :
                        !deliverdata[`firstfile${index}`] ?
                          <span class="filename">
                            <i className="fa fa-plus"></i>
                          </span>
                          : <span className="after-uploaded">
                            <span className="d-block h6 text-black fw-bold mb-1">SUCCESFUL</span> <span class="filename"><i className="fa-solid fa-check"></i></span></span>
                    }

                    <input
                      name={`firstfile${index}`}
                      type="file"
                      className="inputfile form-control"
                      defaultValue={deliverdata[`firstfile${index}`]}
                      onChange={(e) => handleChange(e, index)} />
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
            <h5 className="text-left mb-2">
              .zip and upload your .AEP
            </h5>
            <div className="upload-zip-file">
              <div className="d-flex align-items-center justify-content-center">
                <label className={`uploadFile${zipfilepreview && 'upload-zip-successfully'} uploadFile d-flex align-items-center justify-content-center`}>
                  {!zipfilepreview ? <span className="filename"><i className="fa fa-plus"></i> </span> : <span className="filename"><i className="fa-solid fa-check"></i></span>}
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

