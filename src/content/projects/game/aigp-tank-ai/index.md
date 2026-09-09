---
title: "AIGP Team 4 Tank AI 과제"
slug: "aigp-tank-ai"
category: "game"
description: "Unity 1:1 탱크 전투에서 방어형 Behavior Tree와 ML-Agents 기반 AI decision logic을 구현한 팀 과제."
year: 2026
dateRange: "2026"
team: "5명의 개발자와 함께 진행"
status: "completed"
context: "coursework"
role: "Defensive tank AI, Behavior Tree, and ML-Agents decision logic implementation"
tags:
  - Unity
  - ML-Agents
  - Behavior Tree
  - Reinforcement Learning
  - Game AI
external: false
featured: false
draft: true
links:
  github: ""
  demo: ""
  site: ""
  youtube: ""
  paper: ""
order: 42
---

## 프로젝트 개요

`AIGP Team 4 Tank AI 과제`는 1:1 탱크 전투 환경에서 규칙 기반 Behavior Tree AI와 Unity ML-Agents 기반 강화학습 에이전트를 구현한 학교 팀 과제입니다. 5명의 개발자와 함께 진행했으며, 같은 전투 도메인 안에서 명시적 의사결정과 학습 기반 정책을 비교할 수 있는 구조가 핵심입니다.

## 내 담당 영역

사용자는 `Assets/Tank` 영역의 수비형 Behavior Tree와 AI 관련 코드를 작성했습니다. 확인한 대표 클래스는 `StudentBTStrategy_tank`와 `StudentCombatAgentTank`입니다.

`StudentBTStrategy_tank`는 체력, 거리, 방향, 상대 공격 준비 상태, cooldown을 조건으로 해 방어형 의사결정을 수행합니다. `StudentCombatAgentTank`는 ML-Agents `Agent`로 observation/action/reward 구조를 정의합니다. ONNX 파일은 repository에 존재하지만, 모델 자체를 사용자가 직접 학습/제작했다는 근거는 아직 별도 확인 대상으로 둡니다.

## 핵심 구현

방어형 AI는 단순히 도망가는 로직이 아니라, 위협을 인식하고 생존과 반격 사이의 우선순위를 정해야 합니다. Behavior Tree는 `SelectorNode`, `SequenceNode`, `ConditionNode`, `ActionNode`를 조합하고, `LimitDecoratorNode`, `CooldownDecoratorNode`, `RandomWaitDecoratorNode`, `UntilFailDecoratorNode`, `TimeoutDecoratorNode`를 사용해 행동 빈도와 타이밍을 제어합니다.

BT 의사결정은 체력이 낮을 때 회피/방어를 우선하고, 상대가 가까이서 공격 가능한 방향을 보고 있으면 block 또는 dodge를 선택합니다. 방어 직후에는 counter window를 열어 attack cooldown과 거리 조건이 맞을 때 반격을 시도합니다. 너무 가까우면 뒤로 빠지고, 너무 멀면 접근하며, 적정 거리에서는 좌우 이동을 섞어 전투 리듬을 만듭니다.

ML-Agents 에이전트는 체력 비율, 상대 위치 offset, 거리, 전방 벡터, 상대를 바라보는 정도, 자신의 attack/block/dodge cooldown, 상대의 공격/방어 상태 등 15개 observation을 수집합니다. action branch는 이동과 skill을 분리하고, preferred range 유지, 위협에 대한 block/dodge, 피해량 변화, 승패, timeout에 따라 reward를 부여합니다.

## 배운 점과 의미

이 프로젝트는 게임 AI를 단순한 추적/공격 스크립트가 아니라 상태 관찰, 우선순위, action space, reward 설계의 문제로 다룬 사례입니다. 수비형 BT는 사람이 읽을 수 있는 decision logic을 만들고, ML-Agents 코드는 같은 환경을 학습 가능한 입력과 행동으로 모델링하는 경험을 제공합니다.
