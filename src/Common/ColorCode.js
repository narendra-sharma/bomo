import React, { useState } from "react";
import { connect } from "react-redux";

const ColorCode = ({ request, requestTypes }) => {

  const [isHovered, setIsHovered] = useState(null);

  const handleMouseOver = (requestid) => {
    setIsHovered(requestid);
  };

  const handleMouseOut = () => {
    setIsHovered(null);
  };

  const findColorByType = (type) => {
    const lowerCaseType = type?.toLowerCase();
    const foundtype = requestTypes?.find((t) => t.type?.toLowerCase() === lowerCaseType);
    return foundtype ? foundtype?.color : '';
  };

  return (
    <>
        <p
          className={`short0ad ${findColorByType(
            request?.request_type?.replace(/_/g, " ")
          )}`}
          style={{
            color:
              isHovered === request?._id
                ? "white"
                : findColorByType(request?.request_type?.replace(/_/g, " ")),
            background:
              isHovered === request?._id
                ? findColorByType(request?.request_type?.replace(/_/g, " "))
                : "white",
            border: `1px solid ${findColorByType(
              request?.request_type?.replace(/_/g, " ")
            )}`,
          }}
          onMouseEnter={() => handleMouseOver(request?._id)}
          onMouseLeave={handleMouseOut}
        >
          {request?.request_type?.replace(/_/g, " ")}
        </p>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    requestTypes: state.requests.requestTypes,
  }
}

export default connect(mapStateToProps)(ColorCode);

