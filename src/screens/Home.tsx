import { Link } from 'react-router-dom';
import Header from '../component/Header';


const Home = () => {
  return (
    <div>
      <Header/>
      <h2>Trang chủ</h2>
      <Link to="/about">Chuyển sang Giới thiệu</Link>
    </div>
  );
};

export default Home;
