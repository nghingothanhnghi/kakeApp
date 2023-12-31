import React, {
    useCallback,
    useMemo,
    useRef,
    useState
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import AgColName from '../../components/ag-grid-component/ag-col-name';
// import { userActions } from '../../store'
// import UserListComponent from '../../components/user-list';

export default function UsersPage() {
    // open this when not authorize
    const { auth } = useSelector((state) => state.auth);
    if (!auth) {
        return <Navigate to="/login" />;
    }
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState([
        {
            headerName: 'Username',
            field: 'country',
            cellRenderer: 'agColName',
        },
        {
            headerName: 'Phone Number',
            field: 'country',
            cellRenderer: 'agColName',
        },
        {
            headerName: 'Email',
            field: 'country',
            cellRenderer: 'agColName',
        },
        {
            headerName: 'Component By Direct Reference',
            field: 'country',
            cellRenderer: AgColName,
        },
    ]);
    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
            minWidth: 100,
        };
    }, []);
    const components = useMemo(() => {
        return {
            agColName: AgColName,
        };
    }, []);

    const onGridReady = useCallback((params) => {
        fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
            .then((resp) => resp.json())
            .then((data) => setRowData(data));
    }, []);
    return (
        <>
            <div style={containerStyle}>
                <div style={gridStyle}
                    className={"ag-theme-alpine"
                    }
                >
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={columnDefs}
                        defaultColDef={defaultColDef}
                        components={components}
                        onGridReady={onGridReady}
                    />
                </div>
            </div>

            {/* <UserListComponent users={users} userActions={userActions} /> */}

            {/* <div className="container">
                  <header className="jumbotron">
                      <h3>
                          <strong>{currentUser.username}</strong> Profile
                      </h3>
                  </header>
                  <p>
                      <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
                      {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
                  </p>
                  <p>
                      <strong>Id:</strong> {currentUser.id}
                  </p>
                  <p>
                      <strong>Email:</strong> {currentUser.email}
                  </p>
                  <strong>Authorities:</strong>
                  <ul>
                      {currentUser.roles &&
                          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                  </ul>
              </div> */}


        </>
    );
}