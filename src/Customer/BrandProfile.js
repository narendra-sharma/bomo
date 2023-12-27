import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addBrand, start_loading, stop_loading, uploadZip } from "../reduxdata/rootAction";
import TagsInput from "react-tagsinput";

const BrandProfile = ({ isLoading, zipfile_path, brandstore, addBrand, uploadZip }) => {
  const [handleshow, setHandleshow] = useState(false);
  // const [branddata, setBranddata] = useState([]);
  const [newbrand, setNewBrand] = useState({
    logo: null,
    brandname: '',
    brandassests: null,
    tags: [],
  });

  const dispatch = useDispatch();

  const [logoerror, setlogoerror] = useState('');
  const [brandnamerror, setBrandnameerror] = useState('');
  const [brandassestserror, setBrandassestserror] = useState('');
  const [tagserror, setTagserror] = useState('');

  const handleForm = () => {
    setHandleshow(true);
  }

  const handleRemoveTag = (index) => {
    const updatedTags = [...newbrand.tags];
    updatedTags.splice(index, 1);
    setNewBrand({
      ...newbrand,
      tags: updatedTags,
    });
  };

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    switch (name) {
      case 'logo':
        const logoFile = files[0];
        if (logoFile === undefined) {
          setlogoerror('Upload Logo*');
        } else if (!logoFile.type.startsWith('image/')) {
          setlogoerror('Please upload a valid image file*');
        } else {
          setlogoerror(null);
        }
        setNewBrand({
          ...newbrand,
          logo: logoFile,
        });
        break;

      case 'brandname':
        if (value === '') {
          setBrandnameerror('Brand Name is required*');
        } else {
          setBrandnameerror(null);
        }
        setNewBrand({
          ...newbrand,
          brandname: value,
        });
        break;

      case 'brandassests':
        const brandAssetsFile = files[0];
        if (brandAssetsFile === undefined) {
          setBrandassestserror('Upload your zip file*');
        } else if (brandAssetsFile.type !== 'application/zip') {
          setBrandassestserror('Please upload a valid zip file*');
        } else {
          setBrandassestserror(null);
          try {
            dispatch(start_loading());
            await uploadZip(brandAssetsFile);
          } catch (error) {
            console.error("Error uploading zip file:", error);
          } finally {
            dispatch(stop_loading());
          }
        }

        setNewBrand({
          ...newbrand,
          brandassests: brandAssetsFile ? brandAssetsFile : newbrand.brandassests,
        });
        break;

      default:
        break;
    }
  };

  const handleTagsChange = (tags) => {
    // Validate tags
    if (tags.length === 0) {
      setTagserror('Tags are required*');
    } else if (tags.length <= 5) {
      setTagserror(null);
    } else {
      setTagserror('You can add up to 5 tags*');
    }

    setNewBrand({
      ...newbrand,
      tags: tags,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newbrand.logo === null) {
      setlogoerror("Upload Logo*");
    } else if (!newbrand.logo.type.startsWith("image/")) {
      setlogoerror("Please upload a valid image file*");
    } else {
      setlogoerror(null);
    }
    if (newbrand.brandname === '') {
      setBrandnameerror("Brand Name is required*")
    } else {
      setBrandnameerror(null);
    }

    if (newbrand.brandassests === null) {
      setBrandassestserror("Upload your zip file*");
    } else if (newbrand.brandassests && newbrand.brandassests.type !== "application/zip") {
      setBrandassestserror("Please upload a valid zip file*");
    } else {
      setBrandassestserror(null);
    }

    if (newbrand.tags.length === 0) {
      setTagserror("Tags are required*");
    } else {
      setTagserror(null);
    }

    if (
      newbrand.logo !== null &&
      newbrand.logo.type.startsWith("image/") &&
      newbrand.brandname !== "" &&
      newbrand.brandassests !== null &&
      newbrand.brandassests.type === "application/zip" &&
      newbrand.tags.length !== 0
    ) {
      // const brandlogoBase = URL.createObjectURL(newbrand.logo);
      // const brandassestsBase = URL.createObjectURL(newbrand.brandassests);

      const brandprofile = {
        logo: newbrand.logo,
        brandname: newbrand.brandname,
        zipFile: zipfile_path,
        tags: newbrand.tags,
      };

      await addBrand(brandprofile, dispatch);

      setNewBrand({
        logo: null,
        brandname: '',
        brandassests: null,
        tags: [],
      });
      setHandleshow(false);
    }
  };

  return (
    <>
      <div className="App">
        <h2>Brand Profiles</h2>
        {brandstore.map((brand) => (
          <table style={{ marginLeft: "25%" }}>
            <thead>
              <tr>
                <th style={{ padding: "1rem" }}></th>
                <th style={{ padding: "1rem" }}>Brand Name</th>
                <th style={{ padding: "1rem" }}>Brand Assests</th>
                <th style={{ padding: "1rem" }}>Tags</th>
                <th style={{ padding: "1rem" }}></th>
              </tr>
            </thead>
            <tbody style={{ paddingRight: "1rem" }}>
              <tr key={brand?.id}>
                <td><img src={brand?.logo} alt={brand?.name} style={{ height: '3rem' }} /></td>
                <td>{brand?.brandname}</td>
                <td><a href={brand?.brandassests} download>
                  Download ZIP
                </a></td>
                <td>{brand?.tags.join(', ')}</td>
                <td style={{ paddingLeft: "1rem" }}>
                  <Link style={{ textDecoration: "none" }}>Edit</Link>
                  <button>Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        ))}
        {
          handleshow === false ?
            <><button onClick={handleForm}>+</button> <span>Add New Brand</span></>
            :
            handleshow === true ?
              <>
                <h6>Add New Brand</h6>
                <form>
                  <table style={{ marginLeft: "8%" }}>
                    <tbody style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
                      <tr>
                        <td>Brand Logo:</td> <br />
                        <td>
                          <input type="file" name="logo" onChange={handleChange} />
                          {logoerror ? <p style={{ color: 'red' }} >{logoerror}</p> : null}
                        </td>
                      </tr>
                      <tr>
                        <td>Brand Name:</td> <br />
                        <td>
                          <input type="text" name="brandname" value={newbrand.brandname} onChange={handleChange} />
                          {brandnamerror ? <p style={{ color: 'red' }} >{brandnamerror}</p> : null}
                        </td>
                      </tr>
                      <tr>
                        <td>Brand Assests:</td> <br />
                        <td>
                          <input type="file" name="brandassests" onChange={handleChange} />
                          {brandassestserror ? <p style={{ color: 'red' }} >{brandassestserror}</p> : null}
                        </td>
                      </tr>
                      <tr>
                        <td>Tags:</td> <br />
                        <td>
                          <TagsInput value={newbrand.tags} onChange={handleTagsChange} disabled={newbrand.tags.length >= 5} />
                          {tagserror ? <p style={{ color: 'red' }} >{tagserror}</p> : null}
                          <div>
                            {newbrand.tags ? newbrand.tags.map((tag, index) => (
                              <span key={index} className="tag">
                                {tag}
                                <button onClick={() => handleRemoveTag(index)} style={{ backgroundColor: 'var(--gray)!important', border: '1px solid white' }}>×</button> <br />
                              </span>
                            )) : ""}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <button onClick={(e) => handleSubmit(e)} disabled={isLoading}>
                          {isLoading ? 'Creating......' : 'Create'}
                        </button>
                      </tr>
                    </tbody>
                  </table>
                </form>
              </>
              :
              ""
        }
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    zipfile_path: state.brand.zip_path,
    brandstore: state.brand.brandprofile,
    isLoading: state.loader.isLoading,
  };
};

const mapDispatchToProps = () => {
  return {
    uploadZip,
    addBrand
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BrandProfile);