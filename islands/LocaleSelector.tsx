/** @jsx h */
import { h } from "preact";
import { useMemo, useState } from "preact/hooks";
import { tw } from "@twind";

const localeFmt = new Intl.DisplayNames(["en"], { type: "language" });
const date = new Date();

export default function LocaleSelector() {
  const [localeCode, setLocaleCode] = useState("");

  const [locale, dateFmt] = useMemo(
    () => {
      try {
        const locale = new Intl.Locale(localeCode);
        const dateFmt = new Intl.DateTimeFormat(locale.language, {
          dateStyle: "long",
          timeStyle: "medium",
        });
        return [locale, dateFmt];
      } catch {
        return [null, null];
      }
    },
    [localeCode],
  );

  const readyToSubmit = localeCode === "" || locale !== null;

  return (
    <form action="/settings" method="post" class={tw`mt-4`}>
      <label htmlFor="locale">Locale</label>
      <input
        type="text"
        name="locale"
        id="locale"
        class={tw`border px-2 py-1`}
        value={localeCode}
        onInput={(e) => setLocaleCode(e.currentTarget.value)}
      />
      <button
        type="submit"
        class={tw`bg-blue(500 hover:700 disabled:200) text-white px-2 py-1`}
        disabled={!readyToSubmit}
      >
        Save
      </button>
      {locale && dateFmt &&
        (
          <dl>
            <dt class={tw`text-gray-600 mt-2 font-bold`}>Language</dt>
            <dd class={tw`text-gray-600`}>{localeFmt.of(locale.language)}</dd>
            <dt class={tw`text-gray-600 mt-2 font-bold`}>Time sample</dt>
            <dd class={tw`text-gray-600`}>{dateFmt.format(date)}</dd>
          </dl>
        )}
    </form>
  );
}
