import React, { useState } from 'react';

const CreateLeaveForm =  () => {
  const token = localStorage.getItem("token");
  const cleanedToken = token.substring(1, token.length - 1);
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    reason: '',
  });

  const handleChange = (e) => {
    // Check if it's a date input
    if (e.target.type === 'date') {
      const formattedDate = new Date(e.target.value).toISOString().split('T')[0]; // Format the date
      setFormData({ ...formData, [e.target.name]: formattedDate });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    try {
      let result = await fetch("http://localhost:3000/api/leaves", {
        method: "post",
        body: JSON.stringify(formData), // Pass formData directly
        headers: {
          "Content-Type": "application/json",
          Authorization: cleanedToken,
        },
      });
      result = await result.json();
      setFormData(result);
      window.location.reload();

      
    } catch (error) {
      console.error(error); // Handle error
    }
  };

  return (
    <div>
      <h2>Create Leave</h2>
      <form>
        <div>
          <label>Start Date:</label>
          <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
        </div>
        <div>
          <label>End Date:</label>
          <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
        </div>
        <div>
          <label>Reason:</label>
          <textarea name="reason" value={formData.reason} onChange={handleChange} />
        </div>
        <button type="button" onClick={handleSubmit}>Create Leave</button>
      </form>
    </div>
  );
};

export default CreateLeaveForm;
