import { format } from "date-fns";
import React from "react";

const AssignStatus = ({ expanddetails }) => {
    const formattedTime = (timeDate) => {
        const date = new Date(timeDate);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };
    return (
        <div className="progress_bar approve_progress_bar px-4">
            <div className="step">
                <p className="brief-content invisible">0</p>
                <div className="deliver-status">
                    <p className="brief-content">Brief Published</p>
                </div>
                <p className="brief-date">
                    {expanddetails?.req_data?.createdAt ? format(new Date(expanddetails?.req_data?.createdAt), 'dd/MM/yyyy') : 'No Date'}
                    <span className="d-block">{formattedTime(expanddetails?.req_data?.createdAt)}</span></p>
            </div>
            <div className="hr_line"></div>

            <div className={`${(!expanddetails?.req_data?.brief_approved_at && !expanddetails?.req_data?.brief_rejected_at) ? '' : ''}`}>
                {((!expanddetails?.req_data?.brief_approved_at && !expanddetails?.req_data?.brief_rejected_at)) &&
                    <div className="">
                        <p className="brief-content">Brief Pending</p>
                        <div className="deliver-status delivery-cancel">
                            <span> <i className="fa-solid fa-exclamation-circle cancel"></i></span>
                        </div>
                        <p className="brief-date"><span className="d-block"></span></p>
                    </div>}
            </div>
            <div className={`${(!expanddetails?.req_data?.brief_approved_at && !expanddetails?.req_data?.brief_rejected_at) ? 'd-flex' : ''}`}>
                {((!expanddetails?.req_data?.brief_approved_at && !expanddetails?.req_data?.brief_rejected_at)) &&
                  <div className="hr_line"></div>} 
            </div>
          

            <div className={`${expanddetails?.req_data?.brief_rejected_at ? "step" : ''}`}>
                {expanddetails?.req_data?.brief_rejected_at &&
                    expanddetails?.req_data?.brief_rejected_at?.map((item) =>
                        <div>
                            <p className="brief-content">Brief Rejected</p>
                            <div className="deliver-status delivery-cancel">
                                <span><i className="fa-solid fa-circle-xmark"></i></span>
                            </div>
                            <p className="brief-date">
                                {format(new Date(item), 'dd/MM/yyyy')}
                                <span className="d-block">{formattedTime(item)}</span></p>
                        </div>)}
            </div>
            <div className={`${expanddetails?.req_data?.brief_rejected_at ? "d-flex" : ''}`}>
                {expanddetails?.req_data?.brief_rejected_at &&
                    expanddetails?.req_data?.brief_rejected_at?.map((item) =>
                       
                   <div className="hr_line"></div>)}
            </div>

            <div className={`${expanddetails?.req_data?.brief_approved_at ? 'step' : ''}`}>
                {expanddetails?.req_data?.brief_approved_at &&
                    <div className="">
                        <p className="brief-content">Brief Approved</p>
                        <div className="deliver-status delivery-check">
                            <span><i className="fa-solid fa-circle-check"></i></span>
                        </div>
                        <p className="brief-date">
                            {format(new Date(expanddetails?.req_data?.brief_approved_at), 'dd/MM/yyyy')}
                            <span className="d-block">{formattedTime(expanddetails?.req_data?.brief_approved_at)}</span>
                        </p>
                    </div>}
            </div>
            <div  className={`${expanddetails?.req_data?.brief_approved_at ? 'd-flex' : ''}`}>
                {expanddetails?.req_data?.brief_approved_at && 
                <div className="hr_line"></div>
                }
            </div>

            <div className="step step-request-count">
                <p className="brief-content invisible">Brief Rejected</p>
                <div className="deliver-status delivery-request-count">
                    <span className="bg-white rounded-pill px-1">{expanddetails?.req_data?.designer_list?.length} applicants</span>
                </div>
                <p className="brief-date invisible">16/03/2023 <span className="d-block">12:44</span></p>
            </div>
        </div>
    )
};

export default AssignStatus;
