import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import { useSportHook } from "./context/SportContext";

const Edit = () => {
  const navigate = useNavigate();
  const { sports, dispatch } = useSportHook();
  const [load, setLoads] = useState("");
  const [reps, setReps] = useState("");
  const [title, setTitle] = useState("");

  const { user } = useAuthContext();
  // console.log(user);
  const { setLoad, error, empty } = useSportHook();
  // console.log(sports);
  const { editId } = useParams();

  const fetchSports = async () => {
    const response = await fetch(`http://localhost:8000/api/sports/${editId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    let data = await response.json();
    setLoads(data.load);
    setTitle(data.title);
    setReps(data.reps);
  };

  const handleEdit = async (e) => {
    await fetch(`http://localhost:8000/api/sports/${editId}`, {
      method: "PATCH",
      body: JSON.stringify({ title, reps, load }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    navigate("/");
  };

  React.useEffect(() => {
    if (editId) {
      fetchSports();
    }
  }, [editId]);

  return (
    <form className="form" onSubmit={handleEdit}>
      <section className="input-container">
        <h3>Create a sport workout</h3>

        <p>{editId}</p>
        <label>Sport Title</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={empty.includes("title") ? "error" : "success"}
        />
      </section>

      <section className="input-container">
        <label>Load (in kilogram):</label>
        <input
          type="number"
          name="load"
          value={load}
          onChange={(e) => setLoads(e.target.value)}
          className={empty.includes("load") ? "error" : "success"}
        />
      </section>

      <section className="input-container">
        <label>Reps (in pounds):</label>
        <input
          type="number"
          name="reps"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          className={empty.includes("reps") ? "error" : "success"}
        />
      </section>
      <section className="btn-container">
        <button type="submit" className="btn">
          Update sport
        </button>
      </section>
    </form>
  );
};

export default Edit;
