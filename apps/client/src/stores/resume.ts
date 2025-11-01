import { t } from "@lingui/macro";
import { createId } from "@paralleldrive/cuid2";
import type { ResumeDto } from "@reactive-resume/dto";
import type { CustomSectionGroup, SectionKey } from "@reactive-resume/schema";
import { defaultSection } from "@reactive-resume/schema";
import { removeItemInLayout } from "@reactive-resume/utils";
import _set from "lodash.set";
import type { TemporalState } from "zundo";
import { temporal } from "zundo";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { useStoreWithEqualityFn } from "zustand/traditional";

import { debouncedUpdateResume } from "../services/resume";

type ResumeStore = {
  resume: ResumeDto;

  // Actions
  setValue: (path: string, value: unknown) => void;

  // Custom Section Actions
  addSection: () => void;
  removeSection: (sectionId: SectionKey) => void;
};

export const useResumeStore = create<ResumeStore>()(
  temporal(
    immer((set) => ({
      resume: {
        id: "local-resume",
        userId: "local-user",
        name: "My Professional Resume",
        title: "My Professional Resume",
        slug: "my-professional-resume",
        visibility: "private",
        locked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        data: {
          basics: {
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "+1 (555) 123-4567",
            url: { href: "https://johndoe.portfolio", label: "Portfolio" },
            location: "San Francisco, CA",
            headline: "Senior Software Engineer",
            summary: "Passionate software engineer with 5+ years of experience in building scalable web applications using modern technologies.",
            image: "",
            profiles: [],
          },
          sections: {
            basics: {
              id: "basics",
              name: "Personal Information",
              visible: true,
              columns: 1,
              separateLinks: true,
              items: [],
            },
            work: {
              id: "work",
              name: "Work Experience",
              visible: true,
              columns: 1,
              separateLinks: true,
              items: [],
            },
            volunteer: {
              id: "volunteer",
              name: "Volunteer",
              visible: true,
              columns: 1,
              separateLinks: true,
              items: [],
            },
            education: {
              id: "education",
              name: "Education",
              visible: true,
              columns: 1,
              separateLinks: true,
              items: [],
            },
            awards: {
              id: "awards",
              name: "Awards",
              visible: true,
              columns: 1,
              separateLinks: true,
              items: [],
            },
            certificates: {
              id: "certificates",
              name: "Certificates",
              visible: true,
              columns: 1,
              separateLinks: true,
              items: [],
            },
            publications: {
              id: "publications",
              name: "Publications",
              visible: true,
              columns: 1,
              separateLinks: true,
              items: [],
            },
            skills: {
              id: "skills",
              name: "Skills",
              visible: true,
              columns: 1,
              separateLinks: true,
              items: [],
            },
            languages: {
              id: "languages",
              name: "Languages",
              visible: true,
              columns: 1,
              separateLinks: true,
              items: [],
            },
            interests: {
              id: "interests",
              name: "Interests",
              visible: true,
              columns: 1,
              separateLinks: true,
              items: [],
            },
            references: {
              id: "references",
              name: "References",
              visible: true,
              columns: 1,
              separateLinks: true,
              items: [],
            },
            projects: {
              id: "projects",
              name: "Projects",
              visible: true,
              columns: 1,
              separateLinks: true,
              items: [],
            },
            custom: {
              id: "custom",
              name: "Custom",
              visible: true,
              columns: 1,
              separateLinks: true,
              items: [],
            },
          },
          metadata: {
            layout: [[["basics"], ["work"], ["education"], ["projects"], ["skills"], ["languages"], ["interests"]], [["awards"], ["certificates"], ["publications"], ["volunteer"], ["references"]]],
            page: {
              margin: 24.5,
              format: "a4",
              options: {
                breakLine: false,
                pageNumbers: false,
              },
            },
            template: "catalyst",
            theme: {
              background: "#1e293b",
              text: "#1e293b",
              primary: "#22c55e",
            },
            css: {
              value: "* {\n\toutline: 1px solid #000;\n\toutline-offset: 4px;\n}",
              visible: false,
            },
            typography: {
              font: {
                family: "IBM Plex Sans",
                subset: "latin",
                variants: ["regular", "italic", "600", "500", "500italic", "600italic"],
                size: 14,
              },
              lineHeight: 1.5,
              hideIcons: false,
              underlineLinks: true,
            },
            notes: "",
          },
        },
      } as ResumeDto,
      setValue: (path, value) => {
        set((state) => {
          if (path === "visibility") {
            state.resume.visibility = value as "public" | "private";
          } else {
            state.resume.data = _set(state.resume.data, path, value);
          }

          void debouncedUpdateResume(JSON.parse(JSON.stringify(state.resume)));
        });
      },
      addSection: () => {
        const section: CustomSectionGroup = {
          ...defaultSection,
          id: createId(),
          name: t`Custom Section`,
          items: [],
        };

        set((state) => {
          const lastPageIndex = state.resume.data.metadata.layout.length - 1;
          state.resume.data.metadata.layout[lastPageIndex][0].push(`custom.${section.id}`);
          state.resume.data = _set(state.resume.data, `sections.custom.${section.id}`, section);

          void debouncedUpdateResume(JSON.parse(JSON.stringify(state.resume)));
        });
      },
      removeSection: (sectionId: SectionKey) => {
        if (sectionId.startsWith("custom.")) {
          const id = sectionId.split("custom.")[1];

          set((state) => {
            removeItemInLayout(sectionId, state.resume.data.metadata.layout);
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete state.resume.data.sections.custom[id];

            void debouncedUpdateResume(JSON.parse(JSON.stringify(state.resume)));
          });
        }
      },
    })),
    {
      limit: 100,
      wrapTemporal: (fn) => devtools(fn),
      partialize: ({ resume }) => ({ resume }),
    },
  ),
);

export const useTemporalResumeStore = <T>(
  selector: (state: TemporalState<Pick<ResumeStore, "resume">>) => T,
  equality?: (a: T, b: T) => boolean,
) => useStoreWithEqualityFn(useResumeStore.temporal, selector, equality);
