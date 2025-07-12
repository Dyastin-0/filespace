import { faFolder, faHome } from "@fortawesome/free-solid-svg-icons";

export const routes = [
  { path: "/home", name: "Home", icon: faHome },
  { path: "/files", name: "Files", icon: faFolder },
];
export const authRoutes = [
  { path: "/sign-in", name: "Sign in" },
  { path: "/sign-up", name: "Sign up" },
];
