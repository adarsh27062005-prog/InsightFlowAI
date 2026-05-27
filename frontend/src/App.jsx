import {
  useState,
  useMemo,
  useRef,
} from "react";

import {
  Routes,
  Route,
} from "react-router-dom";

import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";

import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import AIInsights from "./pages/AIInsights";

import EnrollmentDashboard from "./pages/EnrollmentDashboard";
import RejectionDashboard from "./pages/RejectionDashboard";
import SLADashboard from "./pages/SLADashboard";
import TurnaroundDashboard from "./pages/TurnaroundDashboard";
import ProviderDashboard from "./pages/ProviderDashboard";
import WorkloadDashboard from "./pages/WorkloadDashboard";
import WorkflowQueue from "./pages/WorkflowQueue";

import UploadDataset from "./components/UploadDataset";
import DataPreprocessingPanel from "./components/DataPreprocessingPanel";
import NotFound from "./components/NotFound";

import { generateKPIs } from "./utils/generateKPIs";
import { detectKPIs } from "./utils/detectKPIs";
import { autoInsights } from "./utils/autoInsights";

function App() {

  // =========================================
  // MAIN DATASET STATE
  // =========================================
  const [data, setData] =
    useState([]);

  // =========================================
  // SEMANTIC ENGINE STATE
  // =========================================
  const [schema, setSchema] =
    useState([]);

  const [semanticModel, setSemanticModel] =
    useState([]);

  const [processingSummary, setProcessingSummary] =
    useState([]);

  const [sourceType, setSourceType] =
    useState("Unknown");

  // =========================================
  // GLOBAL FILE INPUT REF
  // =========================================
  const uploadRef =
    useRef(null);

  // =========================================
  // AUTO KPI ENGINE
  // =========================================
  const autoKPIs =
    useMemo(() => {
      return generateKPIs(data);
    }, [data]);

  // =========================================
  // DETECTED KPI ENGINE
  // =========================================
  const detectedKPIs =
    useMemo(() => {
      return detectKPIs(data);
    }, [data]);

  // =========================================
  // AI INSIGHTS ENGINE
  // =========================================
  const insights =
    useMemo(() => {

      const generated =
        autoInsights(data);

      // =========================================
      // AUTO GENERATED INSIGHTS
      // =========================================
      if (
        generated &&
        generated.length > 0
      ) {

        return generated;

      }

      // =========================================
      // EMPTY STATE
      // =========================================
      if (
        data.length === 0
      ) {

        return [

          "Upload healthcare datasets for AI analysis.",

          "Generate semantic synthetic datasets from DDL schemas.",

          "AI operational analytics activates automatically after preprocessing.",

          "Enterprise conversational intelligence engine is standing by.",

        ];

      }

      // =========================================
      // SAFE FALLBACK INSIGHTS
      // =========================================
      const totalRecords =
        data.length;

      const avgAge = (
        data.reduce(
          (
            sum,
            row
          ) => {

            return (

              sum +

              Number(

                row.Age ||
                row.age ||
                row.patient_age ||
                0

              )

            );

          },
          0
        ) / totalRecords
      ).toFixed(1);

      return [

        `Total Records Processed: ${totalRecords}`,

        `Average Patient Age: ${avgAge}`,

        "AI Healthcare Monitoring Active",

        "Enterprise semantic intelligence operational",

      ];

    }, [data]);

  return (

    <div className="relative flex min-h-screen bg-[#0B1120] text-white overflow-hidden">

      {/* ========================================= */}
      {/* GLOBAL BACKGROUND EFFECTS */}
      {/* ========================================= */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-cyan-500/5 blur-3xl rounded-full" />

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-3xl rounded-full" />

      {/* ========================================= */}
      {/* SIDEBAR */}
      {/* ========================================= */}
      <Sidebar />

      {/* ========================================= */}
      {/* MAIN CONTENT */}
      {/* ========================================= */}
      <main className="relative z-10 flex-1 p-10 overflow-auto">

        {/* ========================================= */}
        {/* HEADER */}
        {/* ========================================= */}
        <Header
          onUploadClick={() =>
            uploadRef.current?.click()
          }
        />

        {/* ========================================= */}
        {/* GLOBAL DATASET UPLOAD */}
        {/* ========================================= */}
        <div className="hidden">

          <UploadDataset
            data={data}
            setData={setData}
            insights={insights}
            uploadRef={uploadRef}
          />

        </div>

        {/* ========================================= */}
        {/* DATA PREPROCESSING */}
        {/* ========================================= */}
        {data.length > 0 && (

          <DataPreprocessingPanel
            data={data}
            setData={setData}
          />

        )}

        {/* ========================================= */}
        {/* ROUTES */}
        {/* ========================================= */}
        <Routes>

          {/* DASHBOARD */}
          <Route
            path="/"
            element={
              <Dashboard
                data={data}
                insights={insights}
                autoKPIs={autoKPIs}
                detectedKPIs={detectedKPIs}
                uploadRef={uploadRef}
              />
            }
          />

          {/* ANALYTICS */}
          <Route
            path="/analytics"
            element={
              <Analytics
                data={data}
                setData={setData}
                schema={schema}
                setSchema={setSchema}
                semanticModel={semanticModel}
                setSemanticModel={setSemanticModel}
                processingSummary={processingSummary}
                setProcessingSummary={setProcessingSummary}
                sourceType={sourceType}
                setSourceType={setSourceType}
              />
            }
          />

          {/* REPORTS */}
          <Route
            path="/reports"
            element={
              <Reports
                data={data}
                insights={insights}
              />
            }
          />

          {/* AI INSIGHTS */}
          <Route
            path="/ai-insights"
            element={
              <AIInsights
                data={data}
                insights={insights}
                schema={schema}
              />
            }
          />

          {/* ENROLLMENT */}
          <Route
            path="/enrollment"
            element={
              <EnrollmentDashboard
                data={data}
                setData={setData}
                insights={insights}
                uploadRef={uploadRef}
              />
            }
          />

          {/* REJECTIONS */}
          <Route
            path="/rejections"
            element={
              <RejectionDashboard
                data={data}
              />
            }
          />

          {/* SLA */}
          <Route
            path="/sla"
            element={
              <SLADashboard
                data={data}
              />
            }
          />

          {/* TURNAROUND */}
          <Route
            path="/turnaround"
            element={
              <TurnaroundDashboard
                data={data}
              />
            }
          />

          {/* PROVIDERS */}
          <Route
            path="/providers"
            element={
              <ProviderDashboard
                data={data}
              />
            }
          />

          {/* WORKLOAD */}
          <Route
            path="/workload"
            element={
              <WorkloadDashboard
                data={data}
              />
            }
          />

          {/* WORKFLOW */}
          <Route
            path="/workflow"
            element={
              <WorkflowQueue
                data={data}
              />
            }
          />

          {/* 404 */}
          <Route
            path="*"
            element={<NotFound />}
          />

        </Routes>

        {/* ========================================= */}
        {/* FOOTER */}
        {/* ========================================= */}
        <footer className="mt-14 text-center text-gray-500 text-sm pb-10">

          InsightFlow AI • Enterprise Healthcare Intelligence Platform

        </footer>

      </main>

    </div>

  );

}

export default App;