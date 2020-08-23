import axios from "axios";

import { Metric } from "../types/Metric";
import { Unit } from "../types/Unit";
import { Ticker } from "../types/Ticker";

export class Api {
  //static root = "http://192.168.1.54:3001";
  static root = "http://127.0.0.1:3001";

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
