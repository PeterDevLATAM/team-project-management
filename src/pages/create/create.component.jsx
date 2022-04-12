import { useEffect, useState } from "react";

import { useCollection } from "../../hooks/useCollection";
import { useFirestore } from "../../hooks/useFirestore";

import { useAuthContext } from "../../hooks/useAuthContext";

import { Timestamp } from "firebase/firestore";

import Select from "react-select";
import {useHistory} from "react-router-dom"

import "./create.styles.css";

const categories = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
];

export default function Create() {
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [formError, setFormError] = useState(null);

  const [users, setUsers] = useState();
  const { documents } = useCollection("users");

  const { user } = useAuthContext();
  const {addDocument, response} = useFirestore('projects')

  const history = useHistory()

  useEffect(() => {
    if (documents) {
      const options = documents.map((user) => {
        return { label: user.displayName, value: user };
      });
      setUsers(options);
    }
  }, [documents]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null); // clear out the errors and then update error state
    if (!category) {
      setFormError("Please add a category");
      return;
    }
    if (assignedUsers.length < 1) {
      setFormError("Please add at least one User asigned to de task");
      return;
    }
    const createdBy = {
      id: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
    const assignedUsersList = assignedUsers.map((user) => {
      return {
        displayName: user.value.displayName,
        photoURL: user.value.photoURL,
        id: user.value.id,
      };
    });
    const project = {
      name,
      details,
      category: category.value,
      dueDate: Timestamp.fromDate(new Date(dueDate)),
      createdBy,
      comments: [],
      assignedUsersList,
    };
    //Write to DB
    await addDocument(project)
    console.log("Response: ", response)
    if (!response.error){
      history.push('/')
    }

  };
  return (
    <div className="create-form">
      <h2 className="page-title">Create a new Project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project Name:</span>
          <input
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Project Details:</span>
          <textarea
            required
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          />
        </label>
        <label>
          <span>Set due Date:</span>
          <input
            type="date"
            required
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          />
        </label>
        <label>
          <span>Project Category:</span>
          <Select
            options={categories}
            onChange={(option) => setCategory(option)}
          />
        </label>
        <label>
          <span>Assign to:</span>
          <Select
            options={users}
            onChange={(option) => setAssignedUsers(option)}
            isMulti
          />
        </label>
        <button className="btn">Add Project</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
}
