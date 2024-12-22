import React, { useState } from "react";
import EmployeService from "../Services/EmployeService";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [employee, setemployee] = useState({
    id: "",
    firstName: "",
    lastName: "",
    emailId: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  // const handleChange=(e)=>{
  //   const value=e.target.value;
  //   setemployee({...employee,[e.target.value]:value})

  // }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setemployee({ ...employee, [name]: value });
    validateField(name, value);
  };
  const validateField = (name, value) => {
    let fieldErrors = { ...errors };

    switch (name) {
      case "firstName":
        fieldErrors.firstName = value ? "" : "First name is required.";
        break;
      case "lastName":
        fieldErrors.lastName = value ? "" : "Last name is required.";
        break;
      case "emailId":
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        fieldErrors.emailId = emailPattern.test(value)
          ? ""
          : "Enter a valid email.";
        break;
      default:
        break;
    }
    setErrors(fieldErrors);
  };
  const saveEmployee = (e) => {
    e.preventDefault();
    if (Object.values(errors).some((error) => error)) {
      return; // Don't submit if there are errors
    } else {
      EmployeService.saveEmployee(employee)
        .then((response) => {
          //console.log(response);
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const isSaveDisabled =
    Object.values(errors).some((error) => error) ||
    !employee.firstName ||
    !employee.lastName ||
    !employee.emailId;

  const reset = (e) => {
    e.preventDefault();
    setemployee({
      id: "",
      firstName: "",
      lastName: "",
      emailId: "",
    });
  };

  return (
    <>
      <div className="flex max-w-2xl mx-auto shadow border-b mt-11">
        <div className="px-8 py-8">
          <div className="font-thin text-2xl tracking-wider">
            <h1>Add New Employee</h1>
          </div>
          <div className="items-center justify-center h-14 w-full my-4">
            <label className="block text-gray-600 text-sm font-normal">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={employee.firstName}
              onChange={(e) => handleChange(e)}
              className="h-10 w-96 border mt-2 px-2 py-2"
              placeholder="Enter employee's first name"
            ></input>
          </div>
          {errors.firstName && (
            <span className="text-red-500 px-2">{errors.firstName}</span>
          )}
          <div className="items-center justify-center h-14 w-full my-4">
            <label className="block text-gray-600 text-sm font-normal">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={employee.lastName}
              onChange={(e) => handleChange(e)}
              className="h-10 w-96 border mt-2 px-2 py-2"
              placeholder="Enter employee's last name"
            ></input>
          </div>
          {errors.lastName && (
            <span className="text-red-500 px-2">{errors.lastName}</span>
          )}
          <div className="items-center justify-center h-14 w-full my-4">
            <label className="block text-gray-600 text-sm font-normal">
              Email
            </label>
            <input
              type="email"
              name="emailId"
              value={employee.emailId}
              onChange={(e) => handleChange(e)}
              className="h-10 w-96 border mt-2 px-2 py-2"
              placeholder="Enter employee's email id"
            ></input>
          </div>
          {errors.emailId && (
            <span className="text-red-500 px-2">{errors.emailId}</span>
          )}
          <div className="items-center justify-center h-18 w-full my-4 space-x-4 pt-4">
            <button
              onClick={saveEmployee}
              disabled={isSaveDisabled}
              className={`rounded text-green-50 font-semibold py-2 px-6 ${isSaveDisabled ? 'bg-gray-400' : 'bg-green-400 hover:bg-green-600'}`}
          >
              Save
            </button>
            <button
              onClick={reset}
              className="rounded text-green-50 font-semibold bg-red-400 hover:bg-red-600 py-2 px-6"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEmployee;
