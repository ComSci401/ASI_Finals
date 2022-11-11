import React, {useState, useEffect} from 'react'
import FireDb from "../firebase"
import {useParams, Link} from 'react-router-dom'
import "./View.css"

const View = () => {
  const [user, setUser] = useState({});
  const {id} = useParams();
  useEffect(() => {
    FireDb.child(`students/${id}`).get().then((snapshot) => {
      if(snapshot.exists()) {
        setUser({...snapshot.val()});
      } else {
        setUser({});
      }
    });
  }, [id]);

  console.log("user", user)
  return (
    <div style={{marginTop: "150px"}}>
      <div className='card'>
        <div className='card-header'>
          <p>Student Information</p>
        </div>
        <div className='container'>
          <strong>ID: </strong>
          <span>{id}</span>
          <br />
          <br />
          <strong>First Name: </strong>
          <span>{user.FirstName}</span>
          <br />
          <br />
          <strong>Last Name: </strong>
          <span>{user.LastName}</span>
          <br />
          <br />
          <strong>Class Code: </strong>
          <span>{user.ClassCode}</span>
          <br />
          <br />
          <strong>Student No.: </strong>
          <span>{user.StudentId}</span>
          <br />
          <br />
          <Link to = "/">
            <button className='btn btn-edit'>Return</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default View