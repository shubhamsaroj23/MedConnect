import "./App.css";
// import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
// import Login from "./components/Onboarding/Login";
// import Otp from "./components/Onboarding/Otp";
import Email from "./Pages/Onboarding/Email"
import Verify from "./Pages/Onboarding/Verify";
import Scheduling from "./components/Scheduling/scheduling";
import Dcform from "./dcform";
// import Verification from "./components/Verification";
import Status from "./components/Status";
import Formview from "./components/Formview";
import Dashboard from "./Pages/Dashboard/dashboard";
import EditSlotRemarks from "./Pages/Consultation/EditSlotRemarks";
// import Payments from "./Pages/Payments/Payments";
// import CapturePayments from "./Pages/Payments/CapturePayments";
import ViewAppointment from "./Pages/Consultation/ViewAppointment";
import AddPrescription from "./components/AddPrescription";
import AdminLogin from "./Pages/Admin/AdminLogin";
import AdminPanel from "./Pages/Admin/AdminPanel";
import PayoutList from "./Pages/Admin/PayoutList";
import QRPayments from "./Pages/Admin/QRPayments";

import Video from "./components/Video/video";

import Home from "./LandingPage/Home"


function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="" element={<Home/>} />
        <Route path="/email" element={<Email />} />
        {/* <Route path="/otp" element={<Otp />} /> */}
        <Route path="/otp" element={<Verify />} />
        <Route path="/scheduling" element={<Scheduling />} />
        <Route path="/dcform" element={<Dcform />} />
        {/* <Route path="/Verification" element={<Verification />} /> */}
        <Route path="/status" element={<Status />} />
        <Route path="/formview" element={<Formview />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/editslotremarks" element={<EditSlotRemarks />} />
        {/* <Route path="/payments" element={<Payments />} />
        <Route path="/capturePayments" element={<CapturePayments />} /> */}
        <Route path="/viewappointments" element={<ViewAppointment />} />
        <Route path="/addprescription" element={<AddPrescription/>} />
        <Route path="/admin" element={<AdminLogin/>} />
        <Route path="/adminpanel" element={<AdminPanel/>} />
        <Route path='/payout' element={<PayoutList/>} />
        <Route path='/qrpayments' element={<QRPayments/>}/>

        <Route path="/video" element={<Video/>}/>





        


        {/* <Route path="/time" element={<Time />} /> */}
      </Routes>
    </Router>
  );
  
}

export default App;

