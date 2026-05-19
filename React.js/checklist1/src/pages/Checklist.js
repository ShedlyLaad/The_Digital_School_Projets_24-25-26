import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const Checklist = () => {
  const { id } = useParams();
  const [checklist, setChecklist] = useState(null);

  useEffect(() => {
    const fetchChecklist = async () => {
      const token = "YOUR_TOKEN_HERE";
      const response = await axios.get(`https://greenvelvet.alwaysdata.net/pfc/checklist?id=${id}`, {
        headers: { 'token': token }
      });
      setChecklist(response.data);
    };
    fetchChecklist();
  }, [id]);

  const toggleTaskStatus = (taskIndex) => {
    const updatedTasks = [...checklist.todo];
    updatedTasks[taskIndex].status = updatedTasks[taskIndex].status === 0 ? 1 : 0;
    setChecklist({ ...checklist, todo: updatedTasks });
  };

  return checklist ? (
    <div>
      <h1>{checklist.title}</h1>
      <p>{checklist.description}</p>
      {checklist.todo.map((task, index) => (
        <div key={index} onClick={() => toggleTaskStatus(index)}>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <p>Status: {task.status === 0 ? 'Not done' : 'Done'}</p>
        </div>
      ))}
      <Link to="/">Back to Dashboard</Link>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default Checklist;
