import { useAuthContext } from "./context/AuthContext";
import { useSportHook } from "./context/SportContext";
// https://mern-stack-verified.onrender.com/
// http://localhost:8000

const SportForm = ({ fetchSports }) => {
  const {
    title,
    setTitle,
    reps,
    setReps,
    load,
    setLoad,
    error,
    setError,
    empty,
    setEmpty,
  } = useSportHook();

  const { user } = useAuthContext();

  const handleForm = async (w) => {
    w.preventDefault();
    if (!user) {
      throw new Error("You must be logged in");
    }

    const response = await fetch(
      "https://mern-stack-verified.onrender.com/api/sports",
      {
        method: "POST",
        body: JSON.stringify({ title, reps, load }),
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      console.log("error occured");
      setError(data.error);
      setEmpty(data.fieldsEmpty);
    } else {
      fetchSports();
      setTitle("");
      setReps("");
      setLoad("");
    }
  };

  return (
    <form className="form" onSubmit={handleForm}>
      <section className="input-container">
        <h3>Create a sport workout</h3>

        <label>Sport Title</label>
        <input
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={empty.includes("title") ? "error" : "success"}
        />
      </section>

      <section className="input-container">
        <label>Load (in kilogram):</label>
        <input
          type="number"
          name="load"
          onChange={(e) => setLoad(e.target.value)}
          value={load}
          className={empty.includes("load") ? "error" : "success"}
        />
      </section>

      <section className="input-container">
        <label>Reps (in pounds):</label>
        <input
          type="number"
          name="reps"
          onChange={(e) => setReps(e.target.value)}
          value={reps}
          className={empty.includes("reps") ? "error" : "success"}
        />
      </section>
      <section className="btn-container">
        <button type="submit" className="btn">
          Create sports type
        </button>
      </section>
      {error && <section className="error">{error}</section>}
    </form>
  );
};

export default SportForm;
