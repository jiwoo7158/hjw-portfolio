---
title: "협력 투표 뱀서라이크 ver 2.0"
slug: "co-op-voting-vampire-survivor-2"
category: "game"
description: "Unity NetCode/Relay 기반 협력 세션, roster, stat/buff 인프라를 구현한 멀티플레이어 액션 프로토타입."
year: 2026
dateRange: "2026.06 -"
team: "4명의 개발자와 함께 진행"
status: "discontinued"
context: "team"
role: "Session, roster, Relay, stat, and buff infrastructure implementation"
tags:
  - Unity
  - NetCode
  - Relay
  - ECS
  - Multiplayer
external: false
featured: false
draft: true
links:
  github: ""
  demo: ""
  site: ""
  youtube: ""
  paper: ""
order: 41
---

## 프로젝트 개요

`협력 투표 뱀서라이크 ver 2.0`은 여러 플레이어가 같은 세션에서 전투하고, 투표를 통해 파티 성장 방향을 선택하는 Unity 기반 협력 액션 프로토타입입니다. 4명의 개발자와 함께 진행한 팀 프로젝트이며, 현재 프로젝트 상태는 `discontinued`입니다.

## 내 담당 영역

사용자는 `Assets/Scripts/Session` 전체와 `Assets/Scripts/Managers`의 `BuffDataManager`, `EntityObjectManager`, `RelayManager`, `SessionManager`, `SessionRosterManager`, `StatDataManager`를 작성했습니다.

이 담당 범위에서 확정할 수 있는 기여는 세션 시스템 구현, roster 관리, Unity Relay 관련 구현, stat/buff 데이터 관리, 그리고 해당 클래스들에서 확인되는 멀티플레이 인프라입니다. 팀 프로젝트이므로 이 범위 밖의 전체 gameplay나 다른 시스템은 사용자 기여로 확대하지 않습니다.

## 핵심 구현

멀티플레이 프로토타입에서는 host/client world 생성, prefab reference 준비, 접속, 종료 순서가 어긋나면 세션 상태가 쉽게 꼬입니다. `SessionManager`는 Unity NetCode world를 생성하고, server/client prefab load request가 준비된 뒤 listen/connect를 수행하며, Relay host/client 경로와 local host-client IPC 연결을 분리했습니다.

`SessionRosterManager`는 최대 4인 slot을 고정 배열로 관리합니다. network id와 slot index를 별도 dictionary로 매핑하고, ready state, character selection, connected/disconnected 상태를 slot 단위로 갱신합니다. 이 구조 덕분에 네트워크 연결 상태와 로비 표시 상태를 같은 데이터 모델 안에서 추적할 수 있습니다.

버프와 stat은 JSON definition을 runtime data와 native cache로 변환하는 흐름으로 구성했습니다. `BuffDataManager`는 player buff와 session-wide buff를 추가/갱신하고, stack/duration/value scale/progress를 적용한 뒤 stat recalculation이 필요할 때 dirty flag를 붙입니다. 이를 통해 투표 보상이나 파티 버프 같은 확장 규칙을 ECS 시스템에서 다룰 수 있는 기반을 만들었습니다.

## 배운 점과 의미

완성작으로 공개된 프로젝트는 아니지만, 멀티플레이어 게임에서 세션과 성장 시스템을 먼저 안정화해야 이후 콘텐츠가 안전하게 올라갈 수 있다는 점을 보여주는 작업입니다. 특히 session, Relay, roster, stat/buff 계층을 분리해 둔 경험은 협력형 게임 시스템을 설명하는 포트폴리오 근거가 됩니다.
