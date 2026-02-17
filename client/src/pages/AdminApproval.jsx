import { useEffect, useState } from "react";
import API from "../services/api";

function AdminApproval() {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    API.get("/admin/pending-users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then(res => setUsers(res.data));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const approve = id => {
    API.put(`/admin/approve/${id}`, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then(fetchUsers);
  };

  const reject = id => {
    API.put(`/admin/reject/${id}`, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then(fetchUsers);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Approval Panel</h1>

      {users.map(u => (
        <div key={u._id} style={{ marginBottom: 20 }}>
          <h3>{u.name}</h3>
          <p>{u.email}</p>

          <button onClick={() => approve(u._id)}>
            Approve
          </button>

          <button onClick={() => reject(u._id)}>
            Reject
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminApproval;
