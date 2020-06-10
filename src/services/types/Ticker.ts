import { Api } from "../utils/Api";

export interface Ticker {
  id: number;
  code: string;
  type: string;
  name?: string;
  country?: string;
  exchange?: string;
}

export class Ticker {
  private static tickerList?: Array<Ticker>;
  private static tickerById?: Map<number, Ticker>;

  public static async list() {
    if (!Ticker.tickerList) {
      Ticker.tickerList = await Api.getTickerList();
    }
    return Ticker.tickerList || [];
  }

  public static async byId() {
    if (!Ticker.tickerById) {
      const tickerList = await Ticker.list();
      Ticker.tickerById = new Map<number, Ticker>();
      for (const ticker of tickerList) {
        Ticker.tickerById.set(ticker.id, ticker);
      }
    }
    return Ticker.tickerById;
  }
}
