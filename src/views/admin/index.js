import { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
// import { useQuery } from 'react-query';
import Layout from '../layout';
import { getUser } from "../../storage";
// import { http } from "../../services/httpHelper";
// import { failureToast } from "../../components/common/Toast";
// import { CategoryBoard } from '../../components';
// import { HeaderBar } from '../../components';
// import { List } from '../../components';
// import { BulletinBoard } from '../../components';

function AdminPanel() {
    const history = useHistory();

    useEffect(() => {
        if (getUser()) {
            // Even if checking user role is done by the backend, we're still making sure that no non-admin users can stay in this page.
            if(getUser()?.roleId !== 1){
                history.replace('/admin/login');
            }
        }else{
            history.replace('/admin/login');
        }
    }, []);

    return (
        <Layout forAdminPanel={true}>
            <Container>
                <Row>
                    <p>This is admin panel</p>
                </Row>
            </Container>
        </Layout>
    );
}

export default AdminPanel;
