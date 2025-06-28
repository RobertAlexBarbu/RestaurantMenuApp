import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, input, viewChild} from '@angular/core';
import {ChartColors, ChartJsService} from "../../../../core/services/chart-js/chart-js.service";
import {Chart, ChartOptions} from "chart.js";
import {ItemChartData} from "../../analytics-feature.component";

@Component({
  selector: 'app-item-chart',
  imports: [],
  templateUrl: './item-chart.component.html',
  styleUrl: './item-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class ItemChartComponent {
    private readonly chartJsService = inject(ChartJsService)
    readonly canvasRef =
        viewChild.required<ElementRef<HTMLCanvasElement>>('myChart')
    chart!: Chart
    itemChartData = input<ItemChartData[]>([]);

    constructor() {
        this.chartJsService.initializeChartJs()
    }

    ngAfterViewInit(): void {
        this.createChart();
    }

    ngOnChanges(): void {
        if (this.chart) {
            this.updateChart();
        }
    }

    private createChart(): void {
        const canvas = this.canvasRef().nativeElement;
        const processedData = this.processItemData();
        this.chart = new Chart(canvas, {
            type: 'bar',
            data: {
                labels: processedData.labels,
                datasets: [
                    {
                        label: 'Interactions',
                        data: processedData.data,
                        backgroundColor: this.chartJsService.getColor(
                            ChartColors.Primary,
                        ),
                        hoverBackgroundColor: this.chartJsService.getColor(
                            ChartColors.Primary,
                        ),
                        borderWidth: 1
                    }
                ],
            },
            options: this.getChartOptions()
        });
    }

    private processItemData(): { labels: string[], data: number[] } {
        if (!this.itemChartData() || this.itemChartData().length === 0) {
            return {
                labels: ['No data available'],
                data: [0]
            };
        }

        // Sort by count (descending) and take top 10
        const sortedItems = [...this.itemChartData()]
            .sort((a, b) => b.count - a.count)
            .slice(0, 10);

        // Reverse for horizontal chart (highest at top)
        const reversedItems = sortedItems.reverse();

        return {
            labels: reversedItems.map(item => item.name),
            data: reversedItems.map(item => item.count)
        };
    }

    private updateChart(): void {
        const processedData = this.processItemData();

        // Update chart data
        this.chart.data.labels = processedData.labels;
        this.chart.data.datasets[0].data = processedData.data;

        // Refresh the chart
        this.chart.update();
    }

    private getChartOptions(): ChartOptions {
        return {
            indexAxis: 'y', // Makes the chart horizontal
            responsive: true,
            plugins: {
                legend: {
                    display: false // Hide legend since we only have one dataset
                },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            const label = context.label || '';
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
                        text: 'Number of Interactions',
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
                y: {
                    title: {
                        display: true,
                        text: 'Items',
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
                        display: false, // Remove horizontal grid lines for cleaner look
                    },
                },
            },
        };
    }
}


