import { useEffect } from "react"
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom"

import { Button } from "@/components/ui/button"

import {
  getScenarioDomain,
  getScenarioGroup,
  getScenarioGroupsByDomain,
  scenarioDomains,
} from "./scenario-registry"

function getPreviewTheme(searchParams) {
  return searchParams.get("theme") === "dark" ? "dark" : "light"
}

function createScenarioHref(pathname, searchParams, overrides = {}) {
  const nextParams = new URLSearchParams(searchParams)

  Object.entries(overrides).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      nextParams.delete(key)
      return
    }

    nextParams.set(key, value)
  })

  const queryString = nextParams.toString()

  return queryString ? `${pathname}?${queryString}` : pathname
}

function ScenarioThemeToggle({ theme, buildHref }) {
  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-full border border-border bg-background/95 p-2 shadow-sm backdrop-blur sm:bottom-6 sm:left-6">
      <Button type="button" variant={theme === "light" ? "default" : "outline"} size="sm" asChild>
        <Link replace to={buildHref("light")}>Light</Link>
      </Button>
      <Button type="button" variant={theme === "dark" ? "default" : "outline"} size="sm" asChild>
        <Link replace to={buildHref("dark")}>Dark</Link>
      </Button>
    </div>
  )
}

function useScenarioDocumentTheme(theme) {
  useEffect(() => {
    const rootElement = document.documentElement

    rootElement.classList.toggle("dark", theme === "dark")

    return () => {
      rootElement.classList.remove("dark")
    }
  }, [theme])
}

function ScenarioPreviewShell({
  title,
  description,
  theme,
  buildThemeHref,
  children,
}) {
  useScenarioDocumentTheme(theme)

  return (
    <main className={`${theme} min-h-screen bg-muted px-4 py-8 text-foreground sm:px-6`}>
      <div className="mx-auto max-w-4xl">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="text-sm text-text-soft">{description}</p>
        </div>

        <div className="mt-8">{children}</div>
      </div>
      <ScenarioThemeToggle theme={theme} buildHref={buildThemeHref} />
    </main>
  )
}

export function ScenarioPreviewIndex() {
  const [searchParams] = useSearchParams()
  const theme = getPreviewTheme(searchParams)

  return (
    <ScenarioPreviewShell
      title="Scenario Preview"
      description="도메인별로 들어가서 block scenario를 따로 확인할 수 있습니다."
      theme={theme}
      buildThemeHref={(nextTheme) =>
        createScenarioHref("/scenarios", searchParams, { theme: nextTheme })
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {scenarioDomains.map((domain) => (
          <Link
            key={domain.id}
            to={createScenarioHref(`/scenarios/${domain.id}`, searchParams)}
            className="rounded-3xl border border-border bg-background p-6 transition hover:border-ring hover:bg-accent"
          >
            <p className="text-lg font-semibold tracking-tight">{domain.label}</p>
            <p className="mt-2 text-sm text-text-soft">
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
  const [searchParams] = useSearchParams()
  const theme = getPreviewTheme(searchParams)
  const domain = getScenarioDomain(domainId)

  if (!domain) {
    return <Navigate to="/scenarios" replace />
  }

  const domainGroups = getScenarioGroupsByDomain(domain.id)

  return (
    <ScenarioPreviewShell
      title={`${domain.label} Scenarios`}
      description="block별로 나뉜 페이지로 들어가서 각 시나리오를 단독 렌더링할 수 있습니다."
      theme={theme}
      buildThemeHref={(nextTheme) =>
        createScenarioHref(`/scenarios/${domain.id}`, searchParams, { theme: nextTheme })
      }
    >
      <div className="mb-5">
        <Link
          to={createScenarioHref("/scenarios", searchParams)}
          className="text-sm text-text-soft underline-offset-4 hover:underline"
        >
          Back to domains
        </Link>
      </div>

      <div className="space-y-4">
        {domainGroups.map((scenarioGroup) => (
          <section
            key={scenarioGroup.id}
            className="rounded-2xl border border-border bg-background p-5"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold">{scenarioGroup.label}</h2>
                  <p className="mt-1 text-sm text-text-soft">
                    총 {scenarioGroup.scenarios.length}개 시나리오
                  </p>
                </div>

                <Link
                  to={createScenarioHref(
                    `/scenarios/${domain.id}/${scenarioGroup.id}`,
                    searchParams
                  )}
                  className="rounded-full border border-border bg-muted px-3 py-1.5 text-sm transition hover:border-ring hover:bg-accent"
                >
                  Default
                </Link>
              </div>

              <div className="flex flex-wrap gap-2">
                {scenarioGroup.scenarios.map((scenario, index) => (
                  <Link
                    key={scenario.id}
                    to={createScenarioHref(
                      `/scenarios/${domain.id}/${scenarioGroup.id}`,
                      searchParams,
                      { scenario: String(index) }
                    )}
                    className="rounded-full border border-border bg-muted px-3 py-2 text-sm transition hover:border-ring hover:bg-accent"
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
  const theme = getPreviewTheme(searchParams)
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

  useScenarioDocumentTheme(theme)

  return (
    <main className={`${theme} min-h-screen bg-muted text-foreground`}>
      <div>{scenarioGroup.render(activeScenario)}</div>
      <ScenarioThemeToggle
        theme={theme}
        buildHref={(nextTheme) =>
          createScenarioHref(
            `/scenarios/${domain.id}/${scenarioGroup.id}`,
            searchParams,
            { theme: nextTheme }
          )
        }
      />
    </main>
  )
}
