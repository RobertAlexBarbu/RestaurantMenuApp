import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, viewChild } from '@angular/core'
import { ChartColors, ChartJsService } from '../../../../core/services/chart-js/chart-js.service'
import { Chart } from 'chart.js'

@Component({
    selector: 'app-horizontal-bar-chart',
    standalone: true,
    imports: [],
    templateUrl: './horizontal-bar-chart.component.html',
    styleUrl: './horizontal-bar-chart.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HorizontalBarChartComponent implements AfterViewInit {
    private readonly chartJsService = inject(ChartJsService)
    readonly canvasRef =
        viewChild.required<ElementRef<HTMLCanvasElement>>('myChart')
    chart!: Chart

    constructor() {
        this.chartJsService.initializeChartJs()
    }

    ngAfterViewInit(): void {
        const canvas = this.canvasRef().nativeElement
        this.chart = new Chart(canvas, {
            type: 'bar',
            data: {
                labels: ['New York', 'London', 'Mumbai', 'Tokyo', 'Sydney'], // Cities
                datasets: [
                    {
                        label: 'January',
                        data: [78, 55, 150, 88, 120], // Rainfall in mm
                        backgroundColor: this.chartJsService.getColor(
                            ChartColors.Primary,
                        ),
                        hoverBackgroundColor: this.chartJsService.getColor(
                            ChartColors.Primary,
                        ),
                    },
                    {
                        label: 'February',
                        data: [60, 42, 170, 95, 110],
                        backgroundColor: this.chartJsService.getColor(
                            ChartColors.Gray,
                        ),
                        hoverBackgroundColor: this.chartJsService.getColor(
                            ChartColors.Gray,
                        ),
                    },
                    {
                        label: 'March',
                        data: [85, 70, 200, 110, 140],
                        backgroundColor: this.chartJsService.getColor(
                            ChartColors.Tertiary,
                        ),
                        hoverBackgroundColor: this.chartJsService.getColor(
                            ChartColors.Tertiary,
                        ),
                    },
                ],
            },
            options: {
                indexAxis: 'y',
                borderColor: this.chartJsService.getColor(ChartColors.Border),
                color: this.chartJsService.getColor(ChartColors.Border), // Makes the chart horizontal
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top', // Place legend at the top
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
                            label: function(tooltipItem) {
                                return `${tooltipItem.dataset.label}: ${tooltipItem.raw} mm`
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
                        footerColor: this.chartJsService.getColor(
                            ChartColors.Surface,
                        ),
                    },
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Rainfall (mm)',
                            font: {
                                size: 14,
                                family: 'Roboto',
                            },
                            color: this.chartJsService.getColor(
                                ChartColors.OnSurface,
                            ),
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
                            ), // Light gray grid lines
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Cities',
                            font: {
                                size: 14,
                                family: 'Roboto',
                            },
                            color: this.chartJsService.getColor(
                                ChartColors.OnSurface,
                            ),
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
                            display: false, // Remove horizontal grid lines
                            color: this.chartJsService.getColor(
                                ChartColors.Border,
                            ),
                        },
                    },
                },
            },
        })
    }
}
