---
title: "Unreal TPS Game"
slug: "unreal-tps"
category: "game"
description: "Unreal C++로 캐릭터, 무기, 인벤토리, 이펙트, 저장 구조를 구현한 TPS 학교 과제 프로젝트."
year: 2026
dateRange: "2026"
team: "5명 / 게임엔진기초"
status: "completed"
context: "coursework"
role: "C++ gameplay systems implementation"
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
  youtube: "https://youtu.be/2V868Wmjcyc"
  paper: ""
order: 44
---

## 프로젝트 개요

`Unreal TPS Game`은 `게임엔진기초` 과목에서 5명 팀으로 진행한 Unreal Engine 기반 TPS 학교 과제 프로젝트입니다. 현재도 지속 개발 중이라는 근거는 없으므로 `completed` 상태를 유지합니다.

## 내 담당 영역

사용자는 `Character`의 `Ae_CharacterStub` 관련 코드, `Data`의 무기 타입 관련 코드, `Effects`의 이펙트 처리 시스템, `Interfaces`의 팀 협업용 인터페이스, `Inventory`의 인벤토리 시스템, `Save`의 저장 기능, `Weapons`의 무기 전반 동작을 직접 구현했습니다.

위 폴더 밖의 enemy, mission, npc, UI, variant template 영역까지 사용자 기여로 확대하지 않습니다.

## 핵심 구현

TPS 무기 시스템은 item data, 장착 actor, 사격 처리, 이펙트, 저장 데이터가 서로 맞물려야 합니다. `UAe_InventoryComponent`는 `UAe_WeaponItemInstance` 배열을 보관하고, 선택한 item instance를 weapon actor로 spawn/equip합니다. 기존 장착 actor는 `Unequip`에서 파괴하고, 새 actor에는 owner interface와 item instance 데이터를 넘겨 장착 상태를 갱신합니다.

`AAe_WeaponBase`는 owner attach, item instance 초기화, fire/reload, trace shot, spread, multishot, sound, effect spawn을 담당합니다. 카메라 기준 조준 지점과 총구 위치를 분리해 최종 발사 방향을 계산하고, owner actor를 collision query에서 제외해 자기 자신을 맞히는 문제를 피합니다.

무기 stat은 rarity, damage, rate of fire, magazine size, projectile speed, crit, spread, multi projectile 값으로 구성되고, rune/mod 효과가 runtime에 적용될 수 있습니다. `UAe_AetherModComponent`는 on fire, on hit, on kill, stat rebuild 시점에 효과를 연결하는 hook 역할을 합니다. 저장 쪽은 weapon item instance를 save data로 추출하고, 저장 데이터에서 item instance를 복원하는 흐름을 둡니다.

## 배운 점과 의미

이 프로젝트는 Unreal C++에서 actor, component, interface, data asset, save data가 하나의 gameplay loop로 연결되는 방식을 다룬 사례입니다. 학교 과제 안에서 정해진 담당 영역을 구현하면서, 무기 동작과 데이터 구조를 분리해 확장 가능한 TPS 시스템으로 정리하는 경험을 얻었습니다.

## 관련 링크

- [Project Presentation](https://youtu.be/2V868Wmjcyc)
