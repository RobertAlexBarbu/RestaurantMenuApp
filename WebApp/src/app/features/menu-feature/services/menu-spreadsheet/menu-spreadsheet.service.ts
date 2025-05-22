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
import {CreateMenuCategoryDto} from "../../../../core/http/dto/menu-dto/menu-category/create-menu-category.dto";

export interface ImportMenuItemDto {
    menuType: string; // "drinks" or "food"
    name: string;
    description: string;
    price: number;

    nutritionalValues: string;
    ingredients: string;
    allergens: string;
    position: number;
    menuCategoryName: string;
    menuId: number;
}

@Injectable({
  providedIn: 'root'
})
export class MenuSpreadsheetService {
    private readonly spreadsheetService = inject(SpreadsheetService)

    exportMenuTable(
        foodCategories: MenuCategoryDto[],
        foodItems: MenuItemDetailDto[],
        drinksCategories: MenuCategoryDto[],
        drinksItems: MenuItemDetailDto[],
        name = 'Menu',
    ): Observable<void> {
        const workbook = new ExcelJS.Workbook()
        const foodCategoriesSheet = this.createCategoriesSheet(workbook, foodCategories, 'Food Categories')
        const foodItemsSheet = this.createItemsSheet(workbook, foodItems, 'Food Items')
        const drinksCategoriesSheet = this.createCategoriesSheet(workbook, drinksCategories, 'Drinks Categories')
        const drinksItemsSheet = this.createItemsSheet(workbook, drinksItems, 'Drinks Items')
        this.spreadsheetService.styleSheet(foodItemsSheet)
        this.spreadsheetService.styleSheet(drinksCategoriesSheet)
        this.spreadsheetService.styleSheet(foodCategoriesSheet)
        this.spreadsheetService.styleSheet(drinksItemsSheet)
        return this.spreadsheetService.exportWorkbook(workbook, name)
    }

    importItemsTable(file: File, menuId: number): Observable<{
        categories: CreateMenuCategoryDto[];
        items: ImportMenuItemDto[];
    }> {

        const workbook = new ExcelJS.Workbook()
        return this.spreadsheetService.importWorkbook(file, workbook).pipe(
            map((wb) => {
                const foodCategoriesSheet = workbook.getWorksheet('Food Categories')
                const drinksCategoriesSheet = workbook.getWorksheet('Drinks Categories')
                const foodItemsSheet = workbook.getWorksheet('Food Items')
                const drinksItemsSheet = workbook.getWorksheet('Drinks Items')
                const categories: CreateMenuCategoryDto[] = []
                const items: ImportMenuItemDto[] = []
                if (foodCategoriesSheet) {
                    let index = 0
                    foodCategoriesSheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
                        if (rowNumber <= 3) return // Skip title, info, and header rows
                        index++;
                        const nameCell = row.getCell(1)
                        const descriptionCell = row.getCell(2)
                        const name = nameCell.value!.toString()
                        const description = descriptionCell.value!.toString()
                        if (name) {
                            categories.push({
                                name: name.trim(),
                                description: description.trim(),
                                menuId: menuId,
                                menuType: 'food',
                                position: index
                            })
                        }
                    })
                }
                if (drinksCategoriesSheet) {
                    let index = 0
                    drinksCategoriesSheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
                        if (rowNumber <= 3) return // Skip title, info, and header rows
                        index++;
                        const nameCell = row.getCell(1)
                        const descriptionCell = row.getCell(2)
                        const name = nameCell.value!.toString()
                        const description = descriptionCell.value!.toString()
                        if (name) {
                            categories.push({
                                name: name.trim(),
                                description: description.trim(),
                                menuId: menuId,
                                menuType: 'drinks',
                                position: index
                            })
                        }
                    })
                }

                if (foodItemsSheet) {
                    foodItemsSheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
                        if (rowNumber <= 3) return
                        const nameCell = row.getCell(1)
                        const categoryNameCell = row.getCell(2)
                        const priceCell = row.getCell(3)
                        const descriptionCell = row.getCell(4)
                        const ingredientsCell = row.getCell(5)
                        const nutritionalValuesCell = row.getCell(6)
                        const allergensCell = row.getCell(7)

                        const name = nameCell.value?.toString()
                        const categoryName = categoryNameCell.value?.toString()
                        const price = Number(priceCell.value!)
                        const description = descriptionCell.value?.toString()
                        const ingredients = ingredientsCell.value?.toString()
                        const nutritionalValues = nutritionalValuesCell.value?.toString()
                        const allergens = allergensCell.value?.toString()
                        

                        if (name && categoryName) {
                            items.push({
                                name: name.trim(),
                                price: price,
                                menuCategoryName: categoryName.trim(),
                                description: description?.trim() || '',
                                ingredients: ingredients?.trim() || '',
                                nutritionalValues: nutritionalValues?.trim() || '',
                                allergens: allergens?.trim() || '',
                                menuId: menuId,
                                menuType: 'food',
                                position: 0,
                            })
                        }
                    })
                }
                if (drinksItemsSheet) {
                    drinksItemsSheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
                        if (rowNumber <= 3) return
                        const nameCell = row.getCell(1)
                        const categoryNameCell = row.getCell(2)
                        const priceCell = row.getCell(3)
                        const descriptionCell = row.getCell(4)
                        const ingredientsCell = row.getCell(5)
                        const nutritionalValuesCell = row.getCell(6)
                        const allergensCell = row.getCell(7)

                        const name = nameCell.value?.toString()
                        const categoryName = categoryNameCell.value?.toString()
                        const price = Number(priceCell.value!)
                        const description = descriptionCell.value?.toString()
                        const ingredients = ingredientsCell.value?.toString()
                        const nutritionalValues = nutritionalValuesCell.value?.toString()
                        const allergens = allergensCell.value?.toString()
                        

                        if (name  && categoryName) {
                            items.push({
                                name: name.trim(),
                                price: price,
                                menuCategoryName: categoryName.trim(),
                                description: description?.trim() || '',
                                ingredients: ingredients?.trim() || '',
                                nutritionalValues: nutritionalValues?.trim() || '',
                                allergens: allergens?.trim() || '',
                                menuId: menuId,
                                menuType: 'drinks',
                                position: 0,
                            })
                        }
                    })
                }
                console.log(items);
                return {
                    categories,
                    items: this.assignCategoryPositions(items),
                }
            }),
        )
    }

    assignCategoryPositions(items: ImportMenuItemDto[]): ImportMenuItemDto[] {
        // Group items by their category name
        const categories = new Map<string, ImportMenuItemDto[]>();

        // Create groups
        for (const item of items) {
            if (!categories.has(item.menuCategoryName)) {
                categories.set(item.menuCategoryName, []);
            }
            categories.get(item.menuCategoryName)!.push(item);
        }

        // Process each category
        for (const [categoryName, categoryItems] of categories) {
            // Sort items by their current position (if valid) or by name as fallback
            categoryItems.sort((a, b) => {
                // If both have valid positions, sort by position
                if (a.position > 0 && b.position > 0) {
                    return a.position - b.position;
                }
                // Otherwise sort by name as fallback
                return a.name.localeCompare(b.name);
            });

            // Assign sequential positions starting from 1
            categoryItems.forEach((item, index) => {
                item.position = index + 1;
            });
        }

        // Return the flattened array (though original array is modified by reference)
        return items;
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
                key: 'price',
                width: 20,
                style: { font: { bold: true },
                    numFmt: '#,##0.00'},
            },
            

            { header: 'Description', key: 'description', width: 100 },
            { header: 'Ingredients', key: 'ingredients', width: 100 },
            { header: 'Nutritional Values', key: 'nutritionalValues', width: 100 },
            { header: 'Allergens', key: 'allergens', width: 100 },
        ]

        this.spreadsheetService.addTitleRow(elementSheet, title, 'A1:G1')
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
