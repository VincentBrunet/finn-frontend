import axios from "axios";

import { Metric } from "../types/Metric";
import { Ticker } from "../types/Ticker";
import { Unit } from "../types/Unit";

export class Api {
  static host = window.location.protocol + "//" + window.location.hostname;
  static root = Api.host + ":3001";

  public static async getMetricList(): Promise<Metric[]> {
    return await Api.get("/metric/list");
  }
  public static async getUnitList(): Promise<Unit[]> {
    return await Api.get("/unit/list");
  }
  public static async getTickerList(): Promise<Ticker[]> {
    return await Api.get("/ticker/list");
  }

  public static async getTickerSummary(code: string) {
    return await Api.get("/ticker/summary/" + code);
  }

  public static async getScreenerTable() {
    return await Api.get("/screener/table");
  }

  private static async get(path: string) {
    return await (await axios.get(Api.root + path)).data.data;
  }
}
