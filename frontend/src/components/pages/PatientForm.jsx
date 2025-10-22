import React, { useState, useRef, useEffect } from "react";
import Navbar from "../Navbar";
import axios from "axios";

export default function PatientForm() {
  const initialFormState = {
    name: "",
    date: "",
    address: "",
    weight: "",
    height: "",
    temperature: "",
    bp: "",
    p: "",
    r: "",
    chiefComplaint: "",
    currentIllness: "",
    pastIllness: "",
    allergies: "",
    regularMeds: "",
    physicalExam: "",
    diffSymptoms: "",
    diffDiseases: "",
    initialDiagnosis: [""],
    treatments: [{ name: "", amount: "", time: "" }],
    advice: { medUsage: "", diet: "" },
    followUp: { status: "ไม่นัด", date: "", phone: "" },
  };

  const [form, setForm] = useState(initialFormState);

  const handleClear = () => {
    if (window.confirm("คุณแน่ใจหรือไม่ว่าต้องการล้างข้อมูลทั้งหมด?")) {
      setForm(initialFormState);
    }
  };

  function TreatmentSelect({ value, onChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const dropdownRef = useRef(null);

    const drugOptions = [
      {
        label: "กลุ่มยาอาการปวดท้อง",
        options: [
          {
            value:
              "Aluminium hydroxide + magnesium hydroxide (220 mg/5 mL + 120 mg/5 mL) oral suspension",
            label:
              "Aluminium hydroxide + magnesium hydroxide (220 mg/5 mL + 120 mg/5 mL) oral suspension",
          },
          {
            value: "Dimenhydrinate 50 mg tablet",
            label: "Dimenhydrinate 50 mg tablet",
          },
          { value: "Glycerine suppository", label: "Glycerine suppository" },
          {
            value: "Magnesium hydroxide 300 mg tablet",
            label: "Magnesium hydroxide 300 mg tablet",
          },
          {
            value: "Mebendazole 100 mg tablet",
            label: "Mebendazole 100 mg tablet",
          },
          {
            value: "Mebendazole 100 mg/5 mL oral suspension",
            label: "Mebendazole 100 mg/5 mL oral suspension",
          },
          {
            value: "Milk of magnesia suspension",
            label: "Milk of magnesia suspension",
          },
          { value: "ORS", label: "ORS" },
          {
            value: "Paracetamol 120 mg/5 ml",
            label: "Paracetamol 120 mg/5 ml",
          },
          {
            value: "Paracetamol 240-250 mg/5 ml",
            label: "Paracetamol 240-250 mg/5 ml",
          },
          { value: "Paracetamol 500 mg", label: "Paracetamol 500 mg" },
          {
            value: "Simethicone 80 mg chewable tablet",
            label: "Simethicone 80 mg chewable tablet",
          },
          {
            value: "Simeticone 100 mg chewable tablet",
            label: "Simeticone 100 mg chewable tablet",
          },
          {
            value: "Sodium bicarbonate 300 mg tablet",
            label: "Sodium bicarbonate 300 mg tablet",
          },
          { value: "Sodium chloride enema", label: "Sodium chloride enema" },
          {
            value: "mixt. Carminative oral solution",
            label: "mixt. Carminative oral solution",
          },
          { value: "ทิงเจอร์มหาหิงคุ์", label: "ทิงเจอร์มหาหิงคุ์" },
          {
            value: "ยาทาแก้ท้องอืด ท้องเฟ้อ ทิงเจอร์ มหาหิงคุ์",
            label: "ยาทาแก้ท้องอืด ท้องเฟ้อ ทิงเจอร์ มหาหิงคุ์",
          },
          { value: "ยาระบายมะขามแขก", label: "ยาระบายมะขามแขก" },
          {
            value: "Albendazole 200 mg tablet",
            label: "Albendazole 200 mg tablet",
          },
          {
            value: "Albendazole 200 mg/5 mL oral suspension",
            label: "Albendazole 200 mg/5 mL oral suspension",
          },
          {
            value: "Anticonstipation (Bisacodyl)",
            label: "Anticonstipation (Bisacodyl)",
          },
          { value: "Aspirin 300 mg", label: "Aspirin 300 mg" },
          { value: "Bisacodyl suppository", label: "Bisacodyl suppository" },
          { value: "Bisacodyl tablet", label: "Bisacodyl tablet" },
          {
            value:
              "Co-trimoxazole (sulfamethoxazole+trimethoprim) 200+40 mg/5 ml oral suspension",
            label:
              "Co-trimoxazole (sulfamethoxazole+trimethoprim) 200+40 mg/5 ml oral suspension",
          },
          { value: "Domperidone 10 mg", label: "Domperidone 10 mg" },
          {
            value: "Domperidone 5mg/5ml suspension",
            label: "Domperidone 5mg/5ml suspension",
          },
          { value: "Doxycycline 100 mg", label: "Doxycycline 100 mg" },
          {
            value: "Hyoscine-N-butylbromide 10 mg",
            label: "Hyoscine-N-butylbromide 10 mg",
          },
          {
            value: "Hyoscine-N-butylbromide 5 mg/5 ml syrup",
            label: "Hyoscine-N-butylbromide 5 mg/5 ml syrup",
          },
          {
            value: "Ibuprofen 100 mg/5 ml. suspension",
            label: "Ibuprofen 100 mg/5 ml. suspension",
          },
          { value: "Ibuprofen 200 mg", label: "Ibuprofen 200 mg" },
          { value: "Ibuprofen 400 mg", label: "Ibuprofen 400 mg" },
          { value: "Norfloxacin 400 mg", label: "Norfloxacin 400 mg" },
          { value: "Omeprazole 20 mg", label: "Omeprazole 20 mg" },
          { value: "Ranitidine 150 mg", label: "Ranitidine 150 mg" },
          { value: "ขมิ้นชัน", label: "ขมิ้นชัน" },
        ],
      },
      {
        label: "หู ตา คอ จมูก",
        options: [
          { value: "ยาล้างตา (Eye Lotion)", label: "ยาล้างตา (Eye Lotion)" },
          {
            value: "Amoxicillin 125 mg/5 ml.",
            label: "Amoxicillin 125 mg/5 ml.",
          },
          { value: "Amoxicillin 250 mg", label: "Amoxicillin 250 mg" },
          {
            value: "Amoxicillin 250 mg/5 ml.",
            label: "Amoxicillin 250 mg/5 ml.",
          },
          { value: "Amoxicillin 500 mg", label: "Amoxicillin 500 mg" },
          {
            value:
              "Antazoline hydrochloride + tetryzoline hydrochloride (50 mg/100 mL + 40 mg/100 mL) eye drops, solution",
            label:
              "Antazoline hydrochloride + tetryzoline hydrochloride (50 mg/100 mL + 40 mg/100 mL) eye drops, solution",
          },
          { value: "Aspirin 300 mg", label: "Aspirin 300 mg" },
          {
            value:
              "Co-trimoxazole (sulfamethoxazole+trimethoprim) 200+40 mg/5 ml oral suspension",
            label:
              "Co-trimoxazole (sulfamethoxazole+trimethoprim) 200+40 mg/5 ml oral suspension",
          },
          {
            value: "Dicloxacillin 125 mg/5 mL powder for syrup",
            label: "Dicloxacillin 125 mg/5 mL powder for syrup",
          },
          { value: "Dicloxacillin 250 mg", label: "Dicloxacillin 250 mg" },
          { value: "Doxycycline 100 mg", label: "Doxycycline 100 mg" },
          {
            value: "Erythromycin 125 mg/5 mL",
            label: "Erythromycin 125 mg/5 mL",
          },
          { value: "Erythromycin 250 mg", label: "Erythromycin 250 mg" },
          {
            value: "Ibuprofen 100 mg/5 ml. suspension",
            label: "Ibuprofen 100 mg/5 ml. suspension",
          },
          { value: "Ibuprofen 200 mg", label: "Ibuprofen 200 mg" },
          { value: "Ibuprofen 400 mg", label: "Ibuprofen 400 mg" },
          {
            value: "Phenoxymethylpenicillin 125 mg",
            label: "Phenoxymethylpenicillin 125 mg",
          },
          {
            value: "Phenoxymethylpenicillin 250 mg",
            label: "Phenoxymethylpenicillin 250 mg",
          },
          {
            value: "Phenoxymethylpenicillin potassium 125 mg/5 mL",
            label: "Phenoxymethylpenicillin potassium 125 mg/5 mL",
          },
          { value: "Polymyxin eyedrop", label: "Polymyxin eyedrop" },
          {
            value: "Tetracycline eye ointment",
            label: "Tetracycline eye ointment",
          },
          {
            value: "น้ำตาเทียม (Artificial Tears)",
            label: "น้ำตาเทียม (Artificial Tears)",
          },
        ],
      },
      {
        label: "ไข้ ไอ เจ็บคอ",
        options: [
          {
            value: "Amoxicillin 125 mg/5 ml.",
            label: "Amoxicillin 125 mg/5 ml.",
          },
          { value: "Amoxicillin 250 mg", label: "Amoxicillin 250 mg" },
          {
            value: "Amoxicillin 250 mg/5 ml.",
            label: "Amoxicillin 250 mg/5 ml.",
          },
          { value: "Amoxicillin 500 mg", label: "Amoxicillin 500 mg" },
          { value: "Cetirizine 10 mg", label: "Cetirizine 10 mg" },
          {
            value: "Cetirizine 5 mg/5 ml syrup",
            label: "Cetirizine 5 mg/5 ml syrup",
          },
          { value: "Dextromethophan 15 mg", label: "Dextromethophan 15 mg" },
          {
            value: "Dextromethorphan 5mg/5ml",
            label: "Dextromethorphan 5mg/5ml",
          },
          {
            value: "Erythromycin 125 mg/5 mL",
            label: "Erythromycin 125 mg/5 mL",
          },
          { value: "Erythromycin 250 mg", label: "Erythromycin 250 mg" },
          { value: "Guaifenesin 100 mg", label: "Guaifenesin 100 mg" },
          {
            value: "Guaifenesin 100 mg/5 ml.",
            label: "Guaifenesin 100 mg/5 ml.",
          },
          {
            value: "Phenoxymethylpenicillin 125 mg",
            label: "Phenoxymethylpenicillin 125 mg",
          },
          {
            value: "Phenoxymethylpenicillin 250 mg",
            label: "Phenoxymethylpenicillin 250 mg",
          },
          {
            value: "Phenoxymethylpenicillin potassium 125 mg/5 mL",
            label: "Phenoxymethylpenicillin potassium 125 mg/5 mL",
          },
          { value: "Roxithromycin 150 mg", label: "Roxithromycin 150 mg" },
          { value: "Scill Ammon mixt", label: "Scill Ammon mixt" },
          { value: "hydroxyzine 10 mg", label: "hydroxyzine 10 mg" },
          {
            value: "hydroxyzine 10 mg/5 ml. syrup",
            label: "hydroxyzine 10 mg/5 ml. syrup",
          },
          { value: "hydroxyzine 25 mg", label: "hydroxyzine 25 mg" },
          { value: "ฟ้าทะลายโจร", label: "ฟ้าทะลายโจร" },
          { value: "ยาอมมะแว้ง", label: "ยาอมมะแว้ง" },
          { value: "ยาแก้ไอมะขามป้อม", label: "ยาแก้ไอมะขามป้อม" },
          {
            value: "Chlorpheniramine 2 mg/5 ml syrup",
            label: "Chlorpheniramine 2 mg/5 ml syrup",
          },
          { value: "Chlorpheniramine 4 mg", label: "Chlorpheniramine 4 mg" },
          {
            value: "Paracetamol 100 mg/ ml (pediatric drops)",
            label: "Paracetamol 100 mg/ ml (pediatric drops)",
          },
          {
            value: "Paracetamol 120 mg/5 ml",
            label: "Paracetamol 120 mg/5 ml",
          },
          {
            value: "Paracetamol 160 mg/5 ml",
            label: "Paracetamol 160 mg/5 ml",
          },
          {
            value: "Paracetamol 240-250 mg/5 ml",
            label: "Paracetamol 240-250 mg/5 ml",
          },
          {
            value: "Paracetamol 250 mg/5 ml",
            label: "Paracetamol 250 mg/5 ml",
          },
          { value: "Paracetamol 325 mg", label: "Paracetamol 325 mg" },
          { value: "Paracetamol 500 mg", label: "Paracetamol 500 mg" },
          { value: "ยากวาดคอ", label: "ยากวาดคอ" },
          {
            value: "ยาน้ำแก้ไอ ขับเสมหะสำหรับเด็ก",
            label: "ยาน้ำแก้ไอ ขับเสมหะสำหรับเด็ก",
          },
          {
            value: "ยารักษาลิ้นเป็นฝ้า เยนเชี่ยนไวโอเลต",
            label: "ยารักษาลิ้นเป็นฝ้า เยนเชี่ยนไวโอเลต",
          },
          { value: "ยาอมบรรเทาอาการระคายคอ", label: "ยาอมบรรเทาอาการระคายคอ" },
          { value: "ยาอมบรรเทาอาการเจ็บคอ", label: "ยาอมบรรเทาอาการเจ็บคอ" },
          { value: "ยาแก้ไอน้ำดำ", label: "ยาแก้ไอน้ำดำ" },
        ],
      },
      {
        label: "ปวดศรีษะ วิงเวียน",
        options: [
          { value: "Aspirin 300 mg", label: "Aspirin 300 mg" },
          { value: "Dimenhydrinate 50 mg", label: "Dimenhydrinate 50 mg" },
          {
            value: "Ibuprofen 100 mg/5 ml. suspension",
            label: "Ibuprofen 100 mg/5 ml. suspension",
          },
          { value: "Ibuprofen 200 mg", label: "Ibuprofen 200 mg" },
          { value: "Ibuprofen 400 mg", label: "Ibuprofen 400 mg" },
          {
            value: "Chlorpheniramine 2 mg/5 ml syrup",
            label: "Chlorpheniramine 2 mg/5 ml syrup",
          },
          {
            value: "Chlorpheniramine maleate 4 mg",
            label: "Chlorpheniramine maleate 4 mg",
          },
          {
            value: "Chlorpheniramine maleate 2 mg",
            label: "Chlorpheniramine maleate 2 mg",
          },
          { value: "Dimenhydrinate 50 mg.", label: "Dimenhydrinate 50 mg." },
          {
            value: "Paracetamol 120 mg/5 ml",
            label: "Paracetamol 120 mg/5 ml",
          },
          {
            value: "Paracetamol 160 mg/5 ml",
            label: "Paracetamol 160 mg/5 ml",
          },
          {
            value: "Paracetamol 240-250 mg/5 ml",
            label: "Paracetamol 240-250 mg/5 ml",
          },
          { value: "Paracetamol 500 mg", label: "Paracetamol 500 mg" },
        ],
      },
      {
        label: "กระดูก ข้อ",
        options: [
          { value: "Aspirin 300 mg", label: "Aspirin 300 mg" },
          {
            value: "Ibuprofen 100 mg/5 ml. suspension",
            label: "Ibuprofen 100 mg/5 ml. suspension",
          },
          { value: "Ibuprofen 200 mg", label: "Ibuprofen 200 mg" },
          { value: "Ibuprofen 400 mg", label: "Ibuprofen 400 mg" },
          {
            value: "Methyl Salicylate 25 g/100 g ointment",
            label: "Methyl Salicylate 25 g/100 g ointment",
          },
          { value: "Omeprazole 20 mg", label: "Omeprazole 20 mg" },
          {
            value: "Salicylic acid 10 g/100 g cream",
            label: "Salicylic acid 10 g/100 g cream",
          },
          { value: "ครีมไพลจีชาล", label: "ครีมไพลจีชาล" },
          {
            value: "Paracetamol 120 mg/5 ml",
            label: "Paracetamol 120 mg/5 ml",
          },
          { value: "Paracetamol 500 mg", label: "Paracetamol 500 mg" },
          { value: "พลาสเตอร์บรรเทาปวด", label: "พลาสเตอร์บรรเทาปวด" },
        ],
      },
      {
        label: "ปวดเจ็บในช่องปาก",
        options: [
          {
            value: "Amoxicillin 125 mg/5 ml.",
            label: "Amoxicillin 125 mg/5 ml.",
          },
          { value: "Amoxicillin 250 mg", label: "Amoxicillin 250 mg" },
          {
            value: "Amoxicillin 250 mg/5 ml.",
            label: "Amoxicillin 250 mg/5 ml.",
          },
          { value: "Amoxicillin 500 mg", label: "Amoxicillin 500 mg" },
          { value: "Aspirin 300 mg", label: "Aspirin 300 mg" },
          {
            value: "Erythromycin 125 mg/5 mL",
            label: "Erythromycin 125 mg/5 mL",
          },
          { value: "Erythromycin 250 mg", label: "Erythromycin 250 mg" },
          {
            value: "Ibuprofen 100 mg/5 ml. suspension",
            label: "Ibuprofen 100 mg/5 ml. suspension",
          },
          { value: "Ibuprofen 200 mg", label: "Ibuprofen 200 mg" },
          { value: "Ibuprofen 400 mg", label: "Ibuprofen 400 mg" },
          {
            value: "Phenoxymethylpenicillin 125 mg",
            label: "Phenoxymethylpenicillin 125 mg",
          },
          {
            value: "Phenoxymethylpenicillin 250 mg",
            label: "Phenoxymethylpenicillin 250 mg",
          },
          {
            value: "Phenoxymethylpenicillin potassium 125 mg/5 mL",
            label: "Phenoxymethylpenicillin potassium 125 mg/5 mL",
          },
          { value: "Roxithromycin 150 mg", label: "Roxithromycin 150 mg" },
          {
            value: "Triamcinolone acetonide 100 mg/100 g cream",
            label: "Triamcinolone acetonide 100 mg/100 g cream",
          },
          {
            value: "Paracetamol 120 mg/5 ml",
            label: "Paracetamol 120 mg/5 ml",
          },
          {
            value: "Paracetamol 160 mg/5 ml",
            label: "Paracetamol 160 mg/5 ml",
          },
          {
            value: "Paracetamol 240-250 mg/5 ml",
            label: "Paracetamol 240-250 mg/5 ml",
          },
          {
            value: "Paracetamol 250 mg/5 ml",
            label: "Paracetamol 250 mg/5 ml",
          },
          { value: "Paracetamol 325 mg", label: "Paracetamol 325 mg" },
          { value: "Paracetamol 500 mg", label: "Paracetamol 500 mg" },
        ],
      },
      {
        label: "ซีด โลหิตจาง",
        options: [
          { value: "Folic acid 5 mg tablet", label: "Folic acid 5 mg tablet" },
          {
            value: "Ferrous sulfate 200 mg tablet",
            label: "Ferrous sulfate 200 mg tablet",
          },
          { value: "Multivitamin", label: "Multivitamin" },
          { value: "Vitamin B Complex", label: "Vitamin B Complex" },
          { value: "Vitamin C", label: "Vitamin C" },
          { value: "น้ำมันตับปลาชนิดน้ำ", label: "น้ำมันตับปลาชนิดน้ำ" },
          { value: "น้ำมันตับปลาชนิดแคปซูล", label: "น้ำมันตับปลาชนิดแคปซูล" },
        ],
      },
      {
        label: "ผิวหนังมีผื่นคัน",
        options: [
          { value: "Amoxicillin 500 mg", label: "Amoxicillin 500 mg" },
          { value: "Cetirizine 10 mg", label: "Cetirizine 10 mg" },
          {
            value: "Cetirizine 5 mg/5 ml syrup",
            label: "Cetirizine 5 mg/5 ml syrup",
          },
          { value: "Clotrimazole 1% cream", label: "Clotrimazole 1% cream" },
          {
            value:
              "Co-trimoxazole (sulfamethoxazole+trimethoprim) 200+40 mg/5 ml oral suspension",
            label:
              "Co-trimoxazole (sulfamethoxazole+trimethoprim) 200+40 mg/5 ml oral suspension",
          },
          {
            value: "Dicloxacillin 125 mg/5 mL powder for syrup",
            label: "Dicloxacillin 125 mg/5 mL powder for syrup",
          },
          { value: "Dicloxacillin 250 mg", label: "Dicloxacillin 250 mg" },
          { value: "Doxycycline 100 mg", label: "Doxycycline 100 mg" },
          {
            value: "Erythromycin 125 mg/5 mL",
            label: "Erythromycin 125 mg/5 mL",
          },
          { value: "Erythromycin 250 mg", label: "Erythromycin 250 mg" },
          {
            value: "Miconazole 2 g/100 g oral gel",
            label: "Miconazole 2 g/100 g oral gel",
          },
          {
            value: "Nystatin 25 mg/1 mL oral suspension",
            label: "Nystatin 25 mg/1 mL oral suspension",
          },
          {
            value: "Phenoxymethylpenicillin 125 mg",
            label: "Phenoxymethylpenicillin 125 mg",
          },
          {
            value: "Phenoxymethylpenicillin 250 mg",
            label: "Phenoxymethylpenicillin 250 mg",
          },
          {
            value: "Phenoxymethylpenicillin potassium 125 mg/5 mL",
            label: "Phenoxymethylpenicillin potassium 125 mg/5 mL",
          },
          { value: "Roxithromycin 150 mg", label: "Roxithromycin 150 mg" },
          {
            value: "Salicylic acid 10 g/100 g cream",
            label: "Salicylic acid 10 g/100 g cream",
          },
          { value: "hydroxyzine 10 mg", label: "hydroxyzine 10 mg" },
          {
            value: "hydroxyzine 10 mg/5 ml. syrup",
            label: "hydroxyzine 10 mg/5 ml. syrup",
          },
          { value: "hydroxyzine 25 mg", label: "hydroxyzine 25 mg" },
          { value: "ketoconazole cream", label: "ketoconazole cream" },
          {
            value: "triamcinolone acetonide 0.1% cream",
            label: "triamcinolone acetonide 0.1% cream",
          },
          { value: "ครีมพญายอ", label: "ครีมพญายอ" },
          { value: "ว่านหางจระเข้", label: "ว่านหางจระเข้" },
          { value: "Benzoate 25 % w/v", label: "Benzoate 25 % w/v" },
          {
            value: "Chlorpheniramine 2 mg/5 ml syrup",
            label: "Chlorpheniramine 2 mg/5 ml syrup",
          },
          {
            value: "Chlorpheniramine maleate 4 mg",
            label: "Chlorpheniramine maleate 4 mg",
          },
          {
            value: "Chlorpheniramine maleate 2 mg",
            label: "Chlorpheniramine maleate 2 mg",
          },
          {
            value: "Gentian violet 1 g/100 mL",
            label: "Gentian violet 1 g/100 mL",
          },
          {
            value: "Gentian violet 500 mg/100 mL",
            label: "Gentian violet 500 mg/100 mL",
          },
          {
            value: "Silver sulfadiazine 1 g/100 g cream",
            label: "Silver sulfadiazine 1 g/100 g cream",
          },
          {
            value:
              "calamine + zinc oxide (calamine lotion) 15 g/100 mL + 5 g/100 mL",
            label:
              "calamine + zinc oxide (calamine lotion) 15 g/100 mL + 5 g/100 mL",
          },
          {
            value: "ขี้ผึ้งกำมะถัน Sublimed Sulphur 10 % w/w",
            label: "ขี้ผึ้งกำมะถัน Sublimed Sulphur 10 % w/w",
          },
        ],
      },
    ];

    // ปิด dropdown
    useEffect(() => {
      function handleClickOutside(event) {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
        ) {
          setIsOpen(false);
          setSelectedGroup(null);
          setSearchTerm("");
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelectDrug = (drugValue, drugLabel) => {
      onChange(drugValue);
      setIsOpen(false);
      setSelectedGroup(null);
    };

    const getDisplayValue = () => {
      if (!value) return "เลือกยา...";

      for (const group of drugOptions) {
        const found = group.options.find((opt) => opt.value === value);
        if (found) return found.label;
      }
      return value;
    };

    const displayedOptions = (group) => {
      if (!group) return [];
      if (!selectedGroup || selectedGroup !== group.label) return group.options;
      return group.options.filter((opt) =>
        opt.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
    };

    const filteredGroups = drugOptions
      .map((group) => ({
        ...group,
        options: group.options.filter((opt) =>
          opt.label.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      }))
      .filter((group) => group.options.length > 0);

    return (
      <div className="relative" ref={dropdownRef}>
        {/* Main Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full border border-black-300 rounded-lg p-2 text-left bg-white hover:border-gray-400 flex justify-between items-center"
        >
          <span className="text-sm truncate w-55">{getDisplayValue()}</span>
          <svg
            className={`w-4 h-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Clear Button */}
        {value && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange("");
            }}
            className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
            {/* Search Input */}
            <div className="p-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ค้นหายา..."
                className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm"
              />
            </div>

            <ul className="max-h-96 overflow-y-auto">
              {filteredGroups.map((group, groupIndex) => (
                <li key={groupIndex} className="relative">
                  {/* Group Header */}
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedGroup(
                        selectedGroup === group.label ? null : group.label
                      )
                    }
                    className="w-full px-4 py-2 text-left hover:bg-blue-50 font-semibold text-sm flex justify-between items-center border-b"
                  >
                    {group.label}
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        selectedGroup === group.label ? "rotate-90" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>

                  {/* Submenu */}
                  {selectedGroup === group.label && (
                    <div className="bg-gray-50">
                      <ul>
                        {displayedOptions(group).map((option, idx) => (
                          <li key={idx}>
                            <button
                              type="button"
                              onClick={() =>
                                handleSelectDrug(option.value, option.label)
                              }
                              className={`w-full px-6 py-2 text-left text-sm hover:bg-blue-100 ${
                                value === option.value
                                  ? "bg-blue-500 text-white hover:bg-blue-600"
                                  : ""
                              }`}
                            >
                              {option.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  const handleChange = (key, value) => {
    const numberFields = ["weight", "height", "temperature", "p", "r"];
    if (numberFields.includes(key)) {
      setForm({ ...form, [key]: value === "" ? "" : Number(value) });
    } else {
      setForm({ ...form, [key]: value });
    }
  };
  const handleArrayChange = (key, index, value) => {
    const updated = [...form[key]];
    updated[index] = value;
    setForm({ ...form, [key]: updated });
  };
  const addDiagnosis = () =>
    setForm({ ...form, initialDiagnosis: [...form.initialDiagnosis, ""] });
  const removeDiagnosis = (index) =>
    setForm({
      ...form,
      initialDiagnosis: form.initialDiagnosis.filter((_, i) => i !== index),
    });

  const handleTreatmentChange = (index, field, value) => {
    const updated = [...form.treatments];
    updated[index][field] = value;
    setForm({ ...form, treatments: updated });
  };
  const addTreatment = () =>
    setForm({
      ...form,
      treatments: [...form.treatments, { name: "", amount: "", time: "" }],
    });
  const removeTreatment = (index) =>
    setForm({
      ...form,
      treatments: form.treatments.filter((_, i) => i !== index),
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        date: form.date ? new Date(form.date) : undefined,
        weight: form.weight ? Number(form.weight) : undefined,
        height: form.height ? Number(form.height) : undefined,
        temperature: form.temperature ? Number(form.temperature) : undefined,
        p: form.p ? Number(form.p) : undefined,
        r: form.r ? Number(form.r) : undefined,
      };

      const response = await axios.post(
        "http://localhost:3000/patients",
        payload
      );
      alert("บันทึกข้อมูลเรียบร้อย ✅");
    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาดในการบันทึก ❌");
    }
  };

  return (
    <div>
      <Navbar />
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-md space-y-6 mt-14"
      >
        <h1 className="text-2xl font-bold text-center mb-4">
          🏥 แบบฟอร์มบันทึกข้อมูลผู้ป่วย
        </h1>

        {/* ข้อมูลทั่วไป */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="ชื่อ"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          <Input
            label="วันเดือนปี"
            type="date"
            value={form.date}
            onChange={(e) => handleChange("date", e.target.value)}
          />
          <Input
            label="ที่อยู่"
            value={form.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />
          <Input
            label="น้ำหนัก (kg)"
            type="number"
            value={form.weight}
            onChange={(e) => handleChange("weight", e.target.value)}
          />
          <Input
            label="ส่วนสูง (cm)"
            type="number"
            value={form.height}
            onChange={(e) => handleChange("height", e.target.value)}
          />
          <Input
            label="อุณหภูมิร่างกาย (°C)"
            type="number"
            value={form.temperature}
            onChange={(e) => handleChange("temperature", e.target.value)}
          />
          <Input
            label="BP"
            value={form.bp}
            onChange={(e) => handleChange("bp", e.target.value)}
          />
          <Input
            label="P"
            type="number"
            value={form.p}
            onChange={(e) => handleChange("p", e.target.value)}
          />
          <Input
            label="R"
            type="number"
            value={form.r}
            onChange={(e) => handleChange("r", e.target.value)}
          />
        </div>

        {/* อาการ */}
        <TextArea
          label="อาการสำคัญ"
          value={form.chiefComplaint}
          onChange={(e) => handleChange("chiefComplaint", e.target.value)}
        />
        <TextArea
          label="ประวัติเจ็บป่วยปัจจุบัน"
          value={form.currentIllness}
          onChange={(e) => handleChange("currentIllness", e.target.value)}
        />
        <TextArea
          label="ประวัติเจ็บป่วยในอดีต"
          value={form.pastIllness}
          onChange={(e) => handleChange("pastIllness", e.target.value)}
        />
        <TextArea
          label="ประวัติการแพ้อาหารและ/หรือแพ้ยา"
          value={form.allergies}
          onChange={(e) => handleChange("allergies", e.target.value)}
        />
        <TextArea
          label="ยาที่ใช้เป็นประจำ"
          value={form.regularMeds}
          onChange={(e) => handleChange("regularMeds", e.target.value)}
        />
        <TextArea
          label="ข้อมูลการตรวจร่างกายตามปัญหาของผู้ป่วย"
          value={form.physicalExam}
          onChange={(e) => handleChange("physicalExam", e.target.value)}
        />

        {/* Initial Differential Diagnosis */}
        <h2 className="font-semibold text-lg mt-6">
          🧠 Initial Differential Diagnosis
        </h2>
        <TextArea
          label="อาการนำทั้งหมด"
          value={form.diffSymptoms}
          onChange={(e) => setForm({ ...form, diffSymptoms: e.target.value })}
        />
        <TextArea
          label="โรคทั้งหมด"
          value={form.diffDiseases}
          onChange={(e) => setForm({ ...form, diffDiseases: e.target.value })}
        />

        {/* Initial Diagnosis */}
        <h2 className="font-semibold text-lg mt-6">🩺 Initial Diagnosis</h2>
        {form.initialDiagnosis.map((diag, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              type="text"
              value={diag}
              onChange={(e) =>
                handleArrayChange("initialDiagnosis", i, e.target.value)
              }
              className="border rounded-lg p-2 w-full"
            />
          </div>
        ))}

        {/* Treatments */}
        <h2 className="font-semibold text-lg mt-6">💊 การรักษาโรคขั้นต้น</h2>
        {form.treatments.map((treat, i) => (
          <div key={i} className="grid grid-cols-3 gap-2 mb-2">
            <TreatmentSelect
              value={treat.name}
              onChange={(val) => handleTreatmentChange(i, "name", val)}
            />
            <Input
              placeholder="จำนวน"
              value={treat.amount}
              onChange={(e) =>
                handleTreatmentChange(i, "amount", e.target.value)
              }
            />
            <Input
              placeholder="วิธีการรับประทาน"
              value={treat.time}
              onChange={(e) => handleTreatmentChange(i, "time", e.target.value)}
            />
            <button
              type="button"
              onClick={() => removeTreatment(i)}
              className="col-span-3 px-3 bg-red-500 text-white rounded-lg cursor-pointer"
            >
              ลบชุดนี้
            </button>
          </div>
        ))}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={addTreatment}
            className="px-4 py-1 bg-blue-500 text-white rounded-lg cursor-pointer"
          >
            + เพิ่มยา
          </button>
        </div>

        {/* Advice */}
        <h2 className="font-semibold text-lg mt-6">📋 คำแนะนำที่ให้</h2>
        <TextArea
          label="การใช้ยา"
          value={form.advice.medUsage}
          onChange={(e) =>
            setForm({
              ...form,
              advice: { ...form.advice, medUsage: e.target.value },
            })
          }
        />
        <TextArea
          label="การรับประทานอาหาร"
          value={form.advice.diet}
          onChange={(e) =>
            setForm({
              ...form,
              advice: { ...form.advice, diet: e.target.value },
            })
          }
        />

        {/* Follow up */}
        <h2 className="font-semibold text-lg mt-6">📅 การติดตาม</h2>
        <div className="grid grid-cols-3 gap-4">
          <select
            value={form.followUp.status}
            onChange={(e) =>
              setForm({
                ...form,
                followUp: { ...form.followUp, status: e.target.value },
              })
            }
            className="border rounded-lg p-2"
          >
            <option value="ไม่นัด">ไม่นัด</option>
            <option value="นัด">นัด</option>
          </select>
          <Input
            label="วันที่นัด"
            type="date"
            value={form.followUp.date}
            onChange={(e) =>
              setForm({
                ...form,
                followUp: { ...form.followUp, date: e.target.value },
              })
            }
          />
          <Input
            label="เบอร์โทร"
            value={form.followUp.phone}
            onChange={(e) =>
              setForm({
                ...form,
                followUp: { ...form.followUp, phone: e.target.value },
              })
            }
          />
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            type="button"
            onClick={handleClear}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 cursor-pointer"
          >
            ล้างข้อมูล
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 cursor-pointer"
          >
            บันทึกข้อมูล
          </button>
        </div>
      </form>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <label className="flex flex-col text-sm font-medium">
      {label && <span className="mb-1">{label}</span>}
      <input {...props} className="border rounded-lg p-2" />
    </label>
  );
}

function TextArea({ label, ...props }) {
  return (
    <label className="flex flex-col text-sm font-medium">
      <span className="mb-1">{label}</span>
      <textarea {...props} className="border rounded-lg p-2" rows="3" />
    </label>
  );
}
