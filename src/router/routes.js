import Home from "@/views/Home.vue";
import NotFound from "@/views/NotFound.vue";
import AuthCallback from "@/views/auth/AuthCallback.vue";
import AppIndex from "@/views/app/Index.vue";
import Matches from "@/views/app/Matches.vue";
import Messages from "@/views/app/Messages.vue";
import ProfileIndex from "@/views/app/Profile/Index.vue";
import ProfileEdit from "@/views/app/Profile/Edit.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/auth/callback",
    component: AuthCallback,
  },
  {
    path: "/app",
    component: AppIndex,
    meta: { requiresAuth: true },
  },
  {
    path: "/app/matches",
    component: Matches,
    meta: { requiresAuth: true },
  },
  {
    path: "/app/Messages",
    component: Messages,
    meta: { requiresAuth: true },
  },
  {
    path: "/app/profile",
    component: ProfileIndex,
    meta: { requiresAuth: true },
  },
  {
    path: "/app/profile/edit",
    component: ProfileEdit,
    meta: { requiresAuth: true },
  },
  {
    path: "/:path(.*)",
    component: NotFound,
    meta: { title: "Página não encontrada" },
  },
];

export default routes;
