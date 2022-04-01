import React, { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid';
import axios from "axios"
import "./home.scss";
import EditModal from '../editModal/EditModal';
import DeleteModal from '../deleteModel/deleteModal';

const Home = () => {
    const unique_id = uuid();
    const [loading, setLoading] = useState(false)
    const [jobName, setJobName] = useState(null)
    const [jobPriotary, setJobPriotary] = useState(null);
    const [alertMessage, setAlertMessage] = useState(null);
    const [jobList, setJobList] = useState([])
    const [modalOpen, setModalOpen] = useState(false);
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
    const [editData, setEditData] = useState()

    useEffect(async () => {
        var items = JSON.parse(localStorage.getItem('jobList'))
        if (items != null) {
            await axios.get("http://localhost:3005/").then(function (response) {
                for (const key in JSON.parse(localStorage.getItem('jobList'))) {
                    if (Object.hasOwnProperty.call(JSON.parse(localStorage.getItem('jobList')), key)) {
                        const element = JSON.parse(localStorage.getItem('jobList'))[key];
                    }
                }
                var result = []
                response.data.forEach(function (key) {
                    items = items.filter(function (item) {
                        if (item.jobPriotary == key) {
                            result.push(item);
                            return false;
                        } else
                            return true;
                    })
                })

                setJobList(result)
                setLoading(true)
            }).catch(function (err) {
                console.log(err)
                setJobList(items)
                setLoading(true)
            })
        } else {
            setLoading(true)
        }
    }, [])
    const handleAddJob = () => {
        var val = jobName.match(/^[a-zA-Z0-9- ]*$/);
        if (val != null) {
            if (jobName != null && jobPriotary != null && jobPriotary != "0") {
                if (jobName.length > 255) {
                    setAlertMessage("Job name is max length 255")
                } else {
                    var jobList = JSON.parse(localStorage.getItem('jobList') || "[]");
                    var job = {
                        uuid: unique_id,
                        jobName: jobName,
                        jobPriotary: jobPriotary,
                    };
                    jobList.push(job);
                    localStorage.setItem("jobList", JSON.stringify(jobList));
                    setJobList(JSON.parse(localStorage.getItem('jobList') || "[]"))
                    setAlertMessage("")
                }
            } else {
                setAlertMessage("Fields is not null")
            }
        } else {
            setAlertMessage("It has an invalid character")
        }
        console.log(val)
    }
    const handleEditJob = (uuid) => {

        let items = JSON.parse(localStorage.getItem('jobList'));
        for (var i = 0; i < items.length; i++) {
            if (items[i].uuid === uuid) {
                console.log(items[i])
                setEditData(items[i])
                setModalOpen(true);
            }
        }
    }
    const handleDeleteJob = (uuid) => {

        let items = JSON.parse(localStorage.getItem('jobList'));
        for (var i = 0; i < items.length; i++) {
            if (items[i].uuid === uuid) {
                console.log(items[i])
                setEditData(items[i])
                setModalDeleteOpen(true)
            }
        }
    }
    const handleSearchJobName = () => {
        var input = document.getElementById("search_input");
        var filter = input.value.toUpperCase();
        var table = document.getElementById("jobTable");
        var tr = table.getElementsByTagName("tr");
        var td, i;

        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
    const handleSearchJobPriotary = (value) => {
        let list = JSON.parse(localStorage.getItem('jobList'))
        var newData;
        if (value != "0") {
            newData = list.filter((item) => item.jobPriotary == value).map(({ uuid, jobName, jobPriotary }) => ({ uuid, jobName, jobPriotary }));
            setJobList(newData)

        } else {
            setJobList(list)
        }
        console.log(newData)
    }
    return (
        <div className='container'>
            <div className="header">
                <h3>LOGO</h3>
            </div>
            <div className="content">
                <div className="create__content">
                    <div className="title">
                        <h5>Create New Job</h5>
                    </div>
                    <div className="create__content-items">
                        <div className="create__content-item">
                            <label htmlFor="">Job Name</label>
                            <input type="text" onChange={(e) => setJobName(e.target.value)} />
                        </div>
                        <div className="create__content-item">
                            <label htmlFor="">Job Priotary</label>
                            <select id="" placeholder='Priority(All)' onChange={(e) => setJobPriotary(e.target.value)}>
                                <option value="0" disabled selected>Choose</option>
                                <option value="1">Urgent</option>
                                <option value="2">Regular</option>
                                <option value="3">Trival</option>
                            </select>
                        </div>
                        <button onClick={() => handleAddJob()}>Create</button>
                        <p>{alertMessage}</p>
                    </div>
                    <div className="list__content-items">
                        <div className="title">
                            <h5>Create New Job</h5>
                        </div>
                        <div className='list__content-item'>
                            <input type="text" placeholder='Job Name' id='search_input' onKeyUp={handleSearchJobName} />
                            <select placeholder='Priority(All)' onChange={(e) => handleSearchJobPriotary(e.target.value)}>
                                <option value="0">All</option>
                                <option value="1">Urgent</option>
                                <option value="2">Regular</option>
                                <option value="3">Trival</option>
                            </select>
                        </div>
                        <div className="list__content-table">
                            <table id='jobTable'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Prioriy</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading == true && jobList.map((job, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{job.jobName}</td>
                                                <td>
                                                    {job.jobPriotary == 1 && <button className='button urgent'>Urgent</button>}
                                                    {job.jobPriotary == 2 && <button className='button regular'>Regular</button>}
                                                    {job.jobPriotary == 3 && <button className='button trival'>Trival</button>}
                                                </td>
                                                <td className='table__button'>
                                                    <button className='edit__button' onClick={() => handleEditJob(job.uuid)}>Düzenle</button>
                                                    <button className='delete__button' onClick={() => handleDeleteJob(job.uuid)}>Sil</button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {modalOpen && <EditModal setOpenModal={setModalOpen} editData={editData} />}
            {modalDeleteOpen && <DeleteModal setOpenDeleteModal={setModalDeleteOpen} editData={editData} />}

        </div>
    )
}

export default Home