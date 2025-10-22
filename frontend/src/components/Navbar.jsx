import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow p-4 flex justify-between items-center z-50">
      <h1 className="font-bold text-lg text-blue-600">Chonmanee Clinic</h1>
      <div className="flex gap-4">
        <Link to="/" className="hover:text-blue-600">เพิ่มข้อมูลผู้ป่วย</Link>
        <Link to="/patients" className="hover:text-blue-600">ข้อมูลผู้ป่วย</Link>
      </div>
    </nav>
  );
}
