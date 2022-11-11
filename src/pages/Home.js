import React, {useState, useEffect} from 'react'
import fireDb from "../firebase"
import {Link} from "react-router-dom"
import "./Home.css"
import { toast } from 'react-toastify';

const Home = () => {
  const [data, setData] = useState({});
  const [sortedData, setSortedData] = useState([])
  const [sort, setSort] = useState(false);

  useEffect(() => {
    fireDb.child("students").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({...snapshot.val()});
      } else {
        setData({});
      }
    });

    return () => {
      setData({});
    };
  }, []);

  const onDelete = (id => {
    if(window.confirm("Are you sure you want to delete this entry?")) {
      fireDb.child(`students/${id}`).remove((err) => {
        if (err) {
          toast.error(err)
        } else {
          toast.success("Deleted Successfully.");
        }
      });
    }
  });
  
  const handleChange = (e) => {
    setSort(true);
    fireDb.child("students").orderByChild(`${e.target.value}`).on("value", (snapshot) => {
      let sortedData = [];
      snapshot.forEach((snap) => {
        sortedData.push(snap.val())
      });
      setSortedData(sortedData);
    })
  };
  const handleReset = () => {
    setSort(false);
  };
  
  return (
    <div style={{marginTop: "100px"}}>
      <table className='styled-table'>
        <thead>
          <tr>
            <th style={{textAlign: "center"}}>No.</th>
            <th style={{textAlign: "center"}}>First Name</th>
            <th style={{textAlign: "center"}}>Last Name</th>
            <th style={{textAlign: "center"}}>Class Code</th>
            <th style={{textAlign: "center"}}>Student No.</th>
            {!sort && (<th style={{textAlign: "center"}}>Action</th>)}
          </tr>
        </thead>
        {!sort && (
          <tbody>
          {Object.keys(data).map((id, index) => {
            return (
              <tr key={id}>
                <th scope="row">{index + 1}</th>
                <td>{data[id].FirstName}</td>
                <td>{data[id].LastName}</td>
                <td>{data[id].ClassCode}</td>
                <td>{data[id].StudentId}</td>
                <td>
                  <Link to={`/update/${id}`}>
                  <button className='btn btn-edit'>Edit</button>
                  </Link>
                  <button className='btn btn-delete' 
                  onClick={() => onDelete(id)}
                  >
                    Delete
                  </button>
                  <Link to={`/view/${id}`}>
                  <button className='btn btn-view'>View</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
        )}
        {sort && (
          <tbody>
            {sortedData.map((item, index) => {
              return (
                <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.FirstName}</td>
                <td>{item.LastName}</td>
                <td>{item.ClassCode}</td>
                <td>{item.StudentId}</td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
      <label>Sort By:</label>
      <select className='dropdown' name='colValue' onChange={handleChange}>
        <option>Select</option>
        <option value="FirstName">First Name</option>
        <option value="LastName">Last Name</option>
        <option value="ClassCode">Class Code</option>
        <option value="StudentId">Student No.</option>
      </select>
      <button className='btn btn-reset' onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

export default Home
