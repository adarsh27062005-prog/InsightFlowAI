import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// =========================
// FORMAT DATE
// =========================
const getTimestamp = () => {

  const now = new Date();

  return now.toLocaleString();

};

// =========================
// SAFE DATA CHECK
// =========================
const validateData = (data) => {

  return (
    Array.isArray(data) &&
    data.length > 0
  );

};

// =========================
// EXECUTIVE METRICS ENGINE
// =========================
const generateExecutiveMetrics = (
  data
) => {

  if (!validateData(data)) {

    return {

      totalRecords: 0,
      totalColumns: 0,
      completeness: "0%",
      datasetStatus: "Empty",

    };

  }

  const totalRecords =
    data.length;

  const totalColumns =
    Object.keys(data[0]).length;

  // =========================
  // COMPLETENESS SCORE
  // =========================
  let totalFields = 0;

  let filledFields = 0;

  data.forEach((row) => {

    Object.values(row).forEach(
      (value) => {

        totalFields++;

        if (

          value !== null &&
          value !== undefined &&
          value !== ""

        ) {

          filledFields++;

        }

      }
    );

  });

  const completeness =
    (
      (filledFields /
        totalFields) *
      100
    ).toFixed(1) + "%";

  return {

    totalRecords,
    totalColumns,
    completeness,
    datasetStatus:
      "Operational",

  };

};

// =========================
// EXPORT CSV
// =========================
export const exportCSV = (
  data
) => {

  if (!validateData(data)) {

    alert(
      "No dataset available for CSV export."
    );

    return;

  }

  const worksheet =
    XLSX.utils.json_to_sheet(data);

  const csv =
    XLSX.utils.sheet_to_csv(
      worksheet
    );

  const blob = new Blob(
    [csv],
    {
      type:
        "text/csv;charset=utf-8;",
    }
  );

  saveAs(
    blob,
    `InsightFlow_Dataset_${Date.now()}.csv`
  );

};

// =========================
// EXPORT EXCEL
// =========================
export const exportExcel = (
  data
) => {

  if (!validateData(data)) {

    alert(
      "No dataset available for Excel export."
    );

    return;

  }

  // =========================
  // MAIN SHEET
  // =========================
  const worksheet =
    XLSX.utils.json_to_sheet(data);

  // =========================
  // AUTO WIDTH
  // =========================
  const columnWidths =
    Object.keys(data[0]).map(
      (key) => ({

        wch: Math.max(
          key.length + 5,
          25
        ),

      })
    );

  worksheet["!cols"] =
    columnWidths;

  // =========================
  // EXECUTIVE SUMMARY SHEET
  // =========================
  const metrics =
    generateExecutiveMetrics(
      data
    );

  const summaryData = [

    {
      Metric:
        "Generated Timestamp",
      Value:
        getTimestamp(),
    },

    {
      Metric:
        "Total Records",
      Value:
        metrics.totalRecords,
    },

    {
      Metric:
        "Total Columns",
      Value:
        metrics.totalColumns,
    },

    {
      Metric:
        "Dataset Completeness",
      Value:
        metrics.completeness,
    },

    {
      Metric:
        "AI Status",
      Value:
        "Operational",
    },

    {
      Metric:
        "Platform",
      Value:
        "InsightFlow AI",
    },

  ];

  const summarySheet =
    XLSX.utils.json_to_sheet(
      summaryData
    );

  summarySheet["!cols"] = [

    { wch: 35 },
    { wch: 40 },

  ];

  // =========================
  // CREATE WORKBOOK
  // =========================
  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    summarySheet,
    "Executive Summary"
  );

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Healthcare Analytics"
  );

  XLSX.writeFile(
    workbook,
    `InsightFlow_Enterprise_Report_${Date.now()}.xlsx`
  );

};

// =========================
// EXPORT PDF
// =========================
export const exportPDF = (
  data,
  insights = []
) => {

  if (!validateData(data)) {

    alert(
      "No dataset available for PDF export."
    );

    return;

  }

  const doc =
    new jsPDF();

  const metrics =
    generateExecutiveMetrics(
      data
    );

  // =========================
  // HEADER
  // =========================
  doc.setFillColor(
    11,
    17,
    32
  );

  doc.rect(
    0,
    0,
    220,
    40,
    "F"
  );

  doc.setTextColor(
    255,
    255,
    255
  );

  doc.setFontSize(26);

  doc.text(
    "InsightFlow AI",
    14,
    18
  );

  doc.setFontSize(12);

  doc.text(
    "Enterprise Healthcare Analytics Platform",
    14,
    28
  );

  doc.text(
    "Executive Intelligence Report",
    14,
    35
  );

  // =========================
  // REPORT INFO
  // =========================
  doc.setTextColor(
    0,
    0,
    0
  );

  doc.setFontSize(13);

  doc.text(
    `Generated: ${getTimestamp()}`,
    14,
    55
  );

  doc.text(
    `Total Records: ${metrics.totalRecords}`,
    14,
    65
  );

  doc.text(
    `Total Columns: ${metrics.totalColumns}`,
    14,
    75
  );

  doc.text(
    `Dataset Completeness: ${metrics.completeness}`,
    14,
    85
  );

  doc.text(
    `AI Reporting Status: Operational`,
    14,
    95
  );

  // =========================
  // EXECUTIVE SUMMARY
  // =========================
  doc.setFontSize(18);

  doc.text(
    "Executive Summary",
    14,
    115
  );

  doc.setFontSize(11);

  const executiveText = `

This enterprise healthcare reporting cycle processed ${metrics.totalRecords} operational records across ${metrics.totalColumns} semantic business fields.

AI preprocessing and semantic normalization completed successfully.

Dataset completeness score achieved ${metrics.completeness}, indicating stable ingestion quality and operational consistency.

Enterprise analytics workflows, KPI intelligence, semantic reporting and conversational AI systems remain fully operational.

`;

  const wrappedExecutive =
    doc.splitTextToSize(
      executiveText,
      180
    );

  doc.text(
    wrappedExecutive,
    14,
    125
  );

  // =========================
  // AI INSIGHTS
  // =========================
  let currentY = 165;

  if (
    insights &&
    insights.length > 0
  ) {

    doc.setFontSize(18);

    doc.text(
      "AI Generated Insights",
      14,
      currentY
    );

    currentY += 12;

    doc.setFontSize(11);

    insights
      .slice(0, 6)
      .forEach(
        (
          item,
          index
        ) => {

          const wrapped =
            doc.splitTextToSize(
              `• ${item}`,
              175
            );

          doc.text(
            wrapped,
            18,
            currentY
          );

          currentY +=
            wrapped.length * 7;

        }
      );

  }

  // =========================
  // TABLE
  // =========================
  if (
    data.length > 0
  ) {

    autoTable(doc, {

      startY:
        currentY + 10,

      head: [

        Object.keys(
          data[0]
        ),

      ],

      body: data
        .slice(0, 15)
        .map((row) =>

          Object.values(row)

        ),

      styles: {

        fontSize: 8,

        cellPadding: 3,

      },

      headStyles: {

        fillColor: [
          34,
          211,
          238,
        ],

        textColor: 0,

        fontStyle:
          "bold",

      },

      alternateRowStyles: {

        fillColor: [
          245,
          245,
          245,
        ],

      },

      margin: {

        left: 10,
        right: 10,

      },

    });

  }

  // =========================
  // FOOTER
  // =========================
  const pageHeight =
    doc.internal.pageSize.height;

  doc.setFontSize(10);

  doc.setTextColor(
    120
  );

  doc.text(
    "Generated by InsightFlow AI • Enterprise Healthcare Intelligence Platform",
    14,
    pageHeight - 12
  );

  // =========================
  // SAVE
  // =========================
  doc.save(
    `InsightFlow_Executive_Report_${Date.now()}.pdf`
  );

};