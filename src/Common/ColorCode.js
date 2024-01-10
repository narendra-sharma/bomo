import React from "react";
import { Connect, useDispatch } from "react-redux";
const [isHovered, setIsHovered] = useState(null);
const handleMouseOver = (requestid) => {
  setIsHovered(requestid);
};

const handleMouseOut = () => {
  setIsHovered(null);
};

const findColorByType = (type) => {
  const lowerCaseType = type.toLowerCase();
  const foundtype = requestTypes.find(
    (t) => t.type.toLowerCase() === lowerCaseType
  );
  return foundtype ? foundtype.color : "";
};
const ColorCode = () => {
  return (
    <p
      className={`short0ad ${findColorByType(
        request.request_type.replace(/_/g, " ")
      )}`}
      style={{
        color:
          isHovered === request._id
            ? "white"
            : findColorByType(request.request_type.replace(/_/g, " ")),
        background:
          isHovered === request._id
            ? findColorByType(request.request_type.replace(/_/g, " "))
            : "white",
        border: `2px solid ${findColorByType(
          request.request_type.replace(/_/g, " ")
        )}`,
      }}
      onMouseEnter={() => handleMouseOver(request._id)}
      onMouseLeave={handleMouseOut}
    >
      {request.request_type.replace(/_/g, " ")}
    </p>
  );
};

export default ColorCode;
