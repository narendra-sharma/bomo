import React from "react";
import { connect } from "react-redux";
import LoadingSpinner from "../LoadingSpinner";

const ActiveRequests = ({ isLoading }) => {
    return (
        <>
            <div className="App">
                {isLoading && <LoadingSpinner />}
                <h2>Active Requests</h2>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.loader.isLoading,
    };
};

export default connect(mapStateToProps)(ActiveRequests);
