import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../layout';
import { Container, Row, Col } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { http } from '../../services/httpHelper';
import { failureToast } from "../../components/common/Toast";
import { HeaderBar } from '../../components';
import { BulletinBoard } from '../../components';
import { DiscussionBoard } from '../../components';

function Topic() {
    const { slug } = useParams();
    
    const { data: topicData, error: errorTopicData, isLoading: isLoadingTopicData } = useQuery('topic', () => {
        return http().get(`/topics/${slug}`);
    });

    const { data: postsData, error: errorPostsData, isLoading: isLoadingPostsData } = useQuery('posts', () => {
        return http().get(`/posts/byTopicId?TopicId=${slug}`);
    });

    useEffect(() => {
        if (errorTopicData) {
            failureToast(errorTopicData?.response?.data?.message || "Error");
        }
        if (errorPostsData) {
            failureToast(errorPostsData?.response?.data?.message || "Error");
        }
    }, [errorTopicData, errorPostsData]);

    const data = [
        {
            topic: "Predict my MMR Mega-Thread! skdnksd skd sd"
        },
        {
            topic: "Fees Discount must be given and it should be a significant amount"
        },
        {
            topic: "Canteen must be improved. There's cockroaches everywhere"
        },
        {
            topic: "Courses must be renewed. And practicals must be held"
        }
    ];
    return (
        <Layout>
            <Container>
                <Row>
                    <Col lg={8}>
                        {topicData ?
                            <HeaderBar title={topicData.data?.title} categoryType={topicData.data?.Category?.name} totalPosts={topicData.data?.Posts.length} /> :
                            null
                        }
                        {postsData ?
                            <DiscussionBoard postsData={postsData.data} /> :
                            null    
                        }
                    </Col>
                    <Col lg={4}>
                        <BulletinBoard heading="Trending" data={data} />
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}

export default Topic;
