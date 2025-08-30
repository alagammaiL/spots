import { Outlet } from "react-router-dom";
import MainNavigation from "./shared/Components/Navigation/MainNavigation";
import AuthComponentProvider from "./shared/Components/Context/Auth-Context";
export default function RootLayout() {
  return (
    <AuthComponentProvider>
      <MainNavigation />
      <main style={{ marginTop: "6rem" }}>
        <Outlet />
      </main>
    </AuthComponentProvider>
  );
}
