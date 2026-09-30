# 🎓 TRIBAL SCHOLAR AI

### AI-Enabled Scholarship & Fellowship Management System for Scheduled Tribe Students

**Smart India Hackathon 2026 · Problem Statement 26239**  
**Ministry:** Ministry of Tribal Affairs · **Category:** Software · **Theme:** Smart Education

> **TRIBAL SCHOLAR AI** is a prototype/MVP concept for bringing scholarship and fellowship administration into one connected digital workflow. It supports applicants, scrutiny officers and administrators, with AI-assisted document processing and human oversight for official review and decisions.
---
## 📌 Overview

Scholarship applications involve multiple steps: registration, form completion, document submission, verification, eligibility review, scrutiny, selection support and communication. When these activities are disconnected, applicants may have limited visibility and officials may need to repeat manual checks.

TRIBAL SCHOLAR AI proposes a centralized workflow to help applicants understand their application progress and help authorized officials review and manage applications.

**Core principle:** Digitize the workflow and use AI-assisted tools to support repetitive checks, while keeping authorized people responsible for review and decisions.

## 🔄 End-to-End Workflow

The workflow is the central part of the platform:

```text
                 APPLICANT
                    |
                    v
          Register / Sign in
                    |
                    v
             Select Scheme
                    |
                    v
        Complete Application Form
                    |
                    v
          Upload Supporting Files
                    |
                    v
       AI-Assisted Document Checks
                    |
                    v
       Eligibility Criteria Review
                    |
                    v
       Deficiency Found? -------- No
             |                     |
            Yes                    |
             |                     |
             v                     |
     Notify the Applicant          |
             |                     |
             v                     |
    Correct / Upload Documents     |
             |                     |
             v                     |
      Re-check / Resubmit ---------+
                    |
                    v
        Authorized Officer Scrutiny
                    |
                    v
       Forward / Continue Workflow
                    |
                    v
         Selection Support / Review
                    |
                    v
        Status Updates & Communication
                    |
                    v
       Applicant Tracks Application
                    |
                    v
       Post-Selection Management
```

### How the workflow works

1. **Registration and profile:** The applicant signs in and provides the required profile information.
2. **Scheme selection:** The applicant chooses an available scholarship or fellowship scheme.
3. **Application:** The applicant completes the form and supplies the requested academic, personal and other scheme-related details.
4. **Document submission:** Supporting documents are uploaded for processing and review.
5. **AI-assisted checks:** Where available, document analysis can extract information and flag possible missing, inconsistent or unreadable details.
6. **Eligibility review:** Applicant information, supporting evidence and configured scheme criteria are considered criterion by criterion.
7. **Deficiency resolution:** If information or documents need attention, the applicant is notified and can correct or resubmit them.
8. **Officer scrutiny:** An authorized officer reviews the application, documents, eligibility evidence, AI-generated information and any resubmissions; the officer can add remarks or request corrections.
9. **Selection support:** The workflow can support the next review or selection stage. AI output is not an autonomous government selection decision.
10. **Communication and tracking:** Applicants can view the current stage, completed steps and any action required.
11. **Post-selection management:** Further status and administrative activities can be handled through the platform's workflow.

## 👥 User Roles

### 🎓 Applicant
- Register, sign in and manage a profile.
- Browse/select schemes and complete an application.
- Upload documents and respond to deficiencies.
- View verification/eligibility information, notifications and application progress.

### 🧑‍💼 Scrutiny Officer
- View assigned applications and submitted documents.
- Review AI-assisted information and eligibility evidence.
- Record remarks, identify deficiencies and request corrections.
- Review resubmissions and update or forward the application through the workflow.

### 🧑‍💻 Administrator
- Monitor applications and workflow stages.
- Manage scheme information, configured rules and user roles.
- View dashboards, reports, notifications and audit information.

## 🤖 AI-Assisted Document Intelligence

AI is intended as a **decision-support layer**, not a replacement for authorized officials.

```text
Document upload
      ↓
File validation
      ↓
Document analysis / OCR
      ↓
Information extraction
      ↓
Completeness and consistency checks
      ↓
Comparison with application data and configured criteria
      ↓
Evidence / possible issue presented for human review
```

Depending on the document and processing capability, information may include an applicant name, certificate details, dates, institution or qualification. Extracted information should be checked against the submitted application and relevant requirements.

### Human-in-the-loop safeguards

- AI results can be incomplete or incorrect, particularly for blurry, partial, unusual or poorly scanned documents.
- Officers should be able to inspect the source document and review extracted information.
- Uncertain or problematic cases should be routed for human review.
- Official verification, scrutiny and decisions remain with authorized personnel.
- The system should retain appropriate records of important actions for traceability.

AI/OCR output should not be represented as guaranteed verification, fraud detection or a final eligibility/selection decision.

## 🧮 Eligibility and Deficiency Handling

### Configurable eligibility review

Different schemes can have different criteria and document requirements. The platform is designed to organize criteria so that each requirement can be considered separately, with supporting evidence and a review status.

Example (illustrative only):

| Criterion | Example status |
|---|---|
| Category requirement | Meets requirement |
| Academic requirement | Meets requirement |
| Income requirement | Meets requirement |
| Required document | Submitted |
| Additional evidence | Review required |

An explanatory, criterion-level view is more useful than an unexplained overall score.

### Deficiency resolution

```text
Issue identified
      ↓
Deficiency recorded
      ↓
Applicant notified
      ↓
Applicant corrects / resubmits
      ↓
Document or information rechecked
      ↓
Officer reviews the response
```

For example, if an income certificate needs attention, the applicant should see what needs correction and how to respond, rather than receiving only a generic rejection message.

## 📊 Application Tracking & Administration

Applicants need visibility into the current stage and any action expected from them. A status timeline can show stages such as:

`Submitted → Documents → Verification → Eligibility Review → Officer Scrutiny → Selection Review → Final Status`

Administrators can use dashboards and reports to monitor application volumes, scheme activity, verification, scrutiny, selection stages, notifications and audit information, subject to the capabilities implemented in the prototype.

## 🏛️ Scheme Support

The proposed platform is intended to support multiple schemes through shared application workflows and scheme-specific configuration, such as:

- Scheme information
- Eligibility criteria
- Required documents
- Validation requirements
- Workflow stages

The problem context includes schemes such as the **National Fellowship for Scheduled Tribe (NFST)** and **National Overseas Scholarship (NOS)**. Actual rules and requirements must be validated against current official scheme guidance before any production use.

## 🧱 Technology

The project source is a **React + TypeScript + Vite** frontend. The package configuration also includes Tailwind CSS, React Router, Recharts, Lucide icons and the Supabase JavaScript client.

| Technology | Role |
|---|---|
| React | Component-based user interface |
| TypeScript | Typed application code |
| Vite | Development server and build tooling |
| Tailwind CSS | Styling utilities |
| React Router | Client-side navigation |
| Recharts | Charts and visual reporting |
| Supabase JS | Supabase client library included in dependencies |
| Lucide React | Interface icons |

Only describe a service as integrated or operational if it is connected and working in the current codebase. Proposed backend, database, AI-provider, OCR and government integrations should be documented separately once their implementation is confirmed.

## 🖥️ Run Locally

### Prerequisites
- Node.js and npm
- Git

### Setup

```bash
git clone <YOUR-REPOSITORY-URL>
cd <PROJECT-DIRECTORY>
npm install
npm run dev
```

Vite prints a local development URL in the terminal (commonly `http://localhost:5173/`). Open that URL in your browser.

### Other project scripts

```bash
npm run build
npm run lint
npm run typecheck
npm run preview
```

Configure any required environment variables locally according to the project's setup. **Do not commit real `.env` files, API keys, credentials, applicant records or private documents.** Use dummy data for demonstrations and screenshots.

## 🎬 Suggested Demonstration Flow

A clear demo can follow one applicant's journey from beginning to end:

1. Sign in as an applicant and select a scheme.
2. Complete the application and upload sample documents.
3. Show the document-checking and eligibility-review experience.
4. Demonstrate a deficiency notification and applicant resubmission, if supported.
5. Switch to the officer view to review the application and record scrutiny.
6. Show the administrator's monitoring view.
7. Return to the applicant view to show status tracking and communication.

This demonstrates how the modules connect as one workflow, rather than as separate screens. Use only synthetic/demo information.

## 🔐 Security, Privacy & Limitations

This is an **SIH 2026 prototype/MVP**. Before production use, the system would require appropriate validation and review of:

- Authentication, role-based authorization and access controls
- Secure handling, storage, retention and deletion of applicant documents
- Protection of personal and financial information
- Server-side validation, logging and auditability
- AI/OCR accuracy, evidence display, human review and error handling
- Accessibility, language support, reliability and operational monitoring
- Official validation of scheme rules and any government integrations

Do not use real applicant information in public demos or repository examples. Do not claim production readiness, guaranteed accuracy or official government approval unless those claims have been formally established.

## 🚀 Future Enhancements

Potential future work includes multilingual interfaces, additional Indian-language voice search, improved document intelligence, secure document verification, notifications, expanded analytics, accessibility improvements, approved government integrations and production-grade security and scalability.

## 📚 References

- [Ministry of Tribal Affairs](https://tribal.nic.in/ScholarshiP.aspx)
- [DBT Tribal Schemes](https://dbttribal.gov.in/AllScheme.aspx)

Refer to the official sources for scheme context and verify current requirements before implementation or deployment.

## 🧑‍💻 Project Information

| Field | Details |
|---|---|
| Project | TRIBAL SCHOLAR AI |
| SIH Problem Statement | 26239 |
| Hackathon | Smart India Hackathon 2026 |
| Ministry | Ministry of Tribal Affairs |
| Category | Software |
| Theme | Smart Education |

## ⭐ Core Idea

> A unified, configurable and AI-assisted scholarship workflow that helps applicants follow their application journey and helps authorized officials review and manage applications, with human oversight at critical decision points.

---

**Disclaimer:** This project demonstrates a proposed solution for SIH 2026 Problem Statement 26239. Actual government deployment would require official validation, security and privacy reviews, verified scheme rules, suitable infrastructure, accessibility testing and approved operational processes. AI-assisted results are decision-support information and must not be treated as a substitute for authorized human review.
