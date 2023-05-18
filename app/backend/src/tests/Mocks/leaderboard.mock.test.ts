import { Model } from "sequelize";
import Matches from "../../database/models/Matches";
import { LeaderboardType, TeamsMatchesType } from "../../interfaces/types";

const leaderboardAll: LeaderboardType[] = [
  {
    "name": "Palmeiras",
    "totalPoints": 13,
    "totalGames": 5,
    "totalVictories": 4,
    "totalDraws": 1,
    "totalLosses": 0,
    "goalsFavor": 17,
    "goalsOwn": 5,
    "goalsBalance": 12,
    "efficiency": 86.67
  },
  {
    "name": "Corinthians",
    "totalPoints": 12,
    "totalGames": 5,
    "totalVictories": 4,
    "totalDraws": 0,
    "totalLosses": 1,
    "goalsFavor": 12,
    "goalsOwn": 3,
    "goalsBalance": 9,
    "efficiency": 80
  },
  {
    "name": "Santos",
    "totalPoints": 11,
    "totalGames": 5,
    "totalVictories": 3,
    "totalDraws": 2,
    "totalLosses": 0,
    "goalsFavor": 12,
    "goalsOwn": 6,
    "goalsBalance": 6,
    "efficiency": 73.33
  },
];

const leaderboardHome: LeaderboardType[] = [
  {
    "name": "Santos",
    "totalPoints": 9,
    "totalGames": 3,
    "totalVictories": 3,
    "totalDraws": 0,
    "totalLosses": 0,
    "goalsFavor": 9,
    "goalsOwn": 3,
    "goalsBalance": 6,
    "efficiency": 100
  },
  {
    "name": "Palmeiras",
    "totalPoints": 7,
    "totalGames": 3,
    "totalVictories": 2,
    "totalDraws": 1,
    "totalLosses": 0,
    "goalsFavor": 10,
    "goalsOwn": 5,
    "goalsBalance": 5,
    "efficiency": 77.78
  },
  {
    "name": "Corinthians",
    "totalPoints": 6,
    "totalGames": 2,
    "totalVictories": 2,
    "totalDraws": 0,
    "totalLosses": 0,
    "goalsFavor": 6,
    "goalsOwn": 1,
    "goalsBalance": 5,
    "efficiency": 100
  },
]

const leaderboardAway: LeaderboardType[] = [
  {
    "name": "Palmeiras",
    "totalPoints": 6,
    "totalGames": 2,
    "totalVictories": 2,
    "totalDraws": 0,
    "totalLosses": 0,
    "goalsFavor": 7,
    "goalsOwn": 0,
    "goalsBalance": 7,
    "efficiency": 100
  },
  {
    "name": "Corinthians",
    "totalPoints": 6,
    "totalGames": 3,
    "totalVictories": 2,
    "totalDraws": 0,
    "totalLosses": 1,
    "goalsFavor": 6,
    "goalsOwn": 2,
    "goalsBalance": 4,
    "efficiency": 66.67
  },
  {
    "name": "Santos",
    "totalPoints": 2,
    "totalGames": 2,
    "totalVictories": 0,
    "totalDraws": 2,
    "totalLosses": 0,
    "goalsFavor": 3,
    "goalsOwn": 3,
    "goalsBalance": 0,
    "efficiency": 33.33
  },
]

const allTeamsResponseMock: Model[] = [
  {
    "id": 14,
    "teamName": "Santos",
    "homeMatch": [
      {
        "homeTeamGoals": 2,
        "awayTeamGoals": 1
      },
      {
        "homeTeamGoals": 5,
        "awayTeamGoals": 1
      },
      {
        "homeTeamGoals": 2,
        "awayTeamGoals": 1
      }
    ],
    "awayMatch": [
      {
        "homeTeamGoals": 1,
        "awayTeamGoals": 1
      },
      {
        "homeTeamGoals": 2,
        "awayTeamGoals": 2
      }
    ]
  } as unknown as Model,
  {
    "id": 12,
    "teamName": "Palmeiras",
    "homeMatch": [
      {
        "homeTeamGoals": 4,
        "awayTeamGoals": 1
      },
      {
        "homeTeamGoals": 4,
        "awayTeamGoals": 2
      },
      {
        "homeTeamGoals": 2,
        "awayTeamGoals": 2
      }
    ],
    "awayMatch": [
      {
        "homeTeamGoals": 0,
        "awayTeamGoals": 3
      },
      {
        "homeTeamGoals": 0,
        "awayTeamGoals": 4
      }
    ]
  } as unknown as Model,
  {
    "id": 4,
    "teamName": "Corinthians",
    "homeMatch": [
      {
        "homeTeamGoals": 3,
        "awayTeamGoals": 1
      },
      {
        "homeTeamGoals": 3,
        "awayTeamGoals": 0
      }
    ],
    "awayMatch": [
      {
        "homeTeamGoals": 0,
        "awayTeamGoals": 1
      },
      {
        "homeTeamGoals": 0,
        "awayTeamGoals": 4
      },
      {
        "homeTeamGoals": 2,
        "awayTeamGoals": 1
      }
    ]
  } as unknown as Model,
]

export { leaderboardAll, leaderboardAway, leaderboardHome, allTeamsResponseMock };