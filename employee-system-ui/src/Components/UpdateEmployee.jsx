import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeService from "../Services/EmployeService";

const UpdateEmployee = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [employee, setemployee] = useState({
    id: id,
    firstName: "",
    lastName: "",
    emailId: "",
  });

  const updateEmployee = (e) => {
    e.preventDefault();
    // console.log(employee, id);

    EmployeeService.updateEmployee(id, employee)
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setemployee({ ...employee, [name]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log("dibnesg" + id);
        const response = await EmployeeService.getEmployeeById(id);
        // console.log(response.data);
        setemployee(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="flex max-w-2xl mx-auto shadow border-b mt-11">
        <div className="px-8 py-8">
          <div className="font-thin text-2xl tracking-wider">
            <h1>Update Employee</h1>
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

          <div className="items-center justify-center h-18 w-full my-4 space-x-4 pt-4">
            <button
              onClick={updateEmployee}
              className="rounded  text-green-50 bg-green-400 font-semibold py-2 px-6 hover:bg-green-600"
            >
              Update
            </button>
            <button
              onClick={() => navigate("/")}
              className="rounded text-green-50 font-semibold bg-red-400 hover:bg-red-600 py-2 px-6"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateEmployee;
