---
title: "Chain Puzzle Game"
slug: "chain-puzzle"
category: "game"
description: "2인 개발 Unity 2D 퍼즐 게임에서 Firebase, localization, settings manager를 담당한 팀 프로젝트."
year: 2026
dateRange: "2026"
team: "2 Developers + 1 Artist"
status: "completed"
context: "team"
role: "Firebase, localization, and settings manager implementation"
tags:
  - Unity
  - Firebase
  - Firestore
  - Localization
  - Puzzle
external: false
featured: false
draft: true
links:
  github: ""
  demo: ""
  site: ""
  youtube: ""
  paper: ""
order: 43
---

## 프로젝트 개요

`Chain Puzzle Game`은 선을 그어 유닛을 이동시키는 Unity 2D 퍼즐 게임입니다. 개발자 2명과 아트 1명, 총 3명이 함께 진행했으며 사용자는 개발자 2명 중 1명으로 참여했습니다. 이 draft는 전체 gameplay가 아니라 사용자가 직접 작성한 manager 영역을 중심으로 정리합니다.

## 내 담당 영역

사용자는 `FirebaseManager`, `LocalizationManager`, `SettingManager`를 작성했습니다. 다른 manager나 전체 gameplay 구현은 사용자 기여로 확대하지 않습니다.

공동 개발자의 공개 프로젝트 설명은 게임 맥락을 이해하기 위한 참고로만 사용하며, 문구나 상대 개발자의 구현을 이 draft에 사용자 기여로 가져오지 않습니다.

## 핵심 구현

유저 제작 맵을 다루려면 실제 puzzle payload와 검색/정렬 metadata를 분리해야 합니다. `FirebaseManager`는 Firebase SDK dependency를 확인하고 Auth와 Firestore를 초기화한 뒤, 익명 로그인과 Google Play 인증 기반 Firebase 로그인 경로를 분리했습니다.

커스텀 맵 저장은 `Level` 객체를 JSON payload로 직렬화하고, title, creator uid/name, rating average/count, createdAt 같은 검색용 필드를 별도로 Firestore에 저장합니다. 조회는 최신순, 별점순, 제목 prefix, 제작자 prefix, pagination을 지원하도록 query를 구성했습니다.

`LocalizationManager`는 현재 설정의 language code를 기준으로 locale JSON을 dictionary로 로드합니다. `SettingManager`는 기본 설정과 저장된 설정을 불러오고, audio 값은 0-1 범위로 clamp하며, gameplay language는 supported locale 목록에 없을 경우 `ko-KR`로 되돌립니다. 설정 저장 전후에 유효성 검사를 두어 잘못된 값이 게임 상태에 퍼지지 않게 했습니다.

## 배운 점과 의미

이 프로젝트는 게임 내부 기능과 외부 백엔드, 로컬 설정, 현지화 데이터가 만나는 지점을 다룬 사례입니다. 특히 유저 제작 콘텐츠를 단일 저장 blob으로만 보지 않고, 검색과 정렬에 필요한 metadata를 함께 설계한 점이 주요 경험입니다.
