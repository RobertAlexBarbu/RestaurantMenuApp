import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, viewChild } from '@angular/core'
import { ChartColors, ChartJsService } from '../../../../core/services/chart-js/chart-js.service'
import { Chart } from 'chart.js'

@Component({
    selector: 'app-donut-chart',
    standalone: true,
    imports: [],
    templateUrl: './donut-chart.component.html',
    styleUrl: './donut-chart.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DonutChartComponent implements AfterViewInit {
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
            type: 'doughnut',
            data: {
                labels: ['Company A', 'Company B', 'Company C', 'Company D'],
                datasets: [
                    {
                        label: 'Market Share by Company',
                        data: [20, 30, 15, 35], // Example data
                        backgroundColor: [
                            this.chartJsService.getColor(ChartColors.Primary),
                            this.chartJsService.getColor(ChartColors.Tertiary),
                            this.chartJsService.getColor(ChartColors.Gray),
                            this.chartJsService.getColor(ChartColors.Amber),
                        ],
                        borderWidth: 1,
                        borderColor: this.chartJsService.getColor(
                            ChartColors.Surface,
                        ),
                        hoverBackgroundColor: [
                            this.chartJsService.getColor(ChartColors.Primary),
                            this.chartJsService.getColor(ChartColors.Tertiary),
                            this.chartJsService.getColor(ChartColors.Gray),
                            this.chartJsService.getColor(ChartColors.Amber),
                        ],
                        hoverBorderColor: this.chartJsService.getColor(
                            ChartColors.Surface,
                        ),
                        hoverBorderWidth: 8,
                    },
                ],
            },
            options: {
                plugins: {
                    // @ts-ignore
                    annotation: {
                        // @ts-ignore
                        annotations: {
                            dLabel: {
                                type: 'doughnutLabel',
                                content: ['Market Share', 'by Company'],
                                font: [{ size: 30 }, { size: 25 }],
                                color: [
                                    this.chartJsService.getColor(
                                        ChartColors.OnSurface,
                                    ),
                                ],
                            },
                        },
                    },
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
                                return `${tooltipItem.label}: ${tooltipItem.raw} %` // Custom message
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
            },
        })
    }
}
