

export interface MarketDetail {
  company_name: string;
  script: string;
  change_per: number;
  change: number;
  indicator: string;
  ltp: number;
  ltv: number;
  close: number;
  high: number;
  low: number;
  open: number;
  volume: number;
  turnover: number;
  date: string;
}

export class RootMarketList {
  success: string;
  statusCode: number;
  statusMessage: string;
  message: string;
  count: number;
  data: MarketDetail[];
}



export class DataTablesResponse {
  data: any[];
  draw: number;
  count: string;
  recordsFiltered: number;
  recordsTotal: number;
}
