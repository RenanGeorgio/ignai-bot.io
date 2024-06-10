import { Stack, Heading } from '@chakra-ui/react';
import { Header } from '@/components/common/Header';
import { TextLink } from '@/components/TextLink';
import { Seo } from '@/components/Seo';

const ServiceTerms = () => {
  return (
    <div className="flex flex-col items-center w-full overflow-x-hidden ">
      <Seo title={"Ignai-bot - Termos de Serviço e Uso do Serviço"} />
      <Header />
      <Stack spacing={10} mx="auto" maxW="3xl" my="20">
        <Heading as="h1">Termos de Uso</Heading>

        <Heading>1. Termos</Heading>

        <p>
          Ao acessar este site, acessível em https://www.ignai.com.br e
          quaiquer um de nossos serviços (disponiveis em seus respectivos sites/dominios), 
          você concorda em ficar vinculado aos Termos e Condições de Uso deste site
          e concorda que você é responsável pelo cumprimento com quaisquer leis locais aplicáveis. 
          Se você discorda de algum item destes termos, você está proibido de acessar este site. 
          Os materiais contidos neste site são protegidos por direitos autorais e direitos de marca.
        </p>

        <Heading>2. Licença de uso</Heading>

        <p>
          É concedida permissão de uso de nosso Site e nossos
          materiais presentes no site Ignai para uso pessoal e não comercial
          apenas visualização transitória. Esta é a concessão de uma licença, não uma
          transferência de título, e sob esta licença você não pode:
        </p>

        <ul>
          <li>
            remover quaisquer direitos autorais ou outras notações de propriedade presentes
            nos materiais, de propriedade da Ignai; ou
          </li>
          <li>
            transferir os materiais para outra pessoa ou copiar
            os materiais para qualquer outro servidor.
          </li>
        </ul>

        <p>
          Isso permitirá que a Ignai encerre a concessão da permissão de uso 
          em caso de violação de qualquer uma destas restrições. Após a rescisão, 
          seu direito de visualização também será rescindido e você deve destruir todos os 
          materiais baixados em sua posse, seja em formato impresso ou eletrônico.{' '}
        </p>

        <Heading>3. Aviso Legal</Heading>

        <p>
          Todos os materiais no site da Ignai são fornecidos como são. 
          A Ignai não oferece garantias, expressas ou implícitas,
          portanto, anula todas as outras garantias. Além disso, a Ignai 
          não faz quaisquer representações relativas à precisão ou confiabilidade do
          uso dos materiais em seu site ou de outra forma relacionados a tal
          materiais ou quaisquer sites vinculados a este site.
        </p>

        <Heading>4. Limitações</Heading>

        <p>
          A Ignai ou seus fornecedores não serão responsabilizados por quaisquer 
          danos que surgirão com o uso ou incapacidade de usar os materiais no website do grupo, 
          mesmo que a Ignai ou um representante autorizado tenha sido notificado, 
          oralmente ou por escrito, da possibilidade de tais danos. Algumas jurisdições não permitem
          limitações em garantias implícitas ou limitações de responsabilidade por danos incidentais, 
          essas limitações podem não se aplicar a você.
        </p>

        <Heading>5. Revisões e Erratas</Heading>

        <p>
          Os materiais que aparecem no website da Ignai podem incluir
          erros técnicos, tipográficos ou fotográficos. A Ignai não
          promete que quaisquer um dos materiais deste site é preciso,
          completo ou atual. A Ignai pode alterar os 
          materiais contidos em seu website a qualquer momento sem aviso prévio. 
          A Ignai não faz nenhum compromisso de atualizar os materiais.
        </p>

        <Heading>6. Links</Heading>

        <p>
          A Ignai não revisou todos os website vinculados ao seu site e
          não é responsável pelo conteúdo de qualquer site vinculado. A presença
          de qualquer link não implica endosso do site pela Ignai. O uso
          de qualquer site vinculado é por conta e risco do usuário.
        </p>

        <Heading>7. Modificações nos Termos de Uso do Site</Heading>

        <p>
          A Ignai pode revisar estes Termos de Uso de seu site a qualquer momento
          sem aviso prévio. Ao usar este site, você concorda em ser
          vinculado à versão atual destes Termos e Condições de Uso.
        </p>

        <Heading id="scam-typebots">8. Proibição de uso fraudulento</Heading>
        <p>
          Você concorda em não criar ou usar algum dos serviços ou nosso site para
          o propósito de se envolver em atividades fraudulentas, fraudes
          indivíduos ou quaisquer outras atividades antiéticas ou ilegais. Isso
          inclui, mas não está limitado a, atividades projetadas para enganar, fraudar,
          ou enganar as pessoas para obter ganhos financeiros ou benefícios pessoais. A Ignai
          reserva-se o direito de tomar as medidas apropriadas, incluindo
          encerramento de qualquer conta de usuário, se determinar que uma ação proibida esta
          sendo usado em violação desta disposição.
        </p>

        <Heading>9. Sua privacidade</Heading>

        <p>
          Por favor, leia nosso{' '}
          <TextLink href={'/privacy-policies'}>Política de Privacidade</TextLink>.
        </p>

        <Heading>10. Lei Aplicável</Heading>

        <p>
          Qualquer reclamação relacionada ao nosso site será regida pelo
          leis da cede, sem levar em conta seu conflito de disposições legais.
        </p>
      </Stack>
    </div>
  );
}

export default ServiceTerms