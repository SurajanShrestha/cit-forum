import { Row, Col } from 'react-bootstrap';
import ListItem from './ListItem';

function List({ data, deletable = false }) {
    return (
        <div>
            <Row className="mb-3 px-3">
                <Col className="f-md f-bold" xs={6}>Topic</Col>
                <Col className="f-md f-bold" xs={2}>Posts</Col>
                <Col className="f-md f-bold" xs={4}>Author</Col>
            </Row>
            {data ?
                data.map((item, index) => {
                    return <ListItem id={item.id} topic={item.title} createdDate={item.createdAt.slice(0, 10)} posts={item.Posts.length} author={item?.User?.name} authorId={item?.User?.id} key={index} index={++index} deletable={deletable} />
                }) :
                null
            }
            {/* {data.map((item, index)=>{
                return <ListItem topic={item.topic} createdDate={item.createdDate} posts={item.posts} author={item.author} key={index} index={++index} deletable={deletable} />
            })} */}
        </div>
    );
}

export default List;
