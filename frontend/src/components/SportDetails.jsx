import moment from "moment";
import { useSportHook } from "./context/SportContext";
import { FaRegTrashAlt, FiEdit } from "react-icons/all";
import { useAuthContext } from "./context/AuthContext";
import { Link } from "react-router-dom";

const SportDetails = ({ title, reps, load, createdAt, _id, fetchSports }) => {
  const { dispatch, setTitle, setReps, setLoad } = useSportHook();

  const { user } = useAuthContext();

  // console.log(sports)

  const handleErase = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(
      `https://mern-stack-verified.onrender.com/api/sports/${_id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const data = response.json();
    console.log(data);
    if (response.ok) {
      dispatch({ type: "DELETE_SPORT", payload: data });
    }
    fetchSports();
  };

  const handleEdit = async (e) => {
    const response = await fetch(
      `https://mern-stack-verified.onrender.com/api/sports/${_id}`,
      {
        method: "PATCH",
        body: JSON.stringify({ title, reps, load }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const data = await response.json();
    // console.log(data);
    if (response.ok) {
      setTitle(data.title);
      setReps(data.reps);
      setLoad(data.load);
    }
  };

  return (
    <section className="sport-details">
      <h4>Title: {title}</h4>
      <p>
        <strong>Load(kg): {load}</strong>
      </p>
      <p>
        <strong>Reps(bls): {reps}</strong>
      </p>
      <h6>
        <small>{moment(createdAt).toNow()}</small>
      </h6>
      <span className="erase" onClick={handleErase}>
        <FaRegTrashAlt />
      </span>
      <span className="edit" onClick={handleEdit}>
        <Link to={_id}>
          <FiEdit />
        </Link>
      </span>
    </section>
  );
};

export default SportDetails;
