import { DataTypes, Model } from 'sequelize';
// import ITeams from '../../interfaces/ITeams';
import db from '.';
import Teams from './TeamsModel';

export default class Matches extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: number;
}

Matches.init({
  id: {
    type: DataTypes.NUMBER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeamId: {
    type: DataTypes.NUMBER,
    field: 'home_team_id',
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  homeTeamGoals: {
    type: DataTypes.NUMBER,
    field: 'home_team_goals',
    allowNull: false,
  },
  awayTeamId: {
    type: DataTypes.NUMBER,
    field: 'away_team_id',
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  awayTeamGoals: {
    type: DataTypes.NUMBER,
    field: 'away_team_goals',
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

Matches.belongsTo(Teams, {
  foreignKey: 'homeTeamId',
  as: 'homeTeam',
});

Matches.belongsTo(Teams, {
  foreignKey: 'awayTeamId',
  as: 'awayTeam',
});

Teams.hasMany(Matches, {
  foreignKey: 'homeTeamId',
  as: 'homeMatch',
});

Teams.hasMany(Matches, {
  foreignKey: 'awayTeamId',
  as: 'awayMatch',
});
