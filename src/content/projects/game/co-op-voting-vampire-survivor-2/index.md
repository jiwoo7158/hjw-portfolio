---
title: "협력 투표 뱀서라이크 ver 2.0"
slug: "co-op-voting-vampire-survivor-2"
category: "game"
description: "Unity NetCode/Relay 기반 협력 세션과 투표식 성장, 데이터 기반 버프 구조를 설계한 멀티플레이어 액션 프로토타입."
year: 2026
dateRange: "2026.06 -"
team: "팀 프로젝트"
status: "discontinued"
context: "team"
role: "Session, roster, relay, stat, and buff infrastructure"
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

## Project

`협력 투표 뱀서라이크 ver 2.0`은 여러 플레이어가 같은 세션에서 전투하고, 투표를 통해 파티 성장 방향을 선택하는 Unity 기반 협력 액션 프로토타입입니다. 현재는 개발 중단 상태로 정리하며, Notion 기획에는 코어 게임플레이, 시스템, 캐릭터/무기/대쉬, 스탯 계산식, 파티 버프, 투표 보상, 경제 구조가 분리되어 있었습니다.

## My Contribution

확인한 로컬 소스 기준으로는 세션 라이프사이클, Relay 연결 준비, 플레이어 roster, 캐릭터 stat 로딩, 버프 runtime/cache 구조가 핵심 경험입니다. 팀 프로젝트이므로 최종 공개 전에는 정확한 역할 분담을 한 번 더 확인해야 합니다.

## Problems

- 멀티플레이 환경에서는 host/client world 생성, 접속, 종료 순서가 명확해야 합니다.
- roster slot, ready state, character selection은 네트워크 연결 상태와 분리해서 관리해야 합니다.
- 버프는 스탯 보정, 조건, 게이지, 이벤트 효과가 섞이기 쉬워 구조가 커질수록 유지보수가 어려워집니다.

## Design And Implementation

`SessionManager`는 host/client world를 생성하고, Relay 준비와 접속 상태를 관리합니다. `SessionRosterManager`는 최대 4인 슬롯과 readiness, character selection, disconnect 상태를 별도 모델로 유지합니다.

버프/스탯 쪽은 JSON 기반 definition을 runtime/native cache로 변환해 ECS 시스템에서 사용할 수 있게 구성되어 있습니다. `BuffDataManager`는 `ActiveBuff`의 stack, duration, level, phase, progress, value scale을 갱신하고 dirty flag로 stat recalculation을 요청합니다.

## Core Systems

- `SessionManager`: host/client lifecycle, Relay-aware setup, shutdown
- `SessionRosterManager`: fixed player slots, ready state, character choice
- `RelayManager`: Unity Services Relay allocation and join flow
- `StatDataManager`: character stat and dash data loading into native caches
- `BuffDataManager`: buff definition normalization, runtime cache, stack/duration rules

## Results And Learnings

이 프로젝트는 완성작이 아니라 개발 중단된 프로토타입이지만, 협력 플레이 인프라를 포트폴리오 포인트로 삼을 수 있습니다. 특히 투표식 성장과 파티 버프가 가능하려면 서버 권한, 데이터 구조, 동기화 범위가 먼저 안정되어야 한다는 점을 보여줍니다.
