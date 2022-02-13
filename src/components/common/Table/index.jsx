import { useState, useEffect } from 'react';
import { Table, Spinner } from 'react-bootstrap';
import { successToast, failureToast } from "../Toast";
import Popup from '../Popup';

function CustomTable({ tableName = 'data', tableHeaders, tableData, isFetchingTableData, deleteFunc, isDeleting, isErrorDeleting, isSuccessDeleting }) {
    // For Popup
    const [show, setShow] = useState(false);
    const [yesDelete, setYesDelete] = useState(false);
    const [deleteId, setDeleteId] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSetYes = () => setYesDelete(true);

    useEffect(() => {
        if (isErrorDeleting) {
            failureToast(`Error deleting ${tableName}`);
        } if (isSuccessDeleting) {
            successToast(`Successfully deleted user ${tableName}`);
        }
    }, [isSuccessDeleting, isErrorDeleting]);

    useEffect(() => {
        if (yesDelete && deleteId !== "") {
            deleteFunc(deleteId);
            setYesDelete(false);
        } else {
            setDeleteId("");
        }
    }, [yesDelete]);

    return (
        <>
            <div>
                <Popup show={show} handleClose={handleClose} handleSetYes={handleSetYes} heading={`Delete ${tableName}`} body={`Are you sure you want to delete this ${tableName}?`} />
                <Table hover variant="dark" responsive>
                    <thead>
                        <tr>
                            {tableHeaders.map((h, i) => <th key={i}>{h}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {isFetchingTableData ?
                            <tr>
                                <td colSpan={8} className="text-center"><Spinner animation="border" size="sm" /></td>
                            </tr> :
                            tableData ?
                                tableData.map((tdata, i) => {
                                    return (
                                        <tr key={i}>
                                            {Object.keys(tdata).map((oKey, index) => <td key={index}>{tdata[oKey]}</td>)}
                                            {deleteFunc ?
                                                <td>
                                                    {isDeleting ?
                                                        <Spinner animation='border' size='sm' /> :
                                                        <i className="fa fa-trash-o admin-action-icon" aria-hidden="true" title="Delete" onClick={() => {
                                                            setShow(true);
                                                            setDeleteId(tdata?.id);
                                                        }}></i>
                                                    }
                                                </td> :
                                                null
                                            }
                                        </tr>
                                    );
                                }) :
                                <td colSpan={8} className="text-center">
                                    <p className="f-sm">Error loading data.</p>
                                </td>
                        }
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default CustomTable;
