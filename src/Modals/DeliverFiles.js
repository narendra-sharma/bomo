import React from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const DeliverFiles = ({show,onClose,requestdata}) => {
    const navigate = useNavigate();
    const handleRequest = () => {
        const data = {
            _id: requestdata?._id,
            request_name: requestdata?.request_name,
            request_type: requestdata?.request_type, 
            delivery_date: requestdata?.delivery_date,
            description: requestdata?.description,
            size: requestdata?.size,
            file_type: requestdata?.file_type,
            transparency: requestdata?.transparency,
            references: requestdata?.references,
            brand_details: requestdata?.brand_profile,
            brandname: requestdata?.brand_profile?.brandname,
            file: requestdata?.file,
            status: 'completed' 
        };
        localStorage.setItem('requestData', JSON.stringify(data));
        navigate('/request-expand');
    };
    return (
        <Modal show={show} onHide={onClose} size="xl" className="logout-popup">
            <Modal.Body>
                <div className="py-5 px-60 rounded">
                    <div className="review-main-content review-delvery-popup p-5 rounded text-center extra-dark-green">
                        <h1 className="extra-dark-green h2 fw-bold mt-3">Congratulation</h1>
                        <h4>Your delivery for <span className="fw-bold">{requestdata?.request_name}</span>
                            <span className="d-block">has been approved and files are ready</span></h4>
                        <div className="my-5 pt-3 pb-4">
                            <button className="review-btn fw-bold rounded-pill px-2" onClick={handleRequest}>Get My files</button>
                        </div>
                        <p className="mb-0">Time Share Your Creation!</p>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
};

export default DeliverFiles;
