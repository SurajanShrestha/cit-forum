import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Table, Spinner } from 'react-bootstrap';
import { useQueryClient } from 'react-query';
import { successToast, failureToast } from "../Toast";

function CustomTable({ tableName = 'data', tableHeaders, tableData, isFetchingTableData, deleteFunc, isDeleting, isErrorDeleting, isSuccessDeleting }) {
    const history = useHistory();

    useEffect(() => {
        if (isErrorDeleting) {
            failureToast(`Error deleting ${tableName}`);
        } if (isSuccessDeleting) {
            successToast(`Successfully deleted user ${tableName}`);
        }
    }, [isSuccessDeleting, isErrorDeleting]);

    return (
        <>
            <div>
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
                                                        <i className="fa fa-trash-o admin-action-icon" aria-hidden="true" title="Delete" onClick={() => deleteFunc(tdata.id)}></i>
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
