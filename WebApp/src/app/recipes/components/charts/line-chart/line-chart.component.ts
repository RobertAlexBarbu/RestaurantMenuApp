import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, viewChild } from '@angular/core'
import { ChartColors, ChartJsService } from '../../../../core/services/chart-js/chart-js.service'
import { Chart } from 'chart.js'

@Component({
    selector: 'app-line-chart',
    standalone: true,
    imports: [],
    templateUrl: './line-chart.component.html',
    styleUrl: './line-chart.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineChartComponent implements AfterViewInit {
    private readonly chartJsService = inject(ChartJsService)
    readonly canvasRef =
        viewChild.required<ElementRef<HTMLCanvasElement>>('myChart')
    chart!: Chart

    constructor() {
        this.chartJsService.initializeChartJs()
    }

    ngAfterViewInit() {
        const canvas = this.canvasRef().nativeElement
        this.chart = new Chart(canvas, {
            type: 'line',
            data: {
                labels: [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec',
                ],
                datasets: [
                    {
                        label: 'Sales Revenue (in USD)',
                        data: [
                            32000, 28000, 34000, 35000, 40000, 43000, 46000,
                            49000, 52000, 55000, 59000, 62000,
                        ], // Monthly sales data
                        fill: false, // Do not fill the area under the line
                        backgroundColor: this.chartJsService.getColor(
                            ChartColors.Primary,
                        ),
                        borderColor: this.chartJsService.getColor(
                            ChartColors.Primary,
                        ), // Use primary color for the line
                        tension: 0.1, // Add a little curve to the line
                        borderWidth: 2, // Line thickness
                        pointBackgroundColor: this.chartJsService.getColor(
                            ChartColors.Primary,
                        ), // Color for the data points
                        pointBorderColor: this.chartJsService.getColor(
                            ChartColors.Surface,
                        ), // Border color of points
                        pointBorderWidth: 2, // Point border width
                        pointRadius: 5, // Radius of the points
                        hoverBackgroundColor: this.chartJsService.getColor(
                            ChartColors.Primary,
                        ), // Hover color
                        hoverBorderColor: this.chartJsService.getColor(
                            ChartColors.Surface,
                        ), // Hover border color
                        hoverBorderWidth: 3, // Hover border width
                    },
                    {
                        label: 'Projected Revenue (in USD)',
                        data: [
                            30000, 32000, 35000, 37000, 42000, 45000, 48000,
                            51000, 54000, 58000, 60000, 63000,
                        ], // Projected monthly sales
                        fill: false, // Do not fill the area under the line
                        backgroundColor: this.chartJsService.getColor(
                            ChartColors.Tertiary,
                        ),
                        borderColor: this.chartJsService.getColor(
                            ChartColors.Tertiary,
                        ), // Use custom color for the projected line
                        tension: 0.1,
                        borderWidth: 2,
                        pointBackgroundColor: this.chartJsService.getColor(
                            ChartColors.Tertiary,
                        ), // Color for the data points
                        pointBorderColor: this.chartJsService.getColor(
                            ChartColors.Surface,
                        ),
                        pointBorderWidth: 2,
                        pointRadius: 5,
                        hoverBackgroundColor: this.chartJsService.getColor(
                            ChartColors.Tertiary,
                        ), // Hover color
                        hoverBorderColor: this.chartJsService.getColor(
                            ChartColors.Surface,
                        ),
                        hoverBorderWidth: 3,
                    },
                ],
            },
            options: {
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
                            label: function(tooltipItem) {
                                return `${tooltipItem.label}: $${Number(tooltipItem.raw).toLocaleString()} USD` // Custom message
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
                        ticks: {
                            font: {
                                size: 12,
                                family: 'Roboto',
                            },
                            color: this.chartJsService.getColor(
                                ChartColors.OnSurface,
                            ),
                            callback: function(value) {
                                return '$' + value.toLocaleString() // Format Y axis as currency
                            },
                        },
                        grid: {
                            lineWidth: 1,
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
