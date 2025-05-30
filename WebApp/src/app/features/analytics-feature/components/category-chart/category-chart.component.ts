import {ChangeDetectionStrategy, Component, ElementRef, inject, input, viewChild} from '@angular/core';
import {ChartColors, ChartJsService} from "../../../../core/services/chart-js/chart-js.service";
import {Chart, ChartOptions} from "chart.js";
import {CategoryChartData} from "../../analytics-feature.component";

@Component({
  selector: 'app-category-chart',
  imports: [],
  templateUrl: './category-chart.component.html',
  styleUrl: './category-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class CategoryChartComponent {
    private readonly chartJsService = inject(ChartJsService)
    readonly canvasRef =
        viewChild.required<ElementRef<HTMLCanvasElement>>('myChart')
    chart!: Chart

    categoryChartData = input<CategoryChartData[]>([]);

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

        // Process category data
        const processedData = this.processCategoryData();

        this.chart = new Chart(canvas, {
            type: 'bar',
            data: {
                labels: processedData.labels,
                datasets: [{
                    label: 'Interactions',
                    data: processedData.data,
                    backgroundColor: processedData.colors,
                    hoverBackgroundColor: processedData.colors,
                    borderWidth: 1
                }]
            },
            options: this.getChartOptions()
        });
    }

    private processCategoryData(): { labels: string[], data: number[], colors: string[] } {
        if (!this.categoryChartData() || this.categoryChartData().length === 0) {
            return {
                labels: ['No data available'],
                data: [0],
                colors: [this.chartJsService.getColor(ChartColors.Gray)]
            };
        }

        // Sort by interactions (descending) and take top 5
        const topCategories = [...this.categoryChartData()]
            .sort((a, b) => b.interactions - a.interactions)
            .slice(0, 5);

        const colorOptions = [
            ChartColors.Primary,
            ChartColors.Tertiary,
            ChartColors.Amber,
            ChartColors.Green,
            ChartColors.Gray
        ];

        return {
            labels: topCategories.map(category => category.name),
            data: topCategories.map(category => category.interactions),
            colors: topCategories.map((_, index) =>
                this.chartJsService.getColor(colorOptions[index])
            )
        };
    }



    private updateChart(): void {
        const processedData = this.processCategoryData();

        // Update chart data
        this.chart.data.labels = processedData.labels;
        this.chart.data.datasets[0].data = processedData.data;
        this.chart.data.datasets[0].backgroundColor = processedData.colors;
        this.chart.data.datasets[0].hoverBackgroundColor = processedData.colors;

        // Refresh the chart
        this.chart.update();
    }

    private getChartOptions(): ChartOptions {
        return {
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
                        text: 'Categories',
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
                        display: false
                    }
                },
                y: {
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
                    beginAtZero: true
                },
            },
        };
    }
}
