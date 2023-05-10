import ITeams from '../../interfaces/ITeams';
import Teams from '../../database/models/TeamsModel';

export default class TeamsService {
  public static getAll(): Promise<ITeams[]> {
    return Teams.findAll();
  }

  public static async getById(id: number): Promise<ITeams[]> {
    const response = await Teams.findByPk(id) as unknown as ITeams[];
    return response;
  }
}
