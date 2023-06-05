import { Link } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";

const Navbar = () => {
  const { logOut, user } = useAuthContext();
  // console.log(user);
  return (
    <header>
      <section className="container">
        <Link to="/">Sports boy</Link>
        <nav>
          {user?.user && (
            <section>
              <small>{user?.user.username}</small>
              <button onClick={logOut}>Logout</button>
            </section>
          )}

          {!user?.user && (
            <section>
              <Link to="/signup">Signup</Link>
              <Link to="/login">Login</Link>
            </section>
          )}
        </nav>
      </section>
    </header>
  );
};

export default Navbar;
