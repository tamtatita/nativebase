export const gender = [
  { value: "male", label: "Nam" },
  { value: "female", label: "Nữ" },
];

export const customerType = [
  { value: "candidate", label: "Người xin việc" },
  { value: "hr", label: "Nhà tuyển dụng" },
];

export const LOGIN_TYPES = {
  OFFICE365: "OFFICE365LOGINTYPE",
  MANUAL: "MANUALLOGINTYPE",
};

export const USERTYPES = {
  Recruiter: "Recruiter",
  Candidate: "Candidate",
};

export const GENDERS = {
  MALE: "Male",
  FEMALE: "Female",
};

export const CRITERIATYPES = {
  JOBTITLE: "JobTitle",
  JOBTYPE: "JobType",
  WORKINGMODEL: "WorkingModel",
  EXPERIENCE: "Experience",
};

export class SendEmailItem {
  constructor(
    ToEmails,
    Subject,
    Body,
    TemplateId,
    Replacements,
    Attachments,
    CcEmails,
    BccEmails,
    Priority,
    SmtpAddress,
    PortNumber,
    EmailFrom,
    Password,
    IsTest = false,
    RefId,
    DataSource
  ) {
    this.ToEmails = ToEmails;
    this.Subject = Subject;
    this.Body = Body;
    this.TemplateId = TemplateId;
    this.Replacements = Replacements;
    this.Attachments = Attachments;
    this.CcEmails = CcEmails;
    this.BccEmails = BccEmails;
    this.Priority = Priority;
    this.SmtpAddress = SmtpAddress;
    this.PortNumber = PortNumber;
    this.EmailFrom = EmailFrom;
    this.Password = Password;
    this.IsTest = IsTest;
    this.RefId = RefId;
    this.DataSource = DataSource;
  }
}

export const JOBAPPLICATIONSTATUS = {
  Sent: "Sent",
  Accepted: "Accepted",
  Rejected: "Rejected",
  Pending: "Pending",
};
