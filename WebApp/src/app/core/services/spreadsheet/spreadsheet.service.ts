import { inject, Injectable } from '@angular/core'
import * as ExcelJS from 'exceljs'
import { from, Observable, of, switchMap } from 'rxjs'
import { map } from 'rxjs/operators'
import { UtilityService } from '../utility/utility.service'


@Injectable({
    providedIn: 'root',
})
export class SpreadsheetService {

    private readonly utilityService = inject(UtilityService)

    exportWorkbook(workbook: ExcelJS.Workbook, name: string): Observable<void> {
        return from(workbook.xlsx.writeBuffer()).pipe(
            map((buffer: ArrayBuffer) => {
                const blob = new Blob([buffer], {
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                })
                this.utilityService.downloadFile(URL.createObjectURL(blob), `${name}_${new Date().toISOString().split('T')[0]}.xlsx`)
            }),
        )
    }

    importWorkbook(file: File, workbook: ExcelJS.Workbook): Observable<ExcelJS.Workbook> {
        return from(file.arrayBuffer()).pipe(
            switchMap((buffer) => {
                return of(workbook.xlsx.load(buffer))
            }),
            switchMap((s) => {
                return from(s)
            }))
    }

    styleSheet(sheet: ExcelJS.Worksheet) {
        const headerFontSize = 16
        const titleFontSize = 24
        const cellFontSize = 14
        const borderColor = 'FFB0B0B0' // Light gray border

        const totalRows = sheet.rowCount
        const totalCols = sheet.columnCount

        for (let rowNumber = 1; rowNumber <= totalRows; rowNumber++) {
            const row = sheet.getRow(rowNumber)

            for (let colNumber = 1; colNumber <= totalCols; colNumber++) {
                const cell = row.getCell(colNumber)
                cell.border = {
                    top: { style: 'thin', color: { argb: borderColor } },
                    left: { style: 'thin', color: { argb: borderColor } },
                    bottom: { style: 'thin', color: { argb: borderColor } },
                    right: { style: 'thin', color: { argb: borderColor } },
                }
                cell.alignment = {
                    vertical: 'middle',
                    horizontal: 'left',
                    indent: 1,
                    wrapText: true,
                }
                if (rowNumber === 3) {
                    cell.font = {
                        bold: true,
                        size: headerFontSize,
                    }
                } else if (rowNumber === 1) {
                    cell.font = {
                        bold: true,
                        size: titleFontSize,
                    }
                } else {
                    cell.font = {
                        size: cellFontSize,
                    }
                }
                if (rowNumber === 1) {
                    row.height = 48
                } else if (rowNumber === 3) {
                    row.height = 32
                } else if (rowNumber === 2) {
                    row.height = 24
                }
            }
        }
    }

    addTitleRow(sheet: ExcelJS.Worksheet, title: string, range: string = 'A1:A1') {
        const titleRow = sheet.getRow(1)
        titleRow.getCell(1).value = title
        sheet.mergeCells(range)
    }

    addInfoRow(sheet: ExcelJS.Worksheet, info: string, range: string = 'A2:A2') {
        const infoRow = sheet.getRow(2)
        infoRow.getCell(1).value = info
        sheet.mergeCells(range)
    }

    addHeaderRow(sheet: ExcelJS.Worksheet) {
        const headerRow = sheet.getRow(3)
        //@ts-ignore
        headerRow.values = sheet.columns.map(c => c.header)
    }

    makeRequiredColumn(
        sheet: ExcelJS.Worksheet,
        column: string,
        columnStart = 2,
    ) {
        sheet.addConditionalFormatting({
            ref: `${column}${columnStart}:${column}500`,
            rules: [
                {
                    // Rule for empty cells - apply red background
                    type: 'expression',
                    formulae: [`LEN(${column}${columnStart})=0`],
                    style: {
                        fill: {
                            type: 'pattern',
                            pattern: 'solid',
                            bgColor: { argb: 'FF8789' }, // Red
                        },
                    },
                    priority: 1,
                },
                {
                    // Rule for cells with values - apply green background
                    type: 'expression',
                    formulae: [`LEN(${column}${columnStart})>0`],
                    style: {
                        fill: {
                            type: 'pattern',
                            pattern: 'solid',
                            bgColor: { argb: 'EBF1DE' }, // Green
                        },
                    },
                    priority: 2,
                },
            ],
        })
        // Now manually add borders to the entire column
        for (let row = columnStart; row <= 500; row++) {
            const cell = sheet.getCell(`${column}${row}`)
            cell.border = {
                top: { style: 'thin', color: { argb: 'FFB0B0B0' } },
                left: { style: 'thin', color: { argb: 'FFB0B0B0' } },
                bottom: { style: 'thin', color: { argb: 'FFB0B0B0' } },
                right: { style: 'thin', color: { argb: 'FFB0B0B0' } },
            }
        }
    }

    makeDropdownColumn(
        sheet: ExcelJS.Worksheet,
        column: string,
        formulae: unknown[],
        columnStart = 4,
    ) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        sheet.dataValidations.model[`${column}${columnStart}:${column}500`] = {
            type: 'list',
            allowBlank: false,
            formulae: formulae,
            showErrorMessage: true,
            errorTitle: 'Invalid Selection',
            error: 'Please select a valid option',
        }
    }

    makeReferencedColumn(
        sheet: ExcelJS.Worksheet,
        column: string,
        referenceSheet: string,
        referenceColumn: string,
        referenceStartRow: number,
        referenceEndRow: number,
        columnStart = 4,
    ) {
        const reference = `'${referenceSheet}'!$${referenceColumn}$${referenceStartRow}:$${referenceColumn}$${referenceEndRow}`
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        sheet.dataValidations.model[`${column}${columnStart}:${column}500`] = {
            type: 'list',
            allowBlank: false,
            formulae: [reference],
            showErrorMessage: true,
            errorTitle: 'Invalid Selection',
            error: `Please select a value from the ${referenceSheet} sheet`,
        }
    }

    // Does not work in Google Sheets
    protectSheet(sheet: ExcelJS.Worksheet) {
        sheet.eachRow((row) => {
            row.eachCell((cell) => {
                if (!cell.protection) cell.protection = {}
                cell.protection.locked = true
            })
        })
        sheet.protect('robi', {
            selectLockedCells: false,
            selectUnlockedCells: false,
            formatCells: false,
            formatColumns: false,
            formatRows: false,
            insertColumns: false,
            insertRows: false,
            insertHyperlinks: false,
            deleteColumns: false,
            deleteRows: false,
            sort: false,
            autoFilter: false,
            pivotTables: false,
        })
    }
}
