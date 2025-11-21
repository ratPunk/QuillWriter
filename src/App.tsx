// @ts-ignore
import Portal from "@pages/Portal.tsx";
import { Routes, Route } from "react-router-dom";
import "@styles/css/root.css";
// @ts-ignore
import Library from "@pages/Library";
// @ts-ignore
import Authorization from "@pages/Authorization";
import UserProfile from "./pages/UserProfile";
import BookCard from "./pages/BookCard";
import AboutUs from "./pages/AboutUs";

function App() {
  return (
      <div className={"App"} id={"App"}>
        <Routes>
        <Route path="/" element={<Portal />} />
        <Route path="/library" element={<Library />} />
        <Route path="/authorization" element={<Authorization />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/bookcard" element={<BookCard />} />
        <Route path="/aboutus" element={<AboutUs />} />
        </Routes>
      </div>
  )
}

export default App