import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../Navbar";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function PatientDetail() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/patients/${id}`);
        const data = await res.json();
        setPatient(data);
      } catch (err) {
        console.error(err);
        alert("โหลดข้อมูลผู้ป่วยล้มเหลว ❌");
      }
    };
    fetchPatient();
  }, [id]);

  // ฟังก์ชันช่วย
  const display = (val) => {
    if (val === null || val === undefined) return "-";
    if (typeof val === "string" && val.trim() === "") return "-";
    if (Array.isArray(val) && val.length === 0) return "-";
    return val;
  };

  // สำหรับ array ของ object เช่น treatments
  const displayTreatments = (arr) => {
    if (!Array.isArray(arr) || arr.length === 0) return "-";
    const nonEmpty = arr.filter((t) => t.name || t.amount || t.time);
    if (nonEmpty.length === 0) return "-";
    return nonEmpty
      .map(
        (t) =>
          `ชื่อยา ${display(t.name)} - จำนวน ${display(
            t.amount
          )} - วิธีการรับประทาน ${display(t.time)}`
      )
      .join("\n");
  };

  // สำหรับ array ของ string
  const displayArray = (arr) => {
    if (!Array.isArray(arr) || arr.length === 0) return "-";
    const filtered = arr.filter((v) => v && v.trim() !== "");
    if (filtered.length === 0) return "-";
    return filtered.join(", ");
  };

  if (!patient)
    return <div style={{ padding: "20px" }}>กำลังโหลดข้อมูล...</div>;

  const formatDate = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // เดือนเริ่มจาก 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // ฟังก์ชันดาวน์โหลด PDF
  const downloadPdf = async () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const pages = document.querySelectorAll(".pdf-page");

    const margin = 10;
    const usablePageHeight = pageHeight - margin * 2;

    for (let i = 0; i < pages.length; i++) {
      const canvas = await html2canvas(pages[i], {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        allowTaint: true,
        logging: false,
        ignoreElements: (el) => el.classList?.contains("copy-button"),
      });

      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pageWidth - margin * 2;
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

      if (imgHeight <= usablePageHeight) {
        pdf.addImage(imgData, "JPEG", margin, margin, pdfWidth, imgHeight);
      } else {
        const pageHeightPx = (canvas.height / imgHeight) * usablePageHeight;
        const totalPages = Math.ceil(canvas.height / pageHeightPx);

        for (let j = 0; j < totalPages; j++) {
          const sY = j * pageHeightPx;
          const sliceHeight = Math.min(pageHeightPx, canvas.height - sY);

          const pageCanvas = document.createElement("canvas");
          pageCanvas.width = canvas.width;
          pageCanvas.height = sliceHeight;

          const ctx = pageCanvas.getContext("2d");
          ctx.drawImage(
            canvas,
            0,
            sY,
            canvas.width,
            sliceHeight,
            0,
            0,
            canvas.width,
            sliceHeight
          );

          const pageData = pageCanvas.toDataURL("image/jpeg", 1.0);
          const renderHeight = (sliceHeight / pageHeightPx) * usablePageHeight;

          pdf.addImage(
            pageData,
            "JPEG",
            margin,
            margin,
            pdfWidth,
            renderHeight
          );

          if (j < totalPages - 1) pdf.addPage();
        }
      }

      if (i < pages.length - 1) pdf.addPage();
    }

    pdf.save("Patient-Detail.pdf");
  };

  return (
    <div>
      <Navbar />
      <div
        style={{
          padding: "20px",
          minHeight: "100vh",
          backgroundColor: "#f9fafb",
          marginTop: "60px",
        }}
      >
        <Link
          to="/patients"
          style={{
            color: "#2563eb",
            display: "inline-block",
            marginBottom: "10px",
            fontSize: "18px",
          }}
        >
          ← กลับ
        </Link>
        <h1
          style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}
        >
          {patient.name} - ประวัติผู้ป่วย
        </h1>

        <button
          onClick={downloadPdf}
          style={{
            marginBottom: "20px",
            backgroundColor: "#16a34a",
            color: "#ffffff",
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          ดาวน์โหลด PDF
        </button>

        <div
          className="pdf-page"
          style={{
            backgroundColor: "#ffffff",
            color: "#1f2937",
            borderRadius: "0.5rem",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            overflowWrap: "break-word",
            wordBreak: "break-word",
            whiteSpace: "pre-wrap",
          }}
        >
          <div
            className="logo"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "2rem",
            }}
          >
            <img
              src="/คลินิกพยาบ่ลชุมชนอบอุ่น.jpg"
              style={{ width: "10rem", height: "10rem" }}
            />
            <div>
              <h1 style={{ fontSize: "2rem" }}>
                ชนมณีคลินิกการพยาบาลและการผดุงครรภ์
              </h1>
              <h1 style={{ fontSize: "2rem" }}>
                โทร. 092-4379744 / 063-6788892
              </h1>
            </div>
          </div>
          <Section label="ชื่อ" value={display(patient.name)} />
          <Section label="วันที่" value={formatDate(patient.date)} />
          <Section label="ที่อยู่" value={display(patient.address)} />
          <Section
            label="น้ำหนัก / ส่วนสูง"
            value={`${display(patient.weight)} kg / ${display(
              patient.height
            )} cm`}
          />
          <Section
            label="อุณหภูมิ / BP / P / R"
            value={`${display(patient.temperature)}°C / ${display(
              patient.bp
            )} / ${display(patient.p)} / ${display(patient.r)}`}
          />
          <Section label="อาการสำคัญ" value={display(patient.chiefComplaint)} />
          <Section
            label="ประวัติเจ็บป่วยปัจจุบัน"
            value={display(patient.currentIllness)}
          />
          <Section
            label="ประวัติเจ็บป่วยในอดีต"
            value={display(patient.pastIllness)}
          />
          <Section label="ประวัติการแพ้" value={display(patient.allergies)} />
          <Section
            label="ยาที่ใช้เป็นประจำ"
            value={display(patient.regularMeds)}
          />
          <Section
            label="ข้อมูลการตรวจร่างกายตามปัญหาของผู้ป่วย"
            value={display(patient.physicalExam)}
          />
          <Section
            label="Initial Differential Diagnosis"
            value={`อาการนำทั้งหมด: ${display(
              patient.diffSymptoms
            )}\nโรค: ${display(patient.diffDiseases)}`}
          />
          <Section
            label="Initial Diagnosis"
            value={displayArray(patient.initialDiagnosis)}
          />
          <Section
            label="การรักษาโรคขั้นต้น"
            value={displayTreatments(patient.treatments)}
          />
          <Section
            label="คำแนะนำ"
            value={`การใช้ยา: ${display(
              patient.advice?.medUsage
            )}\nการรับประทานอาหาร: ${display(patient.advice?.diet)}`}
          />
          <Section
            label="การติดตาม"
            value={`สถานะ: ${display(
              patient.followUp?.status
            )}\nวันที่: ${formatDate(patient.followUp?.date)}, เบอร์: ${display(
              patient.followUp?.phone
            )}`}
          />

          {/* ช่องลายเซ็น */}
          <div
            style={{
              marginTop: "40px",
              display: "flex",
              justifyContent: "space-between",
              margin: "10rem 120px 0 120px",
              fontSize: "26px",
            }}
          >
            <div style={{ textAlign: "center" }}>
              ลงชื่อ.................................................ผู้รับบริการ/ญาติ
            </div>

            <div style={{ textAlign: "center" }}>
              ลงชื่อ.................................................
              พยาบาลผู้ให้บริการ
              <br />
              (นางสาวชนมณี โยธา)
              <br />
              พยาบาลเวชปฏิบัติ ฯ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ label, value }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    alert(`คัดลอก: ${label}`);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        borderBottom: "1px solid #d1d5db",
        paddingBottom: "6px",
      }}
    >
      <span style={{ fontWeight: "600", fontSize: "24px", color: "#374151" }}>
        {label}
      </span>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          fontSize: "20px",
        }}
      >
        <span style={{ color: "#1f2937", whiteSpace: "pre-wrap" }}>
          {value}
        </span>
        <button
          onClick={handleCopy}
          className="copy-button"
          style={{
            backgroundColor: "#3b82f6",
            color: "#ffffff",
            fontSize: "16px",
            padding: "4px 8px",
            marginLeft: "8px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Copy
        </button>
      </div>
    </div>
  );
}
