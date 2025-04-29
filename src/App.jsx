// // src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import Header from './components/Header';
// import Home from './pages/Home';
// import Calendar from './pages/Calendar';
// import Contacts from './pages/Contacts';
// import Settings from './pages/Settings';

// import './App.css'; // Optional styling
// import VoiceAssistant from './components/VoiceAssistant';

// function App() {
//   return (
//     <Router>
//       <div className="App bg-gray-100 min-h-screen text-gray-800">
//         <Header />

//         {/* Main Page Content */}
//         <main className="pt-16 px-4 md:px-12">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/calendar" element={<Calendar />} />
//             <Route path="/contacts" element={<Contacts />} />
//             <Route path="/settings" element={<Settings />} />
//           </Routes>
//         </main>

//         {/* Floating Voice Assistant */}
//         <VoiceAssistant />
//       </div>
//     </Router>
//   );
// }

// export default App;
