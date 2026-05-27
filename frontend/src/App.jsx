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

import { generateKPIs } from "./utils/generateKPIs";
import { detectKPIs } from "./utils/detectKPIs";
import { autoInsights } from "./utils/autoInsights";

function App() {

  // =========================
  // MAIN DATASET
  // =========================
  const [data, setData] =
  useState([]);

const [schema, setSchema] =
  useState([]);

const [semanticModel, setSemanticModel] =
  useState([]);

const [processingSummary, setProcessingSummary] =
  useState([]);

const [sourceType, setSourceType] =
  useState("Unknown");

  // =========================
  // GLOBAL UPLOAD REF
  // =========================
  const uploadRef =
    useRef(null);

  // =========================
  // KPI ENGINE
  // =========================
  const autoKPIs =
    generateKPIs(data);

  const detectedKPIs =
    detectKPIs(data);

  // =========================
  // AI INSIGHTS
  // =========================
  const insights = useMemo(() => {

    const generated =
      autoInsights(data);

    if (
      generated.length > 0
    ) {

      return generated;
    }

    if (data.length === 0) {

      return [

        "Upload healthcare datasets.",
        "Generate synthetic data from DDL schemas.",
        "AI analytics auto-starts after preprocessing.",

      ];
    }

    const totalPatients =
      data.length;

    const avgAge = (
      data.reduce(
        (sum, row) => {

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
      ) / totalPatients
    ).toFixed(1);

    return [

      `Total Records Processed: ${totalPatients}`,

      `Average Patient Age: ${avgAge}`,

      "AI Healthcare Monitoring Active",

    ];

  }, [data]);

  return (

    <div className="flex min-h-screen bg-[#0B1120] text-white">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <main className="flex-1 p-10 overflow-auto">

        {/* HEADER */}
        <Header
          onUploadClick={() =>
            uploadRef.current?.click()
          }
        />

        {/* GLOBAL DATASET UPLOAD */}
<div className="hidden">

  <UploadDataset
    data={data}
    setData={setData}
    insights={insights}
    uploadRef={uploadRef}
  />

</div>

{/* PREPROCESS PANEL */}
<DataPreprocessingPanel
  data={data}
  setData={setData}
/>
        {/* ROUTES */}
        <Routes>

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

          <Route
            path="/reports"
            element={
              <Reports
                data={data}
                insights={insights}
              />
            }
          />

          <Route
            path="/ai-insights"
            element={
              <AIInsights
                data={data}
                insights={insights}
              />
            }
          />

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

          <Route
            path="/rejections"
            element={
              <RejectionDashboard
                data={data}
              />
            }
          />

          <Route
            path="/sla"
            element={
              <SLADashboard
                data={data}
              />
            }
          />

          <Route
            path="/turnaround"
            element={
              <TurnaroundDashboard
                data={data}
              />
            }
          />

          <Route
            path="/providers"
            element={
              <ProviderDashboard
                data={data}
              />
            }
          />

          <Route
            path="/workload"
            element={
              <WorkloadDashboard
                data={data}
              />
            }
          />

          <Route
            path="/workflow"
            element={
              <WorkflowQueue
                data={data}
              />
            }
          />

        </Routes>

        {/* FOOTER */}
        <footer className="mt-10 text-center text-gray-500 text-sm">

          InsightFlow AI • Enterprise Healthcare Analytics Platform

        </footer>

      </main>

    </div>
  );
}

export default App;