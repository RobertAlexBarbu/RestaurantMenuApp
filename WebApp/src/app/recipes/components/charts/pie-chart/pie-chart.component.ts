import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, viewChild } from '@angular/core'
import { ChartColors, ChartJsService } from '../../../../core/services/chart-js/chart-js.service'
import { Chart } from 'chart.js'

@Component({
    selector: 'app-pie-chart',
    standalone: true,
    imports: [],
    templateUrl: './pie-chart.component.html',
    styleUrl: './pie-chart.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PieChartComponent implements AfterViewInit {
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
            type: 'pie', // Set chart type to 'pie'
            data: {
                labels: [
                    'Heating',
                    'Lighting',
                    'Appliances',
                    'Electronics',
                    'Other',
                ], // Labels for energy consumption categories
                datasets: [
                    {
                        label: 'Energy Consumption (kWh)',
                        data: [300, 150, 200, 100, 80], // Energy usage in kilowatt-hours (kWh)
                        backgroundColor: [
                            this.chartJsService.getColor(ChartColors.Primary),
                            this.chartJsService.getColor(ChartColors.Tertiary),
                            this.chartJsService.getColor(ChartColors.Gray),
                            this.chartJsService.getColor(ChartColors.Green),
                            this.chartJsService.getColor(ChartColors.Amber),
                        ],
                        hoverBackgroundColor: [
                            this.chartJsService.getColor(ChartColors.Primary),
                            this.chartJsService.getColor(ChartColors.Tertiary),
                            this.chartJsService.getColor(ChartColors.Gray),
                            this.chartJsService.getColor(ChartColors.Green),
                            this.chartJsService.getColor(ChartColors.Amber),
                        ],
                        borderWidth: 1,
                        borderColor: this.chartJsService.getColor(
                            ChartColors.Surface,
                        ), // White border for pie slices
                        hoverBorderColor: this.chartJsService.getColor(
                            ChartColors.Surface,
                        ),
                        hoverBorderWidth: 4,
                    },
                ],
            },
            options: {
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
                                return `${tooltipItem.label}: ${tooltipItem.raw} kWh` // Show energy usage in kWh
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
