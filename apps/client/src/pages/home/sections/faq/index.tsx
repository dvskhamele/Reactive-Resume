/* eslint-disable lingui/text-restrictions */
/* eslint-disable lingui/no-unlocalized-strings */

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";

import { useLanguages } from "@/client/services/resume/translation";

// Who are you, and why did you build Signimus Resume Creator?
const Question1 = () => (
  <AccordionItem value="1">
    <AccordionTrigger className="text-left leading-relaxed">
      Who are you, and why did you build Signimus Resume Creator?
    </AccordionTrigger>
    <AccordionContent className="prose max-w-none dark:prose-invert">
      <p>
        We are a team of developers at Signimus Technologies Private Limited, working to create the best resume building experience.
        We're based in India and have a passion for helping people create amazing resumes. Our team includes developers with experience
        from various tech companies who decided to collaborate on this project.
      </p>

      <p>
        The idea for Signimus Resume Creator started when we realized that many people struggle with creating professional-looking
        resumes. We wanted to build a tool that would make this process easy and accessible to everyone.
      </p>

      <p>
        We decided to build the first version of Signimus Resume Creator in 2023. Since then, it's gone through
        multiple iterations as we've learned a lot of better coding practices over the years.
      </p>

      <p>
        At the time of writing, Signimus Resume Creator is one of the few resume
        builders out there available to the world for free and without an annoying paywall at the
        end. While being free is often associated with software that's not of good quality, we strive
        to prove them wrong and build a product that people love using and benefit from.
      </p>

      <p>
        My dream has always been to build something that at least a handful people use on a daily
        basis, and I'm extremely proud to say that Signimus Resume Creator, over its years of development,
        has <strong>helped over half a million people build their resume</strong>, and I hope it
        only increases from here and reaches more people who are in need of a good resume to
        kickstart their career.
      </p>
    </AccordionContent>
  </AccordionItem>
);

// How much does it cost to run Signimus Resume Creator?
const Question2 = () => (
  <AccordionItem value="2">
    <AccordionTrigger className="text-left leading-relaxed">
      How much does it cost to run Signimus Resume Creator?
    </AccordionTrigger>
    <AccordionContent className="prose max-w-none dark:prose-invert">
      <p>
        It's not much honestly. <a href="https://m.do.co/c/ceae1fff245e">DigitalOcean</a> has
        graciously sponsored their infrastructure to allow us to host Signimus Resume Creator on their
        platform. There's only the fee I pay to dependent services to send emails, renew the domain,
        etc.
      </p>

      <p>
        I've spent countless hours and sleepless nights building the application though, and I
        honestly do not expect anything in return but to hear from you on how the app has helped you
        with your career.
      </p>

      <p>
        But if you do feel like supporting the developer and the future development of Reactive
        Resume, please donate (<em>only if you have some extra money lying around</em>) on my{" "}
        <a href="https://github.com/sponsors/signimus-tech/">GitHub Sponsors page</a>. You can choose
        to donate one-time or sponsor a recurring donation.
      </p>

      <p>
        Alternatively, if you are in the US, or you are a part of a large educational institution or
        corporate organization, you can{" "}
        <a href="https://opencollective.com/signimus-resume-creator">
          support the project through Open Collective
        </a>
        . We are fiscally hosted through Open Collective Europe, which means your donations and
        sponsorships could also be made tax-deductible.
      </p>
    </AccordionContent>
  </AccordionItem>
);

// Other than donating, how can I support you?
const Question3 = () => (
  <AccordionItem value="3">
    <AccordionTrigger className="text-left leading-relaxed">
      Other than donating, how can I support you?
    </AccordionTrigger>
    <AccordionContent className="prose max-w-none dark:prose-invert">
      <p>
        <strong>If you speak a language other than English</strong>, sign up to be a translator on{" "}
        <a href="https://readylaunch.signimus.com/translate/" target="_blank" rel="noreferrer">
          Crowdin
        </a>
        , our translation management service. You can help translate the product to your language
        and share it among your community. Even if the language is already translated, it helps to
        sign up as you would be notified when there are new phrases to be translated.
      </p>

      <p>
        <strong>If you work in the media, are an influencer or have lots of friends</strong>, share
        the app with your circles and let them know so it can reach the people who need it the most.
        I'm also <a href="mailto:support@signimus.com">open to giving tech talks</a>, although
        that's wishful thinking. But if you do mention Signimus Resume Creator on your blog, let us know so
        that I can link back to you here.
      </p>

      <p>
        <strong>If you found a bug or have an idea for a feature</strong>, raise an issue on{" "}
        <a
          href="https://github.com/signimus-tech/Signimus-Resume-Creator/issues/new/choose"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>{" "}
        or shoot me a message and let me know what you'd like to see. I can't promise that it'll be
        done soon, but juggling work, life and open-source, I'll definitely get to it when I can.
      </p>
    </AccordionContent>
  </AccordionItem>
);

// What languages are supported on Signimus Resume Creator?
const Question4 = () => {
  const { languages } = useLanguages();

  return (
    <AccordionItem value="4">
      <AccordionTrigger className="text-left leading-relaxed">
        What languages are supported on Signimus Resume Creator?
      </AccordionTrigger>
      <AccordionContent className="prose max-w-none dark:prose-invert">
        <p>
          Here are the languages currently supported by Signimus Resume Creator, along with their respective
          completion percentages.
        </p>

        <div className="flex flex-wrap items-start justify-start gap-x-2 gap-y-4">
          {languages.map((language) => (
            <a
              key={language.id}
              className="no-underline"
              href={`https://crowdin.com/translate/reactive-resume/all/en-${language.editorCode}`}
              target="_blank"
              rel="noreferrer"
            >
              <div className="relative bg-secondary-accent font-medium transition-colors hover:bg-primary hover:text-background">
                <span className="px-2 py-1">{language.name}</span>

                {language.progress !== undefined && (
                  <span
                    className={cn(
                      "inset-0 bg-warning px-1.5 py-1 text-xs text-white",
                      language.progress < 40 && "bg-error",
                      language.progress > 80 && "bg-success",
                    )}
                  >
                    {language.progress}%
                  </span>
                )}
              </div>
            </a>
          ))}
        </div>

        <p>
          If you'd like to improve the translations for your language, please{" "}
          <a href="https://crowdin.com/project/reactive-resume" rel="noreferrer" target="_blank">
            sign up as a translator on Crowdin
          </a>{" "}
          and join the project. You can also choose to be notified of any new phrases that get added
          to the app.
        </p>

        <p>
          If a language is missing from this list, please raise an issue on GitHub requesting its
          inclusion, and I will make sure to add it as soon as possible.
        </p>
      </AccordionContent>
    </AccordionItem>
  );
};

// How does the OpenAI Integration work?
const Question5 = () => (
  <AccordionItem value="5">
    <AccordionTrigger className="text-left leading-relaxed">
      How does the OpenAI Integration work?
    </AccordionTrigger>
    <AccordionContent className="prose max-w-none dark:prose-invert">
      <p>
        OpenAI has been a game-changer for all of us. I cannot tell you how much ChatGPT has helped
        us in our everyday work and with the development of Signimus Resume Creator. It only makes sense that
        you leverage what AI has to offer and let it help you build the perfect resume.
      </p>

      <p>
        While most applications out there charge you a fee to use their AI services (rightfully so,
        because it isn't cheap), you can choose to enter your own OpenAI API key on the Settings
        page (under OpenAI Integration).{" "}
        <strong>The key is stored in your browser's local storage</strong>, which means that if you
        uninstall your browser, or even clear your data, the key is gone with it. All requests made
        to OpenAI are also sent directly to their service and does not hit the app servers at all.
      </p>

      <p>
        You are free to turn off all AI features (and not be aware of it's existence) simply by not
        adding a key in the Settings page and still make use of all the useful features that
        Signimus Resume Creator has to offer. We would even suggest you to take the extra step of using
        ChatGPT to write your content, and simply copy it over to Signimus Resume Creator.
      </p>
    </AccordionContent>
  </AccordionItem>
);

export const FAQSection = () => (
  <section id="faq" className="container relative py-24 sm:py-32">
    <div className="grid gap-12 lg:grid-cols-3">
      <div className="space-y-6">
        <h2 className="text-4xl font-bold">Frequently Asked Questions</h2>

        <p className="text-base leading-loose">
          Here are some questions we often get asked about Signimus Resume Creator.
        </p>

        <p className="text-sm leading-loose">
          Unfortunately, this section is available only in English, as I do not want to burden
          translators with having to translate these large paragraphs of text.
        </p>
      </div>

      <div className="col-span-2">
        <Accordion collapsible type="single">
          <Question1 />
          <Question2 />
          <Question3 />
          <Question4 />
          <Question5 />
        </Accordion>
      </div>
    </div>
  </section>
);
