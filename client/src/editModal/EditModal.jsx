import React, { useEffect, useState } from 'react'
import "./editModal.scss"
const EditModal = ({ setOpenModal, editData }) => {
    const [jobPriotary, setJobPriotary] = useState(null);
    useEffect(() => {
        setJobPriotary(editData.jobPriotary)
    }, [])
    const setJobPriotaryChange = (value) => {
        setJobPriotary(value)
    }
    const updateJob = () => {
        var jobList = JSON.parse(localStorage.getItem('jobList') || "[]");
        var index = jobList.findIndex(obj => obj.uuid === editData.uuid)
        jobList.splice(index, 1);

        var job = {
            uuid: editData.uuid,
            jobName: editData.jobName,
            jobPriotary: jobPriotary,
        };
        jobList.push(job)
        localStorage.setItem("jobList", JSON.stringify(jobList));
        window.location.reload();
    }
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="title">
                    <h1>Job Edit</h1>
                </div>
                <div className="body">
                    <div className="create__content-item">
                        <label htmlFor="">Job Name</label>
                        <input disabled type="text" value={editData.jobName} />
                    </div>
                    <div className="create__content-item">
                        <label htmlFor="" >Job Priotary</label>
                        <select onChange={(e) => setJobPriotaryChange(e.target.value)} value={jobPriotary} placeholder='Priority(All)'>
                            <option value="1">Urgent</option>
                            <option value="2">Regular</option>
                            <option value="3">Trival</option>
                        </select>
                    </div>
                </div>
                <div className="footer">
                    <button onClick={() => {
                        setOpenModal(false);
                    }}
                        id="cancelBtn">Cancel</button>
                    <button onClick={() => updateJob()}>
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditModal