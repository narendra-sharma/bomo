import React from "react";

const EmptyList = ({ name,isTable,heading }) => {
  return (
    isTable?
        <tr>
            <td colSpan="100%" className="text-center py-5">
                <p className="py-5 my-5 text-muted">{name} is empty!</p>
            </td>
        </tr>
    :<div className="w-100 text-center py-2">
        <p className="py-2 my-2 text-muted">{name} {heading} is empty!</p>
    </div>
  );
};

export default EmptyList;

