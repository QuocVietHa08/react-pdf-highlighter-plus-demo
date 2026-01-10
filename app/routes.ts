import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("pdf-demo", "routes/pdf-demo.tsx"),
  route("changelog", "routes/changelog.tsx"),
  route("docs", "routes/docs.tsx"),
  route("sponsor", "routes/sponsor.tsx"),
] satisfies RouteConfig;
