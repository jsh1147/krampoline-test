import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import Layout from "./layouts/Layout.jsx";
import AccountLayout from "./layouts/AccountLayout";
import AuthCheck from "./layouts/AuthCheck.jsx";

import LoginPage from "./pages/account/LoginPage";
import SignupPage from "./pages/account/SignupPage";

import Posts from "./pages/mentoring/Posts.jsx";
import Post from "./pages/mentoring/Post.jsx";
import Write from "./pages/mentoring/Write.jsx";
import Edit from "./pages/mentoring/Edit.jsx";
import Dashboard from "./pages/mentoring/Dashboard.jsx";

import ChattingRoomsPage from "./pages/chatting/ChattingRoomsPage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<Navigate to="watching/videos" />} />

      <Route element={<AccountLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
      </Route>

      <Route element={<AuthCheck />}>
        <Route path="interest" element={<h1>Interest</h1>} />
      </Route>

      {/* 공통 레이아웃 */}
      <Route element={<Layout />}>
        <Route path="watching/videos" element={<h1>Vidoes</h1>} />
        <Route path="watching/video/:videoId" element={<h1>Video</h1>} />
        <Route path="mentoring/posts" element={<Posts />} />
        <Route path="mentoring/post/:postId" element={<Post />} />
        <Route path="chatting/rooms" element={<ChattingRoomsPage />} />
        <Route
          path="chatting/roomprofile/:roomId"
          element={<h1>RoomProfile</h1>}
        />

        {/* 사용자 인증 레이아웃  */}
        <Route element={<AuthCheck />}>
          <Route path="watching/history" element={<h1>History</h1>} />
          <Route path="mentoring/write" element={<Write />} />
          <Route path="mentoring/edit/:postId" element={<Edit />} />
          <Route path="mentoring/dashboard" element={<Dashboard />} />
          <Route path="chatting/room/:roomId" element={<h1>Room</h1>} />
          <Route path="chatting/create" element={<h1>RoomCreate</h1>} />
          <Route path="mypage/profile" element={<h1>Profile</h1>} />
          <Route path="mypage/profile/fix" element={<h1>ProfileFix</h1>} />
          <Route path="mypage/information" element={<h1>Information</h1>} />
          <Route
            path="mypage/information/fix"
            element={<h1>InformationFix</h1>}
          />
        </Route>
      </Route>
      <Route path="*" element={<h1>NotFound</h1>} />
    </Route>
  )
);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
