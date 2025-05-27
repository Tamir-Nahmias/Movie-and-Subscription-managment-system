import { Route, Routes } from "react-router";
import "./App.css";
import LoginPage from "./pages/generalSitePages/LoginPage";
import RegistrationPage from "./pages/generalSitePages/RegistrationPage";
import Movies from "./pages/Movies";
import Subscriptions from "./pages/Subscriptions";
import MainPage from "./pages/generalSitePages/MainPage";
import ManageUsers from "./pages/adminPages/ManageUsers";
import AddUser from "./pages/adminPages/AddUser";
import AllUsers from "./pages/adminPages/AllUsers";
import AllMoviesPage from "./pages/AllMoviesPage";
import AllMembers from "./pages/AllMembers";
import AddMoviePage from "./pages/AddMoviePage";
import AddMember from "./pages/AddMember";
import UpdateMovie from "./pages/UpdateMovie";
import UpdateMember from "./pages/UpdateMember";
import EditUser from "./pages/adminPages/EditUser";
import NotAuthorized from "./pages/generalSitePages/NotAuthorized";

function App() {
  return (
    <>
      <Routes>
        {/* new users / new registration pages */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/not-authorized" element={<NotAuthorized />} />
        <Route path="/user-registration" element={<RegistrationPage />} />

        <Route path="/main" element={<MainPage />}>
          {/* public pages */}
          <Route path="movies" element={<Movies />}>
            <Route path="all-movies" element={<AllMoviesPage />} />
            <Route path="add-movie" element={<AddMoviePage />} />
            <Route path="update-movie/:id" element={<UpdateMovie />} />
          </Route>
          <Route path="subscriptions" element={<Subscriptions />}>
            <Route path="all-members" element={<AllMembers />} />
            <Route path="add-members" element={<AddMember />} />
            <Route path="edit-members/:id" element={<UpdateMember />} />
          </Route>
          {/* admin only pages */}
          <Route path="manage-users" element={<ManageUsers />}>
            <Route path="add-user" element={<AddUser />} />
            <Route path="all-users" element={<AllUsers />} />
            <Route path="edit-user/:id" element={<EditUser />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
