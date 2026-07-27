import studentPhoto from '../assets/images/studentPhoto.jpg'

export const lecturersData = [
    {
        id: "LEC/SOF/001",
        profilePhoto: studentPhoto,
        prefix: "Prof.",
        name: "Progress Chukwuyenum Ijuwe",
        email: "pijuwe@aust.edu.ng",
        phone: "+2348012345678",
        faculty: "School of Computing",
        department: "Software Engineering",
        qualification: "PhD",
        courses: {
            "2025/2026 1st Semester": [
                { code: "SEN 401", units: 3, title: "Software Engineering Security" },
                { code: "SEN 403", units: 3, title: "Database Management Systems" },
                { code: "SEN 301", units: 2, title: "Data Structures and Algorithms" },
                { code: "SEN 205", units: 3, title: "Computer Programming II" }
            ],
            "2024/2025 2nd Semester": [
                { code: "SEN 302", units: 3, title: "Web Engineering" },
                { code: "SEN 404", units: 3, title: "Software Architecture" }
            ],
            "2024/2025 1st Semester": [
                { code: "SEN 401", units: 3, title: "Software Engineering Security" },
                { code: "SEN 205", units: 3, title: "Computer Programming II" }
            ],
            "2023/2024 2nd Semester": [
                { code: "SEN 302", units: 3, title: "Web Engineering" }
            ],
            "2023/2024 1st Semester": [
                { code: "SEN 205", units: 3, title: "Computer Programming II" }
            ]
        },
        joinYear: "2026",
        address: "No. 13, Fifikachiri Close, Pinnock Estate, Galadimawa, Abuja, FCT",
        emergencyName: "Alexander Ijuwe",
        emergencyPhone: "081394949399",
        totalCourses: 4,
        totalStudents: 169,
        averageStudents: 34
    },
    {
        id: "LEC/CSC/001",
        prefix: "Dr.",
        name: "Amina Shehu Rilwan",
        email: "arilwan@aust.edu.ng",
        phone: "+2349011091102",
        faculty: "School of Computing",
        department: "Computer Science",
        qualification: "PhD",
        courses: {
            "2025/2026 1st Semester": [
                { code: "CSC 301", units: 3, title: "Data Structures" },
                { code: "CSC 305", units: 3, title: "Algorithms" }
            ],
            "2024/2025 2nd Semester": [
                { code: "CSC 305", units: 3, title: "Algorithms" }
            ],
            "2024/2025 1st Semester": [
                { code: "CSC 301", units: 3, title: "Data Structures" }
            ],
            "2023/2024 2nd Semester": [],
            "2023/2024 1st Semester": []
        },
        joinYear: "2022",
        address: "No. 21, Aba Road, Port Harcourt, Rivers State",
        emergencyName: "Shehu Rilwan",
        emergencyPhone: "08031234567"
    },
    {
        id: "LEC/BUS/001",
        prefix: "Dr.",
        name: "Aisha Armani Abdul",
        email: "aabdul@aust.edu.ng",
        phone: "+2348012345678",
        faculty: "School of Management",
        department: "Business Administration",
        qualification: "PhD",
        courses: {
            "2025/2026 1st Semester": [
                { code: "BUS 201", units: 3, title: "Principles of Management" }
            ],
            "2024/2025 2nd Semester": [
                { code: "BUS 201", units: 3, title: "Principles of Management" }
            ],
            "2024/2025 1st Semester": [],
            "2023/2024 2nd Semester": [],
            "2023/2024 1st Semester": []
        },
        joinYear: "2023",
        address: "No. 10, Wuse Zone 2, Abuja, FCT",
        emergencyName: "Armani Abdul",
        emergencyPhone: "08022334455"
    },
    {
        id: "LEC/ACC/001",
        prefix: "Mrs.",
        name: "Nabil Ibrahim Abba",
        email: "nabba@aust.edu.ng",
        phone: "+2348012345678",
        faculty: "School of Management",
        department: "Accounting",
        qualification: "MSc",
        courses: {
            "2025/2026 1st Semester": [
                { code: "ACC 201", units: 3, title: "Financial Accounting" },
                { code: "ACC 305", units: 2, title: "Cost Accounting" },
                { code: "ACC 401", units: 3, title: "Taxation" }
            ],
            "2024/2025 2nd Semester": [
                { code: "ACC 305", units: 2, title: "Cost Accounting" },
                { code: "ACC 401", units: 3, title: "Taxation" }
            ],
            "2024/2025 1st Semester": [
                { code: "ACC 201", units: 3, title: "Financial Accounting" }
            ],
            "2023/2024 2nd Semester": [],
            "2023/2024 1st Semester": []
        },
        joinYear: "2022",
        address: "No. 5, Kano Road, Kaduna State",
        emergencyName: "Ibrahim Abba",
        emergencyPhone: "08111222333"
    },
    {
        id: "LEC/PET/001",
        prefix: "Engr.",
        name: "David Olofu Agbaji",
        email: "dagbaji@aust.edu.ng",
        phone: "+2348012345678",
        faculty: "School of Engineering",
        department: "Petroleum Engineering",
        qualification: "MEng",
        courses: {
            "2025/2026 1st Semester": [
                { code: "PET 301", units: 3, title: "Reservoir Engineering" },
                { code: "PET 303", units: 2, title: "Drilling Engineering" },
                { code: "PET 401", units: 3, title: "Petroleum Production" }
            ],
            "2024/2025 2nd Semester": [
                { code: "PET 303", units: 2, title: "Drilling Engineering" },
                { code: "PET 401", units: 3, title: "Petroleum Production" }
            ],
            "2024/2025 1st Semester": [
                { code: "PET 301", units: 3, title: "Reservoir Engineering" }
            ],
            "2023/2024 2nd Semester": [],
            "2023/2024 1st Semester": []
        },
        joinYear: "2024",
        address: "No. 8, GRA, Yenagoa, Bayelsa State",
        emergencyName: "Olofu Agbaji",
        emergencyPhone: "08099887766"
    },
    {
        id: "LEC/MEC/001",
        prefix: "Engr.",
        name: "Rachael Ifeoma Nnamadim",
        email: "rnnamadim@aust.edu.ng",
        phone: "+2348012345678",
        faculty: "School of Engineering",
        department: "Mechanical Engineering",
        qualification: "MEng",
        courses: {
            "2025/2026 1st Semester": [
                { code: "MEC 301", units: 3, title: "Thermodynamics" },
                { code: "MEC 303", units: 2, title: "Fluid Mechanics" }
            ],
            "2024/2025 2nd Semester": [
                { code: "MEC 303", units: 2, title: "Fluid Mechanics" }
            ],
            "2024/2025 1st Semester": [
                { code: "MEC 301", units: 3, title: "Thermodynamics" }
            ],
            "2023/2024 2nd Semester": [],
            "2023/2024 1st Semester": []
        },
        joinYear: "2026",
        address: "No. 12, Independence Layout, Enugu State",
        emergencyName: "Chinedu Nnamadim",
        emergencyPhone: "08122334455"
    },
    {
        id: "LEC/SOF/002",
        prefix: "Prof.",
        name: "Desmond Lindsey Ubi",
        email: "dubi@aust.edu.ng",
        phone: "+2348012345678",
        faculty: "School of Computing",
        department: "Software Engineering",
        qualification: "PhD",
        courses: {
            "2025/2026 1st Semester": [
                { code: "SEN 302", units: 3, title: "Web Engineering" },
                { code: "SEN 404", units: 3, title: "Software Architecture" },
                { code: "SEN 305", units: 2, title: "Requirements Engineering" }
            ],
            "2024/2025 2nd Semester": [
                { code: "SEN 305", units: 2, title: "Requirements Engineering" }
            ],
            "2024/2025 1st Semester": [
                { code: "SEN 302", units: 3, title: "Web Engineering" },
                { code: "SEN 404", units: 3, title: "Software Architecture" }
            ],
            "2023/2024 2nd Semester": [],
            "2023/2024 1st Semester": []
        },
        joinYear: "2020",
        address: "No. 3, Rumuola, Port Harcourt, Rivers State",
        emergencyName: "Lindsey Ubi",
        emergencyPhone: "08066778899"
    },
    {
        id: "LEC/CSC/002",
        prefix: "Dr.",
        name: "Favour Olushola Kowe",
        email: "fkowe@aust.edu.ng",
        phone: "+2348012345678",
        faculty: "School of Computing",
        department: "Computer Science",
        qualification: "PhD",
        courses: {
            "2025/2026 1st Semester": [
                { code: "CSC 401", units: 3, title: "Artificial Intelligence" }
            ],
            "2024/2025 2nd Semester": [
                { code: "CSC 401", units: 3, title: "Artificial Intelligence" }
            ],
            "2024/2025 1st Semester": [],
            "2023/2024 2nd Semester": [],
            "2023/2024 1st Semester": []
        },
        joinYear: "2021",
        address: "No. 18, Lekki Phase 1, Lagos State",
        emergencyName: "Olushola Kowe",
        emergencyPhone: "08033445566"
    },
    {
        id: "LEC/EEE/001",
        prefix: "Engr.",
        name: "Samuel Okeke Nwafor",
        email: "snwafor@aust.edu.ng",
        phone: "+2348025567788",
        faculty: "School of Engineering",
        department: "Electrical Engineering",
        qualification: "BEng",
        courses: {
            "2025/2026 1st Semester": [
                { code: "EEE 201", units: 3, title: "Circuit Analysis" },
                { code: "EEE 303", units: 3, title: "Power Systems" }
            ],
            "2024/2025 2nd Semester": [
                { code: "EEE 303", units: 3, title: "Power Systems" }
            ],
            "2024/2025 1st Semester": [],
            "2023/2024 2nd Semester": [],
            "2023/2024 1st Semester": []
        },
        joinYear: "2025",
        address: "No. 9, New Haven, Enugu State",
        emergencyName: "Okeke Nwafor",
        emergencyPhone: "08199887766"
    },
    {
        id: "LEC/CIV/001",
        prefix: "Engr.",
        name: "Grace Johnson Adeyemi",
        email: "gadeyemi@aust.edu.ng",
        phone: "+2348039981122",
        faculty: "School of Engineering",
        department: "Civil Engineering",
        qualification: "MEng",
        courses: {
            "2025/2026 1st Semester": [
                { code: "CIV 301", units: 3, title: "Structural Analysis" },
                { code: "CIV 402", units: 2, title: "Transportation Engineering" },
                { code: "CIV 403", units: 3, title: "Construction Management" }
            ],
            "2024/2025 2nd Semester": [
                { code: "CIV 402", units: 2, title: "Transportation Engineering" },
                { code: "CIV 403", units: 3, title: "Construction Management" }
            ],
            "2024/2025 1st Semester": [
                { code: "CIV 301", units: 3, title: "Structural Analysis" }
            ],
            "2023/2024 2nd Semester": [],
            "2023/2024 1st Semester": []
        },
        joinYear: "2021",
        address: "No. 6, Bodija, Ibadan, Oyo State",
        emergencyName: "Johnson Adeyemi",
        emergencyPhone: "08055667788"
    }
]