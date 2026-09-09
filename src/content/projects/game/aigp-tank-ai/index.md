---
title: "AIGP Team 4 Tank AI 과제"
slug: "aigp-tank-ai"
category: "game"
description: "Unity ML-Agents와 Behavior Tree로 1:1 탱크 전투 AI를 구현하고 비교한 팀 과제."
year: 2026
dateRange: "2026"
team: "팀 프로젝트"
status: "completed"
context: "coursework"
role: "Tank AI strategy and ML-Agents implementation candidate"
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

## Project

`AIGP Team 4 Tank AI 과제`는 1:1 탱크 전투 환경에서 행동 트리 기반 AI와 Unity ML-Agents 기반 강화학습 에이전트를 구현한 과제입니다. 같은 전투 도메인에서 규칙 기반 의사결정과 학습 기반 정책을 비교할 수 있는 구조가 핵심입니다.

## My Contribution

사용자가 지정한 로컬 경로에는 `StudentBTStrategy_tank.cs`, `StudentBTStrategy_tank2.cs`, `StudentCombatAgentTank.cs`, 그리고 학습 결과로 보이는 ONNX 파일들이 있습니다. 공개 전에는 팀원별 담당 범위와 최종 모델 파일을 확인해야 합니다.

## Problems

- BT는 전투 상황을 명시적으로 해석해야 해서 거리, 방향, 쿨다운, 위협 상태 조건이 늘어납니다.
- RL은 보상 설계가 어긋나면 소극적 생존이나 의미 없는 행동을 학습할 수 있습니다.
- Unity Editor의 Behavior Parameters와 코드의 observation/action count가 맞아야 합니다.

## Design And Implementation

BT 전략은 `SelectorNode`, `SequenceNode`, `ConditionNode`, `ActionNode`에 더해 cooldown, limit, random wait, timeout, until-fail 같은 decorator를 사용합니다. 체력이 낮을 때 회피/방어하고, 상대가 공격 준비 상태일 때 block/dodge로 대응하며, 방어 직후 counter window가 열렸을 때 반격을 시도합니다.

ML-Agents 에이전트는 체력, 상대 위치, 거리, 방향, 쿨다운, 상대 행동 상태를 15개 observation으로 수집합니다. action branch는 이동과 스킬을 분리하고, 거리 유지, 위협 대응, 피해/가한 피해, 승패, 시간 제한에 따라 reward를 부여합니다.

## Core Systems

- `StudentBTStrategy_tank`: behavior tree combat strategy
- `StudentCombatAgentTank`: ML-Agents `Agent`
- Custom BT decorators: limit, cooldown, random wait, until-fail, timeout
- ONNX policy artifacts

## Results And Learnings

이 프로젝트는 게임 AI를 단순한 추적/공격 로직이 아니라, 관찰값 설계와 의사결정 구조의 문제로 다룬 사례입니다. draft 단계에서는 정량 평가가 없으므로, win rate 같은 성능 수치는 사용자 확인 후 추가합니다.
