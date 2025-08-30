import UserLisr from "../components/UsersLisr";
import Max from "../../images/max.jpg";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../shared/Components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/Components/UIElements/ErrorModal";
import { useHttpHook } from "../../shared/Components/hooks/http-hook";
import { useNavigate } from "react-router-dom";
export default function Users() {
  const location = useLocation();
  const navigate = useNavigate();
  const [users, setUsers] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  const { loading, error, fetchApiCall, handlecancelOnError } = useHttpHook();
  useEffect(() => {
    async function getAllUsers() {
      try {
        const responseVal = await fetchApiCall(
          `${process.env.REACT_APP_BACKEND_URL}/users`
        );
        setUsers(responseVal.data.users);
      } catch (error) {}
    }
    getAllUsers();
  }, [fetchApiCall]);

  return (
    <>
      {loading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {error && <ErrorModal error={error} onClear={handlecancelOnError} />}
      {!loading && users && <UserLisr items={users} />}
    </>
  );
}
