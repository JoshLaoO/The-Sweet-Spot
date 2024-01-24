import { useEffect, useState } from "react";
import Construct from "./Construct.js";
import ErrorNotification from "./ErrorNotification";
import "./App.css";
import SignUpPage from "./signuppage.js";
import Header from "./header.js";
import Footer from "./footer.js";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  const [launchInfo, setLaunchInfo] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      let url = `${process.env.REACT_APP_API_HOST}/api/launch-details`;
      console.log("fastapi url: ", url);
      let response = await fetch(url);
      console.log("------- hello? -------");
      let data = await response.json();

      if (response.ok) {
        console.log("got launch data!");
        setLaunchInfo(data.launch_details);
      } else {
        console.log("drat! something happened");
        setError(data.message);
      }
    }
    getData();
  }, []);
  return (
        <Router>
            <Header />
            <ErrorNotification error={error} />
            <Routes>
                <Route path="/signup/" element={<SignUpPage />} />

                <Route path="/" element={<Construct info={launchInfo} />} />
            </Routes>
            <Footer />
        </Router>
    );



  // return (
  //   <div>
  //     <ErrorNotification error={error} />
  //     <Construct info={launchInfo} />
  //   </div>
  // );
}

export default App;
