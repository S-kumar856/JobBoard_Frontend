import React, { useEffect, useState } from "react";
import { getJobsService } from "../../services";
import './home.css'
import { useNavigate } from "react-router-dom";
import { deleteJobService } from "../../services";
import { toast } from 'react-toastify';

function Home() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [count, setCount] = useState(0);
    const [search, setSearch] = useState('')

    // reading the data from the backend
    const fetchJob = async () => {
        try {
            setLoading(true);
            const response = await getJobsService(limit, offset * limit,  search);
           
            if (response.status === 200) {
                const data = await response.json()
                setJobs(data.jobs)
                setCount(data.count)
            }
            else {
                console.log(response)
            }
            setLoading(false)
        }
        catch (err) {
            console.error("Error fetching jobs: ", err);
            toast.error("Failed to fetch jobs. Please try again later.");
            setLoading(false);
        }
    }
   
    useEffect(() => {
        fetchJob()
    }, [limit, offset, search])

    //  handle event for deeleting job
    const handleJobDelete = async (id) => {
        try {
            const res = await deleteJobService(id)
            if (res.status === 200) {
                const data = await res.json()
                console.log(data)
                toast.success("Job deleted Successfully")
                fetchJob()
            }
            else if (res.status === 401) {
                toast.error('login to delete job')
            }
            else {
                console.log(res)
                toast.error('you are not authorized to delete this job')
            }

        } catch (error) {
            console.log(error)
        }
    }

    const navigate = useNavigate();
    return (
        <div>
            <h1>Well Come to HomePage</h1>
            {loading ? <h1>Loading....</h1> : <>
                <input type="text"  onChange={(e) => setSearch(e.target.value)} value={search}
                    placeholder="Search Jobs"/>

                <div style={{
                    width: "400px",
                    height: "400px",
                    overflow: 'scroll',
                    margin: "30px",
                    padding: "10px",

                }}>{jobs.map((job) => (
                    <div key={job.id}>
                        <div className="joob">
                            <h3>{job.companyName}</h3>
                            <h3>{job.jobPosition}</h3>
                            <h3>{job.jobType}</h3>
                            <h3>{job.salary}</h3>
                            <h3>{job.skills}</h3>
                            <p>{job.descripion}</p>
                            <button onClick={() => navigate(`/updatejob/${job._id}`)}>Edit</button>
                            <button onClick={() => handleJobDelete(job._id)}>Delete</button>
                        </div>
                    </div>))}
                </div>
                <select value={limit} onChange={(e) => setLimit(e.target.value)}>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                    <option value="30">30</option>
                </select>
                <button disabled={offset === 0} onClick={() => setOffset((offset) => offset - 1)}>Prev</button>
                <button disabled={offset * limit + limit >= count} onClick={() => setOffset((offset) => offset + 1)}>Next</button>
            </>}
        </div>
    )
}

export default Home;