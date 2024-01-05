import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { newRequest } from "../reduxdata/rootAction";

const NewRequest = ({ brands,user }) => {
  const dispatch = useDispatch();
  const usertoken = user.token;

  const [formData, setFormData] = useState({
    requestName: "",
    brandProfile: "",
    requestype: "",
    description: "",
    fileType: "",
    size: "",
    customsize: "",
    customsizes: [],
    references: "",
    transparency: "",
    uploadFiles: "",
  });

  const [errors, setErrors] = useState({
    requestName: '',
    brandProfile: '',
    description: '',
    fileType: '',
    size: '',
    references: '',
    transparency: '',
    uploadFiles: '',
  });

  const selectrequest = [
    'logo',
    'short ad',
    'web animation',
    'icon',
    'typography',
    'brand element',
    'intro',
    'outro',
    'transition',
    'UI animation',
    'loop',
    'custom'
  ];
  const colors = ['Violet', 'green', 'pink', 'red', 'orange', 'blue', 'brown', 'cyan', 'red', 'teal', 'orange', 'black'];

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [clickedIndex, setClickedIndex] = useState(null);
  const handleHover = (index) => {
    setHoveredIndex(index);
  };
  const handleLeave = () => {
    setHoveredIndex(null);
  };

  const handleClick = (index) => {
    setClickedIndex(index);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    switch (name) {
      case 'requestName':
        if (value === '') {
          setErrors({ ...errors, requestName: 'Request Name is Required' })
        } else {
          setErrors({ ...errors, requestName: '' });
        }
        setFormData({
          ...formData,
          requestName: value,
        });
        break;

      case 'description':
        if (value === '') {
          setErrors({ ...errors, description: 'Description is Required' })
        } else {
          setErrors({ ...errors, description: '' });
        }
        setFormData({
          ...formData,
          description: value,
        })
        break;

      case 'references':
        if (value === '') {
          setErrors({ ...errors, references: 'Reference is Required' })
        } else {
          setErrors({ ...errors, references: '' });
        }
        setFormData({
          ...formData,
          references: value
        })
        break;

      case 'size':
        if (value === '') {
          setErrors({ ...errors, size: 'Please Select your size' });
        } else {
          setErrors({ ...errors, size: '' });
        }
        setFormData({
          ...formData,
          size: value
        })
        break;

      case 'brandProfile':
        if (value === '') {
          setErrors({ ...errors, brandProfile: 'BrandProfile is Required' })
        } else {
          setErrors({ ...errors, brandProfile: '' });
        }
        setFormData({
          ...formData,
          brandProfile: value,
        });
        break;

      case 'transparency':
        if (value === '') {
          setErrors({ ...errors, transparency: 'transparency is Required' })
        } else {
          setErrors({ ...errors, transparency: '' });
        }
        setFormData({
          ...formData,
          transparency: value,
        });
        break;

      case 'fileType':
        if (value === '') {
          setErrors({ ...errors, fileType: 'fileType is Required' })
        } else {
          setErrors({ ...errors, fileType: '' });
        }
        setFormData({
          ...formData,
          fileType: value,
        });
        break;

      case 'uploadFiles':
        const allowedFileTypes = ['image/png', 'image/jpeg', 'image/jpg', 'video/mp4', 'image/gif'];
        const Fileupload = files[0];
        if (!Fileupload) {
          setErrors({ ...errors, uploadFiles: 'Upload your file' })
        } else if (!allowedFileTypes.includes(Fileupload.type)) {
          setErrors({ ...errors, uploadFiles: 'Invalid file type. Please upload PNG, JPEG, JPG, MP4, or GIF files.' });
        } else {
          setErrors({ ...errors, uploadFiles: '' });
        }
        setFormData({
          ...formData,
          uploadFiles: Fileupload,
        });
        break;

      default:
        setFormData({
          ...formData,
          [name]: value,
        });
        break;
    }
  };

  const handleCustomSizeChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddCustomSize = () => {
    const { customsize, customsizes } = formData;
    if (customsize.trim() !== "" && !customsizes.includes(customsize)) {
      setFormData({
        ...formData,
        customsizes: [...customsizes, customsize],
        customsize: "",
      });
    }
  };

  const handlerequestType = (ele) => {
    const formatedEle = ele.toLowerCase().replace(/\s+/g,'_');
    console.log(formatedEle);
    setFormData({
      ...formData,
      requestype: formatedEle
    })
  }

  const handleSubmit = async (e,status) => {
    e.preventDefault();

    let valid = true;

    const fieldsToValidate = [
      { name: 'requestName', validation: (value) => !value ? 'Request Name is Required' : '' },
      { name: 'brandProfile', validation: (value) => !value ? 'Brand Profile is Required' : '' },
      { name: 'description', validation: (value) => !value ? 'Description is Required' : '' },
      { name: 'fileType', validation: (value) => !value ? 'Please Select your filetype' : '' },
      { name: 'size', validation: (value) => !value ? 'Please Select your size' : '' },
      { name: 'references', validation: (value) => !value ? 'Reference is Required' : '' },
      { name: 'uploadFiles', validation: (value) => !value ? 'Upload your file' : '' },
      { name: 'transparency', validation: (value) => !value ? 'Transparency is Required' : '' },
    ];
    
    fieldsToValidate.forEach(({ name, validation }) => {
      const value = formData[name];
      const error = validation(value);
      setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    
      if (error) {
        valid = false;
      }
    });

    if (valid && (Object.values(errors).every((error) => !error))) {

      let newrequest = {
        requestName:formData.requestName,
        brandProfile: formData.brandProfile,
        description: formData.description,
        requestype: formData.requestype,
        fileType: formData.fileType,
        size: formData.size,
        references: formData.references,
        transparency: formData.transparency,
        uploadFiles: formData.uploadFiles,
        status: status
      };
      await newRequest(newrequest, dispatch, usertoken);
      setFormData({  requestName: "", brandProfile: "", requestype: "", description: "", fileType: "", size: "", customsize: "", customsizes: [], references: "", transparency: "", uploadFiles: "" });
      setErrors({ requestName: "", brandProfile: "", description: "", fileType: "", size: "", references: "", transparency: "", uploadFiles: "",
      });
    }
  };

  return (
    <>
      <div className="ml-md-auto pt-4 ms-md-auto rightside-wrapper">
        <div className="main-content-wraaper px-60 py-md-2 py-lg-5">
          <div className="review-main-content text-center mb-4">
            <h3>New Request</h3>
            <p className="text-secondary">Sunday 16 Dec, 2023<span className="d-block">Barcelona, 21:43</span>  </p>
          </div>
          <div className="mt-5 new-request-form">
            <form>
              <div className="row">
                <div className="col-md-7">
                  <div className="row">
                    <div className="col-md-5">
                      <div className="form-group">
                        <label className="ms-3 mb-1">Request Name</label>
                        <input type="text" name="requestName" value={formData.requestName} className="form-control" onChange={handleInputChange} />
                        {errors.requestName && <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">{errors.requestName}</p>}
                      </div>
                    </div>
                    <div className="col-md-7">
                      <div className="form-group">
                        <label className="ms-3 mb-1">Brand Profile</label>
                        <select type="select" name="brandProfile" value={formData.brandProfile} onChange={handleInputChange} className="form-control">
                          <option value=""></option>
                          {brands.map((brand) => (
                            <option key={brand._id} value={brand?._id}>{brand?.brandname}</option>
                          ))}
                        </select>
                        {errors.brandProfile && <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">{errors.brandProfile}</p>}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="ms-3 mb-1">Description</label>
                        <textarea name="description" className="form-control w-100" placeholder="
                                            Describe the Brief for this piece. Include as much info as possible.
                                            Tone and Style
                                            Target Audience
                                            Goal of the Piece
                                            Display Platform
                                            Duration" onChange={handleInputChange}  ></textarea>
                        {errors.description && <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">{errors.description}</p>}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-5 review-content">
                  <div className="mb-4">
                    <label className="ms-3 mb-1">Request Type</label>
                    <div className="form-control py-3">
                      <div className="row request-type">
                        {selectrequest.map((ele, index) => (
                          <div key={index} className="col-xl-3 col-md-4 col-sm-6 col-12 request-list mb-2"
                            onMouseEnter={() => handleHover(index)}
                            onMouseLeave={handleLeave}
                            onClick={() => handleClick(index)}
                          >
                            <p className="short0ad logo" onClick={() => handlerequestType(ele)}
                              style={{
                                backgroundColor: clickedIndex === index ? colors[index] : hoveredIndex === index ? colors[index] : 'transparent',
                                color: clickedIndex === index ? 'white' : hoveredIndex === index ? 'white' : colors[index],
                                border: `2px solid ${colors[index]}`
                              }}>
                              {ele}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="ms-3 mb-1">File Type</label>
                          <select name="fileType" type="select" className="form-control" onChange={handleInputChange} value={formData.fileType}>
                            <option value=""></option>
                            <option value="Mp4">Mp4</option>
                            <option value="Mov">Mov</option>
                            <option value="gif">gif</option>
                          </select>
                          {errors.fileType && <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">{errors.fileType}</p>}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="ms-3 mb-1">(Size Up to 2)</label>
                          <select name="size" value={formData.size} type="select" className="form-control" onChange={handleInputChange}>
                            <option value=""></option>
                            <option value="16:9">16:9</option>
                            <option value="9:6">9:6</option>
                            <option value="1:1">1:1</option>
                            <option value="4:5">4:5</option>
                            {formData.customsizes.map((customSize, index) => (
                              <option key={index} value={customSize}>
                                {customSize}
                              </option>
                            ))}
                            <option value="Custom">Custom</option>
                          </select>
                          {(formData.size === 'Custom') && <>
                            <input
                              type="text"
                              name="customsize"
                              className="form-control mt-2"
                              placeholder="Enter Custom Size"
                              onChange={handleCustomSizeChange}
                              value={formData.customsize}
                            />
                            <button
                              type="button"
                              className="btn btn-primary mt-2"
                              onClick={handleAddCustomSize}
                            >
                              Add Custom Size
                            </button>
                          </>}
                          {errors.size && <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">{errors.size}</p>}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="ms-3 mb-1">Refernces</label>
                          <input type="text" name="references" value={formData.references} className="form-control" onChange={handleInputChange} />
                          {errors.references && <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">{errors.references}</p>}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="ms-3 mb-1">Transparency</label>
                          <select name="transparency" type="select" className="form-control" onChange={handleInputChange} value={formData.transparency}>
                            <option value=""></option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                            <option value="Does not apply">Does not apply</option>
                          </select>
                          {errors.transparency && <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">{errors.transparency}</p>}
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
                <div className="col-md-12 review-content">
                  <label className="ms-3 mb-1">Upload Files</label>
                  <input name="uploadFiles" type="file" className="form-control" onChange={handleInputChange} />
                  {errors.uploadFiles && <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">{errors.uploadFiles}</p>}
                  <p className="mt-3">You have created <b>5 pieces </b>this month. <br />You can create 4 more pieces. Subscription renews on Nov 17</p>

                </div>
                <div className="col-md-12 mt-5 pt-5 text-center status-btn ">
                  <button type="submit" className="btn border rounded-pill pause-btn w-25 py-2" onClick={(e) => handleSubmit(e,'active')}>Submit</button>
                </div>
                <Link to="/request-status" className="new-request rounded-pill px-4 py-2 fw-bold text-decoration-none text-dark">New Request</Link>
              </div>
            </form>
          </div>

        </div>
        <div className="bg-gray-dark py-5">
          <div className="d-flex justify-content-center align-items-center">
            <p className="text-dark"><b>Not ready yet? </b><span className="d-block">Draft it and finish later</span></p>
            <button type="btn" className="py-1 px-4  border bg-white ms-3 rounded-pill" onClick={(e) => handleSubmit(e,'draft')}> Save as a <span className="fw-bold">Draft</span></button>              </div>

        </div>

      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    brands: state.brand.brands,
    user: state.auth.user,
  };
};
export default connect(mapStateToProps)(NewRequest);
