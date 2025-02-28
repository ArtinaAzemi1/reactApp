import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EdittGroup({ match }) {
  const [group, setGroup] = useState({ groupId: 0, groupName: '', year: 0, capacity: 0 });

  useEffect(() => {
    axios.get(`https://localhost:7110/api/Group/${match.params.groupId}`)
      .then(response => {
        setGroup(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, [match.params.groupId]);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.put(`https://localhost:7110/api/Group/${group.groupId}`, group)
      .then(response => {
        console.log('Group updated successfully: ', response.data);
      })
      .catch(error => {
        console.error('Error updating product: ', error);
      });
  };

  return (
    <div>
      <h2>Edit Group</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={group.groupName} onChange={e => setGroup({ ...group, groupName: e.target.value })} />
        </div>
        <div>
          <label>Price:</label>
          <input type="text" value={group.year} onChange={e => setGroup({ ...group, year: e.target.value })} />
        </div>
        <div>
          <label>Capacity:</label>
          <input type="text" value={group.capacity} onChange={e => setGroup({ ...group, capacity: e.target.value })} />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EdittGroup;