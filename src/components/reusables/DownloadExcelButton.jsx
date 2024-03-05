import React from 'react';
import ExcelJS from 'exceljs';
import {Button, Text} from "@chakra-ui/react";
import {Link as ReactLink} from "react-router-dom";

const DownloadExcelButton = ({ data, filename }) => {
    const downloadExcel = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet 1');

        // Add headers
        const headers = Object.keys(data[0]);
        worksheet.addRow(headers);

        // Add data
        data.forEach(item => {
            const rowValues = headers.map(header => item[header]);
            worksheet.addRow(rowValues);
        });

        // Generate blob
        const blob = await workbook.xlsx.writeBuffer();

        // Create a blob and initiate download
        const url = URL.createObjectURL(new Blob([blob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
        const a = document.createElement('a');
        a.href = url;
        a.download = filename || 'data.xlsx';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <Button variant="primary" onClick={downloadExcel} bgColor="#00C795" borderRadius="4px" height="37px" size='md' as={ReactLink} w={'129px'}>
            <Text color="white">Download</Text>
        </Button>
        // <button onClick={downloadExcel}>Download Excel</button>
    );
};

export default DownloadExcelButton;
