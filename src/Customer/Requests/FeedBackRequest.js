import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { get_feedback_review_requestlist } from "../../reduxdata/rootAction";
import ColorCode from "../../Common/ColorCode";
import EmptyList from "../../Common/EmptyList";
import { format } from "date-fns";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import dropdownImage from '../../images/dropdown-img.png';

const FeedBackRequest = ({ user, feedbacklists }) => {
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const updatedItems = Array.from(items);
    setItems(updatedItems);
    const newPriority = updatedItems[result.destination.index].priority;
    const designId = result?.draggableId;

    get_feedback_review_requestlist(dispatch, user?.token, newPriority, designId);
  };

  useEffect(() => {
    get_feedback_review_requestlist(dispatch, user?.token);
  }, [user?.token, dispatch]);

  useEffect(() => {
    setItems(feedbacklists?.updated_feedback_queue);
  }, [feedbacklists]);

  return (
    <div className="review-content bg-white px-3 py-5 rounded">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="feedback-queue">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <table className="table table-borderless feedback-queue">
                {items?.length > 0 ? (
                  items.map((request, index) => (
                    <Draggable key={request?._id} draggableId={request?._id} index={index}>
                      {(provided) => (
                        <body>
                          <tr
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}

                        >
                          <td><p className="serial-number">{request?.priority}</p></td>
                          <td className="text-center"><ColorCode request={request} /></td>
                          <td>
                            <p>{request?.brand_profile ? request?.brand_profile?.brandname : '--'}</p>
                          </td>
                          <td><p><span className="fw-bold">Status</span> <span className="d-block">{request?.status}</span></p></td>
                          <td><p><span className="fw-bold">Delivery</span> <span className="d-block">{!request?.delivery_date
                            ? "No Date"
                            : format(new Date(request?.delivery_date), 'dd/MM/yyyy')}</span></p></td>
                          <td><p><span className="fw-bold">Request by</span> <span className="d-block">{request?.user_id?.name}</span></p></td>
                          <td><img src={dropdownImage} alt="" /></td>
                        </tr>
                        </body>
                      )}
                    </Draggable>
                  ))
                ) : (
                  <EmptyList name="FeedBack Queue" />
                )}
              </table>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    feedbacklists: state.requests.feedbacklists,
  };
};

export default connect(mapStateToProps)(FeedBackRequest);
