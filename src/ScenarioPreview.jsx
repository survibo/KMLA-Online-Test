import { useEffect, useState } from "react"

import { GroupPostCard } from "@/blocks/group-post/card"
import { groupPostCardScenarios } from "@/blocks/group-post/card/mock.scenarios"
import { GroupPostDetail } from "@/blocks/group-post/detail"
import { groupPostDetailScenarios } from "@/blocks/group-post/detail/mock.scenarios"
import { GroupPostList } from "@/blocks/group-post/list"
import { groupPostListScenarios } from "@/blocks/group-post/list/mock.scenarios"
import { Button } from "@/components/ui/button"

const scenarioGroups = [
  {
    id: "card",
    label: "Group Post Card",
    scenarios: groupPostCardScenarios,
    render: (scenario) => <GroupPostCard post={scenario.post} />,
  },
  {
    id: "detail",
    label: "Group Post Detail",
    scenarios: groupPostDetailScenarios,
    render: (scenario) => (
      <GroupPostDetail
        post={scenario.post}
        commentItems={scenario.commentItems}
      />
    ),
  },
  {
    id: "list",
    label: "Group Post List",
    scenarios: groupPostListScenarios,
    render: (scenario) => <GroupPostList group={scenario.group} />,
  },
]

function readHashSelection() {
  const hash = window.location.hash.replace(/^#/, "")

  if (!hash) return null

  const [groupId, indexText] = hash.split(":")
  const scenarioGroup = scenarioGroups.find((item) => item.id === groupId)
  const scenarioIndex = Number(indexText)

  if (!scenarioGroup || Number.isNaN(scenarioIndex)) {
    return null
  }

  if (scenarioIndex < 0 || scenarioIndex >= scenarioGroup.scenarios.length) {
    return null
  }

  return { groupId, scenarioIndex }
}

function writeHashSelection(groupId, scenarioIndex) {
  window.location.hash = `${groupId}:${scenarioIndex}`
}

function clearHashSelection() {
  window.location.hash = ""
}

export function ScenarioPreview() {
  const [selection, setSelection] = useState(() => {
    if (typeof window === "undefined") return null
    return readHashSelection()
  })

  useEffect(() => {
    function handleHashChange() {
      setSelection(readHashSelection())
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        clearHashSelection()
      }
    }

    window.addEventListener("hashchange", handleHashChange)
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("hashchange", handleHashChange)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  if (selection) {
    const scenarioGroup = scenarioGroups.find((item) => item.id === selection.groupId)

    if (!scenarioGroup) {
      return null
    }

    return scenarioGroup.render(scenarioGroup.scenarios[selection.scenarioIndex])
  }

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-8 text-zinc-950 sm:px-6">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            Scenario Preview
          </h1>
          <p className="text-sm text-zinc-500">
            번호를 누르면 해당 block만 실제 화면처럼 단독 렌더링됩니다. 돌아오려면
            `Esc`를 누르세요.
          </p>
        </div>

        <div className="space-y-5">
          {scenarioGroups.map((scenarioGroup) => (
            <section
              key={scenarioGroup.id}
              className="rounded-2xl border border-zinc-200 bg-white p-5"
            >
              <div className="space-y-3">
                <div>
                  <h2 className="text-lg font-semibold">{scenarioGroup.label}</h2>
                  <p className="text-sm text-zinc-500">
                    총 {scenarioGroup.scenarios.length}개 시나리오
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {scenarioGroup.scenarios.map((scenario, index) => (
                    <Button
                      key={scenario.id}
                      type="button"
                      variant="outline"
                      className="h-auto items-start rounded-xl px-4 py-3 text-left"
                      onClick={() => writeHashSelection(scenarioGroup.id, index)}
                    >
                      <span className="font-semibold">{index}</span>
                      <span className="ml-2 text-sm text-zinc-600">
                        {scenario.label}
                      </span>
                    </Button>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}
