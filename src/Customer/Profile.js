import React from "react";
import { connect } from "react-redux";
import LoadingSpinner from "../LoadingSpinner";

const Profile = ({isLoading}) => {
    return(
        <>
         <div className="App">
         {isLoading && <LoadingSpinner />}
           <h2>Profile</h2>
         </div>
        </>
    )
}
const mapStateToProps = (state) => {
  return {
    isLoading: state.loader.isLoading,
  };
};

export default connect(mapStateToProps)(Profile);