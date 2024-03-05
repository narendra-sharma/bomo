import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { change_add_edit, get_edit_request_data, image_delete, newRequest, new_image_upload } from "../reduxdata/rootAction";
import { format } from "date-fns";
import { getbrandlist } from "../reduxdata/rootAction";
import plusImage from '../images/plus-img.png';
import SubmitRequest from "../Modals/SubmitRequest";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Select } from "@mui/material";
const { REACT_APP_BOMO_URL } = process.env;
const LOGO_URL = REACT_APP_BOMO_URL;

const NewRequest = ({ brands, user, requestTypes, requestData, isAddEdit, imagePath }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const now = new Date();
  const currentTime = format(now, 'HH:mm');
  const usertoken = user.token;
  const fileInputRef = useRef(null);
  const fileTypes = ['Mp4', 'Mov', 'gif'];
  const sizesupTo = [
    { label: '16:9', value: '16:9' },
    { label: '9:6', value: '9:6' },
    { label: '1:1', value: '1:1' },
    { label: '4:5', value: '4:5' },
    { label: 'custom', value: 'custom' }
  ];
  const sizeUpTo = ['16:9', '9:6', '1:1', '4:5'];
  const transparencies = ['Yes', 'No'];
  const [images, setImages] = useState([]);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [files, setFiles] = useState([]);

  const [formData, setFormData] = useState({
    requestName: '',
    brandProfile: '',
    requestype: '',
    description: '',
    fileType: '',
    size: [],
    customsize: "",
    customsizes: [],
    references: '',
    transparency: '',
    uploadFiles: '',
    imageFile: '',
  });

  const [errors, setErrors] = useState({
    requestName: '',
    brandProfile: '',
    requestype: '',
    description: '',
    fileType: '',
    size: '',
    references: '',
    transparency: '',
    uploadFiles: '',
    customerror: ''
  });
  const [ispop, setIspop] = useState(false);
  const [newdata, setNewData] = useState(null);
  const [selectedRequestType, setSelectedRequestType] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [clickedIndex, setClickedIndex] = useState(null);
  const handleHover = (index) => {
    setHoveredIndex(index);
  };
  const handleLeave = () => {
    setHoveredIndex(null);
  };

  const handleInputChange = async (e) => {
    const { name, value, files } = e.target;

    switch (name) {
      case 'requestName':
        setErrors({ ...errors, requestName: value === '' ? 'Request Name is Required' : null });
        setFormData({ ...formData, requestName: value, });
        break;

      case 'description':
        setErrors({ ...errors, description: value === '' ? 'Description is Required' : null });
        setFormData({ ...formData, description: value, })
        break;

      case 'references':
        setErrors({ ...errors, references: value === '' ? 'Reference is Required' : null });
        setFormData({ ...formData, references: value })
        break;

      case 'size':
        setErrors({ ...errors, size: value?.length === 0 ? 'Please Select your size' : null });
        setFormData({ ...formData, size: value });
        break;

      case 'brandProfile':
        setErrors({ ...errors, brandProfile: value === '' ? 'BrandProfile is Required' : null });
        setFormData({ ...formData, brandProfile: value, });
        break;

      case 'transparency':
        setErrors({ ...errors, transparency: value === '' ? 'transparency is Required' : null });
        setFormData({ ...formData, transparency: value, });
        break;

      case 'fileType':
        setErrors({ ...errors, fileType: value === '' ? 'fileType is Required' : null });
        setFormData({ ...formData, fileType: value, });
        break;

      case 'uploadFiles':
        const UploadImage = files[0];
        const Fileupload = [UploadImage];
        const uploadedFiles = [...Fileupload];
        if (!Fileupload) {
          setErrors({ ...errors, uploadFiles: 'Upload your file' })
        } else if (Fileupload) {
          fileInputRef.current.click();
          const newpath = await new_image_upload(dispatch, UploadImage);
          setUploadFiles(prevfile => [...prevfile, newpath]);
          setFormData({
            ...formData, uploadFiles: uploadFiles,
          });
          setImages(prevImages => [
            ...prevImages,
            {
              preview: URL.createObjectURL(UploadImage),
              apipath: newpath
            }
          ]);
          setErrors({ ...errors, uploadFiles: '' });
        }
        break;

      default:
        setFormData({ ...formData, [name]: value, });
        setErrors({ ...errors, [name]: '' });
        break;
    }
  };

  const handleSizes = (selectedOptions) => {
    const maximumselection = 2;
    if (selectedOptions?.length === 0) {
      setErrors({ ...errors, size: 'Please Select your size' });
      return;
    }

    if (selectedOptions?.length > maximumselection) {
      return;
    }

    setFormData({
      ...formData,
      size: selectedOptions,
    });
    setErrors({ ...errors, size: '' });
  };

  const handleCustomSizeChange = (e) => {
    const { name, value } = e.target;
    const ratioRegex = /^\d+:\d*$/;
    if (!ratioRegex.test(value)) {
      setErrors({ ...errors, customerror: 'Please enter a valid size ratio' });
    } else {
      setErrors({ ...errors, customerror: null });
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddCustomSize = () => {
    const { customsize, customsizes } = formData;
    const ratioRegex = /^\d+:\d*$/;
    if (customsize.trim() !== "" && (!customsizes.includes(customsize) && !sizeUpTo.includes(customsize)) && ratioRegex.test(customsize)) {
      setFormData({
        ...formData,
        customsizes: [...customsizes, customsize],
        customsize: "",
      });
    }
  };

  const handlerequestType = (ele, index) => {
    if (ele === '') {
      setErrors({ ...errors, requestype: 'Select your Request Type' })
    } else {
      setErrors({ ...errors, requestype: '' });
    }
    const isSelectedType = requestData?.request_type === ele;
    setFormData((prevFormData) => ({
      ...prevFormData,
      requestype: isSelectedType ? requestData?.request_type : ele,
    }));
    setSelectedRequestType(ele);
    setClickedIndex(index);
  };

  const validateForm = () => {
    let valid = true;

    const fieldsToValidate = [
      { name: 'requestName', validation: (value) => value === '' ? 'Request Name is Required' : '' },
      { name: 'brandProfile', validation: (value) => value === '' ? 'Brand Profile is Required' : '' },
      { name: 'requestype', validation: (value) => value === '' ? 'Select your Request Type' : '' },
      { name: 'description', validation: (value) => value === '' ? 'Description is Required' : '' },
      { name: 'fileType', validation: (value) => value === '' ? 'Select your filetype' : '' },
      { name: 'size', validation: (value) => value?.length === 0 ? 'Select your size' : '' },
      { name: 'references', validation: (value) => value === '' ? 'Reference is Required' : '' },
      { name: 'uploadFiles', validation: (value) => value === '' ? 'Upload your file' : '' },
      { name: 'transparency', validation: (value) => value === '' ? 'Transparency is Required' : '' },
    ];

    fieldsToValidate.forEach(({ name, validation }) => {
      const value = name === 'size' ? formData.size : formData[name];
      const error = validation(value);
      if (error) {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
        valid = false;
      }
    });

    return valid;
  };

  const handleSubmit = async (e, status) => {
    e.preventDefault();

    let newrequest = {
      requestName: formData.requestName,
      description: formData.description,
      brandProfile: formData.brandProfile,
      requestype: formData.requestype,
      fileType: formData.fileType,
      size: formData.size.map(s => s.value),
      references: formData.references,
      transparency: formData.transparency,
      status: status
    };

    if (requestData) {
      newrequest.request_id = requestData?._id;
      newrequest.uploadFiles = [...uploadFiles, ...files];
    } else if (!requestData) {
      newrequest.uploadFiles = [...uploadFiles];
    }

    if (status === 'pending') {
      const isValid = validateForm();

      if (isValid && newrequest?.uploadFiles?.length >= 3) {
        setIspop(true);
        setNewData(newrequest);
      } else if ((isValid) && !(newrequest?.uploadFiles?.length >= 3)) {
        toast.error('Please Upload Atleast 3 files');
      }
    } else if (status === 'draft') {
      if (formData.requestName === '') {
        toast.error('Atleast specify your Request Name!')
      } else if (formData.requestName !== '') {
        await newRequest(newrequest, dispatch, usertoken, navigate);
      }
    }
  };

  useEffect(() => {
    if (requestData) {
      setImages(requestData?.file?.map((path) => {
        return {
          preview: LOGO_URL + path,
          apipath: path
        }
      }));
      setFiles(requestData?.file?.map(path => path));
      setClickedIndex(requestTypes.findIndex(r => r.value === requestData?.request_type));

      setFormData(prev => {
        return ({
          ...prev,
          requestName: requestData?.request_name || '',
          brandProfile: requestData?.brand_profile?._id || '',
          requestype: requestData?.request_type || '',
          description: requestData?.description || '',
          fileType: requestData?.file_type || '',
          size: requestData?.size.map((val) => {
            const matchingSize = sizesupTo.find((size) => size.value === val);
            return matchingSize || { label: val, value: val };
          }),
          customsize: "",
          customsizes: [],
          references: requestData?.references || '',
          transparency: requestData?.transparency || '',
          uploadFiles: requestData?.file?.length > 0 ? requestData?.file : '',
          imageFile: requestData?.file
        })
      })
    }
  }, [requestData]);

  useEffect(() => {
    getbrandlist(dispatch, usertoken);
    return () => {
      dispatch(get_edit_request_data(null));
    }
  }, []);

  useEffect(() => {
    if (isAddEdit) {
      setFormData((prevFormData) => ({ ...prevFormData, brandProfile: "", requestype: "", description: "", fileType: "", size: "", customsize: "", customsizes: [], references: "", transparency: "", uploadFiles: "", imageFile: "" }));
      setErrors({ requestName: null, brandProfile: null, description: null, fileType: null, size: null, references: null, transparency: null, uploadFiles: null, customerror: null });
      setClickedIndex(null);
      change_add_edit(dispatch);
    }
  }, [isAddEdit]);

  const getNextBillingDate = () => {
    let date;
    if (user && user?.next_billing_date) {
      const nextBillingDate = new Date(user?.next_billing_date);
      date = nextBillingDate;
    }
    return format(new Date(date), 'MMM dd');
  }

  const handleDelete = async (imgpath, requestId, index) => {
    if (requestData) {
      await image_delete(dispatch, imgpath, requestId);
      setFiles((prevImages) => {
        const newImages = [...prevImages];
        newImages.splice(index, 1);
        return newImages;
      });
      setImages((prevpath) => {
        const newPath = [...prevpath];
        newPath.splice(index, 1);
        return newPath;
      });
    } else if (!requestData) {
      setUploadFiles((prevImages) => {
        const newImages = [...prevImages];
        newImages.splice(index, 1);
        return newImages;
      });
      setImages((prevpath) => {
        const newPath = [...prevpath];
        newPath.splice(index, 1);
        return newPath;
      });
    }
  };

  return (
    <>
      <div className="ml-md-auto py-4 ms-md-auto rightside-wrapper">
        <div className="main-content-wraaper px-60 py-md-2 py-lg-5 new-request-section">
          <div className="review-main-content text-center mb-4 ">
            <h2>{requestData ? "Edit" : "New"} Request</h2>
            <p className="text-mute">{format(now, 'EEEE dd MMM, yyyy')}<span className="d-block">{user?.address?.city}, {currentTime}</span>  </p>
          </div>
          <div className="mt-5 new-request-form">
            <form>
              <div className="row">
                <div className="col-lg-7 col-md-12">
                  <div className="row">
                    <div className="col-md-5">
                      <div className="form-group">
                        <label htmlFor="Request Name" className="ms-3 mb-2">Request Name <span className="text-danger">*</span></label>
                        <input type="text" name="requestName" className="form-control" defaultValue={formData?.requestName} onChange={handleInputChange} />
                        {errors.requestName && <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">{errors.requestName}</p>}
                      </div>
                    </div>
                    <div className="col-md-7">
                      <div className="form-group">
                        <label htmlFor="Brand Profile" className="ms-3 mb-2">Brand Profile<span className="text-danger">*</span></label>
                        <select type="select" name="brandProfile" className="form-control" value={formData?.brandProfile} onChange={handleInputChange} >
                          <option value="" disabled>Select</option>
                          {brands.map((brand) => (<option key={brand._id} value={brand?._id} >{brand?.brandname}</option>))}
                        </select>
                        {errors.brandProfile && <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">{errors.brandProfile}</p>}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="Description" className="ms-3 mb-2">Description<span className="text-danger">*</span></label>
                        <textarea name="description" className="form-control w-100" placeholder="Describe the brief for this piece. Include as much info as possible. Tone and Style, Target Audience, Goal of the Piece, Display Platform, Duration." defaultValue={formData?.description} onChange={handleInputChange} ></textarea>
                        {errors.description && <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">{errors.description}</p>}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-5 col-md-12 review-content">
                  <div className="mb-4">
                    <label htmlFor="Request Type" className="ms-3 mb-2">Request Type<span className="text-danger">*</span></label>
                    <div className="bg-white border-dark rounded border py-3">
                      <div className="request-type">
                        {requestTypes.map((ele, index) => (
                          <div key={index} className="request-list"
                            onMouseEnter={() => handleHover(index)}
                            onMouseLeave={handleLeave}
                          >
                            <p className="short0ad logo" onClick={() => handlerequestType(ele.value, index)}
                              style={{
                                backgroundColor: selectedRequestType === ele.type && !clickedIndex ? ele.color : clickedIndex === index ? ele.color : hoveredIndex === index ? ele.color : 'transparent',
                                color: clickedIndex === index || hoveredIndex === index ? 'white' : ele.color,
                                border: `1px solid ${ele.color}`
                              }}>
                              {ele.type}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    {errors.requestype && <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">{errors.requestype}</p>}
                  </div>
                  <div className="">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="File Type" className="ms-3 mb-2">File Type<span className="text-danger">*</span></label>
                          <select name="fileType" type="select" className="form-control" value={formData?.fileType} onChange={handleInputChange} >
                            <option value="" disabled>Select</option>
                            {fileTypes.map((option, index) => (<option key={index} value={option}>{option}</option>))}
                          </select>
                          {errors.fileType && <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">{errors.fileType}</p>}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="Size Up to 2" className="ms-3 mb-2">(Size Up to 2)<span className="text-danger">*</span></label>
                          <Select
                            name="size"
                            isMulti={true}
                            options={sizesupTo}
                            value={formData?.size}
                            onChange={(selected) => handleSizes(selected)}
                            placeholder="Select size"
                            isClearable={false} />

                          {(formData.size === 'Custom') && <>
                            <input type="text" name="customsize" className="form-control mt-2" placeholder="Enter Custom Size" value={formData.customsize} onChange={handleCustomSizeChange} />
                            <button type="button" className="btn btn-primary mt-2" onClick={handleAddCustomSize}>Add Custom Size</button>
                            {errors.customerror && <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">{errors.customerror}</p>}
                          </>}
                          {errors.size && <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">{errors.size}</p>}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="References" className="ms-3 mb-2">References<span className="text-danger">*</span></label>
                          <input type="text" name="references" className="form-control" defaultValue={formData?.references} onChange={handleInputChange} />
                          {errors.references && <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">{errors.references}</p>}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="Transparency" className="ms-3 mb-2">Transparency<span className="text-danger">*</span></label>
                          <select name="transparency" type="select" className="form-control" value={formData?.transparency} onChange={handleInputChange} >
                            <option value="" disabled>Select</option>
                            {transparencies.map((option, index) => (<option key={index} value={option}>{option}</option>))}
                          </select>
                          {errors.transparency && <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">{errors.transparency}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 review-content">
                  <label htmlFor="Upload Files" className="ms-3 mb-2">Upload Files<span className="text-danger">*</span></label>
                  <div className="d-flex flex-wrap align-items-center justify-content-start mb-4">
                    {images.map((image, index) => (
                      <div key={index} className="d-flex align-item-center justify-content-center position-relative me-3 mb-3">
                        {/* <img src={`${image?.preview}`} alt="img"  height="300" /> */}
                        <span className="d-block brand-assets">{image?.apipath}</span>
                        <button
                          type="button"
                          className="btn btn-sm rounded-pill upload-file-close position-absolute"
                          onClick={() => handleDelete(image?.apipath, requestData?._id, index)}>
                          <i class="fa-solid fa-xmark color-white"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                  <label class="uploadFile">
                    <span class="filename"><img src={plusImage} alt="" /></span>
                    <input name="uploadFiles" type="file" className="inputfile form-control" ref={fileInputRef} onChange={handleInputChange} multiple />
                  </label>
                  {errors.uploadFiles && <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">{errors.uploadFiles}</p>}
                  <p className="mt-3">You have created <b>{user?.subscription?.quantity - user?.quantity} pieces </b>this month. You can create {user?.quantity} more pieces.<br /> Subscription renews on {getNextBillingDate()}</p>

                </div>
                <div className="col-md-12 mt-2 mt-md-4 pt-3 pt-md-5 text-center status-btn ">
                  <button type="submit" className="btn border rounded-pill pause-btn w-25 py-2" onClick={(e) => handleSubmit(e, 'pending')}>Submit</button>
                </div>
              </div>
            </form>
          </div>

        </div>
      </div>
      <div className="ml-md-auto ms-md-auto rightside-wrapper">
        <div className="bg-gray-dark py-5">
          <div className="d-flex justify-content-center align-items-center">
            <p className="text-dark"><b>Not ready yet? </b><span className="d-block">Draft it and finish later</span></p>
            <button type="btn" className="py-1 px-4 border feedback-request ms-3 rounded-pill" onClick={(e) => handleSubmit(e, 'draft')}> Save as a <span className="fw-bold">Draft</span></button> </div>

        </div>
      </div>
      <SubmitRequest show={ispop} handleClose={() => setIspop(false)} data={newdata} userdetail={user} />
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    brands: state.brand.brands,
    user: state.auth.user,
    requestTypes: state.requests.requestTypes,
    requestData: state.requests.editrequestData,
    isAddEdit: state.brand.isAddEdit,
    imagePath: state.requests.imagePath
  };
};
export default connect(mapStateToProps)(NewRequest);
