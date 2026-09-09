---
title: "세피리아 모드"
slug: "sephiria-mod"
category: "game"
description: "BepInEx 기반 세피리아 모드 기능과 GitHub Releases/manifest 배포 흐름을 함께 설계한 개인 모딩 프로젝트."
year: 2026
dateRange: "2026.08 -"
team: "개인"
status: "ongoing"
context: "personal"
role: "BepInEx mod developer and release pipeline owner"
tags:
  - Sephiria
  - BepInEx
  - Harmony
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

## 프로젝트 개요

`세피리아 모드`는 Sephiria의 게임 구조를 분석하고, BepInEx/Harmony 기반 플러그인으로 편의 기능과 신규 규칙을 확장하는 개인 모딩 프로젝트입니다. 공개 저장소는 배포용 release와 manifest를 담당하고, 실제 개발 저장소는 내부 evidence로만 사용합니다.

## 내 담당 영역

사용자는 모드 기능 구현과 배포 구조를 모두 담당했습니다. 내부 개발 코드 기준으로는 `SephiriaInventorySort`, `SephiriaTrials`, `SephiriaSpeedrunTimer` 세 축이 확인됩니다.

- `SephiriaInventorySort`: 캐릭터 인벤토리 상태를 읽어 mod-side snapshot으로 변환하고, 유물/석판/각인 효과를 분리한 뒤 가상 인벤토리 preview에서 정렬 결과를 보여주는 구조
- `SephiriaTrials`: 시련 category/definition/reward registry, run state 저장, runtime rule tick, 적 체력/피해/스테이지 진행에 연결되는 trial runtime 기반
- `SephiriaSpeedrunTimer`: 던전 run 시간과 stage split을 추적하고, best record와 비교하며, 로컬 JSON record를 저장하는 speedrun HUD
- 배포 저장소: `mods.json` manifest와 GitHub Releases artifact를 통해 모드 매니저가 최신 버전과 패키지를 찾을 수 있게 하는 release 흐름

private development repository URL, private source code, decompiled game source, game DLL은 공개 draft에 노출하지 않습니다.

## 핵심 구현

모딩 프로젝트에서는 게임 클래스와 메서드 이름을 추측하면 런타임에서 쉽게 깨집니다. 이 프로젝트는 디컴파일 결과와 DLL reference를 내부 조사 근거로 삼고, 공개 코드에는 게임 원본을 복사하지 않는 방식으로 구현 경계를 나눴습니다.

Inventory Sort는 실제 인벤토리 변경보다 먼저 snapshot과 preview를 분리합니다. `InventoryReader`가 게임 UI/inventory에서 읽은 값을 `InventorySnapshot`으로 변환하고, `InventorySorter`는 movable artifact, movable stone tablet, fixed engraving, locked/unknown 효과를 분리해 정렬 결과를 계산합니다. 정렬 평가는 hard constraint를 먼저 보고, main/support/combo priority를 순서대로 비교하는 방식입니다.

Trials는 시련 정의와 runtime 적용을 분리합니다. `TrialRegistry`는 악마/세계/계획/사원 category와 trial/reward metadata를 등록하고, `TrialManager`는 run key, active trial level, stage, runtime rule, 저장 주기를 관리합니다. 실제 게임 연결은 `GameBridge`와 Harmony patch layer로 격리해 원본 DLL을 수정하지 않는 구조를 유지합니다.

Speedrun Timer는 게임 진행 상태를 읽어 HUD를 갱신하고, 결과 화면 시간이 확인되면 run을 고정한 뒤 best run record를 로컬 JSON으로 저장합니다. stage별 split과 best 대비 차이를 따로 관리해 플레이 중 피드백을 줄 수 있게 설계했습니다.

## 배운 점과 의미

이 프로젝트는 게임 원본을 직접 수정하지 않고도 런타임 hook, 외부 reference, 로컬 저장소, 배포 manifest를 조합해 사용자가 설치 가능한 모드 경험을 만드는 과정을 다룹니다. 기능 구현과 배포 구조를 함께 설계하면서, 모딩 프로젝트에서 공개 가능한 설명과 공개하면 안 되는 내부 근거를 분리하는 기준도 함께 정리했습니다.

## 관련 링크

- [GitHub / Release Repository](https://github.com/jiwoo7158/Sephiria-Mod-Release)
