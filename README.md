# MedShare: Medicine Donation and Redistribution Platform

MedShare is a MERN-stack web platform for donating and redistributing unused medicines in a **verified and controlled** way. It is not an open marketplace. Every donated medicine is checked by a pharmacist or NGO partner before it becomes available to patients.

> MCA Capstone Project, PES University (DevOps and Cloud Computing specialization). Status: **in active development**.

## Problem

After recovering from an illness, many people are left with unused medicines, while others cannot afford the medicines they need. MedShare connects the two groups safely through a verification step.

## How it works

1. A **Donor** submits unused medicine details (name, salt, expiry date, quantity, photos).
2. A **Partner** (pharmacist or NGO) reviews the submission and approves or rejects it.
3. Approved medicines are listed as available.
4. A **Patient** searches for a medicine, uploads a prescription where required, and requests it.
5. The request is processed, and pickup or collection is arranged.

## Users and panels

| Panel | What the user does |
|---|---|
| Donor | Add new medicine, view my donations and their status |
| Partner (Pharmacist / NGO) | Verify medicines, approve or reject, manage approved stock and pickup |
| Patient | Search medicines, view details, request medicine, track requests |

## Tech stack

| Layer | Technologies |
|---|---|
| Frontend | React.js, Vite, React Router, JavaScript, CSS |
| Backend | Node.js, Express.js, Mongoose, CORS, dotenv |
| Database | MongoDB |
| Tools | Git, GitHub, VS Code, Hoppscotch (API testing) |

## Project structure

```
MedShare
├── Backend            # Express server, routes, controllers, Mongoose models
├── MedShare-Frontend  # React + Vite application (Donor, Partner, Patient panels)
└── .gitignore
```

## Medicine data model

Each medicine record stores: name, salt (active ingredient), category, expiry date, quantity, images, storage conditions, donor reference, verification status (`pending`, `approved`, `rejected`) and pickup details (status, date, time slot, courier, vehicle reference, notes).

## Current progress

- [x] Express server with MongoDB connection
- [x] Medicine and Partner API routes
- [x] Donor flow: add medicine and track status
- [x] Role-based route structure (Donor, Partner, Patient) with nested layouts
- [x] Patient dashboard and Find Medicine pages
- [ ] Login, registration and authentication
- [ ] Prescription upload
- [ ] Patient medicine requests and pickup scheduling
- [ ] Notifications

## Getting started

### Prerequisites

- Node.js (v18 or later)
- MongoDB running locally (or a MongoDB connection string)

### 1. Clone the repository

```bash
git clone https://github.com/sayyed-suhail/MedShare.git
cd MedShare
```

### 2. Run the backend

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` folder (`CHECK`: use your real variable names):

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/medshare
```

Start the server (`CHECK`: use your real start command):

```bash
npm start
```

### 3. Run the frontend

```bash
cd MedShare-Frontend
npm install
npm run dev
```

Open the local address that Vite prints in the terminal, usually `http://localhost:5173`.

## Planned DevOps and cloud work

This is the planned work and is **not completed yet**:

- Docker containerization of the frontend and backend
- CI/CD pipeline using GitHub Actions (build, test, image build)
- Infrastructure as Code with Terraform (AzureRM provider)
- Cloud deployment on Microsoft Azure
- Frontend, API, database and integration testing

## Research basis

The design is based on a literature survey of 10 IEEE and Scopus-indexed papers, including the IEEE paper *GiveMed: A Webportal for Medicine Distribution among Poverty-stricken People* (R10-HTC, 2017).

## Author

**Sayyed Suhail Naqvi**
MCA, PES University
[GitHub](https://github.com/sayyed-suhail) | [LinkedIn](https://www.linkedin.com/in/sayyed-suhail-naqvi)

## Disclaimer

MedShare is an academic project. It is not a replacement for professional medical advice, and donated medicines must follow local laws and pharmacist verification.
