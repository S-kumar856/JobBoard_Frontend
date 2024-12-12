import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateJobService, getJobByIdService } from "../../services";

// import toast from "react-toastify";

function UpdateJob() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [jobFormData, setJobFormData] = useState({
        companyName: "",
        jobPosition: "",
        salary: "",
        jobType: "",
        jobDescription: "",
        jobRequirements: "",
        location: "",
        skills: "",
        Company: "",
    });

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                const res = await getJobByIdService(id);
                if (res.status === 200) {
                    // toast.success("Job updated successfully!");
                    const data = await res.json();
                    setJobFormData(data);
                } else {
                    console.log(res);
                }
            };
            fetchData();
        }
    }, [id]);

    const handleJobformData = (e) => {
        const { name, value } = e.target;
        setJobFormData({ ...jobFormData, [name]: value });
    };

    const handlejobSubmitData = async (e) => {
        e.preventDefault();
        const res = await updateJobService(id, jobFormData);
        if (res.status === 200) {
            const data = await res.json();
            console.log(data);

            setJobFormData({
                companyName: "",
                jobPosition: "",
                salary: "",
                jobType: "",
                jobDescription: "",
                jobRequirements: "",
                location: "",
                skills: "",
                Company: "",
            });
            alert("Job updated successfully");
            navigate("/home");
        } else if (res.status === 401) {
            alert("Login to update the Job");
        } else {
            console.log(res);
            alert("You are not authorized to update this job");
        }
    };

    return (
        <>
            <h1>Update Job</h1>
            <form onSubmit={handlejobSubmitData}>
                <input
                    type="text"
                    value={jobFormData.companyName}
                    onChange={handleJobformData}
                    name="companyName"
                    placeholder="Enter company name"
                />
                <input
                    type="text"
                    value={jobFormData.jobPosition}
                    onChange={handleJobformData}
                    name="jobPosition"
                    placeholder="Enter job position"
                />
                <input
                    type="text"
                    value={jobFormData.salary}
                    onChange={handleJobformData}
                    name="salary"
                    placeholder="Enter Salary"
                />

                <input
                    type="text"
                    name="jobDescription"
                    value={jobFormData.jobDescription}
                    onChange={handleJobformData}
                    placeholder="Enter job description"
                />

                <input
                    type="text"
                    name="jobRequirements"
                    value={jobFormData.jobRequirements}
                    onChange={handleJobformData}
                    placeholder="Enter job requirements"
                />
                <input
                    type="text"
                    name="location"
                    value={jobFormData.location}
                    onChange={handleJobformData}
                    placeholder="Enter job location"
                />

                <input
                    type="text"
                    name="skills"
                    value={jobFormData.skills}
                    onChange={handleJobformData}
                    placeholder="Enter required skills"
                />

                <input
                    type="text"
                    name="Company"
                    value={jobFormData.Company}
                    onChange={handleJobformData}
                    placeholder="Enter company type"
                />

                <select
                    name="jobType"
                    value={jobFormData.jobType}
                    onChange={handleJobformData}
                >
                    <option value="">Select Job Type</option>
                    <option value="full-time">full-time</option>
                    <option value="part-time">part-time</option>
                    <option value="contract">contract</option>
                    <option value="internship">internship</option>
                    <option value="freelance">freelance</option>
                </select>

                <button type="submit">Update Job</button>
            </form>
        </>
    );
}

export default UpdateJob;
