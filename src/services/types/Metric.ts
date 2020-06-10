import { Api } from "../utils/Api";

export interface Metric {
  id: number;
  name: string;
  category: string;
  period: string;
}

export class Metric {
  private static metricList?: Array<Metric>;
  private static metricById?: Map<number, Metric>;

  public static async list() {
    if (!Metric.metricList) {
      Metric.metricList = await Api.getMetricList();
    }
    return Metric.metricList || [];
  }

  public static async byId() {
    if (!Metric.metricById) {
      const metricList = await Metric.list();
      Metric.metricById = new Map<number, Metric>();
      for (const metric of metricList) {
        Metric.metricById.set(metric.id, metric);
      }
    }
    return Metric.metricById;
  }
}
