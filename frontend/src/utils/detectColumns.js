export function detectColumns(data) {

  if (!data || data.length === 0) {
    return {};
  }

  const columns =
    Object.keys(data[0]);

  const analysis = {

    dateColumns: [],

    numericColumns: [],

    categoryColumns: [],

    idColumns: [],

    financialColumns: [],
  };

  columns.forEach((column) => {

    const lower =
      column.toLowerCase();

    // DATE DETECTION
    if (

      lower.includes("date") ||

      lower.includes("time") ||

      lower.includes("month") ||

      lower.includes("year")

    ) {

      analysis.dateColumns.push(
        column
      );
    }

    // ID DETECTION
    else if (

      lower.includes("id") ||

      lower.includes("code")

    ) {

      analysis.idColumns.push(
        column
      );
    }

    // FINANCIAL DETECTION
    else if (

      lower.includes("amount") ||

      lower.includes("price") ||

      lower.includes("cost") ||

      lower.includes("billing") ||

      lower.includes("payment")

    ) {

      analysis.financialColumns.push(
        column
      );
    }

    // CHECK SAMPLE VALUE
    const sample =
      data[0][column];

    if (

      !isNaN(sample) &&

      sample !== ""

    ) {

      analysis.numericColumns.push(
        column
      );

    } else {

      analysis.categoryColumns.push(
        column
      );
    }
  });

  return analysis;
}