import { lazy } from "react";
import * as paths from "../constants/routes";

const routes = {
    contacts: {
      path: paths.CONTACTS,
      component: lazy(() => import("../pages/ContactList")),
    },
    add_contact: {
        path: paths.ADD_CONTACT,
        component: lazy(() => import("../pages/ContactForm")),
      },
}

export default routes
