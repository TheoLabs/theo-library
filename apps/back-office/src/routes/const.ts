const dashboard = "/dashboard";
const library = "/library";
const contract = "/contracts";
const content = "/contents";
const members = "/members";

export const router = {
  BASE: "/",
  DASHBOARD: {
    INDEX: dashboard,
  },
  LIBRARY: {
    INDEX: library,
    CONTRACT: `${contract}`,
    LICENSE: `${library}/license`,
  },
  CONTENT: {
    INDEX: content,
  },
  SYSTEM: {
    MEMBER: members,
  },
};
