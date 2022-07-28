import { Outlet } from 'react-router-dom';

function Posts() {
  return (
    <>
      <h2>Posts</h2>

      {/* Routeのネストの為の Outlet */}
      <Outlet />
    </>
  );
}

export default Posts;