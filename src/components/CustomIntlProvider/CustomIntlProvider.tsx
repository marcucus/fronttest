import React, { useEffect, useState } from "react";

import { IntlProvider } from "react-intl";

import en from "../../i18n/messages/en.json";
import fr from "../../i18n/messages/fr.json";

import {
  connector,
  ContainerProps,
} from "./containers/CustomIntlProvider.containers";

const messages = { en, fr };

type Props = {
  defautlLang: string;
  onMount: (lang: string) => void;
};

export const Wrapper: React.FC<Props> = (props) => {
  const { defautlLang } = props;
  const [dynamicLanguage, setDynamicLanguage] = useState(defautlLang);

  useEffect(() => {
    const { languages } = navigator;
    const language = localStorage.getItem("language");
    const selectTheRightLanguage =
      language ||
      languages.find((value) => /(^fr)|(^en)/gim.exec(value)) ||
      "en";

    const [lang] = selectTheRightLanguage.split("-");

    const definitiveLang = lang || defautlLang;

    setDynamicLanguage(lang || defautlLang);

    props.onMount(definitiveLang);
  }, []);

  return (
    <IntlProvider
      locale={dynamicLanguage || defautlLang}
      // @ts-ignore
      messages={messages[dynamicLanguage || defautlLang]}
    >
      {props.children}
    </IntlProvider>
  );
};

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
);

export const CustomIntlProvider = connector(Container);
