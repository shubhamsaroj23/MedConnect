import { useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Video from "./components/video";
import Home from "./Pages/LandingPage/Home";

import PreVideo from "./components/preVideo";
import Book from "./components/Book";

import Email from "./Pages/Onboarding/Email";
import Verify from "./Pages/Onboarding/Verify";
import Dashboard from "./Pages/Dashboard/dashboard";
import Consultation from "./Pages/Consultation/Consultation";

import SearchDoctors from "./Pages/Search/SearchDoctors";
import DoctorsBySpecialization from "./Pages/Search/DoctorsBySpecialization";
import DoctorProfile from "./Pages/Consultation/DoctorProfile";

import BookSlot from "./Pages/Consultation/BookSlot";

import Instant from "./Pages/Instant/Instant";
import BookInstant from "./Pages/Instant/BookInstant";

import ManageAppointment from "./Pages/ManageAppointment/ManageAppointment";

import Payments from "./Pages/Payments/Payments";
import CapturePayments from "./Pages/Payments/CapturePayments";
import Lab from "./Pages/Lab_Test/Lab";
import Packageview from "./Pages/Lab_Test/Packageview";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      // Check if user has a valid authentication token
      const patient_token = localStorage.getItem("patient_token");
      if (patient_token) {
        // TODO: Validate the token on the server-side
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    }, []);
    
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/preVideo" element={<PreVideo />} /> */
          /* <Route path="/video" element={<Video />}/> 
          {/* <Route path="/bookapointment" element={<Book />}/> */}
          <Route path="/verify" element={<Verify />} />
          <Route path="/search" element={<SearchDoctors />} />
          <Route
            path="/bySpecialization"
            element={<DoctorsBySpecialization />}
          />
          <Route path="/email" element={<Email />} />
          <Route path="/consultation" element={<Consultation />} />

          <Route path="/instant" element={<Instant />} />
          <Route path="/bookinstant" element={<BookInstant/>}/>


          <Route path="/manageappointment" element={<ManageAppointment />} />

          <Route path="/doctorProfile" element={<DoctorProfile />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/capturePayments" element={<CapturePayments />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bookSlot" element={<BookSlot />} />
          <Route path="/lab" element={<Lab />} />
          <Route path="/packageview" element={<Packageview />} />


        </Routes>
      </Router>
    </>
  );
}

export default App;
