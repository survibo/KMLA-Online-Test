import { useLocation, useNavigate, useSearchParams } from "react-router-dom"

type QueryDrawerStateOptions = {
  queryKey: string
  sourcePathStateKey: string
  sourceIdStateKey: string
}

export function useQueryDrawerState({
  queryKey,
  sourcePathStateKey,
  sourceIdStateKey,
}: QueryDrawerStateOptions) {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const openId = searchParams.get(queryKey)

  function updateQuery(nextId: string | null, replace = false) {
    const nextSearchParams = new URLSearchParams(searchParams)

    if (nextId) {
      nextSearchParams.set(queryKey, nextId)
    } else {
      nextSearchParams.delete(queryKey)
    }

    const nextSearch = nextSearchParams.toString()

    navigate(
      {
        pathname: location.pathname,
        search: nextSearch ? `?${nextSearch}` : "",
      },
      {
        replace,
        state: nextId
          ? {
              ...location.state,
              [sourcePathStateKey]: `${location.pathname}${location.search}`,
              [sourceIdStateKey]: nextId,
            }
          : location.state,
      }
    )
  }

  function open(nextId: string) {
    if (openId === nextId) return

    updateQuery(nextId)
  }

  function close() {
    if (!openId) return

    const sourcePath =
      typeof location.state?.[sourcePathStateKey] === "string"
        ? location.state[sourcePathStateKey]
        : null
    const currentPath = `${location.pathname}${location.search}`

    if (sourcePath && sourcePath !== currentPath) {
      navigate(-1)
      return
    }

    updateQuery(null, true)
  }

  return {
    openId,
    open,
    close,
  }
}
