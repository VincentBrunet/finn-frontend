import axios from "axios";

export class Api {
  static root = "http://192.168.1.54:3001";

  static async getTickerSummary(code: string) {
    return await Api.get("/ticker/summary/" + code);
  }

  static async getScreenerTable() {
    return await Api.get("/screener/table");
  }

  private static async get(path: string) {
    return await (await axios.get(Api.root + path)).data.data;
  }
}
