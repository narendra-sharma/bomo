import { TablePagination } from "@mui/material";
import React, { useState } from "react";
const CustomPagination = ({ total, onPageChange }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const handleNavClick = (event, newPage) => {
    setPage(newPage)
    onPageChange(newPage + 1, rowsPerPage)
  };
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0);
  }
  return (
    <div className="col-lg-12 d-flex align-items-center justify-content-lg-end justify-content-center">
      <TablePagination
       rowsPerPageOptions={[5, 10, 15]}
        component='div'
        onPageChange={handleNavClick}
        count={total}
        page={page}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </div>
  )
}

export default CustomPagination;
