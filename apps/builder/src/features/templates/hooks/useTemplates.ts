import { TemplateProps } from '../types'
import { useTranslate } from '@tolgee/react'

export const useTemplates = (): TemplateProps[] => {
  const { t } = useTranslate()

  return [
    {
      name: t('templates.modal.marketing.leadGeneration.name'),
      emoji: '🤝',
      fileName: 'lead-gen.json',
      category: 'marketing',
      description: t('templates.modal.marketing.leadGeneration.description'),
    },
    {
      name: t('templates.modal.product.customerSupport.name'),
      emoji: '😍',
      fileName: 'customer-support.json',
      category: 'product',
      description: t('templates.modal.product.customerSupport.description'),
    },
    {
      name: t('templates.modal.marketing.quiz.name'),
      emoji: '🕹️',
      fileName: 'quiz.json',
      category: 'marketing',
      description: t('templates.modal.marketing.quiz.description'),
    },
    {
      name: t('templates.modal.marketing.leadScoring.name'),
      emoji: '🏆',
      fileName: 'lead-scoring.json',
      category: 'marketing',
      description: t('templates.modal.marketing.leadScoring.description'),
    },
    {
      name: t('templates.modal.marketing.leadMagnet.name'),
      emoji: '🧲',
      fileName: 'lead-magnet.json',
      category: 'marketing',
      description: t('templates.modal.marketing.leadMagnet.description'),
    },
    {
      name: t('templates.modal.marketing.productRecommendation.name'),
      emoji: '🍫',
      fileName: 'product-recommendation.json',
      category: 'marketing',
      description: t(
        'templates.modal.marketing.productRecommendation.description'
      ),
      backgroundColor: '#010000',
    },
    {
      name: t('templates.modal.product.npsSurvey.name'),
      emoji: '⭐',
      fileName: 'nps.json',
      category: 'product',
      description: t('templates.modal.product.npsSurvey.description'),
    },
    {
      name: t('templates.modal.product.userOnboarding.name'),
      emoji: '🧑‍🚀',
      fileName: 'onboarding.json',
      category: 'product',
      description: t('templates.modal.product.userOnboarding.description'),
    },
    {
      name: t('templates.modal.other.digitalProductPayment.name'),
      emoji: '🖼️',
      fileName: 'digital-product-payment.json',
      description: t('templates.modal.other.digitalProductPayment.description'),
    },
    {
      name: t('templates.modal.product.faq.name'),
      emoji: '💬',
      fileName: 'faq.json',
      category: 'product',
      description: t('templates.modal.product.faq.description'),
    },
    {
      name: t('templates.modal.other.movieRecommendation.name'),
      emoji: '🍿',
      fileName: 'movie-recommendation.json',
      description: t('templates.modal.other.movieRecommendation.description'),
    },
    {
      name: t('templates.modal.other.basicChatGpt.name'),
      emoji: '🤖',
      fileName: 'basic-chat-gpt.json',
      description: t('templates.modal.other.basicChatGpt.description'),
    },
    {
      name: t('templates.modal.other.audioChatGpt.name'),
      emoji: '🤖',
      fileName: 'audio-chat-gpt.json',
      description: t('templates.modal.other.audioChatGpt.description'),
    },
    {
      name: t('templates.modal.other.chatGptPersonas.name'),
      emoji: '🎭',
      fileName: 'chat-gpt-personas.json',
      description: t('templates.modal.other.chatGptPersonas.description'),
    },
    {
      name: t('templates.modal.marketing.leadGenWithAi.name'),
      emoji: '🦾',
      fileName: 'lead-gen-ai.json',
      category: 'marketing',
      description: t('templates.modal.marketing.leadGenWithAi.description'),
    },
    {
      name: t('templates.modal.marketing.insuranceOffer.name'),
      emoji: '🐶',
      fileName: 'dog-insurance-offer.json',
      category: 'marketing',
      description: t('templates.modal.marketing.insuranceOffer.description'),
    },
    {
      name: t('templates.modal.other.openAiConditions.name'),
      emoji: '🧠',
      fileName: 'openai-conditions.json',
      description: t('templates.modal.other.openAiConditions.description'),
    },
    {
      name: 'High ticket lead follow-up',
      emoji: '📞',
      isNew: true,
      fileName: 'high-ticket-lead-follow-up.json',
      category: 'marketing',
      description:
        'Simula um bot que pode ser acionado depois que um lead de alto ticket acabou de baixar um lead magnet. Este bot faz perguntas sobre o negócio em potencial e suas necessidades. Cada pergunta é alimentada por blocos de IA para tornar a conversa mais envolvente e humana.',
    },
    {
      name: 'Quick Carb Calculator',
      emoji: '🏃‍♂️',
      isNew: true,
      fileName: 'quick-carb-calculator.json',
      category: 'marketing',
      description:
        'Projetado especificamente para marcas que estimulam atletas que buscam atrair e envolver públicos ativos, este chatbot serve como uma isca digital eficaz, fornecendo recomendações instantâneas e personalizadas de ingestão de carboidratos com base nas informações do usuário.',
    },
    {
      name: 'OpenAI Assistant Chat',
      emoji: '🤖',
      fileName: 'openai-assistant-chat.json',
      description: 'Uma conversa simples com seu assistente OpenAI.',
    },
  ]
}
