import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import Layout from "./layouts/Layout";
import AccountLayout from "./layouts/AccountLayout";
import AuthCheck from "./layouts/AuthCheck";
import MentorCheck from "./layouts/MentorCheck";

import LoginPage from "./pages/account/LoginPage";
import SignupPage from "./pages/account/SignupPage";
import ProfilePage from "./pages/account/ProfilePage";
import InformationPage from "./pages/account/InformationPage";

import Posts from "./pages/mentoring/Posts";
import Post from "./pages/mentoring/Post";
import Write from "./pages/mentoring/Write";
import Edit from "./pages/mentoring/Edit";
import Dashboard from "./pages/mentoring/Dashboard";

import ChattingRoomsPage from "./pages/chatting/ChattingRoomsPage";
import ChattingListPage from "./pages/chatting/ChattingListPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<Navigate to="watching/videos" />} />

      <Route element={<AccountLayout />}>
        <Route path="/users/login" element={<LoginPage />} />
        <Route path="/users/signup" element={<SignupPage />} />
      </Route>

      {/* 공통 레이아웃 */}
      <Route element={<Layout />}>
        <Route path="watching/videos" element={<h1>Vidoes</h1>} />
        <Route path="watching/video/:videoId" element={<h1>Video</h1>} />
        <Route path="mentoring/posts" element={<Posts />} />
        <Route path="mentoring/post/:postId" element={<Post />} />
        <Route path="chatting/rooms" element={<ChattingListPage />} />
        <Route path="chatting/room/:roomId" element={<ChattingRoomsPage />} />
        <Route
          path="chatting/roomprofile/:roomId"
          element={<h1>RoomProfile</h1>}
        />

        {/* 사용자 인증 레이아웃  */}
        <Route element={<AuthCheck />}>
          <Route path="watching/history" element={<h1>History</h1>} />
          <Route element={<MentorCheck />}>
            <Route path="mentoring/write" element={<Write />} />
            <Route path="mentoring/edit/:postId" element={<Edit />} />
          </Route>
          <Route path="mentoring/dashboard" element={<Dashboard />} />
          <Route path="chatting/room/:roomId" element={<h1>Room</h1>} />
          <Route path="chatting/create" element={<h1>RoomCreate</h1>} />
          <Route path="/mypage/profiles/:id" element={<ProfilePage />} />
          <Route
            path="/mypage/profiles/fix/:id"
            element={<h1>ProfileFix</h1>}
          />
          <Route path="/mypage/information/:id" element={<InformationPage />} />
          <Route
            path="/mypage/information/fix/:id"
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
