import UploadDataset from "../components/UploadDataset";

function EnrollmentDashboard({
  data,
  setData,
  insights,
  uploadRef,
}) {

  // =========================
  // SAFE HELPERS
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
  // ACTIVE PROVIDERS
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
  // ACTIVE PATIENTS
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

  return (

    <div className="space-y-8">

      {/* HEADER */}
      <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800">

        <h1 className="text-3xl font-bold mb-2">

          Enrollment Dashboard

        </h1>

        <p className="text-gray-400">

          Enterprise patient enrollment intelligence

        </p>

      </div>

      {/* KPI SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* TOTAL ENROLLMENTS */}
        <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800">

          <h3 className="text-cyan-400 text-sm mb-3">

            Total Enrollments

          </h3>

          <p className="text-4xl font-bold">

            {totalEnrollments}

          </p>

        </div>

        {/* ACTIVE PROVIDERS */}
        <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800">

          <h3 className="text-cyan-400 text-sm mb-3">

            Active Providers

          </h3>

          <p className="text-4xl font-bold">

            {providers.size}

          </p>

        </div>

        {/* ACTIVE PATIENTS */}
        <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800">

          <h3 className="text-cyan-400 text-sm mb-3">

            Active Patients

          </h3>

          <p className="text-4xl font-bold">

            {patients.size}

          </p>

        </div>

        {/* TOP DIAGNOSIS */}
        <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800">

          <h3 className="text-cyan-400 text-sm mb-3">

            Top Diagnosis

          </h3>

          <p className="text-2xl font-bold break-words">

            {topDiagnosis}

          </p>

        </div>

      </div>

      {/* DATASET PANEL */}
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