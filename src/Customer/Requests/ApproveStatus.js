import { format } from "date-fns";
import React from "react";

const ApproveStatus = ({ expanddetails }) => {

    const formattedTime = (timeDate) => {
        const date = new Date(timeDate);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    return (
        <div class="progress_bar">
            <div class="step">
                <p className="brief-content invisible">0</p>
                <div class="deliver-status">
                    <p className="brief-content">Brief Published</p>
                </div>
                <p className="brief-date">
                    {expanddetails?.req_data?.createdAt ? format(new Date(expanddetails?.req_data?.createdAt), 'dd/MM/yyyy') : 'No Date'}
                    <span className="d-block">{formattedTime(expanddetails?.req_data?.createdAt)}</span></p>
            </div>
            {(!expanddetails?.req_data?.brief_approved_at) && (expanddetails?.req_data?.brief_rejected_at?.length===0) && <div className="mt-3">
                <div class="deliver-status">
                    <p className="brief-content mt-2">In-Progress</p>
                </div>
                {/* <div class="">
                    <span> <i className="fa-solid fa-spinner fa-spin"></i></span>
                </div> */}
            </div>}

            <div class={`${expanddetails?.req_data?.brief_rejected_at ? 'step' : ''}`}>
                {expanddetails?.req_data?.brief_rejected_at &&
                    expanddetails?.req_data?.brief_rejected_at?.map((item) => 
                    <div>
                        <p className="brief-content">Brief Rejected</p>
                        <div class="deliver-status delivery-cancel">
                            <span><i class="fa-solid fa-circle-xmark"></i></span>
                        </div>
                        <p className="brief-date">
                            {format(new Date(item), 'dd/MM/yyyy')}
                            <span className="d-block">{formattedTime(item)}</span></p>
                    </div>)}
            </div>

            <div class={`${expanddetails?.req_data?.brief_approved_at ? 'step' : ''}`}>
                {expanddetails?.req_data?.brief_approved_at &&
                    <div>
                        <p className="brief-content">Brief Approved</p>
                        <div class="deliver-status delivery-check">
                            <span><i class="fa-solid fa-circle-check"></i></span>
                        </div>
                        <p className="brief-date">
                            {format(new Date(expanddetails?.req_data?.brief_approved_at), 'dd/MM/yyyy')}
                            <span className="d-block">{formattedTime(expanddetails?.req_data?.brief_approved_at)}</span>
                        </p>
                    </div>}
            </div>
        </div>
    )
};

export default ApproveStatus;
