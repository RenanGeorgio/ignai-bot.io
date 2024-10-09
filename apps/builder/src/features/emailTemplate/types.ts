export interface EmailTemplate {
  name: string
  category: string
  properties: {
    backgroundColor: string
    textColor: string
    borderColor: string
    fontSize: string
    title: string
    content: string
    textAlign: string
    fontFamily: string
    padding: string
    margin: string
    imageUrl: string
  }
}

export type Templates = {
  email?: EmailTemplate
  companyId: string
}
