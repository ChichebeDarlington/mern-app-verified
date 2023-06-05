import { useEffect, useState } from "react";
import { useSportHook } from "../components/context/SportContext";
import { useAuthContext } from "../components/context/AuthContext";
import SportDetails from "../components/SportDetails";
import SportForm from "../components/SportForm";

const Home = () => {
  const { sports, dispatch } = useSportHook();
  const { user } = useAuthContext();

  const fetchSports = async () => {
    const response = await fetch("http://localhost:8000/api/sports", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    let data = await response.json();
    if (response.ok) {
      dispatch({ type: "FETCH_SPORTS", payload: data });
    }
  };

  useEffect(() => {
    if (user) {
      fetchSports();
    }
  }, [user]);

  return (
    <div className="home">
      <div className="sports">
        {sports &&
          sports.map((sport) => {
            return (
              <SportDetails
                key={sport._id}
                {...sport}
                fetchSports={fetchSports}
              />
            );
          })}
      </div>
      <SportForm fetchSports={fetchSports} />
    </div>
  );
};

export default Home;
