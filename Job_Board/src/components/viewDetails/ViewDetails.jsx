import React,{useEffect, useState} from 'react'
import { useParams } from "react-router-dom";
import { getJobByIdService} from "../../services";
import Header from "../headers/Header";
import "./ViewDetails.css"

const ViewDetails = () => {
    const { id } = useParams();
   const [jobFormData, setJobFormData] = useState({
        companyName:"",
         jobPosition:"",
         salary:"",
         jobType:"",
         aboutCompany:"",
         logoUrl:"",
         location:"",
         remote:"",
         skills:"",
         jobDescription:""
     });
   
     useEffect(() => {
       if ((id)) {
         const fetchJob = async () => {
           const res = await getJobByIdService(id);
           if (res.status === 200) {
             const data = await res.json();
             setJobFormData(data);
           } else {
             console.log(res);
           }
         };
         fetchJob();
       }
     }, [id]);
     console.log(jobFormData)
  return (
    <div>
    <div className="flex" style={{ backgroundColor: "#FFEFEF" }}>
      <div className="job-desc">
        <Header />
        <div className="top-job-desc">
          <p>
            {jobFormData ? jobFormData.jobPosition: ""}
            {jobFormData.jobType ? " work from office " : " work from home "}
            job/internship at
            <br />
            {jobFormData.companyName}
          </p>
        </div>
        <div className="bottom-job-desc">
          <div className="dec-time flex">
            <p>1w ago</p>
            <span style={{ fontSize: "2rem", transform: "translateY(-10px)" }}>
              .
            </span>
            <p>Full Time</p>
          </div>
          <div className="des-title flex">
            <h3 style={{ fontSize: "1.8rem" }}>
              {jobFormData ? jobFormData.jobPosition : ""}
            </h3>
            <button
              className="edit-job"
              //   onClick={() => navigate(`/editJob/${id}`)}
            >
              Edit job
            </button>
          </div>
          <div className="place">{jobFormData ? jobFormData.location : ""}</div>

          <div className="des-box flex">
            <div className="des-box-1 flex">
              <p className="flex" style={{ color: "#999999" }}>
                <svg
                  style={{ marginRight: "0.5rem" }}
                  width="18"
                  height="18"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.375 14C18.375 14.8653 18.1184 15.7112 17.6377 16.4306C17.1569 17.1501 16.4737 17.7108 15.6742 18.042C14.8748 18.3731 13.9951 18.4597 13.1465 18.2909C12.2978 18.1221 11.5183 17.7054 10.9064 17.0936C10.2946 16.4817 9.87787 15.7022 9.70906 14.8535C9.54025 14.0049 9.62689 13.1252 9.95803 12.3258C10.2892 11.5263 10.8499 10.8431 11.5694 10.3623C12.2888 9.88159 13.1347 9.625 14 9.625C15.1603 9.625 16.2731 10.0859 17.0936 10.9064C17.9141 11.7269 18.375 12.8397 18.375 14ZM27.125 7V21C27.125 21.2321 27.0328 21.4546 26.8687 21.6187C26.7046 21.7828 26.4821 21.875 26.25 21.875H1.75C1.51794 21.875 1.29538 21.7828 1.13128 21.6187C0.967187 21.4546 0.875 21.2321 0.875 21V7C0.875 6.76794 0.967187 6.54538 1.13128 6.38128C1.29538 6.21719 1.51794 6.125 1.75 6.125H26.25C26.4821 6.125 26.7046 6.21719 26.8687 6.38128C27.0328 6.54538 27.125 6.76794 27.125 7ZM25.375 12.0695C24.3814 11.7758 23.4772 11.2381 22.7445 10.5055C22.0119 9.77283 21.4742 8.86856 21.1805 7.875H6.81953C6.52576 8.86856 5.98807 9.77283 5.25545 10.5055C4.52283 11.2381 3.61856 11.7758 2.625 12.0695V15.9305C3.61856 16.2242 4.52283 16.7619 5.25545 17.4945C5.98807 18.2272 6.52576 19.1314 6.81953 20.125H21.1805C21.4742 19.1314 22.0119 18.2272 22.7445 17.4945C23.4772 16.7619 24.3814 16.2242 25.375 15.9305V12.0695Z"
                    fill="#999999"
                  />
                </svg>
                Stipend
              </p>
              <p>Rs {jobFormData ? jobFormData.salary : 0}/month</p>
            </div>
            <div className="des-box-2 flex">
              <p className="flex" style={{ color: "#999999" }}>
                <svg
                  style={{ marginRight: "0.5rem" }}
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.66663 15.8333C1.66663 17.25 2.74996 18.3333 4.16663 18.3333H15.8333C17.25 18.3333 18.3333 17.25 18.3333 15.8333V9.16663H1.66663V15.8333ZM15.8333 3.33329H14.1666V2.49996C14.1666 1.99996 13.8333 1.66663 13.3333 1.66663C12.8333 1.66663 12.5 1.99996 12.5 2.49996V3.33329H7.49996V2.49996C7.49996 1.99996 7.16663 1.66663 6.66663 1.66663C6.16663 1.66663 5.83329 1.99996 5.83329 2.49996V3.33329H4.16663C2.74996 3.33329 1.66663 4.41663 1.66663 5.83329V7.49996H18.3333V5.83329C18.3333 4.41663 17.25 3.33329 15.8333 3.33329Z"
                    fill="#999999"
                  />
                </svg>
                Duration
              </p>
              <p>6 Months</p>
            </div>
          </div>

          <div className="about about-company">
            <h3 className="about-title">About company</h3>
            <p className="about-des">
              {" "}
              {jobFormData ? jobFormData.aboutCompany : ""}
            </p>
          </div>
          <div className=" about about-job">
            <h3 className="about-title">About the job/internship</h3>
            <p className="about-des">
              {jobFormData ? jobFormData.jobDescription : ""}
            </p>
          </div>
          <div className="skill-req-des">
            <h3 className="about-title">Skill(s) required</h3>
            <div className="about-skills-req flex">
              {jobFormData &&
                jobFormData.skills &&
                jobFormData.skills.map((skill) => {
                  return <p className="sr" key={id}>{skill}</p>;
                })}
            </div>
          </div>

          <div className="ad-info">
            <h3 className="about-title">Additional Information</h3>
            <p className="about-des">
              Stipend structure: This is a performance-based internship. In
              addition to the minimum-assured stipend, you will also be paid a
              performance-linked incentive (₹ 2500 per design).
            </p>
          </div>
        </div>
      </div>
    </div>

    </div>
  )
}

export default ViewDetails