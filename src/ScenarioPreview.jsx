import { useEffect, useState } from "react"

import { ChatRoomCard } from "@/blocks/chat/room-card"
import {
  baseChatRoomCardCurrentUserId,
} from "@/blocks/chat/room-card/mock"
import { chatRoomCardScenarios } from "@/blocks/chat/room-card/mock.scenarios"
import { ChatMessage } from "@/blocks/chat/message"
import { chatMessageScenarios } from "@/blocks/chat/message/mock.scenarios"
import { ChatRoom } from "@/blocks/chat/room"
import { chatRoomScenarios } from "@/blocks/chat/room/mock.scenarios"
import { ChatRoomList } from "@/blocks/chat/room-list"
import { chatRoomListScenarios } from "@/blocks/chat/room-list/mock.scenarios"
import { GroupPostCard } from "@/blocks/group/post-card"
import { groupPostCardScenarios } from "@/blocks/group/post-card/mock.scenarios"
import { GroupPostDetail } from "@/blocks/group/post-detail"
import { groupPostDetailScenarios } from "@/blocks/group/post-detail/mock.scenarios"
import { GroupPostList } from "@/blocks/group/post-list"
import { groupPostListScenarios } from "@/blocks/group/post-list/mock.scenarios"
import { Button } from "@/components/ui/button"

const scenarioGroups = [
  {
    domain: "chat",
    id: "chat-room-card",
    label: "Chat Room Card",
    scenarios: chatRoomCardScenarios,
    render: (scenario) => (
      <div className="min-h-screen bg-white px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-xl">
          <ChatRoomCard
            room={scenario.room}
            currentUserId={scenario.currentUserId ?? baseChatRoomCardCurrentUserId}
          />
        </div>
      </div>
    ),
  },
  {
    domain: "chat",
    id: "chat-room-list",
    label: "Chat Room List",
    scenarios: chatRoomListScenarios,
    render: (scenario) => <ChatRoomList data={scenario.data} />,
  },
  {
    domain: "chat",
    id: "chat-message",
    label: "Chat Message",
    scenarios: chatMessageScenarios,
    render: (scenario) => <ChatMessage data={scenario.data} />,
  },
  {
    domain: "chat",
    id: "chat-room",
    label: "Chat Room",
    scenarios: chatRoomScenarios,
    render: (scenario) => <ChatRoom data={scenario.data} />,
  },
  {
    domain: "group",
    id: "post-card",
    label: "Group Post Card",
    scenarios: groupPostCardScenarios,
    render: (scenario) => <GroupPostCard post={scenario.post} />,
  },
  {
    domain: "group",
    id: "post-detail",
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
    domain: "group",
    id: "post-list",
    label: "Group Post List",
    scenarios: groupPostListScenarios,
    render: (scenario) => <GroupPostList group={scenario.group} />,
  },
]

const scenarioDomains = [
  {
    id: "chat",
    label: "Chat",
  },
  {
    id: "group",
    label: "Group",
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

  useEffect(() => {
    if (!selection) return

    window.scrollTo({ top: 0, left: 0, behavior: "auto" })
  }, [selection])

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
          {scenarioDomains.map((domain) => {
            const domainGroups = scenarioGroups.filter(
              (scenarioGroup) => scenarioGroup.domain === domain.id
            )

            return (
              <section
                key={domain.id}
                className="rounded-3xl border border-zinc-200 bg-white p-5 sm:p-6"
              >
                <div className="space-y-5">
                  <div>
                    <h2 className="text-xl font-semibold tracking-tight">
                      {domain.label}
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {domainGroups.map((scenarioGroup) => (
                      <section
                        key={scenarioGroup.id}
                        className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4"
                      >
                        <div className="space-y-3">
                          <div>
                            <h3 className="text-lg font-semibold">
                              {scenarioGroup.label}
                            </h3>
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
                                className="h-auto items-start rounded-xl bg-white px-4 py-3 text-left"
                                onClick={() =>
                                  writeHashSelection(scenarioGroup.id, index)
                                }
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
              </section>
            )
          })}
        </div>
      </div>
    </main>
  )
}
