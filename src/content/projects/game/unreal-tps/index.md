---
title: "Unreal TPS Game"
slug: "unreal-tps"
category: "game"
description: "Unreal C++로 캐릭터, 무기, 인벤토리, 이펙트, 룬/모드 훅을 연결한 TPS 시스템 프로젝트."
year: 2026
dateRange: "2026"
team: "팀/개인 확인 필요"
status: "completed"
context: "team"
role: "C++ gameplay systems coursework contribution candidate"
tags:
  - Unreal Engine
  - C++
  - TPS
  - Inventory
  - Weapon System
external: false
featured: false
draft: true
links:
  github: ""
  demo: ""
  site: ""
  youtube: ""
  paper: ""
order: 44
---

## Project

`Unreal TPS Game`은 학교 과제로 진행한 Unreal Engine 기반 TPS 프로젝트입니다. 현재도 지속 개발 중이라는 근거는 확인되지 않았으므로 completed 상태로 정리합니다. 확인한 C++ 소스는 캐릭터 입력/상호작용, 무기 소유자 인터페이스, 인벤토리, 무기 발사/장전, 이펙트 타입, 룬/모드 훅을 서로 연결합니다.

## My Contribution

사용자가 지정한 `Character`, `Data`, `Effects`, `Interfaces`, `Inventory`, `Save`, `Weapons` 폴더를 근거로 C++ gameplay system 기여 후보를 정리했습니다. 학교 과제 안에서의 팀 역할과 제출 범위는 공개 전에 확인이 필요합니다.

## Problems

- inventory item data와 실제 장착 weapon actor가 분리되어 있어 동기화 지점이 명확해야 합니다.
- 무기 stat은 rune/mod 효과로 runtime 변경될 수 있어 중복 적용을 방지해야 합니다.
- hitscan, projectile effect, multishot, spread, damage request가 owner/collision 규칙을 공유해야 합니다.

## Design And Implementation

`AAe_CharacterStub`는 weapon owner와 hittable interface를 구현하고, 입력, 상호작용, 발사, 장전, 무기 전환, HUD 갱신을 연결합니다. `UAe_InventoryComponent`는 `UAe_WeaponItemInstance` 배열을 보관하고, 선택한 item을 equipped actor로 spawn/equip하는 구조입니다.

`AAe_WeaponBase`는 owner attach, item instance 초기화, fire/reload, trace shot, spread, multishot, sound, effect spawn을 담당합니다. `UAe_AetherModComponent`는 on fire, on hit, on kill, stat rebuild 시점에 모드 효과를 적용할 hook을 제공합니다.

## Core Systems

- Character input and weapon-owner interface
- Inventory item instance and equipped actor separation
- Weapon stat component and runtime rune updates
- Effect type/library-based projectile/status handling
- Aether mod hooks for extensible weapon behavior
- Save data extraction/restoration path

## Results And Learnings

이 draft는 Unreal C++에서 actor, component, interface, data asset이 어떻게 한 gameplay loop로 이어지는지 보여주는 방향으로 다듬을 수 있습니다. 공개 전에는 과제 범위와 역할 범위를 확정하고, 실제 플레이/에디터 스크린샷을 추가하는 것이 좋습니다.
