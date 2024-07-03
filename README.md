This is a nodejs script that takes an excel file of tracks and creates mongo db documents for each row. Please find a sample of the XLSX file here. 

To run the script you must run the `npm start`. This command will ask you for the file path of the excel file you want to import. It will first validate if the file exists or is of the type XLSX otherwise ask you for the valid file again. If a file exists and is of type xlsx it will process the spreadsheet and print an array of errors at the end..
