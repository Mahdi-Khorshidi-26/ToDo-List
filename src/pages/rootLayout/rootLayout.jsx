import { Outlet } from "react-router-dom";
import Classes from "./rootLayout.module.css";
import Navigation from "../../components/navigation";
export default function RootLayout() {
  return (
    <main className={Classes.mainWrapper}>
      <Navigation />
      <Outlet />
    </main>
  );
}
