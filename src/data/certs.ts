// Certifications & learning. Credential links provided by the user. Group labels
// stay English (UI chrome); course titles are kept verbatim (mixed EN/KO).
// TODO(user): a few Fast Campus certs are PDFs with no public link.

const INFLEARN = "https://www.inflearn.com/certificate/";

export interface CertItem {
  name: string;
  year: string;
  url?: string;
}

export interface CertGroup {
  label: string;
  items: CertItem[];
}

// Essentials — always shown.
export const CERTS_MAIN: CertGroup[] = [
  {
    label: "Certifications",
    items: [
      { name: "AWS Certified Cloud Practitioner", year: "2019" },
      { name: "정보처리기사 (Engineer Information Processing)", year: "2019" },
    ],
  },
  {
    label: "Programs & Mentoring",
    items: [
      { name: "Woowacourse 8th · Pre-course", year: "2025" },
      { name: "F-Lab · Java Backend Mentoring", year: "2025" },
      { name: "likelion AI School · 4th", year: "2021" },
    ],
  },
];

// Online-course certificates — folded behind a toggle so the section stays light.
export const CERTS_COURSES: CertGroup[] = [
  {
    label: "Spring / JPA · Inflearn (김영한)",
    items: [
      { name: "실전! 스프링 부트와 JPA 활용 2", year: "2025", url: INFLEARN + "50738-324214-4786223" },
      { name: "실전! 스프링 부트와 JPA 활용 1", year: "2025", url: INFLEARN + "50738-325710-12068793" },
      { name: "실전! 스프링 데이터 JPA", year: "2025", url: INFLEARN + "50738-324474-4786225" },
      { name: "자바 ORM 표준 JPA 프로그래밍 · 기본편", year: "2025", url: INFLEARN + "50738-324109-4786222" },
      { name: "실전! Querydsl", year: "2025", url: INFLEARN + "50738-324476-4786226" },
      { name: "스프링 DB 1편 · 데이터 접근 핵심 원리", year: "2025", url: INFLEARN + "50738-328723-11948613" },
      { name: "김영한의 실전 자바 · 기본편", year: "2024", url: INFLEARN + "50738-332506-12699504" },
      { name: "스프링 핵심 원리 · 기본편", year: "2022", url: INFLEARN + "50738-325969-4744277" },
      { name: "스프링 MVC 1편", year: "2022", url: INFLEARN + "50738-326674-4744276" },
      { name: "스프링 MVC 2편", year: "2022", url: INFLEARN + "50738-327260-4744278" },
      { name: "모든 개발자를 위한 HTTP 웹 기본 지식", year: "2022", url: INFLEARN + "50738-326277-4744275" },
    ],
  },
  {
    label: "AI / LLM",
    items: [
      { name: "비용을 줄이는 LLM Prompt Tuning · Fast Campus", year: "2023" },
      { name: "BERT · GPT-3 자연어처리 · Fast Campus", year: "2023" },
    ],
  },
  {
    label: "Foundations",
    items: [
      { name: "IaC: AWS & Terraform · Inflearn", year: "2024", url: INFLEARN + "50738-324119-4786224" },
      { name: "코딩테스트 필수 알고리즘 · Inflearn", year: "2025", url: INFLEARN + "50738-335301-14352816" },
      { name: "FastAPI · The Complete Course · Udemy", year: "2022", url: "https://www.udemy.com/certificate/UC-569eaf96-ea6a-451c-b49d-d18ca36dec43/" },
      { name: "Python Bootcamp: Zero to Hero · Udemy", year: "2021", url: "https://www.udemy.com/certificate/UC-254bc503-99b5-496b-b6c1-62c4207204c8/" },
      { name: "Web Development Bootcamp · Udemy", year: "2021", url: "https://www.udemy.com/certificate/UC-b7935f05-a7aa-4d67-b3d1-7fc42dae6260/" },
      { name: "Python Data Structures · Coursera", year: "2020", url: "https://www.coursera.org/account/accomplishments/certificate/M9A234Y8NCHQ" },
      { name: "Programming for Everybody · Coursera", year: "2020", url: "https://www.coursera.org/account/accomplishments/certificate/53L9N7VYKFHM" },
    ],
  },
];

// The cute Inflearn 2025 annual badge (top "Master" grade by study hours) —
// tucked into the section as a small easter egg.
export const INFLEARN_BADGE = {
  src: "/inflearn-master.png",
  recap: "Inflearn 2025 recap",
  grade: "Master",
  hours: "76h 53m",
  url: "https://www.inflearn.com",
};
