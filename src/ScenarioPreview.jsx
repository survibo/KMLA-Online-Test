import { Link, Navigate, useParams, useSearchParams } from "react-router-dom"

import {
  getScenarioDomain,
  getScenarioGroup,
  getScenarioGroupsByDomain,
  scenarioDomains,
} from "./scenario-registry"
import { Button } from "@/components/ui/button"

function ScenarioPreviewShell({ title, description, children }) {
  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-8 text-zinc-950 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="text-sm text-zinc-500">{description}</p>
        </div>

        <div className="mt-8">{children}</div>
      </div>
    </main>
  )
}

export function ScenarioPreviewIndex() {
  return (
    <ScenarioPreviewShell
      title="Scenario Preview"
      description="도메인별로 들어가서 block scenario를 따로 확인할 수 있습니다."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {scenarioDomains.map((domain) => (
          <Link
            key={domain.id}
            to={`/scenarios/${domain.id}`}
            className="rounded-3xl border border-zinc-200 bg-white p-6 transition hover:border-zinc-300 hover:bg-zinc-100"
          >
            <p className="text-lg font-semibold tracking-tight">{domain.label}</p>
            <p className="mt-2 text-sm text-zinc-500">
              {domain.label} block 시나리오 목록으로 이동합니다.
            </p>
          </Link>
        ))}
      </div>
    </ScenarioPreviewShell>
  )
}

export function ScenarioDomainPreview() {
  const { domainId } = useParams()
  const domain = getScenarioDomain(domainId)

  if (!domain) {
    return <Navigate to="/scenarios" replace />
  }

  const domainGroups = getScenarioGroupsByDomain(domain.id)

  return (
    <ScenarioPreviewShell
      title={`${domain.label} Scenarios`}
      description="block별로 나뉜 페이지로 들어가서 각 시나리오를 단독 렌더링할 수 있습니다."
    >
      <div className="mb-5">
        <Link to="/scenarios" className="text-sm text-zinc-500 underline-offset-4 hover:underline">
          Back to domains
        </Link>
      </div>

      <div className="space-y-4">
        {domainGroups.map((scenarioGroup) => (
          <section
            key={scenarioGroup.id}
            className="rounded-2xl border border-zinc-200 bg-white p-5"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold">{scenarioGroup.label}</h2>
                  <p className="mt-1 text-sm text-zinc-500">
                    총 {scenarioGroup.scenarios.length}개 시나리오
                  </p>
                </div>

                <Link
                  to={`/scenarios/${domain.id}/${scenarioGroup.id}`}
                  className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm transition hover:border-zinc-300 hover:bg-zinc-100"
                >
                  Default
                </Link>
              </div>

              <div className="flex flex-wrap gap-2">
                {scenarioGroup.scenarios.map((scenario, index) => (
                  <Link
                    key={scenario.id}
                    to={`/scenarios/${domain.id}/${scenarioGroup.id}?scenario=${index}`}
                    className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm transition hover:border-zinc-300 hover:bg-zinc-100"
                  >
                    {scenario.label}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </ScenarioPreviewShell>
  )
}

export function ScenarioBlockPreview() {
  const { domainId, blockId } = useParams()
  const [searchParams] = useSearchParams()
  const domain = getScenarioDomain(domainId)
  const scenarioGroup = getScenarioGroup(domainId, blockId)

  if (!domain || !scenarioGroup) {
    return <Navigate to="/scenarios" replace />
  }

  const scenarioIndexText = searchParams.get("scenario")
  const parsedScenarioIndex = Number(scenarioIndexText)
  const scenarioIndex =
    Number.isInteger(parsedScenarioIndex) &&
    parsedScenarioIndex >= 0 &&
    parsedScenarioIndex < scenarioGroup.scenarios.length
      ? parsedScenarioIndex
      : 0

  const activeScenario = scenarioGroup.scenarios[scenarioIndex]

  return (
    <div>{scenarioGroup.render(activeScenario)}</div>
  )
}
