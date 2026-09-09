---
title: "Chain Puzzle Game"
slug: "chain-puzzle"
category: "game"
description: "Unity 2D 퍼즐 게임의 Firebase 커스텀 맵 공유, 현지화, 설정 저장 계층을 다룬 팀 프로젝트."
year: 2026
dateRange: "2026"
team: "팀 프로젝트"
status: "completed"
context: "team"
role: "Firebase, localization, settings, and manager-layer contribution candidate"
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

## Project

`Chain Puzzle Game`은 선을 그어 유닛을 이동시키는 Unity 2D 퍼즐 프로젝트입니다. 이번 draft는 전체 게임 소개보다 사용자가 지정한 manager layer에서 확인 가능한 Firebase, localization, settings 구조에 초점을 둡니다.

## My Contribution

확인한 로컬 파일 기준으로는 `FirebaseManager`, `LocalizationManager`, `SettingManager`가 주요 기여 후보입니다. 205.kr 페이지는 참고 맥락으로만 사용했고, 다른 개발자의 문구나 구현을 가져오지 않았습니다.

## Problems

- 유저 제작 맵은 검색 가능한 metadata와 실제 puzzle payload를 분리해서 저장해야 합니다.
- Firebase 연결, Google Play 인증, guest login이 실패해도 게임이 예측 가능한 상태를 유지해야 합니다.
- 설정 값과 언어 코드는 저장 전후에 안전한 기본값과 유효성 검사가 필요합니다.

## Design And Implementation

`FirebaseManager`는 Firebase SDK dependency 확인 후 Auth와 Firestore를 초기화합니다. Google Play Games 인증 코드를 Firebase 로그인 흐름으로 연결하는 경로와 guest login 경로를 분리해 둡니다.

커스텀 맵 업로드는 `Level` 데이터를 JSON payload로 직렬화하고, 제목/제작자/별점/생성 시각 같은 검색용 metadata를 별도 필드로 저장합니다. 조회는 최신순, 별점순, 제목 prefix, 제작자 prefix와 pagination을 지원합니다.

`LocalizationManager`는 locale별 JSON을 dictionary로 로드하고, `SettingManager`는 저장된 설정을 불러온 뒤 audio 범위와 지원 언어를 검증합니다.

## Core Systems

- Firebase dependency and Auth initialization
- Google Play Games to Firebase sign-in
- Firestore custom map upload/search/rating
- Locale JSON dictionary loading
- Persistent settings validation

## Results And Learnings

이 프로젝트는 게임 내부 기능과 외부 백엔드가 만나는 지점을 다룬 사례입니다. 특히 유저 제작 콘텐츠를 단일 blob으로만 저장하지 않고, 검색/정렬에 필요한 metadata를 분리한 점이 포트폴리오에서 설명하기 좋습니다.
