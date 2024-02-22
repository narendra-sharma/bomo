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
  const [zipPreview, setZipPreview] = useState('');
  const [newzipuplod, setNewzipupload] = useState('');
  const [addzip, setAddzip] = useState('');
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
          setNewBrand({
            ...newbrand,
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
        setNewBrand({
          ...newbrand,
          brandname: value,
        });
        break;

      case 'brandassests':
        const brandAssetsFile = files[0];
        if (brandAssetsFile === undefined) {
          setErrors({ ...errors, brandassests: 'Upload your zip file' });
        } else {
          const fileNameParts = brandAssetsFile.name.split('.');
          const fileExtension = fileNameParts.pop().toLowerCase();
          if (fileExtension !== 'zip') {
            setErrors({ ...errors, brandassests: 'Please upload a valid zip file' });
          } else {
            const uploadedZipPath = await uploadZip(brandAssetsFile, dispatch);
            setNewzipupload(uploadedZipPath);

            setNewBrand({
              ...newbrand,
              brandassests: uploadedZipPath,
            });
            setZipPreview(uploadedZipPath);

            if (!brand?.id) {
              setAddzip(brandAssetsFile);
            }

            setErrors({ ...errors, brandassests: '' });
          }
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
      setErrors({ ...errors, tags: 'Tags are required' });
    } else if (tags.length > 5) {
      setErrors({ ...errors, tags: 'You can add up to 5 tags' });
      setTimeout(() => {
        setErrors({ ...errors, tags: '' });
      }, 3000)
    } else {
      setErrors({ ...errors, tags: '' });
    }
    setNewBrand({
      ...newbrand,
      tags: tags.length > 5 ? tags.slice(0, 5) : tags,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    const fieldsToValidate = [
      { name: 'logo', validation: (value) => !value ? 'Upload Logo' : '' },
      { name: 'brandname', validation: (value) => !value ? 'Brand Name is Required' : '' },
      { name: 'brandassests', validation: (value) => !value ? 'Upload your zip file' : '' },
      { name: 'tags', validation: (value) => value.length === 0 ? 'Tags are Required' : (value.length > 5 ? 'You can add up to 5 tags' : '') }
    ];

    fieldsToValidate.forEach(({ name, validation }) => {
      const value = newbrand[name];
      const error = validation(value);
      setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));

      if (error) {
        valid = false;
      }
    });

    if (valid && (Object.values(errors).every((error) => !error))) {

      let brandprofile = {
        logo: newbrand.logo,
        brandname: newbrand.brandname,
        zipFile: zipfile_path,
        tags: newbrand.tags,
      };
      if (brand?.id) {
        brandprofile.brand_id = brand?.id;
        brandprofile.zipFile = brand.brandassests
      }
      if (newzipuplod) {
        brandprofile.zipFile = newzipuplod;
      }
      await addBrand(brandprofile, dispatch, usertoken);
    }
  };

  useEffect(() => {
    if (isAddEdit || !brand) {
      setNewBrand({
        id: null,
        logo: null,
        brandname: '',
        brandassests: null,
        tags: []
      });
      setImagePreview('');
      setZipPreview('');
      setAddzip('');

      close();
      change_add_edit(dispatch);
    }
  }, [isAddEdit, brand, close, dispatch]);

  return (
    <>
      <form class="add-brand-profile">
        <div className="row align-items-center">
          <div className={brand?.id ? 'col-12 mb-3' : 'col-lg-1 col-12 mb-3 mb-md-0'}>
            <label htmlFor="Upload Logo" className="d-none">Logo<span className="text-danger">*</span></label>
            <div>
              <input type="file" className="d-none" name="logo" accept="image/*" onChange={handleChange} ref={fileinputRef} />
              <button className={`${brand?.id ? 'brand-add-btn ' : ''} add-btn bg-white`} onClick={handleUploadButtonClick}>
                {(imagePreview) ? (
                  <img src={imagePreview} alt="Preview" />
                ) : (brand?.id && <img src={`${LOGO_URL}${logopath}`} alt="" />)}
                {brand?.id ? <span>Edit</span> : !imagePreview && ('+')}
              </button>
              {errors.logo && <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">{errors.logo}</p>}
            </div>
          </div>
          <div className={brand?.id ? 'col-12 mb-3' : 'col-lg-3 col-12 mb-3 mb-md-0'}>
            <div>
              <label htmlFor="Brand Name">Brand Name<span className="text-danger">*</span></label>
              <input type="text" className="input-name form-control" name="brandname" placeholder="Name" defaultValue={brand?.brandname} onChange={handleChange} />
              {errors.brandname && <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">{errors.brandname}</p>}
            </div>
          </div>
          <div className={brand?.id ? 'col-12 mb-3' : 'col-lg-3 col-12 mb-3 mb-md-0'}>
            <div className="upload-zip">
              <label htmlFor="Brand Assests">Brand Assests<span className="text-danger">*</span></label>
              <input type="file" className="d-none" name="brandassests" accept=".zip" onChange={handleChange} ref={zipfileinputRef} />
              <button onClick={handleUploadZipFileClick}>
              {(brand?.id && !zipPreview) ? <p>{zipfilepath}</p> : (brand?.id && zipPreview) ? <p>{zipPreview}</p> : ''}
              {(addzip) ? <p>{addzip.name}</p> : ''}
               {!zipPreview && ('Upload your .zip')}
              </button>
              {errors.brandassests && <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">{errors.brandassests}</p>}
            </div>
          </div>
          <div className={brand?.id ? 'col-12 mb-3' : 'col-lg-3 col-12 mb-3 mb-md-0'}>
            <label htmlFor="Tags">Tags<span className="text-danger">*</span></label>
            <TagsInput value={newbrand.tags} className="input-name" inputProps={{ placeholder: '5 tags describing your Brand (Hit enter)' }} onChange={handleTagsChange} />
            {errors.tags && <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0" >{errors.tags}</p>}
          </div>
          <div className={brand?.id ? 'col-12 mb-3' : 'col-lg-2 col-12 mb-3 mb-md-0'}>
          
            <div className="d-flex justify-content-end gap-5">

              <button className="create-add-btn brands-add-btn rounded-pill w-auto fw-bold mb-0" type="submit" onClick={(e) => handleSubmit(e)}>
                {brand?.id ? 'Update' : 'Create'}
              </button>
              <button className="border-0 bg-transparent fw-bold mb-0 p-0" type="button" onClick={() => close()}>
                <span className="fa fa-times"></span>
              </button>
            </div>
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