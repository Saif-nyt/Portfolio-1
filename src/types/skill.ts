export type SkillGroupKind = "build" | "cms" | "marketing" | "tracking";

export interface SkillItem {
  name: string;
  /** Short, honest description of how this skill is applied. */
  detail: string;
}

export interface SkillGroup {
  id: string;
  kind: SkillGroupKind;
  title: string;
  label: string;
  summary: string;
  items: SkillItem[];
}
