import { BrowserRouter, Routes as Router, Route } from "react-router-dom";
import routes from "../config/routes.js";
import ContactList from "../pages/ContactList";

const Routes = () => {
  return (
    <BrowserRouter>
      <Router>
        <Route path={routes.contacts.path} element={<ContactList />} />
      </Router>
    </BrowserRouter>
  );
};

export default Routes
