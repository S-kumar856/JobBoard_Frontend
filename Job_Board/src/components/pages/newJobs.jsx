import React, { useEffect, useState } from "react";
import { crateJobService } from "../../services";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


function NewJobs() {
    const navigate = useNavigate();
    const [jobFormData, setJobFormData] = useState({
        companyName: "",
        jobPosition: "",
        salary: "",
        jobType: "",
        jobDescription:"",
        jobRequirements:"",
        location:"",
        skills:"",
        Company:""
    });

    const handleJobformData = (e) =>{
        const { name, value} = e.target;
        setJobFormData({...jobFormData, [name]:value})
    }

    const handlejobSubmitData = async (e) =>{
        e.preventDefault();
        const  res = await crateJobService(jobFormData)
        if(res.status === 200){
            const data = await res.json()
            console.log(data)
            
            setJobFormData({
                companyName: "",
                jobPosition: "",
                salary: "",
                jobType: "",
                jobDescription:"",
                jobRequirements:"",
                location:"",
                skills:"",
                Company:""
            })
            toast.success(`Job created successfully`)
            navigate('/home')
        } 
        else if( res.status === 401){
            toast.error("Login to create a Job")
        }
        else{
            console.log(res)
            toast.error('You are not authorized to update  this job')
        }
    };

    return (
        <>
            <h1>New Job</h1>
            <form onSubmit={handlejobSubmitData}>
                <input type="text" value={jobFormData.companyName}
                    onChange={handleJobformData}
                    name="companyName" placeholder="Enter company name" />
                <input type="text" value={jobFormData.jobPosition}
                    onChange={handleJobformData}
                    name="jobPosition" placeholder="Enter job position" />
                <input type="text" value={jobFormData.salary}
                    onChange={handleJobformData}
                    name="salary" placeholder="Enter Salary" />

                <input type="text" name="jobDescription" value={jobFormData.jobDescription} 
                onChange={handleJobformData} placeholder="Enter job description"/>

                <input type="text" name="jobRequirements" value={jobFormData.jobRequirements} 
                onChange={handleJobformData} placeholder="Enter job requirements"/>
                <input type="text" name="location" value={jobFormData.location} 
                onChange={handleJobformData} placeholder="Enter job location" />

                <input type="text" name="skills" value={jobFormData.skills} 
                onChange={handleJobformData} placeholder="Enter required skills"/>

                <input type="text" name="Company" value={jobFormData.Company} 
                onChange={handleJobformData} placeholder="Enter company type"/>

                <select name="jobType" value={jobFormData.jobType} 
                onChange={handleJobformData}>
                    <option value="">Select Job Type</option>
                    <option value="full-time">full-time</option>
                    <option value="part-time">part-time</option>
                    <option value="contract">contract</option>
                    <option value="internship">internship</option>
                    <option value="freelance">freelance</option>
                </select>
                <button type="submit">Post job</button>

            </form>
        </>
    )
}

export default NewJobs;