// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import ViewRecords from './password';
// import EditRecord from './editinfor';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<ViewRecords />} />
//         <Route path="/edit/:id" element={<EditRecord />} />
//         <Route path="/edit" element={<EditRecord />} /> {/* Added this route for linking */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ViewRecords from './password';  // Component to view records
import EditRecord from './editinfor';  // Component to edit records
import AddPassword from './addpassword';  // Component to add new password
import Register from './register';
import Login from './login';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/edit" element={<EditRecord />} /> {/* Generic edit route */}
        <Route path="/edit/:id" element={<EditRecord />} /> {/* Route for editing a specific record */}
        <Route path="/password" element={<ViewRecords />} /> {/* Route for adding a new password */}
        <Route path="/register" element={<Register />} />
         <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
