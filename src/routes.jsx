import { createBrowserRouter, Link, Navigate, Outlet, RouterProvider } from "react-router-dom"

import { Example } from "./Example"
import {
  ScenarioBlockPreview,
  ScenarioDomainPreview,
  ScenarioPreviewIndex,
} from "./ScenarioPreview"

function AppLayout() {
  return <Outlet />
}

function HomePage() {
  return (
    <main className="px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-[32px] border border-zinc-200 bg-white p-8 shadow-sm sm:p-10">
          <div className="max-w-2xl space-y-4">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-zinc-500">
              Routing Playground
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950">
              block preview entry를 라우트 기준으로 정리한 시작 화면
            </h1>
            <p className="text-base leading-7 text-zinc-600">
              파일 기반 라우팅 없이, route 설정 파일 하나에서 예제 화면과 시나리오
              프리뷰를 관리합니다.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Link
              to="/example"
              className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5 transition hover:border-zinc-300 hover:bg-zinc-100"
            >
              <p className="text-lg font-semibold tracking-tight text-zinc-950">
                Example
              </p>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                현재 대표 block을 바로 렌더링하는 샘플 화면입니다.
              </p>
            </Link>

            <Link
              to="/scenarios"
              className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5 transition hover:border-zinc-300 hover:bg-zinc-100"
            >
              <p className="text-lg font-semibold tracking-tight text-zinc-950">
                Scenario Preview
              </p>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                block별 mock scenario를 선택해서 단독 렌더링으로 확인합니다.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "example",
        element: <Example />,
      },
      {
        path: "scenarios",
        element: <ScenarioPreviewIndex />,
      },
      {
        path: "scenarios/:domainId",
        element: <ScenarioDomainPreview />,
      },
      {
        path: "scenarios/:domainId/:blockId",
        element: <ScenarioBlockPreview />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
