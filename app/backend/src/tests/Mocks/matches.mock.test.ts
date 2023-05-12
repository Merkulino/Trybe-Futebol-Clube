import Matches from "../../database/models/Matches";

const allMatches: Matches[] = [
  {
    "id": 1,
    "homeTeamsId": 16,
    "homeTeamGoals": 1,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeamId": 16,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Grêmio"
    }
  } as unknown as Matches,
  {
    "id": 2,
    "homeTeamsId": 9,
    "homeTeamGoals": 1,
    "awayTeamId": 14,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeamId": 9,
    "homeTeam": {
      "teamName": "Internacional"
    },
    "awayTeam": {
      "teamName": "Santos"
    }
  } as unknown as Matches,
  {
    "id": 3,
    "homeTeamsId": 4,
    "homeTeamGoals": 3,
    "awayTeamId": 11,
    "awayTeamGoals": 0,
    "inProgress": true,
    "homeTeamId": 4,
    "homeTeam": {
      "teamName": "Corinthians"
    },
    "awayTeam": {
      "teamName": "Napoli-SC"
    }
  } as unknown as Matches,
  {
    "id": 4,
    "homeTeamsId": 3,
    "homeTeamGoals": 0,
    "awayTeamId": 2,
    "awayTeamGoals": 0,
    "inProgress": false,
    "homeTeamId": 3,
    "homeTeam": {
      "teamName": "Botafogo"
    },
    "awayTeam": {
      "teamName": "Bahia"
    }
  } as unknown as Matches,
];

const matchesInProgressMock: Matches[] = [  
  {
  "id": 3,
  "homeTeamsId": 4,
  "homeTeamGoals": 3,
  "awayTeamId": 11,
  "awayTeamGoals": 0,
  "inProgress": true,
  "homeTeamId": 4,
  "homeTeam": {
    "teamName": "Corinthians"
  },
  "awayTeam": {
    "teamName": "Napoli-SC"
  }
} as unknown as Matches,
{
  "id": 4,
  "homeTeamsId": 3,
  "homeTeamGoals": 0,
  "awayTeamId": 2,
  "awayTeamGoals": 0,
  "inProgress": false,
  "homeTeamId": 3,
  "homeTeam": {
    "teamName": "Botafogo"
  },
  "awayTeam": {
    "teamName": "Bahia"
  }
} as unknown as Matches,
];

export { allMatches, matchesInProgressMock };