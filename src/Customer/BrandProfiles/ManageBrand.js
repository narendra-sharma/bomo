import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { addBrand, change_add_edit, uploadZip } from "../../reduxdata/rootAction";
import TagsInput from "react-tagsinput";

const { REACT_APP_BOMO_URL } = process.env;
const LOGO_URL = REACT_APP_BOMO_URL;

const BrandProfile = ({ zipfile_path, isAddEdit, brand, user, close }) => {
  const dispatch = useDispatch();
  const [newbrand, setNewBrand] = useState(brand);
  const [imagePreview, setImagePreview] = useState('');
  const [zipPreview,setZipPreview] = useState('');
  const [addzip,setAddzip] = useState('');
  const logopath = brand.logo;
  const zipfilepath = brand.brandassests;
  const usertoken = user.token;
  const fileinputRef = useRef();
  const zipfileinputRef = useRef();

  const [errors, setErrors] = useState({
    logo: '',
    brandname: '',
    brandassests: '',
    tags: '',
  });

  const handleRemoveTag = (e, index) => {
    e.preventDefault();

    if (brand?.id) {
      const updatedTags = [...newbrand.tags];
      updatedTags.splice(index, 1);
      setNewBrand({
        ...newbrand,
        tags: updatedTags,
      });
    } else {
      const updatedTags = [...newbrand.tags];
      updatedTags.splice(index, 1);
      setNewBrand({
        ...newbrand,
        tags: updatedTags,
      });
    }
  };

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    switch (name) {
      case 'logo':
        const logoFile = files[0];
        if (!logoFile) {
          setErrors({ ...errors, logo: 'Upload Logo*' });
        } else if (!logoFile.type || !logoFile.type.startsWith('image/')) {
          setErrors({ ...errors, logo: 'Please upload a valid image file*' });
        } else {
          setErrors({ ...errors, logo: '' });

          setNewBrand({
            ...newbrand,
            logo: logoFile,
          });
          setImagePreview(URL.createObjectURL(logoFile));
        }
        break;

      case 'brandname':
        if (value === '') {
          setErrors({ ...errors, brandname: 'Brand Name is required*' });
        } else {
          setErrors({ ...errors, brandname: '' });
        }
        setNewBrand({
          ...newbrand,
          brandname: value,
        });
        break;

      case 'brandassests':
        const brandAssetsFile = files[0];
        if (brandAssetsFile === undefined) {
          setErrors({ ...errors, brandassests: 'Upload your zip file*' });
        } else if (brandAssetsFile.type !== 'application/zip') {
          setErrors({ ...errors, brandassests: 'Please upload a valid zip file*' });
        } else {
          setErrors({ ...errors, brandassests: '' });
          await uploadZip(brandAssetsFile, dispatch);
        }
        setNewBrand({
          ...newbrand,
          brandassests: zipfile_path,
        });
        setZipPreview(zipfile_path);

        if(!brand?.id) {
          setAddzip(brandAssetsFile)
        }
        break;

      default:
        break;
    }
  };
  const handleUploadButtonClick = (e) => {
    e.preventDefault();
    fileinputRef.current.click();
  };
  const handleUploadZipFileClick = (e) => {
    e.preventDefault();
    zipfileinputRef.current.click();
  }
  const handleTagsChange = (tags) => {
    if (tags.length === 0) {
      setErrors({ ...errors, tags: 'Tags are required*' });
    } else if (tags.length > 5) {
      setErrors({ ...errors, tags: 'You can add up to 5 tags*' });
    } else {
      setErrors({ ...errors, tags: '' });
    }
    setNewBrand({
      ...newbrand,
      tags: tags,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newbrand.logo) {
      setErrors({ ...errors, logo: 'Upload Logo*' });
    } else if (!newbrand.logo.type || !newbrand.logo.type.startsWith('image/')) {
      setErrors({ ...errors, logo: 'Please upload a valid image file*' });
    } else {
      setErrors({ ...errors, logo: '' });
    }

    if (newbrand.brandname === '') {
      setErrors({ ...errors, brandname: 'Brand Name is required*' });
    } else {
      setErrors({ ...errors, brandname: '' });
    }

    if (!newbrand.brandassests) {
      setErrors({ ...errors, brandassests: 'Upload your zip file*' });
    } else if (newbrand.brandassests.type !== 'application/zip') {
      setErrors({ ...errors, brandassests: 'Please upload a valid zip file*' });
    } else {
      setErrors({ ...errors, brandassests: '' });
    }

    if (newbrand.tags.length === 0) {
      setErrors({ ...errors, tags: 'Tags are required*' });
    } else if (newbrand.tags.length > 5) {
      setErrors({ ...errors, tags: 'You can add up to 5 tags*' });
    } else {
      setErrors({ ...errors, tags: '' });
    }

    // const output = Object.entries(newbrand).map(([key, value]) => ({key,value}));
    // for(let i=output.length-1;i>-1;i--){
    //   if(!output[i].value && (output.key!=='surname')){
    //     handleChange({target: {name: output[i].key}});
    //   }
    // };
    // let err=false;
    // const errOutput = Object.entries(errors).map(([key, value]) => ({key,value}));
    // err=errOutput.find(r=>r.value?true:false);
    // if(err){
    //   return false;
    // }

    if (Object.values(errors).every((error) => !error)) {

      let brandprofile = {
        logo: newbrand.logo,
        brandname: newbrand.brandname,
        zipFile: zipfile_path,
        tags: newbrand.tags,
      };
      if (brand?.id) {
        brandprofile.brand_id = brand?.id;
      }
      await addBrand(brandprofile, dispatch, usertoken);
    }
  };

  useEffect(() => {
    if (isAddEdit) {
      setNewBrand({
        id: null,
        logo: null,
        brandname: '',
        brandassests: null,
        tags: []
      });
      close();
      change_add_edit(dispatch);
    }
  }, [isAddEdit, brand, close, dispatch])
  return (
    <>
      <form class="add-brand-profile">

        <div className="row align-items-center">
          <div className={brand?.id ? 'col-12 mb-3' : 'col-lg-1 col-12 mb-3 mb-md-0'}>
            <div className="">
              {/* <label className="fw-bold">Brand Logo:</label> */}
              {imagePreview ? <img src={imagePreview} alt="" />
                : <img src={`${LOGO_URL}${logopath}`} alt="" />}
              <input type="file" className="d-none" name="logo" onChange={handleChange} ref={fileinputRef} />
              
              <button className="add-btn bg-white" onClick={handleUploadButtonClick}>
                  +
              </button>
              {errors.logo && <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">{errors.logo}</p>}
            </div>
          </div>
          <div className={brand?.id ? 'col-12 mb-3' : 'col-lg-2 col-12 mb-3 mb-md-0'}>
            <div className="">
              <label className="fw-bold">Brand Name:</label>
              <input type="text" className="input-name form-control" name="brandname" placeholder ="Name" defaultValue={brand?.id ? brand.brandname : ''} onChange={handleChange} />
              {errors.brandname && <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">{errors.brandname}</p>}
            </div>
          </div>
          <div className={brand?.id ? 'col-12 mb-3' : 'col-lg-3 col-12 mb-3 mb-md-0'}>
            <div className="">
              <label className="fw-bold">Brand Assests:</label>
              {(brand?.id && zipPreview ) ? <p>{zipPreview}</p> : <p>{zipfilepath}</p> }
              {(addzip) ? <p>{addzip.name}</p> : ''}
              <input type="file" className="d-none" name="brandassests" accept=".zip" onChange={handleChange} ref={zipfileinputRef} />
              <button onClick={handleUploadZipFileClick}>
                Upload your zip.
              </button>
              {errors.brandassests && <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">{errors.brandassests}</p>}
            </div>
          </div>
          <div className={brand?.id ? 'col-12 mb-3' : 'col-lg-3 col-12 mb-3 mb-md-0'}>
            <label className="fw-bold">Tags:</label>
            <TagsInput value={newbrand.tags} className="input-name" onChange={handleTagsChange} disabled={newbrand.tags.length >= 5} />
            {errors.tags && <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0" >{errors.tags}</p>}
          </div>
          <div className={brand?.id ? 'col-12 mb-3' : 'col-lg-3 col-12 mb-3 mb-md-0'}>
            <button className="create-add-btn rounded-pill fw-bold" type="submit" onClick={(e) => handleSubmit(e)}>
              {brand?.id ? 'Update' : 'Create'}
            </button>
            <button  className="create-add-btn delete-btn rounded-pill fw-bold" type="button" onClick={() => close()}>
              Close
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    zipfile_path: state.brand.zip_path,
    isAddEdit: state.brand.isAddEdit,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(BrandProfile);