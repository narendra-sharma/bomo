import React, { useEffect, useState } from "react";
import CustomPagination from "../../Common/CustomPagination";
import { Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { getrequestlist } from "../../reduxdata/rootAction";

const DraftRequests = ({ draftrequests, getrequestlist, user, total, requestTypes }) => {
  const dispatch = useDispatch();
  const usertoken = user.token;
  const [isHovered, setIsHovered] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);

  const handleMouseOver = (requestid) => {
    setIsHovered(requestid);
  };

  const handleMouseOut = () => {
    setIsHovered(null);
  };

  const findColorByType = (type) => {
    const foundtype = requestTypes.find((t) => t.type === type);
    return foundtype ? foundtype.color : '';
  }

  useEffect(() => {
    getrequestlist(dispatch, usertoken, page, limit);
  }, [dispatch, getrequestlist, usertoken, page, limit]);
    return (
        <>
         <div className="review-content bg-white px-4 px-md-5 py-5 rounded">
            {(draftrequests.length > 0) ? <div className='bg-gray-light draft-table table-responsive'>
              <table className='table mb-0'>
                <tbody>
                  {draftrequests.map((request) => (
                    <tr key={request._id}>
                      <td className="text-center">
                        <p className={`short0ad ${findColorByType(request.request_type.replace(/_/g, ' '))}`}
                          style={{
                            color: isHovered === request._id ? 'white' : findColorByType(request.request_type.replace(/_/g, ' ')),
                            background: isHovered === request._id ? findColorByType(request.request_type.replace(/_/g, ' ')) : 'white',
                            border: `2px solid ${findColorByType(request.request_type.replace(/_/g, ' '))}`,
                          }}
                          onMouseEnter={() => handleMouseOver(request._id)}
                          onMouseLeave={handleMouseOut}>
                          {request.request_type.replace(/_/g, ' ')}
                        </p>
                      </td>
                      <td><p><span className="fw-bold">Status</span> <span className="d-block">{request.status}</span></p></td>
                      <td><p><span className="fw-bold">Delivery</span> <span className="d-block">-</span></p></td>
                      <td><p><span className="fw-bold">Request by</span> <span className="d-block">Pepín Noob</span></p></td>
                      <td className="text-center"><p>DIOR</p></td>
                      <td className="text-center"><p><Link className="text-decoration-none">continue editing</Link></p></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div> : (
              <div className="text-center py-1 my-1">
                <p className="py-1 my-1 text-muted">Draft Request is empty!</p>
              </div>
            )}
            {(total > 0) && <CustomPagination total={total} onPageChange={(newPage, newLimit) => { setPage(newPage); setLimit(newLimit + 1); }} />}
          </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
      user: state.auth.user,
      draftrequests: state.requests.draftrequests,
      total:state.requests.totaldrafts,
      requestTypes: state.requests.requestTypes,
    };
  };
  const mapDispatchToProps = () => {
    return {
      getrequestlist
    };
  };
export default connect(mapStateToProps, mapDispatchToProps)(DraftRequests);


