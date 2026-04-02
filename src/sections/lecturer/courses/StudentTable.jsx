// components/ui/StudentTable.jsx

// ── replace with API data ──
const students = [
  { sn: 1,  matric: "SOF/22U/10098", name: "Stephanie Zikora Obi",       dept: "Software Engineering" },
  { sn: 2,  matric: "SOF/22U/10039", name: "Adebayo Oluwaseun Johnson",   dept: "Software Engineering" },
  { sn: 3,  matric: "SOF/22U/10040", name: "Ibrahim Kazeem Olalekan",     dept: "Software Engineering" },
  { sn: 4,  matric: "SOF/22U/10041", name: "Fatimah Adeola Bakare",       dept: "Software Engineering" },
  { sn: 5,  matric: "SOF/22U/10042", name: "Chinedu Emeka Okafor",        dept: "Software Engineering" },
  { sn: 6,  matric: "SOF/22U/10043", name: "Zainab Aminat Yusuf",         dept: "Software Engineering" },
  { sn: 7,  matric: "SOF/22U/10044", name: "Emmanuel Tunde Adebayo",      dept: "Software Engineering" },
  { sn: 8,  matric: "SOF/22U/10045", name: "Ngozi Chiamaka Nwosu",        dept: "Software Engineering" },
  { sn: 9,  matric: "SOF/22U/10046", name: "Olufemi Michael Akinola",     dept: "Software Engineering" },
  { sn: 10, matric: "SOF/22U/10047", name: "Amina Yusuf Bello",           dept: "Software Engineering" },
  { sn: 11, matric: "SOF/22U/10048", name: "Tunde Stephen Adewale",       dept: "Software Engineering" },
  { sn: 12, matric: "SOF/22U/10049", name: "Halima Sani Abdullahi",       dept: "Software Engineering" },
  { sn: 13, matric: "SOF/22U/10050", name: "Babatunde Samuel Ojo",        dept: "Software Engineering" },
  { sn: 14, matric: "SOF/22U/10051", name: "Marisama Bintou Diallo",      dept: "Software Engineering" },
]
// ──────────────────────────

export default function StudentTable() {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm px-4">
        <thead>
            <tr className="bg-[#F9FAFB] text-[10px] lg:text-xs uppercase text-label">
                <th className="py-3 px-6 font-normal">S/N</th>
                <th className="py-3 px-6 text-nowrap  font-normal">Matric Number</th>
                <th className="py-3 px-6 text-nowrap font-normal">Full Name</th>
                <th className="py-3 px-6 text-nowrap font-normal">Department</th>
            </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.matric} className="border-b border-gray-100">
              <td className="py-4 px-6 text-xs lg:text-base text-black">{student.sn}</td>
              <td className="py-4 px-6 text-xs lg:text-base font-bold text-black">{student.matric}</td>
              <td className="py-4 px-6 text-xs lg:text-base text-black">{student.name}</td>
              <td className="py-4 px-6 text-xs lg:text-base text-black">{student.dept}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}