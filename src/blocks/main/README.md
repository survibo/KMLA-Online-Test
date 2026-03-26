# Main Domain

## Purpose

`main` 도메인은 앱 메인 화면에서만 쓰는 block을 모은다.

전역 layout이나 모든 화면 공용 footer로 올리지 않고, 메인 화면 내부에서만 필요한 UI를 block으로 관리하는 것을 우선한다.

## Local Rules

- 메인 화면 상단 헤더와 하단 footer-like bar는 각각 block으로 분리하되, 둘 다 메인 화면 전용 UI로 취급한다.
- 메인 화면 전용 하단 네비게이션처럼 보여도 앱 전체 공용 footer로 취급하지 않는다.
- `main/footer`는 footer bar 자체 표현에 집중하고, 화면 구조 조합은 shell block에서 맡는다.
- 메인 shell은 화면 구조에 따라 `main/content-footer`, `main/header-content-footer`로 나눈다.
- 다른 화면(`post-list` 등)에 영향을 줄 수 있는 전역 부착 방식은 우선 피한다.
