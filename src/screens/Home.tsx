import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h2>Trang chủ</h2>
      <Link to="/about">Chuyển sang Giới thiệu</Link>
    </div>
  );
};

export default Home;
