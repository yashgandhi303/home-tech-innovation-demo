export type CountryProps = {
  code?: string;
  name?: string;
  native?: string;
  phone?: string;
  continent?: Continent;
  capital?: string;
  currency?: string;
  languages?: Array<Language>;
  emoji?: string;
  emojiU?: string;
  states?: Array<State>;
};

export type Continent = {
  code?: string;
  name?: string;
  countries?: CountryProps;
};

export type State = {
  code?: string;
  name?: string;
  country?: CountryProps;
};

export type Language = {
  code?: string;
  name?: string;
  native?: string;
  rtl?: boolean;
};
