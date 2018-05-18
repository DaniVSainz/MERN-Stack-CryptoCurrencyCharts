import { ActivatedRoute } from '@angular/router';
import { DataApiService } from '../../services/data-api.service';
import { Component, AfterViewInit, OnDestroy, OnInit} from '@angular/core';
import { NbThemeService } from '@nebular/theme';


@Component({
  selector: 'app-chart-component',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements AfterViewInit, OnDestroy, OnInit {
  options: any = {};
  themeSubscription: any;
  days: any = [];
  priceData: any = [];
  dayData: any = [];
  symbol: String;
  pair: Object;
  reversedArray: any = [];
  currentDays: any= [];
  currentPrices: any= [];
  currentTimeRange: String = 'All Time';
  updateOptions: any;
  noData: boolean;
  cryptoCurrency: any;
  cssStyleString: String;

  constructor(
    private theme: NbThemeService,
    private dataApiService:DataApiService,
    private route: ActivatedRoute) 
    {
      // Grab our symbol from route ie: charts/btc =
      this.symbol = this.route.snapshot.params.symbol;
  }

  ngOnInit(){
    // Get data from our api
    this.dataApiService.getPairData(this.symbol).subscribe(
      res=>{
        this.noData=false
        //Grab our pair and pair.days from response
        this.pair = res[0].pair
        this.days = res[1].days;
        this.cryptoCurrency = res[2].cryptoCurrency
        //Iterate and create a array of days/price
        this.days.forEach(element => {
          this.dayData.push(element.date);
          this.priceData.push(element.openingPrice.replace(/,/g,""));
        });
        console.log(this.cryptoCurrency)
        // Calls our functions that constructs our chart, doing it this way to ensure our data is finished processing.
        this.setChart(this.dayData,this.priceData);
        
      }, err =>{
        this.noData = true
        console.log(`ERROR : ${err}`);
      }
    );
  }

  ngAfterViewInit() {
  }

  positiveOrNegative(data){
    console.log('asd')
    if(data[0]==="-"){
      return 'text-danger'
    }else{
      return 'text-success'
    }
  }

  changeDays(days){
    if(days ==='All') {
      this.currentTimeRange = `All Time`;
      this.setChart(this.dayData,this.priceData);
    }else {
      this.currentTimeRange = `${days} Days`
      this.currentDays =  [];
      this.currentPrices =  [] ;
      // Check incase we dont have enough data to support X days 
      if (this.days.length <= parseInt(days)) days = this.days.length;
      for (let i = 1; i < parseInt(days) + 1; i++) {
        let day = this.days[this.days.length - i ];
        this.currentDays.push(day.date);
        this.currentPrices.push(day.openingPrice.replace(/,/g,"")); 
      }
      this.currentDays.reverse();
      this.currentPrices.reverse();
      this.updateOptions = {
        xAxis:[{data:this.currentDays}],
        series: [
          {
            type: 'line',
            smooth: true,
            data:this.currentPrices,
          },
        ],
        yAxis:{
          min:Math.min(...this.currentPrices),
          max:Math.max(...this.currentPrices)
        },
        dataZoom: [
          {
              id: 'dataZoomX',
              type: 'slider',
              xAxisIndex: [0],
              filterMode: 'filter',
          },
          {
              id: 'dataZoomY',
              type: 'slider',
              yAxisIndex: [0],
              filterMode: 'empty',
              startValue: Math.min(...this.currentPrices),
              endValue: Math.max(...this.currentPrices)

          }
      ],
      };

      // this.setChart(this.currentDays.reverse(),this.currentPrices.reverse());

    }
  }


 setChart(dayData,priceData){
  this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

    const colors: any = config.variables;
    const echarts: any = config.variables.echarts;


    
    this.options = {
      backgroundColor: echarts.bg,
      color: [colors.success, colors.info],
      tooltip: {
        trigger: 'none',
        axisPointer: {
          type: 'cross',
        },
      },
      // legend: {
      //   data: [{
      //     name: 'Bitcoin',
      //     // compulsorily set icon as a circle
      //     icon: 'circle',
      //     // set up the text in red
      //     textStyle: {
      //         color: 'black'
      //     }
      // }],
      //   textStyle: {
      //     color: echarts.textColor,
      //   },
      // },
      // grid: {
      //   top: 70,
      //   bottom: 50,
      // },
      toolbox:{
        feature:{
          saveAsImage:{}
        }
      },
      dataZoom: [
        {
            id: 'dataZoomX',
            type: 'slider',
            xAxisIndex: [0],
            filterMode: 'filter',
        },
        {
            id: 'dataZoomY',
            type: 'slider',
            yAxisIndex: [0],
            filterMode: 'empty',
        }
    ],
      xAxis: [ 
        {
          boundaryGap:false,
          type: 'category',
          axisTick: {
            alignWithLabel: true,
          },
          axisLine: {
            onZero: false,
            lineStyle: {
              color: colors.success,
            },
          },
          axisLabel: {
            textStyle: {
              color: echarts.textColor,
            },
            showMaxLabel: true
          },
          axisPointer: {
            label: {formatter: params => {
              return (
                params.value + (params.seriesData.length ? ' ：Price $' + params.seriesData[0].data : '')
              );
            }},
          },
          data: dayData,
        },
      ],
      yAxis: [
        {
          type: 'value',
          min:0,
          axisLine: {
            lineStyle: {
              color: echarts.axisLineColor,
            },
          },
          splitLine: {
            lineStyle: {
              color: echarts.splitLineColor,
            },
          },
          axisLabel: {
            textStyle: {
              color: echarts.textColor,
            },
            showMaxLabel: true
          },
        },
      ],
      series: [
        {
          type: 'line',
          smooth: true,
          data:priceData,
        },
      ],
    };
  });
 }

  ngOnDestroy(): void {
    try {
      this.themeSubscription.unsubscribe();
    }catch (e){
      console.log(e)
    }
  }
}
