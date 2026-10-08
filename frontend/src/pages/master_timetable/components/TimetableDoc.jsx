import './PrintTimetable.css';

import React from 'react';

export default function TimetableDoc({ scheduleData }) {
  const handlePrint = () => {
    window.print(); // Triggers native browser print / "Save as PDF"
  };

  return (
    <div className="timetable-wrapper">
      {/* Action Bar (hidden on print) */}
      <div
        className="no-print"
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "16px",
        }}
      >
        <button
          onClick={handlePrint}
          style={{
            padding: "10px 18px",
            background: "#0284c7",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          🖨️ Print / Download PDF
        </button>
      </div>

      {/* The Printable Document */}
      <div className="timetable-document" id="printable-timetable">
        <div className="timetable-header">
          <h1>2025/2026 SESSION – FIRST SEMESTER</h1>
          <h2>FINAL EXAMINATIONS TIMETABLE</h2>
        </div>

        <table className="official-table">
          <thead>
            <tr>
              <th className="col-date">DATE</th>
              <th className="col-time">TIME</th>
              <th className="col-courses">COURSES</th>
              <th className="col-enrol">ENROL.</th>
              <th className="col-venue">VENUE</th>
              <th className="col-invig">INVIGILATORS</th>
            </tr>
          </thead>
          <tbody>
            {/* Example: Monday Morning Row */}
            <tr>
              <td rowSpan="2" className="col-date cell-center">
                Monday
                <br />
                10/08/2026
              </td>
              <td className="col-time cell-center">8:30AM – 11:30AM</td>
              <td className="col-courses">
                <span className="course-line">SWE4209 [129] (SWE & CS)</span>
                <span className="course-line">ITC4331 [25] (IT)</span>
                <span className="course-line">CBS4301 [74] (CBS)</span>
                <span className="course-line">
                  CSC301 [166] / CSC2253 [12] (CS & SWE) (CO - Old & New Campus)
                </span>
              </td>
              <td className="col-enrol">406</td>
              <td className="col-venue">TH A, CIT, LR1 – LR4</td>
              <td className="col-invig"></td>
            </tr>

            {/* Monday Afternoon Row (Notice: No DATE cell here because rowSpan covers it) */}
            <tr>
              <td className="col-time cell-center">1:30PM – 4:30PM</td>
              <td className="col-courses">
                <span className="course-line">
                  IFT211 [379] / CSC2211 [2] (CS, SWE & IT)
                </span>
                <span className="course-line">
                  CYB305 [64] / CBS3201 [3] (CBS)
                </span>
              </td>
              <td className="col-enrol">448</td>
              <td className="col-venue">TH A, CIT, LR1 – LR4</td>
              <td className="col-invig"></td>
            </tr>

            {/* Tuesday Morning */}
            <tr>
              <td className="col-date cell-center">
                Tuesday
                <br />
                11/08/2026
              </td>
              <td className="col-time cell-center">8:30AM – 11:30AM</td>
              <td className="col-courses">
                <span className="course-line">
                  STA1151 [535] / CSC1111 [10] (FC)
                </span>
              </td>
              <td className="col-enrol">545</td>
              <td className="col-venue">TH A, CIT, LR1 – LR4</td>
              <td className="col-invig"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
