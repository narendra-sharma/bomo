import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteBrand, getbrandlist} from "../../reduxdata/rootAction";
import EditBrand from "../../Modals/EditBrand";
import ManageBrand from "./ManageBrand";
import CustomPagination from "../../Common/CustomPagination";
import DeleteBrand from "../../Modals/Delete";

const { REACT_APP_BOMO_URL } = process.env;
const LOGO_URL = REACT_APP_BOMO_URL;

const BrandProfile = ({ brands,total,user,getbrandlist }) => {

  const dispatch = useDispatch();
  const [handleshow, setHandleshow] = useState(false);
  const newBrand={
    id: '',
    logo: '',
    brandname: '',
    brandassests: '',
    tags: [],
  };
  const [edit, setEdit] = useState(newBrand);
  const [isEdit,setIsEdit]=useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const handleShowEditBrand = (brand) => {
    setEdit({
      id:brand._id,
      logo: brand.logo,
      brandname: brand.brandname,
      brandassests: brand.brandassests,
      tags: brand.tags,
    });
    setIsEdit(true);
  }
  useEffect(()=>{
    getbrandlist(dispatch, user.token, page, limit);
  },[dispatch, getbrandlist, user.token, page, limit]);

  const [show, setShow] = useState(false);
  const [brandid,setBrandid]=useState(null)
  const usertoken = user.token;
  const handleDeleteBrand = (brand) => {
    setBrandid(brand?._id);
    setEdit(brand);
    setShow(true);
  };
  const handleDeleteConfirm = () => {
    deleteBrand(brandid, dispatch, usertoken);
    setShow(false);
  }
  const closeBrand = () => {
    setHandleshow(false);
    setIsEdit(false);
    setEdit(newBrand);
  }

  return (
    <>
      <div className="ml-md-auto pt-5 ms-md-auto rightside-wrapper">
        <div className="main-content-wraaper brand-profile-section px-60 py-md-2 py-lg-5">
          <div className="review-main-content mx-md-3 mx-lg-5 mb-4">
            <h3>Brand Profile</h3>
          </div>
          
            {brands.map((brand) => (
              <div className="table-responsive brand-table bg-white rounded">
              <table className="table table-borderless mb-0" key={brand?._id}>
              
                <tbody>
                  <tr>
                    <td><img src={`${LOGO_URL}${brand?.logo}`} alt='img not found' style={{ height: '3rem' }} /></td>
                    <td><span className="fw-bold">Brand Name</span> <span className="d-block">{brand?.brandname}</span></td>
                    <td><span className="fw-bold">Brand Assets</span> <span className="d-block">{brand?.brandassests}</span></td>
                    <td><span className="fw-bold">Tags</span> <span className="d-block">{brand?.tags.join(', ')}</span></td>
                    <td >
                      <Link style={{ textDecoration: "none" }} className="text-dark" onClick={() =>{handleShowEditBrand(brand)}}>+ edit</Link>
                      <button  onClick={() =>{handleDeleteBrand(brand)}}>Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              </div>
            ))}
            {(total>0) && <CustomPagination total={total} onPageChange={(newPage, newLimit) => {
                setPage(newPage);
                setLimit(newLimit+1);
              }} />}
            {
              !handleshow ?
                <><div className="add-new-brand"><button className="add-btn" onClick={()=>setHandleshow(true)}>+</button> <span className="ms-4 ps-2"><span className="fw-bold">Add</span> New Brand</span></div></>
                :<>
                    {/* <h6>Add New Brand</h6> */}
                    <ManageBrand checkedit={isEdit} brand={edit} close={() => closeBrand()}/>
                  </>
            }
            {isEdit && <EditBrand show={isEdit} handleClose={()=>closeBrand()} brand={edit} />}
            <DeleteBrand heading='Brand Profile' name={edit.brandname} show={show} handleClose={() => setShow(false) && setEdit(newBrand)} DeleteBrand={() => handleDeleteConfirm()}/>
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
  };
};
const mapDispatchToProps = () => {
  return {
    getbrandlist
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(BrandProfile);