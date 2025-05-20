import {ChangeDetectionStrategy, Component, ElementRef, inject, Input, viewChild} from '@angular/core';
import {ChartColors, ChartJsService} from "../../../../core/services/chart-js/chart-js.service";
import {Chart, ChartOptions} from "chart.js";
import {MenuAccessDto} from "../../../../core/http/dto/menu-dto/menu-analytics/menu-access.dto";

@Component({
  selector: 'app-menu-access-chart',
  imports: [],
  templateUrl: './menu-access-chart.component.html',
  styleUrl: './menu-access-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class MenuAccessChartComponent {
  private readonly chartJsService = inject(ChartJsService);
  readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('myChart');
  chart!: Chart;
  @Input() urlAccessData: MenuAccessDto[] = [];
  @Input() qrAccessData: MenuAccessDto[] = [];


  ngAfterViewInit(): void {
    this.createChart();
  }

  constructor() {
    this.chartJsService.initializeChartJs()
  }

  private createChart(): void {
    const canvas = this.canvasRef().nativeElement;

    // Group data by menuId and count accesses
    const urlCounts = this.countAccessesByMenuId(this.urlAccessData);
    const qrCounts = this.countAccessesByMenuId(this.qrAccessData);

    // Get all unique menuIds to use as labels
    const allMenuIds = [...new Set([
      ...this.urlAccessData.map(item => item.menuId),
      ...this.qrAccessData.map(item => item.menuId)
    ])].sort();

    this.chart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: [''],
        datasets: [
          {
            label: 'URL Accesses',
            data: allMenuIds.map(id => urlCounts.get(id) || 0),
            backgroundColor: this.chartJsService.getColor(ChartColors.Primary),
            borderWidth: 1,
            hoverBackgroundColor: this.chartJsService.getColor(ChartColors.Primary),
          },
          {
            label: 'QR Code Accesses',
            data: allMenuIds.map(id => qrCounts.get(id) || 0),
            backgroundColor: this.chartJsService.getColor(ChartColors.Tertiary),
            borderWidth: 1,
            hoverBackgroundColor: this.chartJsService.getColor(ChartColors.Tertiary),
          }
        ]
      },
      options: this.getChartOptions()
    });
  }

  private countAccessesByMenuId(data: MenuAccessDto[]): Map<number, number> {
    const counts = new Map<number, number>();
    data.forEach(item => {
      counts.set(item.menuId, (counts.get(item.menuId) || 0) + 1);
    });
    return counts;
  }

  private getChartOptions(): ChartOptions {
    return {
      responsive: true,
      plugins: {

        legend: {
          position: 'bottom',
          labels: {
            font: {
              size: 14,
              family: 'Roboto'
            },
            color: this.chartJsService.getColor(ChartColors.OnSurface)
          }
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.dataset.label || '';
              const value = context.raw as number;
              return `${label}: ${value} access${value !== 1 ? 'es' : ''}`;
            }
          },
          backgroundColor: this.chartJsService.getColor(ChartColors.OnSurface),
          titleColor: this.chartJsService.getColor(ChartColors.Surface),
          bodyColor: this.chartJsService.getColor(ChartColors.Surface)
        }
      },
      scales: {

        y: {
          title: {
            display: true,
            text: 'Number of Accesses',
            color: this.chartJsService.getColor(ChartColors.OnSurface)
          },
          ticks: {
            font: {
              size: 12,
              family: 'Roboto'
            },
            color: this.chartJsService.getColor(ChartColors.OnSurface),
            precision: 0,
            stepSize: 1
          },
          grid: {
            lineWidth: 1,
            color: this.chartJsService.getColor(ChartColors.Border)
          }
        }
      }
    };
  }
  ngOnChanges(): void {
    if (this.chart) {
      this.updateChart();
    }
  }
  private updateChart(): void {

    const urlCounts = this.countAccessesByMenuId(this.urlAccessData);
    const qrCounts = this.countAccessesByMenuId(this.qrAccessData);

    // Get all unique menuIds to use as labels
    const allMenuIds = [...new Set([
      ...this.urlAccessData.map(item => item.menuId),
      ...this.qrAccessData.map(item => item.menuId)
    ])].sort();

    // Update chart data
    this.chart.data.labels = [''];
    this.chart.data.datasets[0].data = allMenuIds.map(id => urlCounts.get(id) || 0);
    this.chart.data.datasets[1].data = allMenuIds.map(id => qrCounts.get(id) || 0);

    // Refresh the chart
    this.chart.update();
  }
}
