import {
  Users,
  Hospital,
  Activity,
  HeartPulse,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";

import UploadDataset from "../components/UploadDataset";

function EnrollmentDashboard({
  data,
  setData,
  insights,
  uploadRef,
}) {

  // =========================
  // SAFE VALUE FETCHER
  // =========================
  const getValue = (row, keys) => {

    for (const key of keys) {

      if (
        row[key] !== undefined &&
        row[key] !== null &&
        row[key] !== ""
      ) {

        return row[key];

      }
    }

    return null;

  };

  // =========================
  // TOTAL ENROLLMENTS
  // =========================
  const totalEnrollments =
    data.length;

  // =========================
  // PROVIDERS
  // =========================
  const providers =
    new Set();

  data.forEach((row) => {

    const provider =
      getValue(row, [
        "provider",
        "Provider",
        "provider_name",
      ]);

    if (provider) {

      providers.add(provider);

    }

  });

  // =========================
  // PATIENTS
  // =========================
  const patients =
    new Set();

  data.forEach((row) => {

    const patient =
      getValue(row, [
        "patient_id",
        "Patient_ID",
        "patient",
        "Patient",
      ]);

    if (patient) {

      patients.add(patient);

    }

  });

  // =========================
  // TOP DIAGNOSIS
  // =========================
  const diagnosisCount = {};

  data.forEach((row) => {

    const diagnosis =
      getValue(row, [
        "diagnosis",
        "Diagnosis",
        "disease",
        "Disease",
      ]) || "Unknown";

    diagnosisCount[diagnosis] =
      (diagnosisCount[diagnosis] || 0) + 1;

  });

  const topDiagnosis =
    Object.keys(diagnosisCount)
      .sort(
        (a, b) =>
          diagnosisCount[b] -
          diagnosisCount[a]
      )[0] || "N/A";

  // =========================
  // KPI CARDS
  // =========================
  const kpis = [

    {
      title: "Total Enrollments",
      value: totalEnrollments,
      icon: Users,
      color: "text-cyan-400",
    },

    {
      title: "Active Providers",
      value: providers.size,
      icon: Hospital,
      color: "text-green-400",
    },

    {
      title: "Active Patients",
      value: patients.size,
      icon: Activity,
      color: "text-purple-400",
    },

    {
      title: "Top Diagnosis",
      value: topDiagnosis,
      icon: HeartPulse,
      color: "text-red-400",
    },

  ];

  return (

    <div className="space-y-8">

      {/* ================================= */}
      {/* HERO */}
      {/* ================================= */}
      <div className="relative overflow-hidden bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-500/20 rounded-3xl p-10">

        <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full" />

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">

          <div>

            <div className="flex items-center gap-3 mb-4">

              <ShieldCheck
                size={22}
                className="text-green-400"
              />

              <span className="text-green-400 font-semibold">

                Enterprise Enrollment Intelligence Active

              </span>

            </div>

            <h1 className="text-5xl font-black mb-5">

              Enrollment Command Center

            </h1>

            <p className="text-gray-300 text-lg leading-8 max-w-4xl">

              AI-powered healthcare enrollment monitoring system
              for patient onboarding, provider intelligence,
              diagnosis analytics, operational visibility,
              and enterprise healthcare reporting.

            </p>

          </div>

          {/* RIGHT STATUS */}
          <div className="bg-[#111827] border border-gray-700 rounded-3xl p-8 min-w-[320px]">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

              <span className="text-green-400 font-semibold">

                Monitoring Operational

              </span>

            </div>

            <div className="space-y-4 text-sm">

              <div className="flex justify-between">

                <span className="text-gray-400">
                  Enrollment Records
                </span>

                <span className="font-bold">
                  {totalEnrollments}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-400">
                  Active Providers
                </span>

                <span className="font-bold text-cyan-400">
                  {providers.size}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-400">
                  AI Status
                </span>

                <span className="font-bold text-green-400">
                  Online
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-400">
                  Processing Health
                </span>

                <span className="font-bold text-purple-400">
                  Stable
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ================================= */}
      {/* KPI GRID */}
      {/* ================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {kpis.map((item, index) => {

          const Icon =
            item.icon;

          return (

            <div
              key={index}
              className="bg-[#111827] border border-gray-800 hover:border-cyan-500 transition-all duration-300 rounded-3xl p-8"
            >

              <div className="flex items-center justify-between mb-6">

                <div className="bg-[#1F2937] p-4 rounded-2xl">

                  <Icon
                    size={26}
                    className={item.color}
                  />

                </div>

                <TrendingUp
                  size={18}
                  className="text-green-400"
                />

              </div>

              <p className="text-gray-400 text-sm mb-3">

                {item.title}

              </p>

              <h2 className={`font-black break-words ${typeof item.value === "string"
                  ? "text-2xl"
                  : "text-5xl"
                }`}>

                {item.value}

              </h2>

            </div>

          );

        })}

      </div>

      {/* ================================= */}
      {/* ENROLLMENT SUMMARY */}
      {/* ================================= */}
      <div className="bg-[#111827] border border-gray-800 rounded-3xl p-8">

        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 mb-8">

          <div>

            <h2 className="text-3xl font-black mb-2">

              Enrollment Intelligence Summary

            </h2>

            <p className="text-gray-400">

              AI-generated operational enrollment overview

            </p>

          </div>

          <div className="flex items-center gap-3">

            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

            <span className="text-green-400 font-semibold">

              Live Healthcare Monitoring

            </span>

          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          <div className="bg-[#1F2937] border border-gray-700 rounded-2xl p-6">

            <p className="text-gray-400 text-sm mb-3">

              Most Common Diagnosis

            </p>

            <h3 className="text-2xl font-bold text-cyan-400">

              {topDiagnosis}

            </h3>

          </div>

          <div className="bg-[#1F2937] border border-gray-700 rounded-2xl p-6">

            <p className="text-gray-400 text-sm mb-3">

              Patient Coverage

            </p>

            <h3 className="text-2xl font-bold text-green-400">

              {patients.size} Active

            </h3>

          </div>

          <div className="bg-[#1F2937] border border-gray-700 rounded-2xl p-6">

            <p className="text-gray-400 text-sm mb-3">

              Provider Network

            </p>

            <h3 className="text-2xl font-bold text-purple-400">

              {providers.size} Connected

            </h3>

          </div>

        </div>

      </div>

      {/* ================================= */}
      {/* DATASET PANEL */}
      {/* ================================= */}
      <UploadDataset
        data={data}
        setData={setData}
        insights={insights}
        uploadRef={uploadRef}
      />

    </div>

  );

}

export default EnrollmentDashboard;