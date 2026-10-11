# MedShare – Medicine Donation Platform 💊

MedShare is a full-stack MERN web application that connects people who have unused medicines with patients who cannot afford them — verified safely through NGOs and pharmacists.

This project is being developed as part of my MCA capstone (DevOps & Cloud specialization). The core MERN application is currently in development. DevOps and Cloud deployment (Docker, CI/CD, AWS) are planned as the next phase — see Roadmap below for current status.

---

## 📌 Problem Statement

Every year, large quantities of usable medicines go wasted or expire unused at home after treatment, while many patients cannot afford essential medicines despite having valid prescriptions. Existing medicine-donation platforms are basic web applications with no proper verification chain, scalability, or real-world deployment practices.

**MedShare solves this by:**
- Connecting donors, NGO pharmacists, and patients on one verified platform
- Ensuring medicines reach the right people safely through prescription checks
- Being planned for deployment the way production healthcare systems are, using Docker, CI/CD, and Cloud infrastructure (upcoming phase)

---

## ✨ Features

### 🩹 Donor Panel
- Add medicine details (name, salt/composition, quantity, expiry date, photo)
- Get notified once a pharmacist reviews the submission
- Track donation status: Pending → Approved → Picked Up
- View scheduled pickup date and NGO address

### 🧑‍⚕️ Pharmacist / NGO Panel
- View and verify incoming medicine donation requests
- Approve or reject submissions with comments
- Schedule medicine pickup from donors
- List verified medicines on the platform at a discounted price (~10% of original)
- Verify patient prescriptions and hand over medicine
- View basic stats: medicines donated, patients helped, current stock

### 🙋 User (Patient) Panel
- Search medicines by salt/composition name
- View medicine details with original vs discounted price
- Upload prescription and request a medicine
- Track request status: Requested → Prescription Verified → Ready for Pickup → Collected
- View NGO location and pickup details

### 🔔 Shared Features
- Role-based authentication (Donor / Pharmacist / User)
- Real-time notifications between all three panels
- Profile management

---

## 🛠️ Tech Stack

**Currently in use:**

| Layer | Technology |
|---|---|
| Frontend | React.js |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Authentication | JWT (JSON Web Tokens) |

**Planned (upcoming DevOps/Cloud phase):**

| Layer | Technology |
|---|---|
| Containerization | Docker |
| CI/CD | GitHub Actions |
| Cloud Hosting | AWS (EC2, S3 for prescription images, MongoDB Atlas) |
| Monitoring | Prometheus, Grafana |
| Orchestration | Kubernetes |

---

## 🏗️ System Architecture / Flow

```
Donor adds medicine
      ↓
Notification → Pharmacist/NGO
      ↓
Pharmacist verifies details
      ↓
Approved → Pickup scheduled → Medicine stored at NGO
      ↓
Medicine listed on platform (~10% of original price)
      ↓
Patient searches medicine by salt name
      ↓
Patient uploads prescription → Requests medicine
      ↓
Pharmacist verifies prescription in person → Hands over medicine
```

---

## 🚀 What Will Make This Project Unique

Several similar medicine-donation platforms already exist in research (e.g. GiveMed and related IEEE/IJCRT papers), but they are all basic web applications with no DevOps or Cloud practices involved. MedShare's planned contribution is applying a **DevOps and Cloud specialization** on top of the same core idea, once the core application is complete:

- **Docker** – containerize frontend, backend, and database for consistent environments
- **CI/CD (GitHub Actions)** – automate testing and build on every code push
- **Cloud Deployment (AWS)** – scalable hosting instead of manual, single-server deployment
- **Monitoring & Orchestration** *(stretch goal)* – Kubernetes for auto-scaling, Prometheus/Grafana for live health monitoring

*Note: these are planned, not yet implemented — see Roadmap below for current progress.*

---

## 📂 Project Structure

```
medshare/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── donor/
│   │   │   ├── pharmacist/
│   │   │   └── user/
│   │   └── App.js
│   └── package.json
├── server/                  # Node.js/Express backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── server.js
└── README.md
```
*(Docker and CI/CD config files will be added here once the DevOps phase begins.)*

---

## ⚙️ Getting Started (Local Setup)

### Prerequisites
- Node.js (v18+)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/sayyed-suhail/medshare.git
cd medshare

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### Environment Variables

Create a `.env` file inside `server/`:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Run Locally

```bash
# Run backend
cd server
npm start

# Run frontend (in a separate terminal)
cd client
npm start
```

> **Note:** Docker setup is planned as part of the DevOps phase of this project (see Roadmap below) and will be added once implemented.

---

## 🗺️ Roadmap

- [x] UI/UX design
- [x] Project idea approval
- [ ] Backend development (donor, pharmacist, user APIs)
- [ ] Frontend development (all 3 panels)
- [ ] Dockerize the application
- [ ] Set up CI/CD pipeline with GitHub Actions
- [ ] Deploy on AWS (EC2, S3, MongoDB Atlas)
- [ ] Add Kubernetes for auto-scaling *(optional)*
- [ ] Add monitoring with Prometheus/Grafana *(optional)*

---

## 👤 Author

**SAYYED SUHAIL NAQVI**
MCA – DevOps & Cloud Specialization
PES University

---

## 📄 License

This project is developed as part of an academic capstone project and is open for educational use.