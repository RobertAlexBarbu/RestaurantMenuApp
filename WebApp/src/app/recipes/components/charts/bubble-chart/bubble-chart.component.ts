import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, viewChild } from '@angular/core'
import { ChartColors, ChartJsService } from '../../../../core/services/chart-js/chart-js.service'
import { Chart } from 'chart.js'

@Component({
    selector: 'app-bubble-chart',
    standalone: true,
    imports: [],
    templateUrl: './bubble-chart.component.html',
    styleUrl: './bubble-chart.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BubbleChartComponent implements AfterViewInit {
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
            type: 'bubble',
            data: {
                datasets: [
                    {
                        label: 'Software Engineers',
                        data: [{ x: 3, y: 70000, r: 15 }], // x = years of experience, y = salary, r = number of employees
                        backgroundColor: this.chartJsService.getColor(
                            ChartColors.Primary,
                        ),
                    },
                    {
                        label: 'Data Scientists',
                        data: [{ x: 5, y: 90000, r: 20 }],
                        backgroundColor: this.chartJsService.getColor(
                            ChartColors.Gray,
                        ),
                    },
                    {
                        label: 'Product Managers',
                        data: [{ x: 7, y: 110000, r: 10 }],
                        backgroundColor: this.chartJsService.getColor(
                            ChartColors.Tertiary,
                        ),
                    },
                    {
                        label: 'Designers',
                        data: [{ x: 4, y: 65000, r: 12 }],
                        backgroundColor: this.chartJsService.getColor(
                            ChartColors.Amber,
                        ), // Custom color
                    },
                    {
                        label: 'HR Managers',
                        data: [{ x: 6, y: 60000, r: 8 }],
                        backgroundColor: this.chartJsService.getColor(
                            ChartColors.Green,
                        ),
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
                                const dataset = tooltipItem.dataset
                                const dataPoint =
                                    dataset.data[tooltipItem.dataIndex]
                                return `Role: ${dataset.label}`
                            },
                            footer: (tooltipItems) => {
                                const dataset = tooltipItems[0].dataset
                                const dataPoint =
                                    dataset.data[tooltipItems[0].dataIndex]
                                return [
                                    `YoE: ${dataPoint.x} yrs`,
                                    `Salary: $${dataPoint.y.toLocaleString()}`,
                                    `Employees: ${dataPoint.r}`,
                                ]
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
                        grid: {
                            lineWidth: 1,
                            color: this.chartJsService.getColor(
                                ChartColors.Border,
                            ),
                        },
                        title: {
                            display: true,
                            text: 'Years of Experience',
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
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Average Salary (USD)',
                            font: {
                                size: 14,
                                family: 'Roboto',
                            },
                            color: this.chartJsService.getColor(
                                ChartColors.OnSurface,
                            ),
                        },
                        ticks: {
                            callback: function(value) {
                                return `$${value.toLocaleString()}`
                            },
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
                },
            },
        })
    }
}
