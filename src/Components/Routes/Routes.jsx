// import React from 'react';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import Layout from '../Components/Layout/Layout';
// import App from '../App';
// import Cards from '../Components/Cards';
// import Timeline from '../Components/Timeline';
// import Stats from '../Components/Stats';
// import FriendDetail from '../Components/FriendDetail';

// const router = createBrowserRouter([
//     {
//         path: '/',
//         element: <Layout />,
//         children: [
//             {
//                 index: true,
//                 element: <App />,
//             },
//             {
//                 path: 'friends',
//                 element: <Cards />,
//             },
//             {
//                 path: 'friend/:id',
//                 element: <FriendDetail />,
//             },
//             {
//                 path: 'timeline',
//                 element: <Timeline />,
//             },
//             {
//                 path: 'stats',
//                 element: <Stats />,
//             },
//         ],
//     },
// ]);

// const Routes = () => {
//     return <RouterProvider router={router} />;
// };

// export default Routes;