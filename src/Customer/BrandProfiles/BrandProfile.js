import React, { useEffect, useState, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addBrand, deleteBrand, getbrandlist, uploadZip } from "../../reduxdata/rootAction";
import ManageBrand from "./ManageBrand";
import CustomPagination from "../../Common/CustomPagination";
import DeleteBrand from "../../Modals/Delete";
import { format } from "date-fns";
import NewRequestShared from "../Sahred/NewRequestShared";
import TagsInput from "react-tagsinput";

const { REACT_APP_BOMO_URL } = process.env;
const LOGO_URL = REACT_APP_BOMO_URL;

const BrandProfile = ({ brands, total, user, zipfile_path }) => {
  const dispatch = useDispatch();
  const usertoken = user.token;
  const [handleshow, setHandleshow] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [zipPreview, setZipPreview] = useState('');
  const fileinputRef = useRef();
  const zipfileinputRef = useRef();
  const newBrand = {
    id: '',
    logo: '',
    brandname: '',
    brandassests: '',
    tags: [],
  };
  const [edit, setEdit] = useState(newBrand);
  const [isEdit, setIsEdit] = useState(false);

  const handleShowEditBrand = (brand) => {
    setEdit({
      id: brand._id,
      logo: brand.logo,
      brandname: brand.brandname,
      brandassests: brand.brandassests,
      tags: brand.tags,
    });
    setIsEdit(true);
  };
  useEffect(() => {
    getbrandlist(dispatch, usertoken);
  }, [dispatch, usertoken]);

  const [show, setShow] = useState(false);
  const [brandid, setBrandid] = useState(null);
  const handleDeleteBrand = (brand) => {
    setBrandid(brand?._id);
    setEdit(brand);
    setShow(true);
  };
  const handleDeleteConfirm = () => {
    deleteBrand(brandid, dispatch, usertoken);
    setEdit(newBrand);
    setShow(false);
  };
  const closeBrand = () => {
    setHandleshow(false);
    setIsEdit(false);
    setEdit(newBrand);
  };

  // edit brand part
  const [formdata, setFormdata] = useState({
    logo: '',
    brandname: '',
    brandassests: '',
    tags: '',
  });
  const [errors, setErrors] = useState({
    logo: '',
    brandname: '',
    brandassests: '',
    tags: '',
  });
  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    switch (name) {
      case 'logo':
        const allowedFileTypes = ['image/png', 'image/jpeg', 'image/jpg', 'video/mp4', 'image/gif'];
        const logoFile = files[0];
        if (!logoFile) {
          setErrors({ ...errors, logo: 'Upload Logo' });
        } else if (!allowedFileTypes.includes(logoFile.type)) {
          setErrors({ ...errors, logo: 'Invalid file type. Please upload PNG, JPEG, JPG, MP4, or GIF files.' });
        } else {
          setErrors({ ...errors, logo: '' });
          setFormdata({
            ...formdata,
            logo: logoFile,
          });
          setImagePreview(URL.createObjectURL(logoFile));
        }
        break;

      case 'brandname':
        if (value === '') {
          setErrors({ ...errors, brandname: 'Brand Name is required' });
        } else {
          setErrors({ ...errors, brandname: '' });
        }
        setFormdata({
          ...formdata,
          brandname: value,
        });
        break;

      case 'brandassests':
        const brandAssetsFile = files[0];
        if (brandAssetsFile === undefined) {
          setErrors({ ...errors, brandassests: 'Upload your zip file' });
        } else if (brandAssetsFile.type !== 'application/zip') {
          setErrors({ ...errors, brandassests: 'Please upload a valid zip file' });
        } else {
          const uploadedZipPath = await uploadZip(brandAssetsFile, dispatch);

          setFormdata({
            ...formdata,
            brandassests: uploadedZipPath,
          });
          setZipPreview(uploadedZipPath);
          setErrors({ ...errors, brandassests: '' });
        }
        break;

      default:
        break;
    }
  };
  const handleImageUpload = (e) => {
    e.preventDefault();
    fileinputRef.current.click();
  };
  const handleUploadZipFileClick = (e) => {
    e.preventDefault();
    zipfileinputRef.current.click();
  };
  const handleTagsChange = (tags) => {
    if (tags.length === 0) {
      setErrors({ ...errors, tags: 'Tags are required' });
    } else if (tags.length > 5) {
      setErrors({ ...errors, tags: 'You can add up to 5 tags' });
      setTimeout(() => {
        setErrors({ ...errors, tags: '' });
      }, 3000)
    } else {
      setErrors({ ...errors, tags: '' });
    }
    setFormdata({
      ...formdata,
      tags: tags.length > 5 ? tags.slice(0, 5) : tags,
    });
  };
  const handleExit = () => {
    setFormdata({ logo: '', brandname: '', brandassests: '', tags: '', });
    setErrors({ logo: null, brandname: null, brandassests: null, tags: null, });
    setImagePreview('');
    setZipPreview('');
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const updatedata = {
      brand_id: edit?.id,
      logo: formdata?.logo,
      brandname: formdata?.brandname,
      zipFile: formdata?.brandassests,
      tags: formdata.tags,
    };
    addBrand(updatedata, dispatch, usertoken);
    setIsEdit(false);
  };

  useEffect(() => {
    if (edit) {
      setFormdata({
        logo: edit?.logo,
        brandname: edit?.brandname,
        brandassests: edit?.brandassests,
        tags: edit?.tags,
      });
    }
  }, [edit]);

  return (
    <>
      <div className="ml-md-auto py-4 ms-md-auto rightside-wrapper">
        <div className="main-content-wraaper brand-profile-section px-60 py-md-2 py-lg-5">
          <div className="mx-md-3 mx-lg-5 mb-4">
            <NewRequestShared />
          </div>
          <div className="review-main-content mx-md-3 mx-lg-5 mb-4">
            <h3>Brand Profile</h3>
          </div>
          {(brands.length > 0) && brands.map((brand) => (
            <div key={brand?._id} className={`table-responsive brand-table rounded ${(isEdit && edit?.id === brand?._id) ? 'border border-dark bg-light-gray' : 'bg-white'}`}>
              <form onSubmit={(e) => handleEdit(e)}>
                <table className="table table-borderless mb-0">
                  <tbody>
                    <tr>
                      <td className="col-lg-1 col-12 mb-3 mb-md-0">
                        {(isEdit && edit?.id === brand?._id) ?
                          <div>
                            <input type="file" className="d-none" name="logo" accept="image/*" onChange={handleChange} ref={fileinputRef} />
                            <button className='add-btn border-0' onClick={handleImageUpload}>
                              {(imagePreview) ? (
                                <img src={imagePreview} alt="Preview" />
                              ) : (brand?._id && <img src={`${LOGO_URL}${brand?.logo}`} alt='img not found' />)}
                              {brand?._id ? <span className="d-none">Edit</span> : !imagePreview && ('+')}
                            </button>
                          </div> :
                          <img src={`${LOGO_URL}${brand?.logo}`} alt='img not found' />
                        }
                      </td>
                      <td className="col-lg-2 col-12 mb-3 mb-md-0">
                        <span className="fw-bold">Brand Name</span>
                        {(isEdit && edit?.id === brand?._id) ?
                          <div>
                            <input type="text" className="input-name form-control" name="brandname" placeholder="Name" value={formdata?.brandname} onChange={handleChange} />
                            {errors.brandname && <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">{errors.brandname}</p>}
                          </div>
                          : <span className="d-block">{brand?.brandname}</span>
                        }
                      </td>
                      <td className="col-lg-3 col-12 mb-3 mb-md-0 g-0">
                        <span className="fw-bold">Brand Assets</span>
                        {(isEdit && edit?.id === brand?._id) ?
                          <div>
                            <input type="file" className="d-none" name="brandassests" accept=".zip" onChange={handleChange} ref={zipfileinputRef} />
                            <button className='add-btn border-0' onClick={handleUploadZipFileClick}>
                              {(zipPreview) ? (
                                <span className="d-block brand-assets">{zipPreview?.split('/').pop()}</span>
                              ) : <span className="d-block brand-assets">{brand?.brandassests?.split('/').pop()}</span>}
                            </button>
                          </div> : <a href={`${REACT_APP_BOMO_URL}${brand?.brandassests}`} className="text-decoration-none"><span className="d-block brand-assets">{brand?.brandassests?.split('/').pop()}</span></a>
                        }
                      </td>
                      <td className="col-lg-4 col-12 mb-3 mb-md-0 g-0">
                       <div className="d-flex  brand-tags-section">
                         <div className="date-created"> 
                          <span className="fw-bold">Date Created</span> <span className="d-block">{format(new Date(brand?.createdAt), 'MM/dd/yyyy')}</span>
                          </div>
                          <div className="describing-tags"> <span className="fw-bold d-block">Tags</span>
                        {(isEdit && edit?.id === brand?._id) ?
                          <div>
                            <TagsInput className="input-name w-100" inputProps={{ placeholder: '5 tags describing your Brand (Hit enter)' }} value={formdata?.tags} onChange={handleTagsChange} />
                            {errors.tags && <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0" >{errors.tags}</p>}
                          </div>
                          :
                          <span className="d-block">{brand?.tags.join(', ')}</span>}</div>
                       </div>
                      </td>
                      <td className="col-lg-2 col-12 mb-3 mb-md-0 vertical-middle">
                        <div className="edit-buttons">
                          <span className="update-buttons">
                            {(isEdit && edit?.id === brand?._id) && <>
                              <button type="submit" className="create-add-btn brands-add-btn rounded-pill fw-bold">
                                Update
                              </button>
                              <button type="button" className=" brands-add-btn delete-btn rounded-pill fw-bold"  onClick={() => { handleDeleteBrand(brand) }}>Delete</button>
                            </>}
                          </span>
                          <span className="edit">

                            {(isEdit && edit?.id === brand?._id) ?
                              <Link className="text-dark text-decoration-none" onClick={() => { handleExit(); handleShowEditBrand(newBrand); }}>- exit edit</Link>
                              :
                              <Link className="text-dark text-decoration-none" onClick={() => { handleShowEditBrand(brand); setHandleshow(false); }}>+ edit</Link>
                            }
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </div>
          ))}
          {(total > 0) && <CustomPagination total={total} onPageChange={(page, perPage) => getbrandlist(dispatch, usertoken, page, perPage)} />}
          {
            !handleshow ?
              <><div className="add-new-brand"><button className="add-btn" onClick={() => { setHandleshow(true); setEdit(newBrand); }}>+</button> <span className="ms-4 ps-2"><span className="fw-bold">Add</span> New Brand</span></div></>
              : <>
                <ManageBrand checkedit={isEdit} brand={edit} close={() => closeBrand()} />
              </>
          }
          {/* {isEdit && <EditBrand show={isEdit} handleClose={() => closeBrand()} brand={edit} />} */}
          <DeleteBrand heading='Brand Profile' name={edit.brandname} show={show} handleClose={() => setShow(false) && setEdit(newBrand)} DeleteBrand={() => handleDeleteConfirm()} />
        </div>
      </div>

    </>
  )
}

const mapStateToProps = (state) => {
  return {
    brands: state.brand.brands,
    total: state.brand.total,
    user: state.auth.user,
    zipfile_path: state.brand.zip_path,
  };
};
export default connect(mapStateToProps)(BrandProfile);