import type { Scheme } from '@/types';

export const schemes: Record<string, Scheme> = {
  nfst: {
    id: 'nfst',
    code: 'NFST',
    name: 'National Fellowship for Scheduled Tribes',
    shortName: 'National Fellowship for ST',
    description:
      'Financial assistance to Scheduled Tribe students for pursuing higher education leading to M.Phil and Ph.D. degrees in universities and institutions recognized by UGC.',
    purpose:
      'Support higher education and research for eligible Scheduled Tribe students pursuing M.Phil and Ph.D. programmes in India.',
    studyLevel: 'Doctoral',
    destination: 'India',
    status: 'Open',
    applicationOpen: '01 Sep 2026',
    applicationClose: '31 Oct 2026',
    overview:
      'The National Fellowship for Scheduled Tribes provides financial support to ST students for pursuing full-time M.Phil and Ph.D. programmes in Indian universities, institutions, and scientific institutions deemed to be universities. The fellowship aims to encourage ST students to engage with advanced study and research, and to build academic and research capacity within Scheduled Tribe communities.',
    whoCanApply: [
      'Indian citizen belonging to a Scheduled Tribe community',
      'Candidate pursuing or admitted to a full-time M.Phil or Ph.D. programme',
      'Enrolled in a UGC-recognized university or institution',
      'Meets the income and qualification criteria configured by the Ministry',
    ],
    studyCategory: [
      'Humanities and Social Sciences',
      'Science and Technology',
      'Engineering',
      'Medical and Allied Sciences',
      'Commerce and Management',
      'Law',
    ],
    applicationProcess: [
      'Register on the Tribal Scholar portal and complete your profile',
      'Select the National Fellowship for Scheduled Tribes scheme',
      'Complete the application form with academic and personal details',
      'Upload required documents in the specified formats',
      'Submit the application for verification',
      'Track application status through your dashboard',
    ],
    importantInfo: [
      'Scheme-specific criteria configured by the Ministry',
      'Applications are accepted only during the open application window',
      'Incomplete applications or applications with missing documents will not be considered',
      'The fellowship amount and duration are determined by scheme guidelines',
    ],
    applicationFields: [
      { id: 'full_name', label: 'Full Name', type: 'text', required: true, section: 'personal', placeholder: 'As per official ID' },
      { id: 'st_certificate', label: 'Scheduled Tribe Certificate', type: 'file', required: true, section: 'documents' },
      { id: 'research_topic', label: 'Proposed Research Topic', type: 'textarea', required: true, section: 'academic' },
      { id: 'university', label: 'Enrolled University', type: 'text', required: true, section: 'academic' },
      { id: 'programme', label: 'Programme', type: 'select', required: true, section: 'academic', options: ['M.Phil', 'Ph.D.'] },
      { id: 'income_certificate', label: 'Family Income Certificate', type: 'file', required: true, section: 'documents' },
    ],
    requiredDocuments: [
      { id: 'st_cert', label: 'Scheduled Tribe Certificate', description: 'Issued by competent authority', format: 'PDF', maxSize: '2 MB' },
      { id: 'income_cert', label: 'Family Income Certificate', description: 'Current financial year', format: 'PDF', maxSize: '2 MB' },
      { id: 'admission_proof', label: 'Proof of Admission', description: 'Admission letter from university', format: 'PDF', maxSize: '2 MB' },
      { id: 'marksheet_pg', label: 'Postgraduate Marksheet', description: 'Final year PG marksheet', format: 'PDF', maxSize: '2 MB' },
      { id: 'research_proposal', label: 'Research Proposal', description: 'Detailed research synopsis', format: 'PDF', maxSize: '5 MB' },
      { id: 'photo', label: 'Passport-size Photograph', description: 'Recent colour photograph', format: 'JPG', maxSize: '200 KB' },
    ],
    eligibilityRules: [
      { id: 'st_status', label: 'ST Community', description: 'Applicant must belong to a Scheduled Tribe community', category: 'demographic' },
      { id: 'admission', label: 'Valid Admission', description: 'Must be admitted to a full-time M.Phil or Ph.D. programme', category: 'academic' },
      { id: 'income', label: 'Income Ceiling', description: 'Scheme-specific criteria configured by the Ministry', category: 'financial' },
    ],
    screeningCriteria: [
      { id: 'academic_record', label: 'Academic Record', weight: 30, description: 'Performance in qualifying examinations' },
      { id: 'research_proposal', label: 'Research Proposal', weight: 35, description: 'Quality and feasibility of proposed research' },
      { id: 'interview', label: 'Interview', weight: 25, description: 'Panel assessment of candidate' },
      { id: 'diversity', label: 'Diversity Factor', weight: 10, description: 'Regional and subject diversity considerations' },
    ],
  },
  nos: {
    id: 'nos',
    code: 'NOS',
    name: 'National Overseas Scholarship',
    shortName: 'National Overseas Scholarship',
    description:
      'Financial assistance to Scheduled Tribe students for pursuing higher studies abroad at prescribed foreign universities and institutions.',
    purpose:
      'Support eligible Scheduled Tribe students pursuing higher studies abroad at prescribed foreign universities and institutions.',
    studyLevel: 'Postgraduate',
    destination: 'Abroad',
    status: 'Open',
    applicationOpen: '15 Sep 2026',
    applicationClose: '30 Nov 2026',
    overview:
      'The National Overseas Scholarship supports meritorious Scheduled Tribe students for pursuing higher studies abroad at prescribed foreign universities and institutions in selected disciplines. The scholarship covers tuition, maintenance, and other approved expenses, enabling ST students to access international educational opportunities.',
    whoCanApply: [
      'Indian citizen belonging to a Scheduled Tribe community',
      'Candidate below the age limit configured by the Ministry',
      'Has secured admission to a prescribed foreign university',
      'Meets the income and qualification criteria configured by the Ministry',
    ],
    studyCategory: [
      'Engineering and Technology',
      'Medicine',
      'Management',
      'Science',
      'Social Science',
      'Law',
    ],
    applicationProcess: [
      'Register on the Tribal Scholar portal and complete your profile',
      'Select the National Overseas Scholarship scheme',
      'Complete the application form with academic and personal details',
      'Upload proof of admission to a foreign university',
      'Submit required documents including passport and visa details',
      'Track application status through your dashboard',
    ],
    importantInfo: [
      'Scheme-specific criteria configured by the Ministry',
      'Admission to a prescribed foreign university is required',
      'The scholarship covers approved expenses as per scheme guidelines',
      'Awardees must comply with bond and return conditions specified by the Ministry',
    ],
    applicationFields: [
      { id: 'full_name', label: 'Full Name', type: 'text', required: true, section: 'personal', placeholder: 'As per passport' },
      { id: 'st_certificate', label: 'Scheduled Tribe Certificate', type: 'file', required: true, section: 'documents' },
      { id: 'foreign_university', label: 'Foreign University', type: 'text', required: true, section: 'academic' },
      { id: 'course', label: 'Course of Study', type: 'text', required: true, section: 'academic' },
      { id: 'admission_letter', label: 'Admission Letter from Foreign University', type: 'file', required: true, section: 'documents' },
      { id: 'passport', label: 'Passport Details', type: 'text', required: true, section: 'personal' },
    ],
    requiredDocuments: [
      { id: 'st_cert', label: 'Scheduled Tribe Certificate', description: 'Issued by competent authority', format: 'PDF', maxSize: '2 MB' },
      { id: 'income_cert', label: 'Family Income Certificate', description: 'Current financial year', format: 'PDF', maxSize: '2 MB' },
      { id: 'admission_letter', label: 'Admission Letter', description: 'From prescribed foreign university', format: 'PDF', maxSize: '2 MB' },
      { id: 'passport', label: 'Valid Passport', description: 'First and last page', format: 'PDF', maxSize: '2 MB' },
      { id: 'marksheet_pg', label: 'Qualifying Degree Marksheet', description: 'Relevant qualifying examination', format: 'PDF', maxSize: '2 MB' },
      { id: 'photo', label: 'Passport-size Photograph', description: 'Recent colour photograph', format: 'JPG', maxSize: '200 KB' },
    ],
    eligibilityRules: [
      { id: 'st_status', label: 'ST Community', description: 'Applicant must belong to a Scheduled Tribe community', category: 'demographic' },
      { id: 'age_limit', label: 'Age Limit', description: 'Scheme-specific criteria configured by the Ministry', category: 'demographic' },
      { id: 'foreign_admission', label: 'Foreign Admission', description: 'Must have admission to a prescribed foreign university', category: 'academic' },
      { id: 'income', label: 'Income Ceiling', description: 'Scheme-specific criteria configured by the Ministry', category: 'financial' },
    ],
    screeningCriteria: [
      { id: 'academic_record', label: 'Academic Record', weight: 35, description: 'Performance in qualifying examinations' },
      { id: 'university_ranking', label: 'University Ranking', weight: 25, description: 'Reputation and ranking of the foreign university' },
      { id: 'interview', label: 'Interview', weight: 30, description: 'Panel assessment of candidate' },
      { id: 'diversity', label: 'Diversity Factor', weight: 10, description: 'Regional and subject diversity considerations' },
    ],
  },
};

export const schemeList = Object.values(schemes);
