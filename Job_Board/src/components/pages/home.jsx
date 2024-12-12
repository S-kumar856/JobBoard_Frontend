import React, { useEffect, useState } from "react";
import { getJobsService } from "../../services";
import './home.css'
import { useNavigate } from "react-router-dom";
import { deleteJobService } from "../../services";
import toast from 'react-hot-toast';

function Home() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true)

    // reading the data from the backend
    const fetchJob = async () => {
        setLoading(true)
        const response = await getJobsService();
        if (response.status === 200) {
            const data = await response.json()
            setJobs(data)
        }
        else {
            console.log(response)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchJob()
    }, [])

    //  handle event for deeleting job
    const handleJobDelete = async (id) =>{
    
        const res = await deleteJobService(id)
        toast.success(res.message)
        if(res.status === 200){
            const data = await res.json()
            
            console.log(data)
            alert("Job deleted Successfully")
            fetchJob()
        }

        else if (res.status === 401){
            alert('login to delete job')

        }
        else{
            console.log(res)
            toast.error(res.message)
            alert('you are not authorized to delete this job')
        }
    }


    console.log(jobs)
    const navigate = useNavigate();
    return (
        <>
            <h1>WEL Come to HomePage</h1>
            {loading ? <h1>Loading....</h1> : jobs.map((job) => (
                <div className="jobs" key={job.id}>

                    <div className="job">
                        <h3>{job.companyName}</h3>
                        <h3>{job.jobPosition}</h3>
                        <h3>{job.jobType}</h3>
                        <h3>{job.salary}</h3>
                        <h3>{job.skills}</h3>
                        <p>{job.descripion}</p>

                        <button onClick={() => navigate(`/updatejob/${job._id}`)}>Edit</button>
                        <button onClick={() => handleJobDelete(job._id)}>Delete</button>

                    </div>
                </div>

            ))
            }
        </>
    )
}

export default Home;