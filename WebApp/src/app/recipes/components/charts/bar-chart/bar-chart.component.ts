import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, viewChild } from '@angular/core'
import { Chart } from 'chart.js'
import { ChartColors, ChartJsService } from '../../../../core/services/chart-js/chart-js.service'

@Component({
    selector: 'app-bar-chart',
    standalone: true,
    imports: [],
    templateUrl: './bar-chart.component.html',
    styleUrl: './bar-chart.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarChartComponent implements AfterViewInit {
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
                labels: [
                    'N. America',
                    'Europe',
                    'Asia',
                    'S. America',
                    'Africa',
                    'Oceania',
                ],
                datasets: [
                    {
                        label: 'Sales Revenue (in USD)',
                        data: [120000, 95000, 115000, 72000, 30000, 25000],
                        backgroundColor: this.chartJsService.getColor(
                            ChartColors.Primary,
                        ),
                        borderWidth: 1,
                        hoverBackgroundColor: this.chartJsService.getColor(
                            ChartColors.Primary,
                        ),
                        hoverBorderColor: this.chartJsService.getColor(
                            ChartColors.Primary,
                        ),
                    },
   
                ],
            },
            options: {
                plugins: {
                    legend: {
                        position: 'bottom',
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
                            footer: function(tooltipItems) {
                                const total = tooltipItems.reduce(
                                    (sum, item) => sum + Number(item.raw),
                                    0,
                                )
                                return `Total: $${total.toLocaleString()}`
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
                                if (Number(value) >= 1000) {
                                    return '$' + Number(value) / 1000 + 'k'
                                }
                                return '$' + value
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
