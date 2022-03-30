export enum BlockTypes {
  EMPTY = "empty",
  TEXT = "text",
  BUTTON = "text",
  HEADING = "text",
  IMAGE = "image",
  HERO_1 = "hero/1",
}

export type Paragraph = {
  id: string;
  type: BlockTypes.TEXT;
  value: string;
};

export type HeadingEntity = {
  id: string;
  type: BlockTypes.TEXT;
  value: {
    component: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    value: string;
    id: string;
  };
};

export type MarketingHero1Entity = {
  id: string;
  type: BlockTypes.HERO_1;
  value: {
    badge: {
      value: string;
      visible: boolean;
    };
    label: {
      value: string;
      visible: boolean;
      href: string | null;
    };
    title: {
      value: string;
      visible: boolean;
      component: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div" | "p";
    };
    description: {
      value: string;
      visible: boolean;
      component: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div" | "p";
    };
    input: {
      placeholder: string;
      method: "POST" | "GET" | "PUT";
      action: string;
      type: "text" | "email";
      visible: boolean;
    };
    button: {
      value: string;
      visible: boolean;
    };
    logo: {
      value: string;
      alt: string;
      visible: boolean;
    };
    image: {
      value: string;
      dimensions: string[];
      alt: string;
      visible: boolean;
    };
  };
};

export type BlockEntity = Paragraph | HeadingEntity | MarketingHero1Entity;
