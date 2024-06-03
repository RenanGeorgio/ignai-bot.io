import React from 'react';
import { Stack, Heading } from '@chakra-ui/react';
import { Header } from '@/components/common/Header/Header';
import { SocialMetaTags } from '@/components/common/SocialMetaTags';

const PrivacyPolicies = () => {
  return (
    <div className="flex flex-col items-center w-full overflow-x-hidden ">
      <Header />
      <SocialMetaTags
        currentUrl={`https://www.bot.ignai.com.br/privacy-policies`}
        title="Ignai-bot - Privacy & Policies"
      />
      <Stack spacing={10} mx="auto" maxW="3xl" my="20">
        <Heading as="h1">Politica de Privacidade para Ignai-bot</Heading>

        <p>
          Na DiamondBigger, acessível em https://www.diamondbigger.com, um das nossas principais
          prioridades é a privacidade dos nossos clientes e parceiros. Esta Política de Privacidade
          documento contém tipos de informações que podem ser coletadas e registradas
          por algum de nossos serviços e como o usamos.
        </p>

        <p>
          Se você tiver dúvidas adicionais ou precisar de mais informações sobre nossos
          Política de Privacidade, não hesite em nos contactar.
        </p>

        <p>
          Esta Política de Privacidade aplica-se apenas às nossas atividades e é válida
          para os usuarios, parceiros e clientes  dos nossos serviços no que diz respeito 
          às informações que são compartilhadas e/ou coletado pelos serviços do Grupo DiamondBigger. 
          Esta política não é aplicável a qualquer informação coletada por meio não listado ou por 
          meio de canais diferentes deste local na rede Internet. De forma que demais serviços ofertados 
          pelo grupo podem conter uma Politica de Privacidade propria, que atue de forma complementar a 
          este, sobre apenas o serviço a que fazem referencia.
        </p>

        <Heading>Consentimento</Heading>

        <p>
          Ao utilizar nosso site, você concorda com nossa Política de Privacidade e
          concordar com seus termos.
        </p>

        <Heading>Informações que coletamos</Heading>

        <p>
          As informações pessoais que você deve fornecer e o
          os motivos pelos quais você será solicitado a fornecê-los serão esclarecidos em
          o ponto em que pedimos que você forneça suas informações pessoais.
        </p>
        <p>
          Se você entrar em contato conosco diretamente, poderemos receber informações adicionais
          sobre você, como seu nome, endereço de e-mail, número de telefone, o conteúdo
          da mensagem e/ou anexos que você nos enviar, e qualquer outro
          informações que você pode optar por fornecer.
        </p>
        <p>
          Quando você se registra para uma conta, podemos solicitar seu contato
          informações, incluindo itens como nome, nome da empresa, endereço,
          endereço de e-mail e número de telefone.
        </p>

        <Heading>Como usamos suas informações</Heading>

        <p>Usamos as informações que coletamos de várias maneiras, inclusive para:</p>

        <ul>
          <li>Fornecer, operar e manter nosso site</li>
          <li>Melhorar, personalizar e expandir nosso site</li>
          <li>Compreender e analisar como você usa nosso site</li>
          <li>Desenvolver novos produtos, serviços, recursos e funcionalidades</li>
          <li>
            Comunique-se com você, diretamente ou através de um de nossos
            parceiros, inclusive para atendimento ao cliente, para fornecer a você
            atualizações e outras informações relacionadas ao site, e para
            fins de marketing e promocionais
          </li>
          <li>Enviar e-mails para você</li>
          <li>Encontrar, identificar e evitar fraudes</li>
        </ul>

        <Heading>Arquivos de Registro</Heading>

        <p>
          O Grupo DiamondBigger Supply Chain segue um procedimento padrão de uso de arquivos de log. Esses
          arquivos registram visitantes quando eles visitam sites ou utilizam um de nossos serviços. 
          Todas as empresas de hospedagem fazem isso e é uma parte da análise de serviços de hospedagem. 
          As informações coletadas por arquivos de log incluem endereços de protocolo de internet (IP),
          tipo de navegador, provedor de serviços de Internet (ISP), carimbo de data e hora,
          páginas de referência/saída e possivelmente o número de cliques. Estes não são
          vinculado a qualquer informação que seja pessoalmente identificável. O objetivo das informações é 
          para análise de tendências, administração do site, garantir o funcionamento correto de 
          nossas funcionalidades com administração de carga de trabalho com a finalidade de providenciar 
          um funcionamento sem interperies aos nossos clientes e parceiros, assim como
          rastrear o movimento dos usuários no site e coletar dados demográficos.
        </p>

        <Heading>Políticas de Privacidade de Parceiros de Publicidade</Heading>

        <p>
          Você pode consultar esta lista para encontrar a Política de Privacidade de cada um dos
          parceiros de publicidade do Grupo DiamondBigger.
        </p>

        <p>
          Servidores de anúncios ou redes de anúncios de terceiros usam tecnologias como cookies,
          JavaScript ou Web Beacons que são usados em seus respectivos
          anúncios e links que aparecem no nosso website ou em algum serviço do Grupo DiamondBigger, 
          que são enviados diretamente para o navegador dos usuários. Eles recebem automaticamente 
          seu endereço IP quando isso ocorrer. Essas tecnologias são usadas para medir o
          eficácia de suas campanhas publicitárias e/ou para personalizar o
          conteúdo publicitário que você vê nos sites que visita.
        </p>

        <p>
          Observe que o Grupo DiamondBigger não tem acesso ou controle sobre esses cookies
          que são usados por terceiros.
        </p>

        <Heading>Políticas de Privacidade de terceiros</Heading>

        <p>
          A Política de Privacidade do Grupo DiamondBigger não se aplica a outros anunciantes
          ou sites (pertencentes a terceiros). Assim, aconselhamos que consulte as respectivas
          Políticas de Privacidade desses servidores (ou demais tipos de serviços) de anúncios 
          de terceiros para informações mais detalhadas a respeito. Tais informações podem incluir 
          suas práticas e instruções sobre como cancelar certas opções, interromper o compartilhamento
          de dados, solicitar exclusão de dados, ou então realizar alguma alteração.{' '}
        </p>

        <p>
          Você pode optar por desativar os cookies através do seu navegador individual. 
          Para saber informações mais detalhadas sobre a gestão de cookies com navegadores 
          da web específicos, eles podem ser encontrados nas páginas dos navegadores, em seus
          respectivos sites.
        </p>

        <Heading>
          CCPA Privacy Rights (Não venda minhas informações pessoais)
        </Heading>

        <p>
          De acordo com a CCPA, entre outros direitos, os consumidores têm o
          direito a:
        </p>
        <p>
          Solicitar que uma empresa que coleta dados pessoais de um consumidor
          divulgar as categorias e dados pessoais específicos que tais empresas
          coletaram sobre os seus consumidores.
        </p>
        <p>
          Solicitar que a empresa exclua todos e quaisquer dados pessoais sobre o 
          consumidor que esta empresa coletou.
        </p>
        <p>
          Solicitar que a empresa que vende dados pessoais de um consumidor, interrmpa
          a pratica, ou seja, não vender dados pessoais deste consumidor.
        </p>
        <p>
          Se você fizer uma solicitação, temos o prazo de um mês para responder. Se você
          gostaria de exercer algum desses direitos, entre em contato conosco.
        </p>

        <Heading>GDPR Direitos de Proteção de dados</Heading>

        <p>
          Gostaríamos de ter certeza de que você está totalmente ciente a cerca de todos os 
          seus direitos de proteção a dados. Todo usuário tem direito ao seguinte:
        </p>
        <p>
          O direito de acesso – Você tem o direito de solicitar cópias do seu
          dados pessoais. Poderemos cobrar uma pequena taxa por este serviço.
        </p>
        <p>
          O direito à retificação – Você tem o direito de solicitar que qualquer informação
          que você acredite ser imprecisa, seja corrijida por nós. Você também tem o
          direito de solicitar que completemos as informações que você acredita serem
          incompleto.{' '}

          Atenção se os dados precisam ser ratificados, mas o motivo da ratificação foi
          apurado como tendo ocorrido em dentrimento dos dados enviados pelo usuario 
          no momento do prenchimento, isto deixa de ser resposabilidade do Grupo DiamonBigger.
          Ou seja, em casos em que a mudança é necessaria pois os dados registrados são os mesmos que
          os enviados, a responsabilidade deixa de ser do Grupo. Tais casos podem ocorrer quando
          um cliente precisar alterar alguma de suas informações, como: Alteração do endereço, telefone.
          Em tais casos, o direito à retificação sera preservado, mas em casos que tal retificação incorrer
          em custos adicionais, uma pequena taxa podera ser cobrada.
        </p>
        <p>
          O direito de apagar – Você tem o direito de solicitar que apaguemos
          seus dados pessoais, sob certas condições.
        </p>
        <p>
          O direito de restringir o processamento – Você tem o direito de solicitar que
          restringimos o processamento dos seus dados pessoais, sob certas
          condições.
        </p>
        <p>
          O direito de se opor ao processamento – Você tem o direito de se opor ao
          nosso processamento de seus dados pessoais, sob certas condições.
        </p>
        <p>
          O direito à portabilidade de dados – Você tem o direito de solicitar que
          transferir os dados que coletamos para outra organização, ou
          diretamente para você, sob certas condições.{' '}

          É necessario salientar, que se custos adicionais incorrem por conta de tal
          transferrencia, uma taxa adicional podera ser cobrada.
        </p>
        <p>
          Se você fizer uma solicitação, temos o prazo de um mês para responder. Se você
          gostaria de exercer algum desses direitos, entre em contato conosco.
        </p>

        <Heading>Informações infantis</Heading>

        <p>
          Outra parte da nossa prioridade é zelar e acrescentar a protecção às crianças, 
          no hambiente virtual, em em outros meios que tenham de alguma forma surgido em colaboração do mesmo. 
          Encorajamos os pais e responsáveis a observar, participar e/ou monitorar e orientar as atividade online
          de seus dependentes.
        </p>

        <p>
          O Grupo DiamondBigger não coleta intencionalmente qualquer identificação pessoal,
          Informações de crianças menores de 13 anos. Se você acha que seu
          criança forneceu esse tipo de informação em nosso site, ou em algum de nossos serviços,
          nós fortemente encorajamos você a entrar em contato conosco imediatamente e faremos o nosso melhor
          esforços para remover prontamente tais informações de nossos registros.
        </p>
      </Stack>
    </div>
  );
}

export default PrivacyPolicies