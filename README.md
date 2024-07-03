This is a nodejs script that takes an excel file of tracks and creates mongo db documents for each row.

To run the script you must run the `npm start`. This command will ask you for the file path of the excel file you want to import. It will first validate if the file exists or is of the type XLSX otherwise ask you for the valid file again. If a file exists and is of type xlsx it will process the spreadsheet and print an array of errors at the end.

This repo also has some unit tests that will check the following and can be run using `npm run test`:

1. Check if invalid headers and data is captured
2. Check if there is no data to process
3. Check if all of rows have supplied the wrong contract name
4. Check if all of rows have supplied all the mandatory fields
5. Check if all the data is processed without errors
