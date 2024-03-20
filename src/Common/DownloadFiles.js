import React from "react";
import { saveAs } from 'file-saver';

const { REACT_APP_BOMO_URL } = process.env;
const DownloadFiles = ({FileURL}) => {
    const handleDownload = async (fileUrl) => {
        const Urls = [fileUrl];

        Urls.forEach(async (url) => {
            const filepath = url.includes('+') ? url.replace(/\+/g, '%2B') : url;
            const fileContent = `${REACT_APP_BOMO_URL}download?file=${filepath}`;
            const fileName = url?.substring(url?.lastIndexOf("/") + 1);
            const getMimeType = (ext) => {
                const mimeTypes = {
                    txt: "text/plain",
                    pdf: "application/pdf",
                    zip: "application/zip",
                    jpg: "image/jpeg",
                    jpeg: "image/jpeg",
                    png: "image/png",
                    gif: "image/gif",
                    mp4: "video/mp4",
                    mov: "video/quicktime"
                };
                return mimeTypes[ext] || "application/octet-stream";
            };

            const response = await fetch(fileContent);
            const blobFile = await response.blob();
            const fileExtension = fileName?.split(".").pop().toLowerCase();
            const mimeType = getMimeType(fileExtension);
            const blobwithtype = new Blob([blobFile], { type: mimeType });
            saveAs(blobwithtype, fileName);
        });
    };

    return (
        <div>
            {handleDownload(FileURL)}
        </div>
    )
};

export default DownloadFiles;
