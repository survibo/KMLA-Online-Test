import { ChevronLeft, ChevronRight, Download, X } from "lucide-react"
import { Navigate, useLocation, useNavigate, useSearchParams } from "react-router-dom"

import { getGroupPostImageViewerData } from "@/blocks/group/mock"
import { Button } from "@/components/ui/button"

function buildPhotoSearch(searchParams, imageId) {
  const nextSearchParams = new URLSearchParams(searchParams)

  nextSearchParams.set("image", imageId)

  return `?${nextSearchParams.toString()}`
}

export function GroupPhotoViewer() {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const imageId = searchParams.get("image")

  if (!imageId) {
    return <Navigate to="/" replace />
  }

  let viewerData

  try {
    viewerData = getGroupPostImageViewerData(imageId)
  } catch {
    return <Navigate to="/" replace />
  }

  const { post, images, activeImage, activeImageIndex } = viewerData
  const previousImage = images[activeImageIndex - 1] ?? images[images.length - 1] ?? null
  const nextImage = images[activeImageIndex + 1] ?? images[0] ?? null
  const fromPath =
    typeof location.state?.fromPath === "string" ? location.state.fromPath : null

  function handleClose() {
    if (fromPath && window.history.length > 1) {
      navigate(-1)
      return
    }

    navigate(fromPath ?? "/", { replace: true })
  }

  function handleMove(image) {
    if (!image) return

    navigate(
      {
        pathname: "/photo",
        search: buildPhotoSearch(searchParams, image.id),
      },
      {
        replace: true,
        state: location.state,
      }
    )
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="relative flex min-h-screen flex-col">
        <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-3 py-3 sm:px-5 sm:py-4">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white/95">
              {post.author.name}
            </p>
            <p className="truncate text-xs text-white/60">
              {activeImageIndex + 1} / {images.length}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-10 rounded-full bg-white/10 text-white"
              aria-label="이미지 다운로드"
            >
              <Download className="size-5" strokeWidth={2.2} />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-10 rounded-full bg-white/10 text-white"
              onClick={handleClose}
              aria-label="이미지 닫기"
            >
              <X className="size-5" strokeWidth={2.2} />
            </Button>
          </div>
        </header>

        <div className="flex min-h-screen items-center justify-center px-3 py-16 sm:px-6 sm:py-20">
          <div className="relative flex w-full max-w-[92rem] items-center justify-center">
            <img
              src={activeImage.url}
              alt={activeImage.alt ?? `${post.title ?? "게시글"} 이미지`}
              className="block max-h-[88vh] w-auto max-w-full object-contain"
              style={
                activeImage.width && activeImage.height
                  ? { aspectRatio: `${activeImage.width} / ${activeImage.height}` }
                  : undefined
              }
            />

            {images.length > 1 ? (
              <>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute left-0 top-1/2 size-11 -translate-y-1/2 rounded-full bg-white/10 text-white sm:left-2"
                  onClick={() => handleMove(previousImage)}
                  aria-label="이전 이미지"
                >
                  <ChevronLeft className="size-6" strokeWidth={2.2} />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-1/2 size-11 -translate-y-1/2 rounded-full bg-white/10 text-white sm:right-2"
                  onClick={() => handleMove(nextImage)}
                  aria-label="다음 이미지"
                >
                  <ChevronRight className="size-6" strokeWidth={2.2} />
                </Button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  )
}
