# Main Header Content Footer

## Purpose

`MainHeaderContentFooter`는 `header + content + footer`가 모두 필요한 화면을 위한 메인 shell block이다.

메인 도메인 안에서 헤더와 하단 navigation 구조를 통일해서 조합할 때 사용한다.

## Data Contract

- 입력 데이터: `MainHeaderContentFooterData`
- header 데이터는 `main/header`의 `MainHeaderData`
- footer 데이터는 `main/footer`의 `MainFooterData`
- 본문은 block data가 아니라 `children`으로 주입한다.

## Rendering Rules

- shell은 `min-h-screen` column layout을 사용한다.
- header는 `main/header`, footer는 `main/footer`의 `embedded` 모드로 조합한다.
- 본문 영역은 `flex-1`과 `overflow-y-auto`를 가져 shell 안에서 스크롤을 담당한다.

## Files

- `index.tsx`: header + content + footer shell
- `mock.ts`: 기본 header/footer 조합 데이터
- `mock.scenarios.ts`: 기본 shell 시나리오
- `types.ts`: shell 입력 타입
- `README.md`: shell 목적과 로컬 규칙

