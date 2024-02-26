---
title: Create Excel Spreadsheets with XLSXWriter
description: Create Excel Spreadsheets with XLSXWriter
---

This Python utility provides a convenient way to export data from a specified table in an IBM i database schema to an Excel file. It leverages `ibm_db_dbi` for database connectivity and `xlsxwriter` for creating Excel workbooks. The tool is designed to be simple to use, requiring just the schema and table name as input parameters.

## Features

- **Easy Export**: Export data with a simple command.
- **Timestamped Reports**: Automatically names files with a timestamp.
- **CLI Support**: Accepts parameters directly from the command line.

## Prerequisites

- Python 3.x
- `ibm_db` and `ibm_db_dbi` installed and configured for IBM i database access.
- `xlsxwriter` for creating Excel files.

## Usage

Run the script from the PASE/SSH by passing the schema and table name:

```sh
python3 script.py <schema_name> <table_name>
```

## Program

```python
import argparse
import ibm_db_dbi
import xlsxwriter
from datetime import datetime

# Set up the argument parser and parse the command line arguments
parser = argparse.ArgumentParser(description="Export table data to an Excel file.")
parser.add_argument('schema', help="The database schema name.")
parser.add_argument('table', help="The table name to export.")

args = parser.parse_args()

# Connect to the database
# Note: Remote connections you'll need to pass in the connection string here. Local should work as-is.
connection = ibm_db_dbi.connect()

# Create a cursor object using the connection
cursor = connection.cursor()

# Get the current timestamp in the specified format
timestamp = datetime.now().strftime('%Y%m%d%H%M%S')

# Define the Excel file name with the current timestamp
excel_file = f'/tmp/Report_{timestamp}.xlsx'

# Create an Excel workbook and worksheet
workbook = xlsxwriter.Workbook(excel_file)
worksheet = workbook.add_worksheet()

# Execute the SQL query
try:
    cursor.execute(f'SELECT * FROM {args.schema}.{args.table}')

    # Retrieve the column names from the cursor
    columns = [desc[0] for desc in cursor.description]

    # Write the column headers to the Excel sheet
    for col_num, column_title in enumerate(columns):
        worksheet.write(0, col_num, column_title)

    # Loop through the cursor and write data to the Excel sheet
    for row_num, row in enumerate(cursor, start=1):
        for col_num, cell_value in enumerate(row):
            worksheet.write(row_num, col_num, cell_value)

    print(f"Data successfully written to {excel_file}")

except ibm_db_dbi.Error as e:
    print("An error occurred when executing the SQL query or writing to the Excel file.")
    print(str(e))

finally:
    # Close the cursor and connection
    cursor.close()
    connection.close()

    # Close the Excel workbook
    workbook.close()
```