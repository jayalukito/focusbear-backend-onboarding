import { useTranslation } from "react-i18next";

function TranslationExample() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <div>
      <h1>{t("title")}</h1>

      <h2>{t("welcome")}</h2>

      <p>{t("description")}</p>

      <p>{t("helloUser", { name: "John" })}</p>

      <button onClick={() => changeLanguage("en")}>
        {t("english")}
      </button>

      <button onClick={() => changeLanguage("es")}>
        {t("spanish")}
      </button>
    </div>
  );
}

export default TranslationExample;