import { Api } from "../utils/Api";

export interface Unit {
  id: number;
  code: string;
  name?: string;
  symbol?: string;
}

export class Unit {
  private static unitList?: Array<Unit>;
  private static unitById?: Map<number, Unit>;

  public static async list() {
    if (!Unit.unitList) {
      Unit.unitList = await Api.getUnitList();
    }
    return Unit.unitList || [];
  }

  public static async byId() {
    if (!Unit.unitById) {
      const unitList = await Unit.list();
      Unit.unitById = new Map<number, Unit>();
      for (const unit of unitList) {
        Unit.unitById.set(unit.id, unit);
      }
    }
    return Unit.unitById;
  }
}
