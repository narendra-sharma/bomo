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
  const [limit, setLimit] = useState(4);
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
      <div className="App">
        <h2>Brand Profiles</h2>
        {brands.map((brand) => (
          <table style={{ marginLeft: "25%" }} key={brand?._id}>
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
              <tr>
                <td><img src={`${LOGO_URL}${brand?.logo}`} alt='img not found' style={{ height: '3rem' }} /></td>
                <td>{brand?.brandname}</td>
                <td><a href={`${REACT_APP_BOMO_URL}${brand?.brandassests}`} download>
                  Download ZIP
                </a></td>
                <td>{brand?.tags.join(', ')}</td>
                <td style={{ paddingLeft: "1rem" }}>
                  <Link style={{ textDecoration: "none" }} onClick={() =>{handleShowEditBrand(brand)}}>Edit</Link>
                  <button  onClick={() =>{handleDeleteBrand(brand)}}>Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        ))}
         {(total>0) && <CustomPagination total={total} onPageChange={(newPage, newLimit) => {
            setPage(newPage);
            setLimit(newLimit+1);
          }} />}
        {
          !handleshow ?
            <><button onClick={()=>setHandleshow(true)}>+</button> <span>Add New Brand</span></>
            :<>
                <h6>Add New Brand</h6>
                <ManageBrand checkedit={isEdit} brand={edit} close={() => closeBrand()}/>
              </>
        }
        {isEdit && <EditBrand show={isEdit} handleClose={()=>closeBrand()} brand={edit} />}
        <DeleteBrand heading='Brand Profile' name={edit.brandname} show={show} handleClose={() => setShow(false) && setEdit(newBrand)} DeleteBrand={() => handleDeleteConfirm()}/>
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