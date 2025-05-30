import {ChangeDetectionStrategy, Component, ElementRef, inject, input, viewChild} from '@angular/core';
import {ChartColors, ChartJsService} from "../../../../core/services/chart-js/chart-js.service";
import {Chart, ChartOptions} from "chart.js";
import {HourlyChartData} from "../../analytics-feature.component";

@Component({
  selector: 'app-hour-chart',
  imports: [],
  templateUrl: './hour-chart.component.html',
  styleUrl: './hour-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class HourChartComponent {
    private readonly chartJsService = inject(ChartJsService)
    readonly canvasRef =
        viewChild.required<ElementRef<HTMLCanvasElement>>('myChart')
    chart!: Chart
    hourlyData = input<HourlyChartData[]>([]);

    constructor() {
        this.chartJsService.initializeChartJs()
    }

    ngAfterViewInit() {
        this.createChart();
    }

    ngOnChanges(): void {
        if (this.chart) {
            this.updateChart();
        }
    }

    private createChart(): void {
        const canvas = this.canvasRef().nativeElement;

        // Process hourly data
        const processedData = this.processHourlyData();

        this.chart = new Chart(canvas, {
            type: 'line',
            data: {
                labels: processedData.labels,
                datasets: [
                    {
                        label: 'Hourly Interactions',
                        data: processedData.data,
                        fill: false,
                        backgroundColor: this.chartJsService.getColor(
                            ChartColors.Primary,
                        ),
                        borderColor: this.chartJsService.getColor(
                            ChartColors.Primary,
                        ),
                        tension: 0.1,
                        borderWidth: 2,
                        pointBackgroundColor: this.chartJsService.getColor(
                            ChartColors.Primary,
                        ),
                        pointBorderColor: this.chartJsService.getColor(
                            ChartColors.Surface,
                        ),
                        pointBorderWidth: 2,
                        pointRadius: 5,
                        hoverBackgroundColor: this.chartJsService.getColor(
                            ChartColors.Primary,
                        ),
                        hoverBorderColor: this.chartJsService.getColor(
                            ChartColors.Surface,
                        ),
                        hoverBorderWidth: 3,
                    }
                ],
            },
            options: this.getChartOptions()
        });
    }

    private processHourlyData(): { labels: string[], data: number[] } {
        if (!this.hourlyData() || this.hourlyData().length === 0) {
            // Return default 24-hour structure if no data
            return {
                labels: Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`),
                data: Array(24).fill(0)
            };
        }

        // Create a map to aggregate interactions by hour
        const hourMap = new Map<string, number>();

        // Initialize all 24 hours with 0
        for (let i = 0; i < 24; i++) {
            const hour = `${i.toString().padStart(2, '0')}:00`;
            hourMap.set(hour, 0);
        }

        // Aggregate the actual data
        this.hourlyData().forEach(item => {
            const currentCount = hourMap.get(item.hour) || 0;
            hourMap.set(item.hour, currentCount + item.interactions);
        });

        // Convert map to arrays
        const labels = Array.from(hourMap.keys()).sort();
        const data = labels.map(hour => hourMap.get(hour) || 0);

        return { labels, data };
    }

    private updateChart(): void {
        const processedData = this.processHourlyData();

        // Update chart data
        this.chart.data.labels = processedData.labels;
        this.chart.data.datasets[0].data = processedData.data;

        // Refresh the chart
        this.chart.update();
    }

    private getChartOptions(): ChartOptions {
        return {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            size: 14,
                            family: 'Roboto',
                        },
                        color: this.chartJsService.getColor(
                            ChartColors.OnSurface,
                        ),
                    },
                },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            const label = context.dataset.label || '';
                            const value = context.raw as number;
                            return `${label}: ${value} interaction${value !== 1 ? 's' : ''}`;
                        },
                    },
                    backgroundColor: this.chartJsService.getColor(
                        ChartColors.OnSurface,
                    ),
                    titleColor: this.chartJsService.getColor(
                        ChartColors.Surface,
                    ),
                    bodyColor: this.chartJsService.getColor(
                        ChartColors.Surface,
                    ),
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Hour of Day',
                        color: this.chartJsService.getColor(ChartColors.OnSurface)
                    },
                    ticks: {
                        font: {
                            size: 12,
                            family: 'Roboto',
                        },
                        color: this.chartJsService.getColor(
                            ChartColors.OnSurface,
                        ),
                    },
                    grid: {
                        lineWidth: 1,
                        color: this.chartJsService.getColor(
                            ChartColors.Border,
                        ),
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Number of Interactions',
                        color: this.chartJsService.getColor(ChartColors.OnSurface)
                    },
                    ticks: {
                        font: {
                            size: 12,
                            family: 'Roboto',
                        },
                        color: this.chartJsService.getColor(
                            ChartColors.OnSurface,
                        ),
                        precision: 0,
                        stepSize: 1
                    },
                    grid: {
                        lineWidth: 1,
                        color: this.chartJsService.getColor(
                            ChartColors.Border,
                        ),
                    },
                },
            },
        };
    }
}
