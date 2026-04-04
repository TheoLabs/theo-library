import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { DashboardScreen, MemberScreen } from "@screens";
import { BaseLayOut } from "@components";
import { router } from "./const";

export function AppRouter() {
  // 1. destructure props
  // 2. lib hooks
  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  // 9. render
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BaseLayOut />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardScreen />} />

          <Route path="/library">
            <Route index element={<div>library</div>} />
          </Route>

          <Route path={router.SYSTEM.MEMBER} element={<MemberScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
