import React, { useEffect, useState } from "react";
import { getJobsService } from "../../services";

function Home() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
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
        fetchJob()
    }, [])
    console.log(jobs)
    return (
        <>
            <h1>WEL Come to HomePage</h1>
            {loading ? <h1>Loading....</h1> : jobs.map((job) => (
                <div key={job.id}>
                    <h3>{job.companyName}</h3>
                    <h3>{job.jobPosition}</h3>
                    <h3>{job.jobType}</h3>
                    <h3>{job.salary}</h3>
                    <h3>{job.skills}</h3>
                    <p>{job.descripion}</p>

                </div>

            ))
            }
        </>
    )
}

export default Home;