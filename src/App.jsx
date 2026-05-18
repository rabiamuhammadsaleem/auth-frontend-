// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import Navbar from './components/Navbar';
// import Signup from './components/Signup';
// import Login from './components/Login';
// import Dashboard from './components/Dashboard';

// function App() {
//     return (
//         <Router>
//             <AuthProvider>
//                 <Navbar />
//                 <Routes>
                    
//                     <Route path="/" element={<Signup />} />
//                     <Route path="/login" element={<Login />} />
//                     <Route path="/dashboard" element={<Dashboard />} />
//                 </Routes>
//             </AuthProvider>
//         </Router>
//     );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
    return (
        <Router>
            <AuthProvider>
                <Navbar />
                <Routes>
                    {/* Default route - Signup page */}
                    <Route path="/" element={<Navigate to="/signup" />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;