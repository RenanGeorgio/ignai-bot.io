export interface WhatsAppTemplate {
  name: string;
  category: TemplateCategory;
  components: Component[];
}

export interface Component {
  type: ComponentType;
  format?: string; // TEXT, IMAGE, VIDEO, AUDIO, DOCUMENT, LOCATION, CONTACT, BUTTONS
  text?: string;
  example?: Example;
  buttons?: Button[];
}

export interface Button {
  type: ButtonType; // URL, POSTBACK, CALL, DIAL, LOCATION, CONTACT
  text: string;
  buttons?: Button[];
}

export interface Example {
  header_text?: string[];
  body_text?: string[][];
}

export enum TemplateCategory {
  AUTHENTICATION = "AUTHENTICATION",
  MARKETING = "MARKETING",
  UTILITY = "UTILITY",
}

export enum ComponentType {
  HEADER = "HEADER",
  BODY = "BODY",
  FOOTER = "FOOTER",
  BUTTON = "BUTTONS",
}

export enum ButtonType {
  URL = "URL",
  POSTBACK = "POSTBACK",
  CALL = "CALL",
  DIAL = "DIAL",
  LOCATION = "LOCATION",
  CONTACT = "CONTACT",
  QUICK_REPLY = "QUICK_REPLY",
}