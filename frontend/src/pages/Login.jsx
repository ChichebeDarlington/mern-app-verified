import { useAuthContext } from "../components/context/AuthContext";

const LOGIN = () => {
  const {
    dispatch,
    email,
    setEmail,
    password,
    setPassword,
    setIsLoading,
    setError,
    isLoading,
    error,
  } = useAuthContext();

  const handleLogin = async (m) => {
    m.preventDefault();

    setIsLoading(true);
    setError(null);
    m.preventDefault();
    const response = await fetch("http://localhost:8000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(data.error);
    }
    if (response.ok) {
      setIsLoading(false);
      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch({ type: "LOG_IN", payload: data });
    }
  };

  return (
    <form className="login" onSubmit={handleLogin}>
      <h4>LOG IN</h4>

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="password">Password:</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button disabled={isLoading} className="btn" type="submit">
        LOG IN
      </button>
      {error && <section className="error">{error}</section>}
    </form>
  );
};

export default LOGIN;
