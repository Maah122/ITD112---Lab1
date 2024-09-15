import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import Chart from "./DengueChart"; // Import the Chart component
import "./styles.css"; // Import styles.css

const DengueDataList = () => {
  const [dengueData, setDengueData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    location: "",
    cases: "",
    deaths: "",
    date: "",
    regions: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const dengueCollection = collection(db, "dengueData");
      const dengueSnapshot = await getDocs(dengueCollection);
      const dataList = dengueSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDengueData(dataList);
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const dengueDocRef = doc(db, "dengueData", id);
    try {
      await deleteDoc(dengueDocRef);
      setDengueData(dengueData.filter((data) => data.id !== id));
      alert("Data deleted successfully!");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleEdit = (data) => {
    setEditingId(data.id);
    setEditForm({
      location: data.location,
      cases: data.cases,
      deaths: data.deaths,
      date: data.date,
      regions: data.regions,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const dengueDocRef = doc(db, "dengueData", editingId);
    try {
      await updateDoc(dengueDocRef, {
        location: editForm.location,
        cases: Number(editForm.cases),
        deaths: Number(editForm.deaths),
        date: editForm.date,
        regions: editForm.regions,
      });
      setDengueData(dengueData.map((data) =>
        data.id === editingId ? { id: editingId, ...editForm } : data
      ));
      setEditingId(null);
      alert("Data updated successfully!");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <div>
      <h2>Graphs</h2>

      {/* Chart Component */}
      <Chart data={dengueData} /> {/* Pass dengueData to the Chart component */}

      <h2>Data List</h2>

      {editingId ? (
        <form onSubmit={handleUpdate} className="edit-form">
          <input
            type="text"
            placeholder="Location"
            value={editForm.location}
            onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
            className="input"
            required
          />
          <input
            type="number"
            placeholder="Cases"
            value={editForm.cases}
            onChange={(e) => setEditForm({ ...editForm, cases: e.target.value })}
            className="input"
            required
          />
          <input
            type="number"
            placeholder="Deaths"
            value={editForm.deaths}
            onChange={(e) => setEditForm({ ...editForm, deaths: e.target.value })}
            className="input"
            required
          />
          <input
            type="date"
            placeholder="Date"
            value={editForm.date}
            onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
            className="input"
            required
          />
          <input
            type="text"
            placeholder="Regions"
            value={editForm.regions}
            onChange={(e) => setEditForm({ ...editForm, regions: e.target.value })}
            className="input"
            required
          />
          <button type="submit" className="button">Update Data</button>
          <button onClick={() => setEditingId(null)} className="cancel-button">Cancel</button>
        </form>
      ) : (
        <ul className="data-list">
          {dengueData.map((data) => (
            <li key={data.id} className="data-item">
              <span className="data-text">
                {data.location} - {data.cases} cases - {data.deaths} deaths - {data.date} - {data.regions}
              </span>
              <div className="data-buttons">
                <button onClick={() => handleEdit(data)} className="edit-button">Edit</button>
                <br></br>
                <button onClick={() => handleDelete(data.id)} className="delete-button">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DengueDataList;
