---
title: "세피리아 모드"
slug: "sephiria-mod"
category: "game"
description: "세피리아 모드와 모드 매니저를 GitHub Releases와 manifest 기반으로 배포하는 개인 모딩 프로젝트."
year: 2026
dateRange: "2026.08 -"
team: "개인"
status: "ongoing"
context: "personal"
role: "Release pipeline and mod distribution owner"
tags:
  - Sephiria
  - Modding
  - C#
  - GitHub Releases
external: false
featured: false
draft: true
links:
  github: "https://github.com/jiwoo7158/Sephiria-Mod-Release"
  demo: ""
  site: ""
  youtube: ""
  paper: ""
order: 40
---

## Project

`세피리아 모드`는 Sephiria용 모드와 모드 매니저를 배포하기 위한 개인 모딩 프로젝트입니다. 공개 가능한 범위에서는 GitHub Releases와 `mods.json` manifest를 중심으로, 사용자가 모드 목록과 최신 버전을 확인하고 필요한 패키지를 받을 수 있는 배포 흐름이 확인됩니다.

## My Contribution

현재 공개해도 안전한 기여 범위는 release repository 운영, manifest 기반 버전 관리, 그리고 공개 release artifact 배포입니다. 비공개 개발 자료는 기술적 사실을 검증하기 위한 내부 evidence로 사용할 수 있지만, 저장소 URL이나 민감한 내부 구현은 공개 저장소에 노출하지 않습니다.

## Problems

- 모드 패키지는 release asset, tag, manifest가 서로 어긋나면 업데이트가 깨질 수 있습니다.
- 비공개 개발 소스와 public release 저장소의 공개 범위를 분리해야 합니다.
- 게임 모드 특성상 설치 경로, 버전 호환성, 충돌 가능성을 명확히 안내해야 합니다.

## Design And Implementation

공개 release 저장소는 `mods.json`을 통해 각 모드의 식별자, 이름, 버전, release tag, asset name, 설치 감지 정보를 관리합니다. 패키지는 GitHub Releases에 올리고, manifest는 마지막에 갱신하는 방식으로 사용자가 불완전한 업데이트 상태를 보지 않도록 운영합니다.

## Core Systems

- `mods.json`: 모드별 배포 메타데이터
- GitHub Releases: 버전별 zip/exe artifact
- Mod Manager release: manifest를 읽고 설치/업데이트 대상으로 연결되는 배포 도구

## Results And Learnings

이 프로젝트는 단순히 로컬에서 동작하는 모드를 만드는 것보다 한 단계 더 나아가, 사용자가 실제로 받을 수 있는 형태로 버전과 artifact를 관리하는 경험을 보여줍니다. 공개 가능한 기술 설명은 배포 구조와 검증된 기능 중심으로 두고, 민감한 내부 구현 상세는 요약 수준으로만 다룹니다.
