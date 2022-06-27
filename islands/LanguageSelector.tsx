/** @jsx h */
import { h } from "preact";
import { useMemo, useState } from "preact/hooks";
import { tw } from "@twind";

interface LanguageSelectorProps {
  preferredLocale: string | null;
  fallbackLocale: string;
}

const localeFmt = new Intl.DisplayNames(["en"], { type: "language" });

export default function LanguageSelector(props: LanguageSelectorProps) {
  const [localeCode, setLocaleCode] = useState(props.preferredLocale ?? "");

  const locale = useMemo(
    () => {
      try {
        return new Intl.Locale(localeCode || props.fallbackLocale);
      } catch {
        return null;
      }
    },
    [localeCode],
  );

  const readyToSubmit = (props.preferredLocale ?? "") !== localeCode &&
    locale !== null;

  return (
    <form action="/settings" method="post" class={tw`mt-4`}>
      <label htmlFor="language" class={tw`text-gray-600`}>
        Language code
      </label>
      <input
        name="language"
        id="language"
        class={tw`block border px-2 py-1 mt-1`}
        value={localeCode}
        onInput={(e) => setLocaleCode(e.currentTarget.value)}
      />
      {locale &&
        (
          <dl>
            <dt class={tw`text-gray-600 mt-2`}>Language</dt>
            <dd class={tw`text-gray-600`}>{localeFmt.of(locale.language)}</dd>
          </dl>
        )}
      <button
        type="submit"
        class={tw
          `mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 disabled:(bg-blue-200 cursor-default)`}
        disabled={!readyToSubmit}
      >
        Save
      </button>
    </form>
  );
}
