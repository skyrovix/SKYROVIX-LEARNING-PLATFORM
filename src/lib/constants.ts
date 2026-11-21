// Skyrovix Company Constants & Official Portal Configuration
export const COMPANY = {
  name: "SKYROVIX",
  legalName: "SKYROVIX IT Solutions",
  tagline: "Skill Development & Future Tech Innovations • MSME Certified",
  motto: "Empowering Future Innovators",
  udyamRegistry: "UDYAM-TN-17-0076606",
  email: "skyrovix@gmail.com",
  website: "https://skyrovix.in",
  verificationPortal: "https://skyrovix.in/verify-certificate",
  founder: {
    name: "Hariharan S",
    title: "Founder & CEO",
    org: "Skyrovix"
  },
  cofounder: {
    name: "Maheshwaran S",
    title: "Co-Founder",
    org: "Skyrovix"
  }
};

export function getPublicSiteUrl(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return "https://skyrovix.in";
}

export function durationConfig(duration: number) {
  return {
    months: duration,
    label: `${duration} Month${duration > 1 ? "s" : ""}`
  };
}

