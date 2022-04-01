import React from 'react'
import "./deleteModal.scss"
const deleteModal = ({ setOpenDeleteModal, editData }) => {
    
    const deleteJob = () => {
        var jobList = JSON.parse(localStorage.getItem('jobList') || "[]");
        var index = jobList.findIndex(obj => obj.uuid === editData.uuid)
        jobList.splice(index, 1);
        localStorage.setItem("jobList", JSON.stringify(jobList));
        window.location.reload();
    }
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="title">
                    <h1>Are you sure you want to delete it ?</h1>
                </div>
                
                <div className="footer">
                    <button onClick={() => {
                        setOpenDeleteModal(false);
                    }}
                        id="cancelBtn">Cancel</button>
                    <button onClick={() => deleteJob()}>
                        Approve
                    </button>
                </div>
            </div>
        </div>
    );
}

export default deleteModal