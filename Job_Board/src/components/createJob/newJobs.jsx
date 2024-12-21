import React, { useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { crateJobService } from "../../services";
import "./NewJob.css";
import { getJobByIdService, updateJobService } from "../../services";
import wallpaper from "../images/newjob.png";
const NewJob = () => {
  const [isEdit, setIdEdit] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      setIdEdit(true);
    }
  }, [id]);
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
      jobDescription:"",
  });

  useEffect(() => {
    if ((isEdit, id)) {
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
  }, [isEdit, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(jobFormData)
    const res = isEdit
      ? await updateJobService(id, jobFormData)
      : await crateJobService(jobFormData);
    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      alert(isEdit ? `Job edited succesfully` : `Job created successfully`);
    } else if (res.status === 401) {
      alert("login to create job");
    } else {
      console.log(res);
      alert("error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobFormData({ ...jobFormData, [name]: value });
  };

  return (
    <div className="new-job">
    <div className="form m-10">
    <form onSubmit={handleSubmit}>
        <div className="flex input-box">
          <label htmlFor="Company Name " style={{ marginRight: "1rem" }}>
            Company Name
          </label>
          <input
            type="text"
            name="companyName"
            value={jobFormData.companyName}
            onChange={handleChange}
            placeholder="Enter your company name here"
            className="add-job-input"
          />
        </div>

        <div className="flex input-box">
          <label htmlFor="logo URL" style={{ marginRight: "1rem" }}>
            Add logo URL
          </label>
          <input
            type="text"
            name="logoUrl"
            value={jobFormData.logoUrl}
            onChange={handleChange}
            placeholder="Enter the link"
            className="add-job-input"
          />
        </div>

        <div className="flex input-box">
          <label htmlFor="Job position " style={{ marginRight: "1rem" }}>
            Job position
          </label>
          <input
            type="text"
            name="jobPosition"
            value={jobFormData.jobPosition}
            onChange={handleChange}
            placeholder="Enter job position"
            className="add-job-input"
          />
        </div>

        <div className="flex input-box">
          <label htmlFor="Monthly salary" style={{ marginRight: "1rem" }}>
            Monthly salary
          </label>
          <input
            type="text"
            name="salary"
            value={jobFormData.salary}
            onChange={handleChange}
            placeholder="Enter Amount in rupees"
            className="add-job-input"
          />
        </div>

        <div className="flex input-box select-type-box">
          <label htmlFor="Job Type">Job Type</label>

          <select
            className="add-job-input input-select-type"
            style={{ marginLeft: "9.5rem" }}
            type="text"
            name="jobType"
            value={jobFormData.jobType}
            onChange={handleChange}
          >
            <option value="">Select Job Type</option>
            <option value="full-time">full-time</option>
            <option value="part-time">part-time</option>
            <option value="contract">contract</option>
            <option value="internship">internship</option>
            <option value="freelancer">freelancer</option>
          </select>
        </div>

        <div className="flex input-box select-type-box">
          <label htmlFor="Remote/office">Remote/office</label>
          <select
          name="remote"
            value={jobFormData.remote}
            onChange={handleChange}
            className="add-job-input input-select-type"
            style={{ marginLeft: "7rem" }}
          >
            <option value="Select">Select</option>
            <option value="Home">Home</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Office">Office</option>
          </select>
        </div>

        <div className="flex input-box">
          <label htmlFor="Location" style={{ marginRight: "1rem" }}>
            Location
          </label>
          <input
            type="text"
            name="location"
            value={jobFormData.location}
            onChange={handleChange}
            placeholder="Enter Location"
            className="add-job-input"
          />
        </div>

        <div className="flex input-box">
          <label htmlFor="Job Description" style={{ marginRight: "1rem" }}>
            Job Description
          </label>
          <textarea
          value={jobFormData.jobDescription}
          onChange={handleChange}
            type="text"
            name="jobDescription"
            placeholder="Type the job description"
            className="add-job-input"
            style={{ fontFamily: "DM Sans", height: "2rem" }}
          />
        </div>
        <div className="flex input-box">
          <label htmlFor="Job Description" style={{ marginRight: "1rem" }}>
            About Company
          </label>
          <textarea
          value={jobFormData.aboutCompany}
          onChange={handleChange}
            type="text"
            name="aboutCompany"
            placeholder="Type the about company"
            className="add-job-input"
            style={{ fontFamily: "DM Sans", height: "2rem" }}
          />
        </div>

        <div className="flex input-box">
          <label htmlFor="Skills Required" style={{ marginRight: "1rem" }}>
            Skills Required
          </label>
          <input
            type="text"
            name="skills"
            value={jobFormData.skills}
          onChange={handleChange}
            placeholder="Enter the must have skills"
            className="add-job-input"
          />
        </div>

        <div className="edit-job-btns flex">
          <button
            className=" buttons px-10 py-3 edit-btns"
            style={{
              border: "1px solid #c2c2c2",
              backgroundColor: "transparent",
              color: "#C2C2C2",
            }}
          >
            Cancel
          </button>
          <button
            className="buttons edit-btns px-10 py-3"
            style={{ backgroundColor: "#ED5353", color: "#ffff" }}
           type="submit"
           onClick={()=>navigate('/home')}

          >
            + Add Job
          </button>
        </div>
      </form>

    </div>
    <div className="wallpaper">
      <img src={wallpaper} alt="wallpaper" />
    </div>
          </div>
  );
};

export default NewJob;
