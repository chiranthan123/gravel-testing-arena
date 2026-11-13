// GRAVEL — NIOS Enrollment Subject Selection & Constraint Validator [F-VAL-208]
import { NiosAcademicStage, NiosCatalogSubject, NiosEnrollmentValidationResult } from '../types';
import { NIOS_STAGE_INFO, MASTER_SUBJECT_CATALOG } from '../data/niosSubjectCatalog';

/**
 * Validates NIOS Subject Selection according to official NIOS admission criteria:
 * 1. Total Subjects Limit (5-7 for Secondary/Senior Secondary; 3-5 for OBE A/B; 5-7 for OBE C)
 * 2. Language Rules: At least 1 language, max 2 languages for primary 5 certification quota (3rd only if >=6 subjects)
 * 3. Examination Clash Constraints for Senior Secondary (Groups C, D, E, F: select at most 1 each)
 * 4. Age Validation against stage minimum age requirement
 * 5. 2-Year Certification Gap Warning for Senior Secondary
 */
export function validateNIOSSubjectSelection(
  stage: NiosAcademicStage,
  selectedCodes: string[],
  catalog: NiosCatalogSubject[] = MASTER_SUBJECT_CATALOG,
  dobString?: string,
  class10PassingYear?: number
): NiosEnrollmentValidationResult {
  const stageInfo = NIOS_STAGE_INFO[stage];
  const errors: string[] = [];
  const warnings: string[] = [];

  // Lookup selected subject objects
  const selectedSubjects = selectedCodes
    .map(code => catalog.find(s => s.code === code && s.stage === stage) || catalog.find(s => s.code === code))
    .filter((s): s is NiosCatalogSubject => !!s);

  const totalSubjects = selectedSubjects.length;

  // 1. Total Subjects Limit
  if (totalSubjects < stageInfo.minSubjects) {
    errors.push(
      `Insufficient subjects: Minimum ${stageInfo.minSubjects} subjects required for ${stageInfo.name} (Currently selected: ${totalSubjects}).`
    );
  } else if (totalSubjects > stageInfo.maxSubjects) {
    errors.push(
      `Subject limit exceeded: Maximum ${stageInfo.maxSubjects} subjects allowed in NIOS admission (Currently selected: ${totalSubjects}).`
    );
  }

  // 2. Language Rules
  const languageSubjects = selectedSubjects.filter(s => s.isLanguage);
  const languageCount = languageSubjects.length;

  if (languageCount < stageInfo.minLanguages) {
    errors.push(`Language requirement missing: You must select at least ${stageInfo.minLanguages} language from Group A.`);
  }

  if (languageCount > 2) {
    if (totalSubjects < 6) {
      errors.push(
        `Language quota conflict: Selecting ${languageCount} languages requires at least 6 total enrolled subjects (A maximum of 2 languages can count toward the core 5-subject certification quota).`
      );
    } else {
      warnings.push(
        `Notice: ${languageCount} languages selected. In NIOS certification, up to 2 languages count in the core passing aggregate; the 3rd language serves as an additional elective.`
      );
    }
  }

  // 3. Senior Secondary Examination Clash Constraints
  const clashes: Array<{ group: string; subjectCodes: string[]; subjectNames: string[] }> = [];

  if (stage === 'SR_SECONDARY' && stageInfo.hasClashRules) {
    const clashGroups: Array<'C' | 'D' | 'E' | 'F'> = ['C', 'D', 'E', 'F'];

    for (const grp of clashGroups) {
      const subjectsInGroup = selectedSubjects.filter(s => s.clashGroupId === grp);
      if (subjectsInGroup.length > 1) {
        const codes = subjectsInGroup.map(s => s.code);
        const names = subjectsInGroup.map(s => `[${s.code}] ${s.name}`);
        clashes.push({
          group: `Group ${grp}`,
          subjectCodes: codes,
          subjectNames: names
        });

        errors.push(
          `Examination Schedule Clash in Group ${grp}: Cannot choose both ${names.join(' and ')} (Exam dates coincide. You may choose at most ONE subject from Group ${grp}).`
        );
      }
    }
  }

  // 4. Age Validation
  let ageValid = true;
  let calculatedAge: number | undefined;
  let ageError: string | undefined;

  if (dobString) {
    const dob = new Date(dobString);
    if (!isNaN(dob.getTime())) {
      // Calculate age as of reference admission date (31st July of session)
      const currentYear = new Date().getFullYear();
      const refDate = new Date(`${currentYear}-07-31`);
      
      let age = refDate.getFullYear() - dob.getFullYear();
      const m = refDate.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && refDate.getDate() < dob.getDate())) {
        age--;
      }
      calculatedAge = age;

      if (age < stageInfo.minAge) {
        ageValid = false;
        ageError = `Age Eligibility Deficit: Learner age (${age} years) is below the minimum mandatory age of ${stageInfo.minAge} years for ${stageInfo.name} admission.`;
        errors.push(ageError);
      }
    }
  }

  // 5. Senior Secondary 2-Year Certification Gap Warning
  let gapValid = true;
  let gapWarning: string | undefined;

  if (stage === 'SR_SECONDARY' && class10PassingYear) {
    const currentYear = new Date().getFullYear();
    const gap = currentYear - class10PassingYear;
    if (gap < 2) {
      gapValid = false;
      gapWarning = `Mandatory 2-Year Certification Interval: Class 10 passed in ${class10PassingYear} (gap: ${gap} year(s)). Student can attempt at most 4 subjects in their first exam session; full Senior Secondary certificate will only be issued upon completing the 2-year gap.`;
      warnings.push(gapWarning);
    }
  }

  return {
    isValid: errors.length === 0,
    totalSubjects,
    languageCount,
    clashes,
    ageValid,
    age: calculatedAge,
    ageError,
    gapValid,
    gapWarning,
    errors,
    warnings
  };
}

