const dashboard = "/dashboard";
const clients = "/clients";
const content = "/contents";
const members = "/members";

export const router = {
  BASE: "/",
  DASHBOARD: {
    INDEX: dashboard,
  },
  CLIENT: {
    INDEX: clients,
    LICENSE: `${clients}/license`,
  },
  CONTENT: {
    INDEX: content,
  },
  SYSTEM: {
    MEMBER: members,
  },
};
