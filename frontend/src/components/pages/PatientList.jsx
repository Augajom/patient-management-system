import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";

export default function PatientList() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
  const fetchPatients = async () => {
    try {
  const res = await fetch(`${import.meta.env.VITE_API_BASE}/patients`);
  console.log(res.status);
  const data = await res.json();
  console.log(data);
} catch (err) {
  console.error(err);
      alert("โหลดข้อมูลผู้ป่วยล้มเหลว ❌");
    }
  };
  fetchPatients();
}, []);

  // filter ตามชื่อหรืออาการสำคัญ
  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.chiefComplaint.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // ฟังก์ชันลบผู้ป่วย
  const handleDelete = async (id) => {
  if (window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบผู้ป่วยคนนี้?")) {
    try {
      await fetch(`${import.meta.env.VITE_API_BASE}/patients/${id}`, {
        method: "DELETE",
      });
      setPatients(patients.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
      alert("ลบผู้ป่วยล้มเหลว ❌");
    }
  }
};
  return (
    <div>
      <Navbar />
      <div className="pt-20 p-6 min-h-screen bg-gray-50">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold mb-4">📋 ข้อมูลผู้ป่วย</h1>
        </div>

        {/* Search box */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="ค้นหาชื่อผู้ป่วย หรืออาการ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
          <table className="min-w-full table-auto text-left border-collapse">
            <thead className="bg-blue-100 text-gray-700 uppercase text-sm">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">ชื่อผู้ป่วย</th>
                <th className="px-4 py-2">วันที่</th>
                <th className="px-4 py-2">อาการสำคัญ</th>
                <th className="px-4 py-2">รายละเอียด</th>
                <th className="px-4 py-2">จัดการ</th> {/* Column สำหรับแก้ไข/ลบ */}
              </tr>
            </thead>
            <tbody>
              {filteredPatients.length > 0 ? (
                filteredPatients.map((p, index) => (
                  <tr
                    key={p.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{p.name}</td>
                    <td className="px-4 py-2">{formatDate(p.date)}</td>
                    <td className="px-4 py-2">{p.chiefComplaint}</td>
                    <td className="px-4 py-2">
                      <Link
                        to={`/patients/${p._id}`}
                        className="text-blue-600 hover:underline"
                      >
                        ดูรายละเอียด
                      </Link>
                    </td>
                    <td className="px-4 py-2 flex gap-2">
                      <Link
                        to={`/patients/${p._id}/edit`}
                        className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
                      >
                        แก้ไข
                      </Link>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 cursor-pointer"
                      >
                        ลบ
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-400">
                    ไม่พบข้อมูลผู้ป่วย
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
