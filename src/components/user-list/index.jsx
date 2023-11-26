import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
export default function UserListComponent({ users, userActions }) {
    const dispatch = useDispatch();
    return (
        <>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Full Name</th>
                        <th style={{ width: '30%' }}>Username</th>
                        <th style={{ width: '30%' }}>Password</th>
                        <th style={{ width: '30%' }}>Phone</th>
                        <th style={{ width: '30%' }}>Email</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {users?.value?.map(user =>
                        <tr key={user.id}>
                            <td>{user.fullName}</td>
                            <td>{user.username}</td>
                            <td>{user.password}</td>
                            <td>{user.phone}</td>
                            <td>{user.email}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`edit/${user.id}`} className="btn btn-sm btn-primary me-1">Edit</Link>
                                <button onClick={() => dispatch(userActions.delete(user.id))} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={user.isDeleting}>
                                    {user.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {users?.loading &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <span className="spinner-border spinner-border-lg align-center"></span>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </>
    );
}