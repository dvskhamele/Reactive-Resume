import { t, Trans } from "@lingui/macro";
import { cn } from "@reactive-resume/utils";

type Props = {
  className?: string;
};

export const Copyright = ({ className }: Props) => (
  <div
    className={cn(
      "prose prose-sm prose-zinc flex max-w-none flex-col gap-y-1 text-xs opacity-40 dark:prose-invert",
      className,
    )}
  >
    <span>
      <Trans>
        Licensed under{" "}
        <a
          target="_blank"
          rel="noopener noreferrer nofollow"
          href="https://github.com/signimus-tech/Signimus-Resume-Creator/blob/main/LICENSE.md"
        >
          MIT
        </a>
      </Trans>
    </span>
    <span>{t`By the community, for the community.`}</span>
    <span>
      <Trans>
        A product by <a href="https://www.signimus.com/">Signimus Technologies Private Limited</a>
      </Trans>
    </span>

    <span className="mt-4">
      {t`Signimus Resume Creator`} {"v" + appVersion}
    </span>
  </div>
);
