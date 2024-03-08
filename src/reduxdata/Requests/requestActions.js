import axios from "axios";
import {
  start_loading,
  stop_loading,
  catch_errors_handle,
  change_add_edit,
  get_user_subscription,
} from "../rootAction";
import { toast } from "react-toastify";
import {
  GET_EDIT_REQUEST_DATA,
  GET_REQUEST_LIST,
  GET_ADMIN_PENDING_REQUEST_LIST,
  GET_POLL_REQUEST_LIST,
  GET_ADMIN_ASSIGN_REQUEST_LIST,
  GET_DESIGNER_ASSIGNED_REQUEST_LIST,
  GET_DESIGNER_ACTIVE_REQUEST_LIST,
  DELIEVER_REQUEST_DATA,
  GET_CUSTOMER_ACTIVE_REQUEST_LIST,
  GET_SUPER_ADMIN_APPROVE_REQUEST_LIST,
  GET_FEEDBACK_QUE,
  GET_ALL_ACTIVE_REQUEST_LIST,
  SUBMIT_NOW,
  GET_ALL_PAST_REQUEST_LIST,
  GET_DELIVER_REQUEST,
  GET_DESIGNER_PAST_REQUEST_LIST,
  GET_NEW_REQUEST,
  GET_EXPAND_REQUEST_DETAILS,
  GET_CUSTOMERS_PAYMENT_HISTORY,
  GET_DESIGNERS_PAYMENT_HISTORY,
  GET_DOWNLOAD_PATH,
  GET_ALL_DRAFTS,
  GET_ALL_REVIEW_REQUESTS,
  UPLOAD_NEW_IMAGE,
  GET_ADMIN_ACCEPTED_LIST,
  GET_LATE_REQUESTS,
} from "./requestTypes";
const { REACT_APP_BOMO_URL } = process.env;

export const get_draft_requestlist = async (
  dispatch,
  token,
  page = 1,
  limit = 10
) => {
  dispatch(start_loading());
  try {
    const url = `${REACT_APP_BOMO_URL}customerAdmin/request-listing?page=${page}&limit=${limit}`;
    const HEADERS = {
      headers: {
        "x-access-token": token,
      },
    };
    const res = await axios.get(url, HEADERS);
    if (res.data && res.data.status) {
      dispatch({ type: GET_REQUEST_LIST, payload: res.data });
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
};

export const get_admin_pending_requestlist = async (
  dispatch,
  token,
  page = 1,
  limit = 10
) => {
  dispatch(start_loading);
  try {
    const url = `${REACT_APP_BOMO_URL}superAdmin/request-listing?page=${page}&limit=${limit}`;
    const HEADERS = {
      headers: {
        "x-access-token": token,
      },
    };
    const res = await axios.get(url, HEADERS);
    if (res.data && res.data.status) {
      dispatch({ type: GET_ADMIN_PENDING_REQUEST_LIST, payload: res.data });
    } else {
      toast.error(res.data?.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading);
  }
};

export const get_accepted_request = async (
  dispatch,
  token,
  page = 1,
  limit = 10,
  search
) => {
  dispatch(start_loading());
  try {
    const url = `${REACT_APP_BOMO_URL}superAdmin/req-list?page=${page}&limit=${limit}${
      search ? "&search=" + search : ""
    }`;
    const HEADERS = {
      headers: {
        "x-access-token": token,
      },
    };
    const res = await axios.get(url, HEADERS);
    if (res.data && res?.data.status) {
      dispatch({ type: GET_ADMIN_ACCEPTED_LIST, payload: res.data });
    } else {
      toast.error(res.data?.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
};

export const get_admin_assign_requestlist = async (
  dispatch,
  token,
  page = 1,
  limit = 10
) => {
  dispatch(start_loading());
  try {
    const url = `${REACT_APP_BOMO_URL}superAdmin/accepted-request-listing?page=${page}&limit=${limit}`;
    const HEADERS = {
      headers: {
        "x-access-token": token,
      },
    };
    const res = await axios.get(url, HEADERS);
    if (res.data && res.data.status) {
      dispatch({ type: GET_ADMIN_ASSIGN_REQUEST_LIST, payload: res.data });
    } else {
      toast.error(res.data?.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
};

export const get_designer_pool_requestlist = async (dispatch, token) => {
  dispatch(start_loading);
  try {
    const url = `${REACT_APP_BOMO_URL}designer/pool-request`;
    const HEADERS = {
      headers: {
        "x-access-token": token,
      },
    };
    const res = await axios.get(url, HEADERS);
    if (res.data && res.data.status) {
      dispatch({ type: GET_POLL_REQUEST_LIST, payload: res.data });
    } else {
      toast.error(res.data?.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading);
  }
};

export const assign_admin_request = async (requestdata, dispatch, token) => {
  dispatch(start_loading);
  try {
    const url = `${REACT_APP_BOMO_URL}superAdmin/assign-designer`;
    const HEADERS = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const requestDataToSend = {
      request_id: requestdata.request_id,
      primary_designer: requestdata.primary_designer,
      backup_designer: requestdata.backup_designer,
    };
    const res = await axios.put(
      url,
      JSON.stringify(requestDataToSend),
      HEADERS
    );
    if (res.data && res.data.status) {
      toast.success(res.data?.message);
      get_admin_assign_requestlist(dispatch, token);
    } else {
      toast.error(res.data?.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading);
  }
};

export const poll_request_apply = async (requestdata, dispatch, token) => {
  dispatch(start_loading);
  try {
    const url = `${REACT_APP_BOMO_URL}designer/designer-action?request_id=${requestdata}`;
    const HEADERS = {
      headers: {
        "x-access-token": token,
      },
    };
    const res = await axios.put(url, {}, HEADERS);
    if (res.data && res.data.status) {
      toast.success(res.data?.msg);
      get_designer_pool_requestlist(dispatch, token);
    } else {
      toast.error(res.data?.msg);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading);
  }
};

export const change_request_status = async (dispatch, token, id, status) => {
  dispatch(start_loading);
  try {
    const url = `${REACT_APP_BOMO_URL}superAdmin/request-action`;
    const HEADERS = {
      headers: {
        "x-access-token": token,
      },
    };
    const res = await axios.put(
      url,
      { status: status, request_id: id },
      HEADERS
    );
    if (res.data && res.data.status) {
      toast.success(res.data?.message);
      setTimeout(() => {
         get_admin_pending_requestlist(dispatch, token);
         get_admin_assign_requestlist(dispatch, token);
      },4000);
    } else {
      toast.error(res.data?.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading);
  }
};

export const desginer_accept_assignrequest = async (
  dispatch,
  token,
  request_id,
  email,
  designer_id,
  status
) => {
  dispatch(start_loading);
  try {
    const url = `${REACT_APP_BOMO_URL}designer/accept-request?request_id=${request_id}&email=${email}&designer_id=${designer_id}&status=${status}`;
    const HEADERS = {
      headers: {
        "x-access-token": token,
      },
    };
    const res = await axios.put(url, {}, HEADERS);
    if (res.data && res.data.status) {
      toast.success(res.data?.message);
      get_designer_assigned_requestlist(dispatch, token);
    } else {
      toast.error(res.data?.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading);
  }
};

export const get_designer_assigned_requestlist = async (dispatch, token) => {
  dispatch(start_loading);
  try {
    const url = `${REACT_APP_BOMO_URL}designer/request-acceptance-list`;
    const HEADERS = {
      headers: {
        "x-access-token": token,
      },
    };
    const res = await axios.get(url, HEADERS);
    if (res.data && res.data.status) {
      dispatch({ type: GET_DESIGNER_ASSIGNED_REQUEST_LIST, payload: res.data });
    } else {
      toast.error(res.data?.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading);
  }
};

export const get_designer_active_requestslist = async (dispatch, token) => {
  dispatch(start_loading());
  try {
    const url = `${REACT_APP_BOMO_URL}designer/assigned-request`;
    const HEADERS = {
      headers: {
        "x-access-token": token,
      },
    };
    const res = await axios.get(url, HEADERS);
    if (res.data && res.data.status) {
      dispatch({ type: GET_DESIGNER_ACTIVE_REQUEST_LIST, payload: res.data });
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
};

export const get_customeradmin_active_requestslist = async (
  dispatch,
  token,
  page,
  perpage
) => {
  dispatch(start_loading());
  try {
    const url = `${REACT_APP_BOMO_URL}user/active-requests?page=${page}&perpage=${perpage}`;
    const HEADERS = {
      headers: {
        "x-access-token": token,
      },
    };
    const res = await axios.get(url, HEADERS);
    if (res.data && res.data.status) {
      dispatch({ type: GET_CUSTOMER_ACTIVE_REQUEST_LIST, payload: res?.data });
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
};

export const designer_deliever_request = async (dispatch, token, data) => {
  dispatch(start_loading());
  try {
    const formData = new FormData();
    formData.append("request_id", data?.request_id);
    formData.append("landscape", data?.landscape);
    formData.append("portrait", data?.portrait);
    formData.append("zip", data?.zip);
    const url = `${REACT_APP_BOMO_URL}request/upload-design`;
    const HEADERS = {
      headers: {
        "x-access-token": token,
      },
    };
    const res = await axios.put(url, formData, HEADERS);
    if (res.data && res.data.status) {
      toast.success(res.data?.message);
      dispatch({ type: SUBMIT_NOW, payload: true });
    } else {
      toast.error(res.data?.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
};

export const get_approve_delivery_list = async (token, dispatch) => {
  dispatch(start_loading());
  try {
    const url = `${REACT_APP_BOMO_URL}superAdmin/design_review`;
    const HEADERS = {
      headers: {
        "x-access-token": token,
      },
    };
    const res = await axios.get(url, HEADERS);
    if (res.data && res.data.status) {
      dispatch({
        type: GET_SUPER_ADMIN_APPROVE_REQUEST_LIST,
        payload: res?.data,
      });
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
};

export const superadmin_approve_delivery = async (
  dispatch,
  token,
  approvedata,
  reqstatus
) => {
  dispatch(start_loading());
  try {
    const url =
      reqstatus === "draft"
        ? `${REACT_APP_BOMO_URL}superAdmin/request-action`
        : `${REACT_APP_BOMO_URL}superAdmin/design_action`;
    const HEADERS = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const requestdetails = {
      request_id: approvedata._id,
      status: approvedata.deliverystatus,
    };
    if (approvedata.message) {
      requestdetails.message = approvedata.message;
    }
    const res = await axios.put(url, JSON.stringify(requestdetails), HEADERS);
    if (res.data && res.data.status) {
      toast.success(res.data?.message);
      if (!reqstatus === "draft") {
        await get_approve_delivery_list(token, dispatch);
      }
      await get_admin_pending_requestlist(dispatch, token);
      await get_admin_assign_requestlist(dispatch, token);
    } else {
      toast.error(res.data?.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
};

export const get_feedback_review_requestlist = async (
  dispatch,
  token,
  newPriority,
  designId
) => {
  dispatch(start_loading());
  try {
    const url = designId
      ? `${REACT_APP_BOMO_URL}user/review-requests?design_id=${designId}&priority=${newPriority}`
      : `${REACT_APP_BOMO_URL}user/review-requests`;
    const HEADERS = {
      headers: {
        "x-access-token": token,
      },
    };
    const res = await axios.get(url, HEADERS);
    if (res.data && res.data.status) {
      dispatch({ type: GET_FEEDBACK_QUE, payload: res?.data });
    } else {
      toast.error(res.data?.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
};

export const get_superadmin_all_activerequests = async (token, dispatch) => {
  dispatch(start_loading());
  try {
    const url = `${REACT_APP_BOMO_URL}superAdmin/priority_list`;
    const HEADERS = {
      headers: {
        "x-access-token": token,
      },
    };
    const res = await axios.get(url, HEADERS);
    if (res.data && res.data.status) {
      dispatch({ type: GET_ALL_ACTIVE_REQUEST_LIST, payload: res?.data });
    } else {
      toast.error(res.data?.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
};

export const review_delivery_request_customer_admin = async (
  dispatch,
  token,
  reviewdata
) => {
  dispatch(start_loading());
  try {
    const url = `${REACT_APP_BOMO_URL}user/feedback`;
    const HEADERS = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const reviewdetails = {
      request_id: reviewdata._id,
      status: reviewdata.reviewstatus,
    };
    if (reviewdetails.status === "rejected") {
      reviewdetails.message = reviewdata.message;
    }
    const res = await axios.put(url, JSON.stringify(reviewdetails), HEADERS);
    if (res.data && res.data.status) {
      toast.success(res.data?.message);
      dispatch({ type: SUBMIT_NOW, payload: true });
    } else {
      toast.error(res.data?.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
};

export const get_past_requests_for_customer_admin = async (
  dispatch,
  token,
  page = 1,
  limit = 10
) => {
  dispatch(start_loading());
  try {
    const url = `${REACT_APP_BOMO_URL}customer/past_request_data?page=${page}&limit=${limit}`;
    const HEADERS = {
      headers: {
        "x-access-token": token,
      },
    };
    const res = await axios.get(url, HEADERS);
    if (res.data && res.data.status) {
      dispatch({ type: GET_ALL_PAST_REQUEST_LIST, payload: res?.data });
    } else {
      toast.error(res.data?.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
};

export const get_past_requests_for_designer = async (
  dispatch,
  token,
  page = 1,
  limit = 10
) => {
  dispatch(start_loading());
  try {
    const url = `${REACT_APP_BOMO_URL}designer/past-request?page=${page}&limit=${limit}`;
    const HEADERS = {
      headers: {
        "x-access-token": token,
      },
    };
    const res = await axios.get(url, HEADERS);
    if (res.data && res.data.status) {
      dispatch({ type: GET_DESIGNER_PAST_REQUEST_LIST, payload: res?.data });
    } else {
      toast.error(res.data?.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
};

export const get_delivered_requests = async (dispatch, token, deliverId) => {
  dispatch(start_loading());
  try {
    const url = `${REACT_APP_BOMO_URL}user/deliveries?request_id=${deliverId}`;
    const HEADERS = {
      headers: {
        "x-access-token": token,
      },
    };
    const res = await axios.get(url, HEADERS);
    if (res.data && res.data.status) {
      dispatch({ type: GET_DELIVER_REQUEST, payload: res?.data });
    } else {
      toast.error(res.data?.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
};

export const get_expanded_request_detail = async (
  dispatch,
  token,
  requestId
) => {
  dispatch(start_loading());
  try {
    const url = `${REACT_APP_BOMO_URL}user/expand-request?request_id=${requestId}`;
    const HEADERS = {
      headers: {
        "x-access-token": token,
      },
    };
    const res = await axios.get(url, HEADERS);
    if (res.data && res.data.status) {
      dispatch({ type: GET_EXPAND_REQUEST_DETAILS, payload: res.data });
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
};

export const get_customers_payment_history = async (
  dispatch,
  token,
  search,
  useFor,
  page = 1,
  limit = 10
) => {
  dispatch(start_loading());
  try {
    const url = `${REACT_APP_BOMO_URL}${
      useFor === "customer" ? "payment-history" : "designer-payment-history"
    }?page=${page}&limit=${limit}${search ? "&search=" + search : ""}`;
    const HEADERS = {
      headers: {
        "x-access-token": token,
      },
    };
    const res = await axios.get(url, HEADERS);
    if (res.data && res.data.status) {
      dispatch({
        type:
          useFor === "customer"
            ? GET_CUSTOMERS_PAYMENT_HISTORY
            : GET_DESIGNERS_PAYMENT_HISTORY,
        payload: res.data,
        useFor: useFor,
      });
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
};

export const get_all_draft_requests = async (
  dispatch,
  token,
  page = 1,
  limit = 10,
  search
) => {
  dispatch(start_loading());
  try {
    const url = `${REACT_APP_BOMO_URL}superAdmin/draft_requests?page=${page}&limit=${limit}${
      search ? "&search=" + search : ""
    }`;
    const HEADERS = {
      headers: {
        "x-access-token": token,
      },
    };
    const res = await axios.get(url, HEADERS);
    if (res.data && res.data.status) {
      dispatch({ type: GET_ALL_DRAFTS, payload: res.data });
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
};

export const get_all_review_requests = async (
  dispatch,
  token,
  page = 1,
  limit = 10,
  search
) => {
  dispatch(start_loading());
  try {
    const url = `${REACT_APP_BOMO_URL}superAdmin/ready_for_review_requests?page=${page}&limit=${limit}${
      search ? "&search=" + search : ""
    }`;
    const HEADERS = {
      headers: {
        "x-access-token": token,
      },
    };
    const res = await axios.get(url, HEADERS);
    if (res.data && res.data.status) {
      dispatch({ type: GET_ALL_REVIEW_REQUESTS, payload: res.data });
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
};

export const new_image_upload = async (dispatch, imagedata) => {
  dispatch(start_loading());
  try {
    const formData = new FormData();
    formData.append("imageFile", imagedata);
    const url = `${REACT_APP_BOMO_URL}request/fileupload`;
    const res = await axios.post(url, formData);

    if (res.data && res.data.status) {
      const imagePath = res.data.path;
      dispatch({ type: UPLOAD_NEW_IMAGE, payload: imagePath });
      return res.data.path;
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
};

export const image_download = async (dispatch, imgfile) => {
  dispatch(start_loading());
  try {
    const url = `${REACT_APP_BOMO_URL}download?file=${imgfile}`;
    const res = await axios.get(url);
    if (res) {
      dispatch({ type: GET_DOWNLOAD_PATH, payload: res.data.path });
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
};

export const image_delete = async (dispatch, imgpath, requestId) => {
  dispatch(start_loading());
  try {
    const url = `${REACT_APP_BOMO_URL}removeImage?file=${imgpath}&request_id=${requestId}`;
    const res = await axios.delete(url);
    if (res.data && res.data.status) {
      toast.success("Image Removed Successfully");
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
};

export const get_late_requests_superadmin = async (dispatch, token) => {
  dispatch(start_loading());
  try {
    const url = `${REACT_APP_BOMO_URL}superAdmin/late_active_requests`;
    const HEADERS = {
      headers: {
        "x-access-token": token,
      },
    };
    const res = await axios.get(url, HEADERS);
    if (res.data && res.data.status) {
      dispatch({ type: GET_LATE_REQUESTS, payload: res.data });
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
};

export const newRequest = async (requestdata, dispatch, token, navigate) => {
  dispatch(start_loading());
  try {
    const url = `${REACT_APP_BOMO_URL}customer/request_create`;
    const headers = {
      "Content-Type": "application/json",
      "x-access-token": token,
    };

    const requestdetails = {
      request_name: requestdata.requestName,
      request_type: requestdata.requestype,
      description: requestdata.description,
      file_type: requestdata.fileType,
      size: requestdata.size,
      references: requestdata.references,
      transparency: requestdata.transparency,
      status: requestdata.status,
    };
    if (requestdata?.request_id) {
      requestdetails.request_id = requestdata.request_id;
    }

    if (requestdata.uploadFiles && requestdata.uploadFiles?.length > 0) {
      requestdetails.image = requestdata.uploadFiles;
    }

    if (requestdata.brandProfile) {
      requestdetails.brand_profile = requestdata.brandProfile;
    }

    const res = await axios.post(url, JSON.stringify(requestdetails), {
      headers,
    });
    if (res.data && res.data.status) {
      await get_user_subscription({ token: token }, dispatch);
      await get_draft_requestlist(dispatch, token);
      change_add_edit(dispatch);
      toast.success(
        `Request ${
          requestdata?.request_id
            ? "updated"
            : requestdata?.status === "draft"
            ? "drafted"
            : "Created"
        } Successfully`
      );
      dispatch({
        type: SUBMIT_NOW,
        payload: requestdata?.status === "pending" ? true : false,
      });
      dispatch({ type: GET_NEW_REQUEST, payload: res?.data });
      if (requestdata?.status === "draft") {
        navigate("/");
      }
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
};

export const get_edit_request_data = (requestdetails) => {
  return { type: GET_EDIT_REQUEST_DATA, payload: requestdetails };
};

export const deliever_request_details = (requestdata) => {
  return { type: DELIEVER_REQUEST_DATA, payload: requestdata };
};
