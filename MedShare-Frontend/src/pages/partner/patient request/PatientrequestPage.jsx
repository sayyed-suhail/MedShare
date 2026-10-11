import React, { useMemo, useState } from "react";
import "./PatientrequestPage.css";

const requests = [
  { id:"REQ-9420", patientId:"PT-4421", initials:"MR", patient:"Marcus Rivera", age:54, gender:"Male", condition:"Type 2 Diabetes", phone:"+1 (555) 234-8901", email:"marcus.rivera@email.com", location:"West District, Metro Area", beneficiaryId:"BEN-8841", medicine:"Metformin 850mg", form:"Oral Tablet", quantity:"60 ct", category:"Diabetes", date:"Today, 09:15 AM", ageText:"2 hrs ago (Urgent)", dosage:"1 tablet twice daily with meals (Rx standard)", allocation:"60 Tablets (30-day standard cycle)", stock:"1,420 units available", depot:"Central Depot", status:"Pending Review", icon:"pill" },
  { id:"REQ-3890", patientId:"PT-3890", initials:"EV", patient:"Eleanor Vance", medicine:"Amoxicillin 500mg", form:"Capsules", quantity:"21 ct", category:"Antibiotics", date:"Today, 08:30 AM", ageText:"3 hrs ago", status:"Pending Review", icon:"pill" },
  { id:"REQ-5120", patientId:"PT-5120", initials:"DC", patient:"David Chen", medicine:"Lisinopril 10mg", form:"Tablets", quantity:"30 ct", category:"Cardiovascular", date:"Yesterday, 4:20 PM", ageText:"19 hrs ago", status:"Pending Review", icon:"heart" },
  { id:"REQ-6021", patientId:"PT-6021", initials:"FA", patient:"Fatima Al-Mansoor", medicine:"Insulin Glargine 100 IU/ml", form:"Cold-chain", quantity:"5 Cartridges", category:"Diabetes / Cold-chain", date:"Yesterday, 2:10 PM", ageText:"21 hrs ago", status:"Pending Review", icon:"snow" },
  { id:"REQ-2940", patientId:"PT-2940", initials:"JW", patient:"James Wilson", medicine:"Salbutamol Inhaler 100mcg", form:"Aerosol", quantity:"200 doses", category:"Respiratory", date:"2 days ago", ageText:"Nov 14, 11:00 AM", status:"Pending Review", icon:"lungs" },
  { id:"REQ-1875", patientId:"PT-1875", initials:"MS", patient:"Maria Santos", medicine:"Ibuprofen 400mg", form:"Film-coated Tablets", quantity:"40 ct", category:"Pain Relief", date:"2 days ago", ageText:"Nov 14, 08:45 AM", status:"Pending Review", icon:"medicine" }
];

const tabs = [
  { label:"All Requests", count:24, value:"All" },
  { label:"Pending Review", count:8, value:"Pending Review" },
  { label:"Approved", count:12, value:"Approved" },
  { label:"Collected", count:4, value:"Collected" },
  { label:"Rejected", count:2, value:"Rejected" }
];

function Icon({ name, size=20 }) {
  const p = { width:size, height:size, viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:2, strokeLinecap:"round", strokeLinejoin:"round", "aria-hidden":true };
  switch(name) {
    case "search": return <svg {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>;
    case "chevronDown": return <svg {...p}><path d="m6 9 6 6 6-6"/></svg>;
    case "chevronLeft": return <svg {...p}><path d="m15 18-6-6 6-6"/></svg>;
    case "chevronRight": return <svg {...p}><path d="m9 18 6-6-6-6"/></svg>;
    case "check": return <svg {...p}><path d="m5 12 4 4L19 6"/></svg>;
    case "clock": return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
    case "pill": return <svg {...p}><path d="m7.5 16.5 9-9"/><rect x="5" y="3" width="14" height="18" rx="7" transform="rotate(45 12 12)"/></svg>;
    case "heart": return <svg {...p}><path d="M20.8 8.9c0 5.5-8.8 10.2-8.8 10.2S3.2 14.4 3.2 8.9A4.9 4.9 0 0 1 12 6.1a4.9 4.9 0 0 1 8.8 2.8Z"/></svg>;
    case "snow": return <svg {...p}><path d="M12 3v18M5.6 6.2l12.8 11.6M18.4 6.2 5.6 17.8M4 12h16"/><circle cx="12" cy="12" r="2.2"/></svg>;
    case "lungs": return <svg {...p}><path d="M12 5v15M12 10c-1.5-3.2-3.3-5-5-5-1.4 0-2 1.4-2 3.4V16c0 2.4 1.5 4 3.6 4 2.3 0 3.4-1.8 3.4-4.2M12 10c1.5-3.2 3.3-5 5-5 1.4 0 2 1.4 2 3.4V16c0 2.4-1.5 4-3.6 4-2.3 0-3.4-1.8-3.4-4.2"/></svg>;
    case "medicine": return <svg {...p}><rect x="4" y="4" width="16" height="16" rx="4"/><path d="m8 8 8 8M16 8l-8 8"/></svg>;
    case "document": return <svg {...p}><path d="M6 3h9l3 3v15H6z"/><path d="M15 3v4h4M9 12h6M9 16h6M9 8h2"/></svg>;
    case "verified": return <svg {...p}><path d="m12 3 2 1 2.3-.2 1.2 2 2 .9-.2 2.3 1 2-1 2 .2 2.3-2 .9-1.2 2-2.3-.2-2 1-2-1-2.3.2-1.2-2-2-.9.2-2.3-1-2 1-2-.2-2.3 2-.9 1.2-2 2.3.2z"/><path d="m8.5 12 2.2 2.2 4.8-5"/></svg>;
    case "call": return <svg {...p}><path d="M5 4h3l1.2 3.4-2 1.5a14 14 0 0 0 7.9 7.9l1.5-2L20 16v3c0 1-.8 2-2 2C10.3 21 3 13.7 3 6c0-1 .8-2 2-2Z"/></svg>;
    case "mail": return <svg {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>;
    case "location": return <svg {...p}><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>;
    case "security": return <svg {...p}><path d="M12 3 20 6v5c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6z"/><path d="m9 12 2 2 4-4"/></svg>;
    case "speed": return <svg {...p}><path d="M4 16a8 8 0 1 1 16 0"/><path d="M12 12 16 8M6 18h12"/></svg>;
    case "prescription": return <svg {...p}><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 7h6M9 11h6M9 15h3M15 14l-3 3M12 14l3 3"/></svg>;
    case "zoom": return <svg {...p}><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5M10.5 7.5v6M7.5 10.5h6"/></svg>;
    case "cancel": return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="m9 9 6 6M15 9l-6 6"/></svg>;
    default: return null;
  }
}

export default function RequestsPage() {
  const [activeTab, setActiveTab] = useState("Pending Review");
  const [selectedId, setSelectedId] = useState("REQ-9420");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Oldest First (Urgent)");
  const [page, setPage] = useState(1);

  const filteredRequests = useMemo(() => {
    let result = [...requests];
    if (activeTab !== "All" && activeTab !== "Pending Review") return [];
    const term = search.trim().toLowerCase();
    if (term) result = result.filter(r => r.patient.toLowerCase().includes(term) || r.patientId.toLowerCase().includes(term) || r.medicine.toLowerCase().includes(term) || r.category.toLowerCase().includes(term));
    if (sort === "Patient Name (A-Z)") result.sort((a,b) => a.patient.localeCompare(b.patient));
    else if (sort === "Newest First") result.reverse();
    else if (sort === "Medication Category") result.sort((a,b) => a.category.localeCompare(b.category));
    return result;
  }, [activeTab, search, sort]);

  const selectedRequest = filteredRequests.find(r => r.id === selectedId) || requests.find(r => r.id === selectedId) || requests[0];

  const handleDecision = (decision) => {
    window.alert(decision === "approve" ? `Request ${selectedRequest.id} approved for pickup.` : `Request ${selectedRequest.id} rejected.`);
  };

  return (
    <div className="requests-page">
      <div className="requests-context-bar">
        <div className="requests-context-title"><span className="context-dot"/>Clinical Operations • Patient Prescription Verification</div>
        <div className="requests-protocols">
          <span className="protocol-pill pending"><span className="small-dot"/>8 Pending Verification</span>
          <span className="protocol-pill active"><Icon name="verified" size={14}/>Clinical Protocol 3.1 Active</span>
        </div>
      </div>

      <div className="requests-page-header">
        <div><h1>Patient Requests</h1><p>Review prescription uploads and inventory matching before approving medicine for dispensary pickup.</p></div>
        <div className="requests-toolbar">
          <label className="request-search"><Icon name="search" size={18}/><input value={search} onChange={e => {setSearch(e.target.value);setPage(1);}} placeholder="Filter by patient name, Rx, drug..."/></label>
          <div className="request-sort"><select value={sort} onChange={e => setSort(e.target.value)}><option>Oldest First (Urgent)</option><option>Newest First</option><option>Patient Name (A-Z)</option><option>Medication Category</option></select><Icon name="chevronDown" size={16}/></div>
        </div>
      </div>

      <div className="request-tabs">
        {tabs.map(tab => <button key={tab.value} type="button" className={activeTab === tab.value ? "active" : ""} onClick={() => {setActiveTab(tab.value);setPage(1);}}><span>{tab.label}</span><span className="tab-count">{tab.count}</span></button>)}
      </div>

      <div className="request-workspace">
        <div className="request-left">
          <section className="request-queue card">
            <div className="queue-header"><div className="queue-title"><span className="queue-icon"><Icon name="document" size={20}/></span><h2>Patient Requests Queue</h2></div><span className="queue-count">Showing {Math.min(6, filteredRequests.length)} of 8 pending</span></div>
            <div className="request-table-wrap">
              <table className="request-table"><thead><tr><th>Patient</th><th>Medicine Requested</th><th>Category</th><th>Request Date</th><th>Status</th></tr></thead>
                <tbody>
                  {filteredRequests.slice(0,6).map(item => <tr key={item.id} className={item.id === selectedRequest.id ? "selected" : ""} onClick={() => setSelectedId(item.id)}>
                    <td><div className="patient-cell"><div className="patient-avatar">{item.initials}</div><div><div className="patient-name">{item.patient}{item.id === "REQ-9420" && <span className="verified-mark"><Icon name="check" size={12}/></span>}</div><div className="patient-id">#{item.patientId.replace("PT-", "PT-")}</div></div></div></td>
                    <td><div className="medicine-cell"><span className="medicine-icon"><Icon name={item.icon} size={17}/></span><div><strong>{item.medicine}</strong><span>{item.form} • {item.quantity}</span></div></div></td>
                    <td><span className={`category-pill ${categoryClass(item.category)}`}>{item.category}</span></td>
                    <td><div className="date-cell"><strong>{item.date}</strong><span className={item.id === "REQ-9420" ? "urgent" : ""}>{item.id === "REQ-9420" && <Icon name="clock" size={12}/>} {item.ageText}</span></div></td>
                    <td className="status-cell"><span className="request-status">Pending Review</span></td>
                  </tr>)}
                  {filteredRequests.length === 0 && <tr><td colSpan="5" className="empty-row">No requests found for this filter.</td></tr>}
                </tbody>
              </table>
            </div>
            <div className="queue-pagination"><span>Showing items <strong>1 to {Math.min(6, filteredRequests.length)}</strong> of <strong>8 pending</strong></span><div className="pagination-buttons"><button type="button" disabled={page === 1} onClick={() => setPage(v => Math.max(1,v-1))}><Icon name="chevronLeft" size={14}/>Previous</button><button type="button" className={page === 1 ? "current" : ""} onClick={() => setPage(1)}>1</button><button type="button" className={page === 2 ? "current" : ""} onClick={() => setPage(2)}>2</button><button type="button" onClick={() => setPage(v => Math.min(2,v+1))}>Next<Icon name="chevronRight" size={14}/></button></div></div>
          </section>

          <section className="turnaround-card card"><div className="turnaround-info"><div className="turnaround-icon"><Icon name="speed" size={20}/></div><div><h3>Average Verification Turnaround</h3><p>Current queue clearance time is within safe clinical SLA (&lt; 4 hours).</p></div></div><div className="turnaround-metric"><div><strong>1 hr 42 m</strong><span>18% faster than benchmark</span></div><svg className="sparkline" viewBox="0 0 100 30"><path d="M0 25 C20 22, 30 10, 50 18 C70 26, 80 5, 100 8"/><circle cx="100" cy="8" r="3"/></svg></div></section>
        </div>

        <aside className="request-detail card">
          <div className="detail-header"><span>Inspection #{selectedRequest.id}</span><span className="detail-status">Pending Review</span></div>
          <div className="patient-profile"><div className="profile-heading"><div><h2>{selectedRequest.patient}</h2><p>Age {selectedRequest.age || 54} • {selectedRequest.gender || "Male"} • {selectedRequest.condition || "Type 2 Diabetes"}</p></div><span className="beneficiary">Beneficiary</span></div><div className="contact-list"><div><Icon name="call" size={16}/><span>{selectedRequest.phone || "+1 (555) 234-8901"}</span></div><div><Icon name="mail" size={16}/><span>{selectedRequest.email || "marcus.rivera@email.com"}</span></div><div><Icon name="location" size={16}/><span>{selectedRequest.location || "West District, Metro Area"} • #{selectedRequest.beneficiaryId || "BEN-8841"}</span></div></div></div>

          <section className="detail-section"><div className="section-label">Prescribed Medication</div><div className="prescribed-box"><div className="medicine-heading"><strong>{selectedRequest.medicine}</strong><span>{selectedRequest.form || "Oral Tablet"}</span></div><p><b>Dosage:</b> {selectedRequest.dosage || "1 tablet twice daily with meals (Rx standard)"}</p><p><b>Allocation:</b> {selectedRequest.allocation || "60 Tablets (30-day standard cycle)"}</p><div className="stock-row"><span><Icon name="check" size={14}/>In Stock: {selectedRequest.stock || "1,420 units available"}</span><small>{selectedRequest.depot || "Central Depot"}</small></div></div></section>

          <section className="detail-section"><div className="scan-label-row"><div className="section-label">Prescription Document Scan</div><span className="rx-verified"><Icon name="verified" size={13}/>Rx Stamp Verified</span></div><div className="prescription-preview"><div className="rx-heading"><div><strong>St. Luke's Health Center</strong><span>Dr. Robert Hayes, MD • Lic #MD-34982</span></div><Icon name="prescription" size={28}/></div><div className="rx-body"><span>Rx Date: Nov 12, 2024</span><strong>Rx: Metformin HCl 850mg tabs</strong><p>Sig: 1 tab PO BID with meals. Disp: #60. Refills: 2.</p></div><div className="rx-footer"><span>✎ R. Hayes, MD</span><button type="button"><Icon name="zoom" size={14}/>Full Scan</button></div></div></section>

          <div className="protocol-note"><Icon name="security" size={18}/><p>Final prescription check happens in-person at NGO before handover. Patient must present original government ID and physical prescription slip at collection depot.</p></div>
          <div className="decision-actions"><button type="button" className="approve-button" onClick={() => handleDecision("approve")}><Icon name="check" size={18}/>Approve for Pickup</button><button type="button" className="reject-button" onClick={() => handleDecision("reject")}><Icon name="cancel" size={18}/>Reject Request</button></div>
          <div className="reviewer-footer"><span>Reviewing Pharmacist:</span><strong>Dr. Sarah Jenkins (Rx #88419)</strong></div>
        </aside>
      </div>
    </div>
  );
}

function categoryClass(category) {
  if (category.includes("Antibiotics") || category.includes("Respiratory")) return "mint";
  if (category.includes("Diabetes")) return "blue";
  return "soft";
}
