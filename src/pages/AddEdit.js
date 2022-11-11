import React, {useState, useEffect} from 'react'
import {useNavigate, useParams}from "react-router-dom";
import './AddEdit.css'
import fireDb from "../firebase";
import {toast} from "react-toastify";

const initialState = {
  FirstName: "",
  LastName: "",
  ClassCode: "",
  StudentId: ""
}

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});

  const {FirstName, LastName, ClassCode, StudentId} = state;
  const history = useNavigate;

  const {id} = useParams();

  useEffect(() => {
    fireDb.child("students").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({...snapshot.val()});
      } else {
        setData({});
      }
    });
  }, [id]);

  useEffect(() => {
    if(id) {
      setState({...data[id]});
    } else {
      setState({...initialState});
    }

    return () => {
      setState({...initialState});
    };
  }, [id, data]);
  
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setState({...state, [name]: value});
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!FirstName || !LastName || !StudentId || !ClassCode) {
      toast.error("Please provide a value");
    } else {
      if (!id) {
        fireDb.child("students").push(state, (err) => {
          if(err) {
            toast.error(err);
          } else {
            toast.success("Successfully Added.");
          }
        });
      } else {
        fireDb.child(`students/${id}`).set(state, (err) => {
          if(err) {
            toast.error(err);
          } else {
            toast.success("Successfully Updated.");
          }
        });
      }
      
      setTimeout(() => history.push("/"), 500);
    }
  };
  return (
  <div style={{marginTop: "100px"}}>
        <form 
         style={{
          margin: "auto", 
          padding: "15px", 
          maxWidth: "400opx", 
          alignContent: "center",
        }}
          onSubmit={handleSubmit}
        > 
          <label htmlFor='FirstName'>First Name</label>
          <input
          type="text"
          id="FirstName"
          name='FirstName'
          placeholder='Name: '
          value={FirstName || ""}
          onChange={handleInputChange}
          />
          <label htmlFor='LastName'>Last Name</label>
          <input
          type="text"
          id="LastName"
          name='LastName'
          placeholder='Surname: '
          value={LastName || ""}
          onChange={handleInputChange}
          />
          
          <label htmlFor='ClassCode'>Class Code</label>
          <input
          type="text"
          pattern="\d*"
          id="ClassCode"
          name='ClassCode'
          placeholder='4-digit Class Code: '
          maxLength="4"
          minLength="4"
          value={ClassCode || ""}
          onChange={handleInputChange}
          />

          <label htmlFor='StudentId'>Student ID</label>
          <input
          type="text"
          pattern="\d*"
          id="StudentId"
          name='StudentId'
          placeholder='6-digit Student ID: '
          maxLength="6"
          minLength="6"
          value={StudentId || ""}
          onChange={handleInputChange}
          />

          <input type='submit' value={id ? "Update" : "Save"}/>
        </form>
    </div>
  );
};

export default AddEdit