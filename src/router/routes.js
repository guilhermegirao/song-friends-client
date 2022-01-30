import Home from "@/views/Home.vue";
import NotFound from "@/views/NotFound.vue";
import AuthCallback from "@/views/auth/AuthCallback.vue";
import AppIndex from "@/views/app/Index.vue";
import Matches from "@/views/app/Matches.vue";
import Messages from "@/views/app/Messages.vue";
import ProfileIndex from "@/views/app/Profile/Index.vue";

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
    path: "/app/messages/:id",
    component: Messages,
    meta: { requiresAuth: true },
  },
  {
    path: "/app/profile/:id?",
    component: ProfileIndex,
    meta: { requiresAuth: true },
  },
  {
    path: "/:path(.*)",
    component: NotFound,
    meta: { title: "Página não encontrada" },
  },
];

export default routes;
