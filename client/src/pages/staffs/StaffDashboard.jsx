import React, { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  FileSpreadsheet,
  GraduationCap,
  Layout,
  Users,
  PlusCircle,
  Search,
  X,
  Briefcase,
  CheckCircle,
  XCircle,
} from "lucide-react";
import customFetch from "../../utils/CustomFetch";

export default function StaffDashboard() {
  const [activeTab, setActiveTab] = useState("attendance");
  const [isAddRecordModalOpen, setIsAddRecordModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState("class-1");
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [attendanceForm, setAttendanceForm] = useState({
    attendancePercentage: "",
    semester: "",
    remarks: "",
  });

  useEffect(() => {
    const fetchstudent = async () => {
      try {
        const response = await customFetch.get("/student/on-duty");
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching :", error);
      }
    };
    fetchstudent();
  }, []);

  const [onDutyRequests, setOnDutyRequests] = useState([
    {
      id: 1,
      studentName: "John Doe",
      studentId: "ST001",
      course: "Computer Science",
      semester: 3,
      reason: "Attending a tech conference",
      dateFrom: "2024-11-20",
      dateTo: "2024-11-22",
      contactNumber: "1234567890",
      status: "Pending",
    },
    {
      id: 2,
      studentName: "Jane Smith",
      studentId: "ST002",
      course: "Electrical Engineering",
      semester: 5,
      reason: "Participating in a robotics competition",
      dateFrom: "2024-11-25",
      dateTo: "2024-11-27",
      contactNumber: "9876543210",
      status: "Pending",
    },
  ]);

  const TabButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
        activeTab === id
          ? "bg-blue-500 text-white"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );

  const Card = ({ title, value, description, icon: Icon }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <Icon className="w-6 h-6 text-blue-500" />
      </div>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );

  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  };

  const handleAttendanceSubmit = (e) => {
    e.preventDefault();
    console.log("Attendance submitted:", {
      studentId: selectedStudent,
      ...attendanceForm,
    });
    setIsAttendanceModalOpen(false);
    setSelectedStudent(null);
    setAttendanceForm({ attendancePercentage: "", semester: "", remarks: "" });
  };

  const handleStatusChange = (id, newStatus) => {
    setOnDutyRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status: newStatus } : request
      )
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-8">
          <GraduationCap className="w-8 h-8 text-blue-500" />
          <h2 className="text-xl font-bold text-gray-800">Staff Dashboard</h2>
        </div>
        <nav className="space-y-2">
          <TabButton id="attendance" label="Attendance" icon={Users} />
          <TabButton id="exams" label="Exams" icon={FileSpreadsheet} />
          <TabButton id="info" label="Class Info" icon={Layout} />
          <TabButton id="onDuty" label="On Duty" icon={Briefcase} />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome back, Professor
            </h1>
            <p className="text-gray-600">
              Manage your class attendance and schedules
            </p>
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search students..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => setIsAddRecordModalOpen(true)}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <PlusCircle className="w-5 h-5" />
              Add Record
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card
            title="Today's Attendance"
            value="85%"
            description="34 students present out of 40"
            icon={Clock}
          />
          <Card
            title="Weekly Average"
            value="92%"
            description="+2.5% from last week"
            icon={Calendar}
          />
          <Card
            title="Upcoming Tests"
            value="3"
            description="Next test in 2 days"
            icon={FileSpreadsheet}
          />
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {activeTab === "attendance" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Student Attendance
              </h2>
              <div className="space-y-4">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border-b border-gray-200 py-4 last:border-b-0 cursor-pointer hover:bg-gray-50"
                    onClick={() => {
                      setSelectedStudent(2024001 + i);
                      setIsAttendanceModalOpen(true);
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-gray-500" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          Student {i + 1}
                        </p>
                        <p className="text-sm text-gray-500">
                          Roll No: {2024001 + i}
                        </p>
                      </div>
                    </div>
                    <div className="text-blue-500">
                      <Clock className="w-5 h-5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "exams" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Internal Examination Schedule
              </h2>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-gray-800">
                        Internal Test {i + 1}
                      </h3>
                      <button className="text-blue-500 hover:text-blue-600">
                        Edit
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <p className="text-gray-600">Date:</p>
                      <p>Dec {10 + i}, 2024</p>
                      <p className="text-gray-600">Time:</p>
                      <p>09:00 AM - 11:00 AM</p>
                      <p className="text-gray-600">Subject:</p>
                      <p>Advanced Programming</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "info" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Class Information
              </h2>
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="className"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Class Name
                  </label>
                  <input
                    type="text"
                    id="className"
                    defaultValue="Computer Science - Section A"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="academicYear"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Academic Year
                  </label>
                  <input
                    type="text"
                    id="academicYear"
                    defaultValue="2024-2025"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="totalStudents"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Total Students
                  </label>
                  <input
                    type="number"
                    id="totalStudents"
                    defaultValue="40"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="classTeacher"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Class Teacher
                  </label>
                  <input
                    type="text"
                    id="classTeacher"
                    defaultValue="Prof. John Smith"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Update Information
                </button>
              </form>
            </div>
          )}

          {activeTab === "onDuty" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                On Duty Requests
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Student
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Course
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Reason
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Dates
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {onDutyRequests.map((request) => (
                      <tr key={request.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {request.studentName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {request.studentId}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {request.course}
                          </div>
                          <div className="text-sm text-gray-500">
                            Semester {request.semester}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {request.reason}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {request.dateFrom} to {request.dateTo}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              request.status === "Approved"
                                ? "bg-green-100 text-green-800"
                                : request.status === "Rejected"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {request.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {request.status === "Pending" && (
                            <>
                              <button
                                onClick={() =>
                                  handleStatusChange(request.id, "Approved")
                                }
                                className="text-green-600 hover:text-green-900 mr-2"
                              >
                                <CheckCircle className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() =>
                                  handleStatusChange(request.id, "Rejected")
                                }
                                className="text-red-600 hover:text-red-900"
                              >
                                <XCircle className="w-5 h-5" />
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Add Record Modal */}
      <Modal
        isOpen={isAddRecordModalOpen}
        onClose={() => setIsAddRecordModalOpen(false)}
        title="Add New Record"
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Class
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="class-1"
                  checked={selectedClass === "class-1"}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="mr-2"
                />
                Class A - Computer Science
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="class-2"
                  checked={selectedClass === "class-2"}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="mr-2"
                />
                Class B - Mathematics
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Add Record
          </button>
        </form>
      </Modal>

      {/* Attendance Modal */}
      <Modal
        isOpen={isAttendanceModalOpen}
        onClose={() => setIsAttendanceModalOpen(false)}
        title={`Attendance for Student ${selectedStudent}`}
      >
        <form onSubmit={handleAttendanceSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="attendancePercentage"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Attendance Percentage
            </label>
            <input
              type="number"
              id="attendancePercentage"
              value={attendanceForm.attendancePercentage}
              onChange={(e) =>
                setAttendanceForm({
                  ...attendanceForm,
                  attendancePercentage: e.target.value,
                })
              }
              min="0"
              max="100"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="semester"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Semester
            </label>
            <input
              type="text"
              id="semester"
              value={attendanceForm.semester}
              onChange={(e) =>
                setAttendanceForm({
                  ...attendanceForm,
                  semester: e.target.value,
                })
              }
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="remarks"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Remarks
            </label>
            <textarea
              id="remarks"
              value={attendanceForm.remarks}
              onChange={(e) =>
                setAttendanceForm({
                  ...attendanceForm,
                  remarks: e.target.value,
                })
              }
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Submit Attendance
          </button>
        </form>
      </Modal>
    </div>
  );
}
