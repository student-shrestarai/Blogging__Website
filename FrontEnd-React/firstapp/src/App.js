// import './App.css';
// import './index.css';
// import Navbar from './Components/Navbar'; 
// import WriteBlog from './Components/WriteBlog';
// import ViewBlog from './Components/ViewBlog';
// import BlogDetails from './Components/BlogDetails';
// import User from './Components/User';
// import Login from './Components/Login';
// import Home from './Home';
// import PrivateRoute from './PrivateRoute';
// import EditBlog from './EditBlog';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Blogging from './Blogging';
// import { useLocation } from 'react-router-dom';

// function App() {

//   const location = useLocation();
//   const hideNavbarPaths = ['/login', '/'];
//   return (
//     <div className="App">
//       <Router>
//         {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
//         <Routes>
//           <Route path="/" element={<User/>}/>
//           <Route path="/login" element={<Login />} />
//           <Route path="/home" element={<Home />} />
//           <Route path="/blogging" element={<Blogging/>}/>
//           <Route path="/edit-blog/:id" element={<EditBlog />} />
//          {/* <Route path="/home" element={
//     <PrivateRoute>
//         <Home />
//     </PrivateRoute>
// } /> */}

//           <Route path="/getblog" element={<ViewBlog />} />
//           <Route path="/blog/:id" element={<BlogDetails />} />
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;

import './App.css';
import './index.css';
import Navbar from './Components/Navbar'; 
import WriteBlog from './Components/WriteBlog';
import ViewBlog from './Components/ViewBlog';
import BlogDetails from './Components/BlogDetails';
import User from './Components/User';
import Login from './Components/Login';
import Home from './Home';
import PrivateRoute from './PrivateRoute';
import EditBlog from './EditBlog';
import Blogging from './Components/Blogging';
import Footer from './Components/Footer';
import MyBlog from './Components/MyBlog';
import { matchPath } from 'react-router-dom';

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

function AppContent() {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/' ]; // Hides navbar on login and user page
  const hideFooterPaths = ['/', '/login' ];

  const forceSolid = location.pathname === '/blogging' || location.pathname === '/getblog' ||   matchPath('/blog/:id', location.pathname)
  ||matchPath('/edit-blog/:id', location.pathname);

  

  return (
    <div className="App">
      {!hideNavbarPaths.includes(location.pathname) && <Navbar forceSolid={forceSolid}/>  }
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/blogging" element={<Blogging />} />
        <Route path="/edit-blog/:id" element={<EditBlog />} />
        <Route path="/MyBlog/:gmail" element={<MyBlog />} />
        
        <Route path="/getblog" element={<ViewBlog />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
      </Routes>
      {!hideFooterPaths.includes(location.pathname) && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

