import { Row, Col } from 'react-bootstrap';
import ListItem from './ListItem';

function List({ data, deletable }) {
    return (
        <div>
            <Row className="mb-3 px-3">
                <Col className="f-md f-bold" xs={6}>Topic</Col>
                <Col className="f-md f-bold" xs={2}>Posts</Col>
                <Col className="f-md f-bold" xs={4}>Author</Col>
            </Row>
            {data.map((item, index)=>{
                return <ListItem topic={item.topic} createdDate={item.createdDate} posts={item.posts} author={item.author} key={index} index={++index} deletable={deletable} />
            })}
        </div>
    );
}

export default List;