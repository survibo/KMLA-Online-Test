import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  useLocation,
} from "react-router-dom"

import { GroupPhotoViewer } from "@/blocks/group/photo-viewer"
import { FontScaleControl } from "@/components/font-scale-control"
import { TopLoadingBar } from "@/components/top-loading-bar"
import {
  ScenarioBlockPreview,
  ScenarioDomainPreview,
  ScenarioPreviewIndex,
} from "./ScenarioPreview"

async function scenarioBlockPreviewLoader({ params, request }) {
  const requestUrl = new URL(request.url)
  const scenarioIndex = requestUrl.searchParams.get("scenario")
  const loadingBarTest = requestUrl.searchParams.get("loading-bar-test")
  const shouldDelayForLoadingBar =
    params.domainId === "group" &&
    params.blockId === "post-list" &&
    scenarioIndex === "1" &&
    loadingBarTest === "1"

  if (shouldDelayForLoadingBar) {
    const delayMs = 500 + Math.floor(Math.random() * 1001)

    await new Promise((resolve) => {
      setTimeout(resolve, delayMs)
    })
  }

  return null
}

function AppLayout() {
  const location = useLocation()
  const isScenarioRoute = location.pathname.startsWith("/scenarios")

  return (
    <>
      <TopLoadingBar />
      <Outlet />
      {isScenarioRoute ? null : <FontScaleControl />}
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/scenarios" replace />,
      },
      {
        path: "photo",
        element: <GroupPhotoViewer />,
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
        loader: scenarioBlockPreviewLoader,
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
