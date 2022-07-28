import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Post() {
    const params = useParams();
    console.log(params);
    //{postId: '2'}

    const location = useLocation();
    console.log(location);
    //{pathname: '/posts/2', search: '', hash: '', state: null, key: 'default'}

    return <h2>Single Post {params.postId}</h2>;
}  
export default Post;