import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
    Gainer,
    GraphData,
    Loser,
    NepseIndex,
    StockMarket,
    Turnover,
} from "@modules/home/models/home.model";
import { HomeService } from "@modules/home/services/home.service";
import { MarketInfo } from "@modules/market/model/market-summary.model";
import { MarketService } from "@modules/market/services/market.service";
import { GridDataResult, PageChangeEvent } from "@progress/kendo-angular-grid";
import {
    CompositeFilterDescriptor,
    SortDescriptor,
} from "@progress/kendo-data-query";
import { GlobalService } from "@shared/services/global/global.service";
import * as Highcharts from "highcharts/highstock";
import HC_exporting from "highcharts/modules/exporting";

@Component({
    selector: "app-market-summary",
    templateUrl: "./market-summary.component.html",
    styleUrls: ["./market-summary.component.scss"],
})
export class MarketSummaryComponent implements OnInit {
    highcharts: typeof Highcharts = Highcharts;
    chartConstructor: string = "stockChart";
    chartOptions: Highcharts.Options;

    graphData: GraphData;
    graphType: any;

    stockMarketDetails: StockMarket[];

    marketInfoList: MarketInfo[];

    gainerDetails: Gainer[];
    loserDetails: Loser[];
    turnoverDetails: Turnover[];
    nepseIndexInfo: NepseIndex[];

    marketInfoListLoading: boolean;

    //kendo Grid
    public gridView: GridDataResult;
    public filter: CompositeFilterDescriptor;

    orderByKey = "";
    dirKey = "asc";
    limit = this.globalService.pageLimit;
    public pageSize = 10;
    public skip = 0;
    public currentPage = 1;

    //sorting kendo data
    public allowUnsort = true;
    public sort: SortDescriptor[] = [
        {
            field: "",
            dir: "asc",
        },
    ];

    constructor(
        public homeService: HomeService,
        public marketService: MarketService,
        public globalService: GlobalService,
        private router: Router
    ) { }

    ngOnInit() {
        this.getGraphData();
        this.stockMarketInfo();
        this.getLiveMarketInfoList();
        this.marketInfoIndex();
        this.getNepseIndexInfo();
    }

    routeToCompanyProfile(id: string) {
        this.router.navigate([`/company-profile/${id}`], {});
    }

    getGraphDataType(type?): void {
        this.graphType = type;
        this.getGraphData(this.graphType);
    }

    getGraphData(type?: any): void {
        let getBody = {
            name: "NEPSE Index",
            type: type ? type : "daily",
        };
        this.homeService.graphData(getBody).subscribe(
            (response) => {
                if (response.success == "true") {
                    this.graphData = response.data;
                    // console.log(this.graphData.indexes);
                    this.chartOptions = {
                        // title: {
                        //   text: "Nepse Stock",
                        // },

                        // subtitle: {
                        //   text: "Using ordinal X axis",
                        // },

                        xAxis: {
                            // gapGridLineWidth: 0
                        },

                        rangeSelector: {
                            buttons: [
                                {
                                    type: "day",
                                    count: 1,
                                    text: "1D",
                                    events: {
                                        click: () => {
                                            console.log(this);
                                            this.getGraphDataType("daily");
                                            console.log(this.graphType);
                                        },
                                    },
                                },
                                {
                                    type: "week",
                                    count: 1,
                                    text: "1W",
                                    events: {
                                        click: () => {
                                            console.log(this);
                                            this.getGraphDataType("weekly");
                                            console.log(this.graphType);
                                        },
                                    },
                                },
                                {
                                    type: "month",
                                    count: 1,
                                    text: "1M",
                                    events: {
                                        click: () => {
                                            console.log(this);
                                            this.getGraphDataType("monthly");
                                            console.log(this.graphType);
                                        },
                                    },
                                },
                                {
                                    type: "month",
                                    count: 3,
                                    text: "3M",
                                    events: {
                                        click: () => {
                                            console.log(this);
                                            this.getGraphDataType("quarterly");
                                            console.log(this.graphType);
                                        },
                                    },
                                },
                            ],
                            // selected: 0,
                            allButtonsEnabled: true,
                            inputEnabled: false,
                        },
                        series: [
                            {
                                turboThreshold: 1000,
                                name: "Nepse",
                                type: "area",
                                data: this.graphData.indexes,
                                gapSize: 0,
                                tooltip: {
                                    valueDecimals: 2,
                                },
                                fillColor: {
                                    linearGradient: {
                                        x1: 0,
                                        y1: 0,
                                        x2: 0,
                                        y2: 1,
                                    },
                                    stops: [
                                        [0, Highcharts.getOptions().colors[0]],
                                        // [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                                    ],
                                },
                                threshold: null,
                            },
                        ],
                    };
                }
            }
            // }
        );
    }

    stockMarketInfo(): void {
        let getBody = {
            page: 1,
            limit: 11,
            sort: "DESC",
            sort_field: "date",
            fields: [
                {
                    field: "",
                    operator: "",
                    value: "",
                },
            ],
        };

        this.homeService.stockMarket(getBody).subscribe((response) => {
            if (response.success == "true") {
                this.stockMarketDetails = response.data;
            } else {
            }
        });
    }

    getLiveMarketInfoList(): void {
        this.marketInfoListLoading = true;
        let getBody = {
            // PageNo: this.currentPage,
            // DisplayRow: this.pageSize,
            // OrderBy: this.orderByKey,
            // Direction: this.dirKey,
            // FilterList: "",
            page: this.currentPage,
            limit: this.limit,
            sort: "DESC",
            sort_field: "change",
            fields: [
                {
                    field: "",
                    operator: "",
                    value: "",
                },
            ],
        };
        this.marketService.getMarketInfoList(getBody).subscribe(
            (response) => {
                // if (response.success == "true") {
                this.marketInfoList = response.data;
                this.gridView = {
                    data: this.marketInfoList,
                    total: response.count,
                };
                // }
            },
            (error) => {
                this.marketInfoListLoading = false;
            },
            () => {
                this.marketInfoListLoading = false;
            }
        );
    }

    marketInfoIndex(): void {
        let getBody = {
            page: 1,
            limit: 12,
            sort: "DESC",
            sort_field: "change",
            fields: [
                {
                    field: "",
                    operator: "",
                    value: "",
                },
            ],
        };

        this.homeService.marketIndex(getBody).subscribe((response) => {
            if (response.success) {
                this.gainerDetails = response.data.gainer;
                this.loserDetails = response.data.loser;
                this.turnoverDetails = response.data.turnover;
            } else {
            }
        });
    }

    getNepseIndexInfo(): void {
        let getBody = {
            page: 1,
            limit: 14,
            sort: "DESC",
            sort_field: "change",
            fields: [
                {
                    field: "",
                    operator: "",
                    value: "",
                },
            ],
        };

        this.homeService.nepseIndexInfo(getBody).subscribe((response) => {
            if (response.success == "true") {
                this.nepseIndexInfo = response.data;
            } else {
            }
        });
    }

    public sortChange(sort: SortDescriptor[]): void {
        this.orderByKey = "";
        this.dirKey = "";
        this.sort = sort;
        this.dirKey = this.sort[0].dir;
        this.orderByKey = this.sort[0].field;
        this.getLiveMarketInfoList();
    }

    public pageChange(event: PageChangeEvent): void {
        this.skip = event.skip;
        if (event.skip == 0) {
            this.skip = event.skip;
            this.currentPage = 1;
        } else {
            this.skip = event.skip;
            const pageNo = event.skip / event.take + 1;
            this.currentPage = pageNo;
        }
        this.getLiveMarketInfoList();
    }
}