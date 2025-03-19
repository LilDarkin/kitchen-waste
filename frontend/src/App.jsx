import { useRoutes } from "react-router-dom";

// ROUTES
import routes from "app/routes/routes";

export default function App() {
  const content = useRoutes(routes);

  return content;
}
