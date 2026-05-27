import {
  createContext,
  useContext,
  useState,
} from "react";

// =========================
// CONTEXT
// =========================
const AppContext =
  createContext();

// =========================
// PROVIDER
// =========================
export function AppProvider({
  children,
}) {

  // =========================
  // GLOBAL DATASET
  // =========================
  const [data, setData] =
    useState([]);

  // =========================
  // DDL SCHEMA
  // =========================
  const [schema, setSchema] =
    useState([]);

  // =========================
  // SELECTED COLUMNS
  // =========================
  const [
    selectedColumns,
    setSelectedColumns,
  ] = useState([]);

  // =========================
  // SEMANTIC MODEL
  // =========================
  const [
    semanticModel,
    setSemanticModel,
  ] = useState([]);

  // =========================
  // PROCESSING SUMMARY
  // =========================
  const [
    processingSummary,
    setProcessingSummary,
  ] = useState([]);

  // =========================
  // SOURCE TYPE
  // =========================
  const [
    sourceType,
    setSourceType,
  ] = useState("DDL");

  // =========================
  // AI INSIGHTS
  // =========================
  const [insights, setInsights] =
    useState([]);

  return (

    <AppContext.Provider
      value={{

        data,
        setData,

        schema,
        setSchema,

        selectedColumns,
        setSelectedColumns,

        semanticModel,
        setSemanticModel,

        processingSummary,
        setProcessingSummary,

        sourceType,
        setSourceType,

        insights,
        setInsights,

      }}
    >

      {children}

    </AppContext.Provider>

  );

}

// =========================
// CUSTOM HOOK
// =========================
export function useAppContext() {

  return useContext(
    AppContext
  );

}