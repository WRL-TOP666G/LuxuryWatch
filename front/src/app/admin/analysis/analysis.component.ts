import {Component, OnInit} from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js'
Chart.register(...registerables);

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})
export class AnalysisComponent implements OnInit{

  // constructor(private service: MasterService) { }
  constructor() { }

  chartdata: any;

  labeldata: any[] = [];
  realdata: any[] = [];
  colordata: any[] = [];

  ngOnInit(): void {
    this.RenderChart();
    this.createChart()
    this.RenderDoughnut();
  }



  RenderChart() {
    const myChart =   new Chart("piechart", {
      type: 'bar',
      data: {
        labels: ['automatic', 'manual', 'mechanical', 'quartz'],
        datasets: [{
          label: '# of Sells',
          data: [12, 20, 3, 5 ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  createChart(){
    const myChart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['Below $10M','$10M - $19.99M ','$20M - $29.99M','$30M - $39.99M',
          '$40M - $49.99M', 'Over $50M'],
        datasets: [
          {
            label: "Sales",
            data: ['467','576', '572', '79', '92',
              '574'],
            backgroundColor: 'blue'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
              '500'],
            backgroundColor: 'limegreen'
          }
        ]
      },
      options: {
        aspectRatio:2.5
      }

    });
  }


  RenderDoughnut(){
    const data = {
      labels: [
        'Patek Philippe',
        'Graff',
        'Yellow',
        'Breguet',
        'Jacob & Co.',
        'Jaeger-LeCoultre',
        'Chopard',
        'Rolex',
        'Vacheron Constantin'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [300, 20, 12, 73, 150, 130, 100, 237, 189],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(54, 12, 235)',
          'rgb(25, 215, 86)',
          'rgb(204, 16, 25)',
          'rgb(255, 205, 206)',
          'rgb(25, 12, 35)',
          'rgb(55, 5, 233)'
        ],
        hoverOffset: 4
      }]
    };

    const myChart =  new Chart(
      'dochart',{
        type: 'doughnut',
        data: data,
      }
    )

  }


}
