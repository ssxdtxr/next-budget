export type Currency = { value: string; label: string; locale: string };

export const Currencies: Currency[] = [
  { value: "RUB", label: "₽ Rubles", locale: "ru_RU" },

  { value: "USD", label: "$ Dollar", locale: "en-US" },
  { value: "EUR", label: "€ Euro", locale: "de-DE" },

  { value: "JPY", label: "¥ Yen", locale: "ja-JP" },
  { value: "GBP", label: "£ Pound", locale: "en-GB" },
];
