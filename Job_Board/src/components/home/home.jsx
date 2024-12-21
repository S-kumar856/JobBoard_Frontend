import { useState, useEffect, useCallback, useRef } from "react";
import { getJobsService } from "../../services";
import { useNavigate } from "react-router-dom";
import { deleteJobService } from "../../services";
import Header from "../headers/Header";
import "./home.css";
import { toast } from 'react-toastify';
import logo from "../images/image.png";
import ViewDetails from "../viewDetails/ViewDetails";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState('');

  const navigate = useNavigate();
  const abortControllerRef = useRef(null)
  const debounceTimerRef = useRef(null)

  // reading the data from the backend
  const fetchJob = useCallback(async () => {

    // cancle any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    // create a new AbortController
    abortControllerRef.current = new AbortController()
    const signal = abortControllerRef.current.signal

    try {
      setLoading(true);
      const response = await getJobsService(limit, offset * limit, search, signal);

      if (response.status === 200) {
        const data = await response.json()
        setJobs(data.jobs)
        setCount(data.count)
      }
      else {
        console.log('Failed to fetch jobs', response)
      }
    }
    catch (err) {
      if (err.name === 'AbortError') {
        console.log('Request was cancled')
      } else {
        console.log('Error fetching jobs', err)
        toast.error("Failed to fetch jobs. Please try again later.");
      }
    }
    finally {
      setLoading(false)
    }
  }, [limit, offset, search])

  // debounced fetch jobs

  const debouncedFetchJobs = useCallback(() => {
    // clear any existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    // set a new timer
    debounceTimerRef.current = setTimeout(() => {
      fetchJob()
    }, 2000); // debunce time 2000ms
  }, [fetchJob])


  // Effect to trigger debounced fetch
  useEffect(() => {
    // adding debouncing
    debouncedFetchJobs()

    // Cleanup function
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }

  }, [limit, offset, search, debouncedFetchJobs])


  // delete job

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


  return (
    <div>
      <Header />
      <div className="searchComponent">
        <div className="search">
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder="Search"
          />
        </div>
        <div className="skillset">
          <div className="skills">
            <select value={limit}>
              <option value="#">skills</option>
              <option value="python">python</option>
              <option value="java">java</option>
              <option value="HTML">HTML</option>
              <option value="CSS">CSS</option>
            </select>
          </div>

          <div className="clear">
            <button>Clear</button>
          </div>
          <div className="btn">
            <button onClick={() => navigate(`/newjob/`)}>+ Add Job</button>
          </div>
        </div>
      </div>

      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="jobs">
          <div>
            {jobs.map((job) => (
              <div key={job.id} className="Job-card">
                {console.log(typeof (job.skills))}
                <div className="company">
                  <div className="image">
                    <img src={job.logoUrl} alt="logo" />
                  </div>

                  <div className="company-desc">
                    <div className="job-position">{job.jobPosition}</div>
                    <div className="specs">
                      <i className="fa-solid fa-user-group">11-50</i>
                      <div className="job-salary">{job.salary}</div>
                      <div className="flex">
                        <img src={logo} alt="india-logo" />
                        <div className="job-location">{job.location}</div>
                      </div>
                    </div>
                    <div className="job-specs">
                      <div className="remote">{job.remote}</div>
                      <div className="job-type">{job.jobType}</div>
                    </div>
                  </div>
                </div>
                <div className="right">
                  <div className="skills">
                    {job.skills.map((item) => (
                      <div key={job._id} className="skill">
                        {item}

                      </div>
                    ))}
                    <button onClick={() => handleJobDelete(job._id)}><i className="fa-solid fa-trash"></i></button>
                  </div>
                 
                  <div className="edit">
                    <button
                      className="editBtn"
                      onClick={() => navigate(`/editJob/${job._id}`)}
                    >
                      Edit Details
                    </button>
                    {/* <button onClick={() => handleDeleteJob(job._id)}>
                    Delete
                  </button> */}
                  
                    <button className="viewDetails" onClick={() => navigate('/viewdetails')}>View Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="pagination">
            <select
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
            >
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="30">30</option>
            </select>
            <button disabled={offset === 0} onClick={() => setOffset((offset) => offset - 1)}>Prev</button>
            <button disabled={offset * limit + limit >= count} onClick={() => setOffset((offset) => offset + 1)}>Next</button>

          </div>
        </div>
      )}
    </div>
  );
}
