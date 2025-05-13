import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/Login";
import SignUp from "./pages/Signup";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Contact from "./pages/Contact";
import ScrollToTop from "./components/ScrollToTop";
import DashboardMain from "./pages/Dashboard/DashboardMain";
import DashboardHeader from "./pages/Dashboard/DashboardHeader";
import DashboardFooter from "./pages/Dashboard/DashboardFooter";
import Campaigns from "./pages/CampaignManagement/Campaigns";
import CreateCampaign from "./pages/CampaignManagement/CreateCampaign";
import CampaignList from "./pages/CampaignManagement/ListCampaigns";
import CampaignDetails from "./pages/CampaignManagement/AudienceDetails";
import CommunicationLogs from "./pages/CustomerLogs/CustomerLogs";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/dashboard" element={<DashboardLayout />} />
        <Route path="/*" element={<MainLayout />} />
        <Route path="/campaigns/*" element={<CampaignsLayout />} />
        <Route path="/audience/*" element={<AudienceLayout />} />
        <Route path="/communications/*" element={<CommunicationLayout />} />
      </Routes>
    </BrowserRouter>
  );
};

const DashboardLayout = () => (
  <>
    <DashboardHeader />
    <DashboardMain />
    <DashboardFooter />
  </>
);

const CampaignsLayout = () => (
  <>
    <DashboardHeader />
    
    <Routes>
      <Route path="/" element={<Campaigns />} />
      <Route path="create" element={<CreateCampaign />} />
      <Route path="list" element={<CampaignList/>} />
      
      
    </Routes>
      
    
    <DashboardFooter />
  </>
);
const CommunicationLayout = () => (
  <>
    <DashboardHeader />
    
    <Routes>
      <Route path="/" element={<CommunicationLogs />} />
      
    </Routes>
      
    
    <DashboardFooter />
  </>
);


const AudienceLayout = () => (
  <>
    <DashboardHeader />
    
    <Routes>
      <Route path="/" element= {<CampaignDetails />} />
      <Route path="create" element={<CreateCampaign />} />
      <Route path="list" element={<CampaignList/>} />
      
    </Routes>
      
    
    <DashboardFooter />
  </>
);

const MainLayout = () => (
  <>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="login" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="contact" element={<Contact />} />
    </Routes>
    <Footer />
  </>
);

export default App;
