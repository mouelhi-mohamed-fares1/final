/* import React, { useState, useEffect } from 'react';
import CreateLeaveForm from './createLeavesPage';
import './leave.css';

const LeavesPage = () => {
  const token = localStorage.getItem("token");
  const cleanedToken = token.substring(1, token.length - 1);

  const [userRole, setUserRole] = useState('');
  const [leaves, setLeaves] = useState([]);
  const [showCreateLeaveForm, setShowCreateLeaveForm] = useState(false);

  useEffect(() => {
    // Fetch user role from local storage
    const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
    const userRoleFromLocalStorage = userFromLocalStorage ? userFromLocalStorage.role : '';
    setUserRole(userRoleFromLocalStorage);

    // Fetch leaves
    const fetchLeaves = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/leaves/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: cleanedToken,
          },
        });
        const data = await response.json();
        setLeaves(data);
      } catch (error) {
        console.error(error); // Handle error
      }
    };

    fetchLeaves();
  }, []);

  const handleCreateLeaveClick = () => {
    setShowCreateLeaveForm(true);
  };

  return (
    <div className="leaves-container">
      <h1>Welcome to Leaves Management</h1>
      <hr />
      <h2>Leaves Overview</h2>
      <p>View and manage leaves below. You can create new leaves if you are a user.</p>
      {userRole === 'user' && (
        <button onClick={handleCreateLeaveClick}>Create Leave</button>
      )}
      {showCreateLeaveForm && <CreateLeaveForm />}
      <table>
        <thead>
          <tr>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Reason</th>
            <th>Status</th>
            {userRole === 'admin' && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave._id}>
              <td>{leave.startDate}</td>
              <td>{leave.endDate}</td>
              <td>{leave.reason}</td>
              <td>{leave.status}</td>
              {userRole === 'admin' && <td><button>Modify</button></td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeavesPage;
 */

import React, { useState, useEffect } from 'react';
import CreateLeaveForm from './createLeavesPage';
import './leave.css';
import { useNavigate } from 'react-router-dom';

const LeavesPage =  () => {


  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const cleanedToken = token ? token.substring(1, token.length - 1) : null;

  const [userRole, setUserRole] = useState('');
  const [leaves, setLeaves] = useState([]);
  const [showCreateLeaveForm, setShowCreateLeaveForm] = useState(false);
  const [modifiedLeaves, setModifiedLeaves] = useState([]);

  useEffect(() => {
    // Fetch user role from local storage
    const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
    const userRoleFromLocalStorage = userFromLocalStorage ? userFromLocalStorage.role : '';
    setUserRole(userRoleFromLocalStorage);

    // Fetch leaves
    const fetchLeaves = async () => {
      try {
        const token = localStorage.getItem("token");
  const cleanedToken = token ? token.substring(1, token.length - 1) : null;
        const response = await fetch("http://localhost:3000/api/leaves/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: cleanedToken,
          },
        });
        const data = await response.json();
        setLeaves(data);
      } catch (error) {
        console.error(error); 
      }
    };

    if (cleanedToken) {
      fetchLeaves();
    }

  }, [cleanedToken]);

  const handleCreateLeaveClick = () => {
    setShowCreateLeaveForm(true);

  };

  const handleStatusChange = (index, e) => {
    const updatedLeaves = [...leaves];
    updatedLeaves[index].status = e.target.value;
    setLeaves(updatedLeaves);

  };

  const handleModifyClick = (index) => {
    const updatedModifiedLeaves = [...modifiedLeaves];
    updatedModifiedLeaves.push(index);
    setModifiedLeaves(updatedModifiedLeaves);
  };

  const handleUpdateClick = async (leaveId) => {
    try {
      const token = localStorage.getItem("token");
  const cleanedToken = token ? token.substring(1, token.length - 1) : null;
      const leaveToUpdate = leaves.find(leave => leave._id === leaveId);
      if (!leaveToUpdate) {
        console.error(`Leave with ID ${leaveId} not found.`);
        return;
      }
  
      const response = await fetch(`http://localhost:3000/api/leaves/${leaveId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: cleanedToken,
        },
        body: JSON.stringify({ status: leaveToUpdate.status }),
      });
      if (response.ok) {
        const updatedModifiedLeaves = modifiedLeaves.filter((index) => index !== leaveId);
        setModifiedLeaves(updatedModifiedLeaves);
        window.location.reload();

      } else {
        console.error("Failed to update leave status");
      }

    } catch (error) {
      console.error("Failed to update leave status:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate('/login'); 

  };

  return (
    <div className="leaves-container">
      <h1>Welcome to Leaves Management</h1>
      <hr />
      <h2>Leaves Overview</h2>
      <p>View and manage leaves below. You can create new leaves if you are a user.</p>
      {userRole === 'user' && (
        <button onClick={handleCreateLeaveClick}>Create Leave</button>
      )}
      {showCreateLeaveForm && <CreateLeaveForm />}
      <table>
        <thead>
          <tr>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Reason</th>
            <th>Status</th>
            {userRole === 'admin' && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave, index) => (
            <tr key={leave._id}>
              <td>{leave.startDate}</td>
              <td>{leave.endDate}</td>
              <td>{leave.reason}</td>
              <td>
                {userRole === 'admin' && modifiedLeaves.includes(index) ? (
                  <select value={leave.status} onChange={(e) => handleStatusChange(index, e)}>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                ) : (
                  leave.status
                )}
              </td>
              {userRole === 'admin' && (
                <td>
                  {!modifiedLeaves.includes(index) ? (
                    <button onClick={() => handleModifyClick(index)}>Modify</button>
                  ) : (
                    <button onClick={() => handleUpdateClick(leave._id)}>Update</button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LeavesPage;




