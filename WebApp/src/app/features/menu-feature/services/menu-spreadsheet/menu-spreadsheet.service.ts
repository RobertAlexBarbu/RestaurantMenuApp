import {inject, Injectable} from '@angular/core';
import {SpreadsheetService} from "../../../../core/services/spreadsheet/spreadsheet.service";
import {ElementCategoryDto} from "../../../../core/http/dto/element-category/element-category.dto";
import {ElementDetailDto} from "../../../../core/http/dto/element/element-detail.dto";
import {Observable} from "rxjs";
import * as ExcelJS from "exceljs";
import {CreateElementCategoryDto} from "../../../../core/http/dto/element-category/create-element-category.dto";
import {ImportElementDto} from "../../../../core/http/dto/element/import-element.dto";
import {map} from "rxjs/operators";
import {MenuCategoryDto} from "../../../../core/http/dto/menu-dto/menu-category/menu-category.dto";
import {ElementDto} from "../../../../core/http/dto/element/element.dto";
import {MenuItemDetailDto} from "../../../../core/http/dto/menu-dto/menu-item/menu-item-detail.dto";

@Injectable({
  providedIn: 'root'
})
export class MenuSpreadsheetService {
    private readonly spreadsheetService = inject(SpreadsheetService)

    exportElementTable(
        foodCategories: MenuCategoryDto[],
        foodItems: MenuItemDetailDto[],
        drinksCategories: MenuCategoryDto[],
        drinksItems: MenuItemDetailDto[],
        name = 'Menu',
    ): Observable<void> {
        const workbook = new ExcelJS.Workbook()
        const foodCategoriesSheet = this.createCategoriesSheet(workbook, foodCategories, 'Food Categories')
        const drinksCategoriesSheet = this.createCategoriesSheet(workbook, drinksCategories, 'Drinks Categories')
        const foodItemsSheet = this.createItemsSheet(workbook, foodItems, 'Food Items')
        const drinksItemsSheet = this.createItemsSheet(workbook, drinksItems, 'Drinks Items')
        this.spreadsheetService.styleSheet(foodItemsSheet)
        this.spreadsheetService.styleSheet(drinksCategoriesSheet)
        this.spreadsheetService.styleSheet(foodCategoriesSheet)
        this.spreadsheetService.styleSheet(drinksItemsSheet)
        return this.spreadsheetService.exportWorkbook(workbook, name)
    }

    importElementTable(file: File): Observable<{
        categories: CreateElementCategoryDto[];
        elements: ImportElementDto[];
    }> {

        const workbook = new ExcelJS.Workbook()
        return this.spreadsheetService.importWorkbook(file, workbook).pipe(
            map((wb) => {
                const categoriesSheet = workbook.getWorksheet('Categories')
                const elementsSheet = workbook.getWorksheet('Elements')
                const categories: CreateElementCategoryDto[] = []
                const elements: ImportElementDto[] = []
                if (categoriesSheet) {
                    categoriesSheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
                        if (rowNumber <= 3) return // Skip title, info, and header rows
                        const nameCell = row.getCell(1)
                        const name = nameCell.value!.toString()
                        if (name) {
                            categories.push({
                                name: name.trim(),
                            })
                        }
                    })
                }

                if (elementsSheet) {
                    let index = 0
                    elementsSheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
                        if (rowNumber <= 3) return
                        index++
                        const nameCell = row.getCell(1)
                        const symbolCell = row.getCell(2)
                        const categoryNameCell = row.getCell(3)
                        const densityCell = row.getCell(4)
                        const weightCell = row.getCell(5)
                        const meltingPointCell = row.getCell(6)
                        const boilingPointCell = row.getCell(7)
                        const atomicRadiusCell = row.getCell(8)
                        const isVisibleCell = row.getCell(9)
                        const descriptionCell = row.getCell(10)

                        const name = nameCell.value?.toString()
                        const symbol = symbolCell.value?.toString()
                        const categoryName = categoryNameCell.value?.toString()
                        const density = Number(densityCell.value!)
                        const weight = Number(weightCell.value!)
                        const meltingPoint = Number(meltingPointCell.value)
                        const boilingPoint = Number(boilingPointCell.value)
                        const atomicRadius = Number(atomicRadiusCell.value)
                        const isVisible = isVisibleCell.value?.toString()?.toLowerCase() === 'true'
                        const description = descriptionCell.value?.toString()

                        if (name && symbol && categoryName) {
                            elements.push({
                                name: name.trim(),
                                symbol: symbol.trim(),
                                categoryName: categoryName.trim(),
                                density: density,
                                weight: weight,
                                meltingPoint: meltingPoint,
                                boilingPoint: boilingPoint,
                                atomicRadius: atomicRadius,
                                isVisible,
                                description: description?.trim() || '',
                                position: index,
                            })
                        }
                    })
                }
                return {
                    categories,
                    elements,
                }
            }),
        )
    }

    private createCategoriesSheet(workbook: ExcelJS.Workbook, categories: MenuCategoryDto[], title: string): ExcelJS.Worksheet {
        const categorySheet = workbook.addWorksheet(title)
        categorySheet.columns = [
            { header: 'Name*', key: 'name', width: 30 },
            { header: 'Description', key: 'description', width: 100 },
        ]
        categorySheet.getColumn(1).width = 80

        this.spreadsheetService.addTitleRow(categorySheet, title, 'A1:B1')
        this.spreadsheetService.addInfoRow(categorySheet, '⚠️ Cells colored red and columns marked with * are mandatory fields.')
        this.spreadsheetService.addHeaderRow(categorySheet)

        categorySheet.addRows(categories.map(c => ({ name: c.name, description: c.description })))
        const requiredCategoryColumns = ['A']
        requiredCategoryColumns.forEach((column) => {
            this.spreadsheetService.makeRequiredColumn(categorySheet, column, 4)
        })

        return categorySheet
    }

    private createItemsSheet(workbook: ExcelJS.Workbook, elements: MenuItemDetailDto[], title: string): ExcelJS.Worksheet {
        const elementSheet = workbook.addWorksheet(title)
        elementSheet.columns = [
            {
                header: 'Name*',
                key: 'name',
                width: 60,
                style: { font: { bold: true } },
            },
            {
                header: 'Category*',
                key: 'categoryName',
                width: 30,
                style: { font: { bold: true } },
            },
            {
                header: 'Price*',
                key: 'symbol',
                width: 20,
                style: { font: { bold: true } },
            },

            {
                header: 'Density',
                key: 'density',
                width: 15,
                style: { numFmt: '0' },
            },
            {
                header: 'Weight',
                key: 'weight',
                width: 15,
                style: { numFmt: '0' },
            },

            { header: 'Description', key: 'description', width: 100 },
            { header: 'Ingredients', key: 'ingredients', width: 100 },
            { header: 'Nutritional Values', key: 'nutritionalValues', width: 100 },
            { header: 'Allergens', key: 'allergens', width: 100 },
        ]

        this.spreadsheetService.addTitleRow(elementSheet, title, 'A1:I1')
        this.spreadsheetService.addInfoRow(elementSheet, '⚠️ Cells colored red and columns marked with * are mandatory fields.', 'A2:I2')
        this.spreadsheetService.addHeaderRow(elementSheet)

        const elementRows = elements.map((element) => ({
            ...element,
            categoryName: element.category.name,
        }))
        elementSheet.addRows(elementRows)

        if (title == 'Food Items') {
            this.spreadsheetService.makeReferencedColumn(elementSheet, 'B', 'Food Categories', 'A', 4, 500)
        } else {
            this.spreadsheetService.makeReferencedColumn(elementSheet, 'B', 'Drinks Categories', 'A', 4, 500)
        }

        
        
        const requiredColumns = ['A', 'B', 'C']
        requiredColumns.forEach((column) => {
            this.spreadsheetService.makeRequiredColumn(elementSheet, column, 4)
        })
        return elementSheet
    }
}
