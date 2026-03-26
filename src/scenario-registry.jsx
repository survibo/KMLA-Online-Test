import { ChatMessage } from "@/blocks/chat/message"
import { chatMessageScenarios } from "@/blocks/chat/message/mock.scenarios"
import { ChatRoom } from "@/blocks/chat/room"
import { chatRoomScenarios } from "@/blocks/chat/room/mock.scenarios"
import { ChatRoomCard } from "@/blocks/chat/room-card"
import {
  baseChatRoomCardCurrentUserId,
} from "@/blocks/chat/room-card/mock"
import { chatRoomCardScenarios } from "@/blocks/chat/room-card/mock.scenarios"
import { ChatRoomList } from "@/blocks/chat/room-list"
import { chatRoomListScenarios } from "@/blocks/chat/room-list/mock.scenarios"
import { GroupPostCard } from "@/blocks/group/post-card"
import { groupPostCardScenarios } from "@/blocks/group/post-card/mock.scenarios"
import { GroupPostDetail } from "@/blocks/group/post-detail"
import { groupPostDetailScenarios } from "@/blocks/group/post-detail/mock.scenarios"
import { GroupPostList } from "@/blocks/group/post-list"
import { groupPostListScenarios } from "@/blocks/group/post-list/mock.scenarios"
import { MainFooter } from "@/blocks/main/footer"
import { createMainFooterData, createMainFooterTabs } from "@/blocks/main/footer/mock"
import { mainFooterScenarios } from "@/blocks/main/footer/mock.scenarios"
import { MainHeader } from "@/blocks/main/header"
import { mainHeaderScenarios } from "@/blocks/main/header/mock.scenarios"
import { MainContentFooter } from "@/blocks/main/content-footer"
import { createMainContentFooterData } from "@/blocks/main/content-footer/mock"
import { mainContentFooterScenarios } from "@/blocks/main/content-footer/mock.scenarios"
import { MainHeaderContentFooter } from "@/blocks/main/header-content-footer"
import { createMainHeaderContentFooterData } from "@/blocks/main/header-content-footer/mock"
import { mainHeaderContentFooterScenarios } from "@/blocks/main/header-content-footer/mock.scenarios"
import { Profile } from "@/blocks/profile"
import { profileScenarios } from "@/blocks/profile/mock.scenarios"

export const scenarioGroups = [
  {
    domain: "chat",
    id: "room-card",
    label: "Chat Room Card",
    scenarios: chatRoomCardScenarios,
    render: (scenario) => (
      <div className="min-h-screen bg-background px-4 py-8 sm:px-6">
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
    id: "room-list",
    label: "Chat Room List",
    scenarios: chatRoomListScenarios,
    render: (scenario) => <ChatRoomList data={scenario.data} />,
  },
  {
    domain: "chat",
    id: "message",
    label: "Chat Message",
    scenarios: chatMessageScenarios,
    render: (scenario) => <ChatMessage data={scenario.data} />,
  },
  {
    domain: "chat",
    id: "room",
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
  {
    domain: "main",
    id: "content-footer",
    label: "Main Content Footer",
    scenarios: mainContentFooterScenarios,
    render: (scenario) => (
      <MainContentFooter data={scenario.data}>
        <div className="min-h-full bg-background px-4 py-8 text-text-soft">
          Content area
        </div>
      </MainContentFooter>
    ),
  },
  {
    domain: "main",
    id: "footer",
    label: "Main Footer",
    scenarios: mainFooterScenarios,
    render: (scenario) => <MainFooter data={scenario.data} />,
  },
  {
    domain: "main",
    id: "header",
    label: "Main Header",
    scenarios: mainHeaderScenarios,
    render: (scenario) => <MainHeader data={scenario.data} />,
  },
  {
    domain: "main",
    id: "header-content-footer",
    label: "Main Header Content Footer",
    scenarios: mainHeaderContentFooterScenarios,
    render: (scenario) => (
      <MainHeaderContentFooter data={scenario.data}>
        <div className="min-h-full bg-background px-4 py-8 text-text-soft">
          Content area
        </div>
      </MainHeaderContentFooter>
    ),
  },
  {
    domain: "profile",
    id: "profile",
    label: "Profile",
    scenarios: profileScenarios,
    render: (scenario) => (
      <MainContentFooter
        data={createMainContentFooterData({
          footer: createMainFooterData({
            activeTabId: "profile",
            tabs: createMainFooterTabs("profile"),
          }),
        })}
      >
        <Profile data={scenario.data} className="min-h-full" />
      </MainContentFooter>
    ),
  },
]

export const scenarioDomains = [
  {
    id: "chat",
    label: "Chat",
  },
  {
    id: "group",
    label: "Group",
  },
  {
    id: "main",
    label: "Main",
  },
  {
    id: "profile",
    label: "Profile",
  },
]

export function getScenarioDomain(domainId) {
  return scenarioDomains.find((domain) => domain.id === domainId) ?? null
}

export function getScenarioGroupsByDomain(domainId) {
  return scenarioGroups.filter((scenarioGroup) => scenarioGroup.domain === domainId)
}

export function getScenarioGroup(domainId, groupId) {
  return (
    scenarioGroups.find(
      (scenarioGroup) =>
        scenarioGroup.domain === domainId && scenarioGroup.id === groupId
    ) ?? null
  )
}
