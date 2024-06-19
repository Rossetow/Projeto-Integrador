import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "./types/User";
import { json } from "body-parser";

export const iniciarAsync = async () => {

  await AsyncStorage.removeItem("usuarios")

  await iniciarPosts()

  await iniciarUsers()
  
}

const iniciarUsers = async() => {
  const jsonUsusarios = await AsyncStorage.getItem("usuarios")

  console.log(jsonUsusarios)

  if (jsonUsusarios) {
    return true
  } else {

    const usuarioPadrao: User = {
      id: 1,
      name: "admin",
      email: "admin",
      password: "admin",
      dateOfBirth: "11/11/1111",
      state: "RS",
      avatar: "https://source.unsplash.com/random",
      favorites: []
    }

    let arrayUsuarios = []

    arrayUsuarios.push(usuarioPadrao)

    console.log(arrayUsuarios)

    await AsyncStorage.setItem("usuarios", JSON.stringify({ usuarios: arrayUsuarios }))
  }
}


const iniciarPosts = async () => {

  AsyncStorage.removeItem("posts")

  console.log("entrou aqui poggers")
  const jsonPosts = await AsyncStorage.getItem("posts")


  if (jsonPosts) {
    return
  } else {

    const postsIniciais = [
      {
        idPost: 1,
        title: `Alistamento Militar aos 18 anos: O que você precisa saber`,
        conteudo: `
Se você está prestes a completar 18 anos, é importante entender o processo de alistamento militar no Brasil. O alistamento é um dever cívico e uma obrigação para todos os jovens brasileiros do sexo masculino ao atingirem essa idade. Aqui está o que você precisa saber para se preparar:

 1. Data do Alistamento

O alistamento deve ser realizado no período de 1º de janeiro até 30 de junho do ano em que você completa 18 anos. É fundamental realizar o procedimento dentro desse prazo para evitar complicações legais e garantir seus direitos.

 2. Documentos Necessários

Para se alistar, você precisará dos seguintes documentos originais e cópias:

- Certidão de Nascimento ou documento equivalente que comprove a sua naturalidade;
- Documento de identidade (RG) ou outro documento oficial com foto;
- CPF (Cadastro de Pessoa Física);
- Comprovante de residência atualizado.

 3. Como Realizar o Alistamento

Existem duas maneiras principais de realizar o alistamento:

- Presencialmente: Dirija-se à Junta de Serviço Militar mais próxima da sua residência com os documentos necessários.
- Online: Acesse o site oficial do alistamento militar e preencha o formulário eletrônico. Após o preenchimento, você receberá um número de protocolo que deverá ser guardado.

 4. Consequências do Não Alistamento

O não alistamento ou a não apresentação dentro do prazo estabelecido pode resultar em impedimentos legais, como a impossibilidade de tirar passaporte, ingressar no serviço público, obter título de eleitor, entre outros.

 5. Seleção e Serviço Militar

Após o alistamento, você poderá ser convocado para a seleção militar, onde serão avaliadas suas condições físicas e mentais para eventual serviço militar obrigatório. Caso seja convocado, será designado para uma das Forças Armadas (Exército, Marinha ou Aeronáutica) ou, em alguns casos, dispensado.

 6. Dispensa do Serviço Militar

É possível solicitar dispensa do serviço militar obrigatório em algumas situações específicas, como estar cursando universidade em tempo integral, ser arrimo de família, ser filho único, entre outros casos previstos em lei.`,
        avatar: 'https:imgs.search.brave.com/zZbndZ0lVXEDjHFnd-lIXqDfRNeY4V4103NX8Akx2XI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZs/YXRpY29uLmNvbS81/MTIvNjAyOS82MDI5/NzI4LnBuZw',
        image: `https://imgs.search.brave.com/MTcKONFQ9XYC15XSnUQRT0Voe72iPxB7yXe7GdKgX3Q/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/Z292LmJyL2RlZmVz/YS9wdC1ici9jZW50/cmFpcy1kZS1jb250/ZXVkby9ub3RpY2lh/cy9wcmF6by1wYXJh/LW8tYWxpc3RhbWVu/dG8tbWlsaXRhci1v/YnJpZ2F0b3Jpby10/ZXJtaW5hLWVtLTMw/LWRlLWp1bmhvL2Fs/aXN0YW1lbnRvLTEu/anBn`,
        likes: 157,
        comments: [],

      }, {
        idPost: 2,
        conteudo: `
Ao completar 18 anos, muitos jovens brasileiros têm o desejo de obter a Carteira Nacional de Habilitação (CNH), documento essencial para conduzir veículos. Aqui estão os passos e informações importantes para iniciar esse processo:

 1. Requisitos Básicos

Para iniciar o processo de obtenção da CNH aos 18 anos, você precisa atender aos seguintes requisitos básicos:

- Ser brasileiro nato ou naturalizado;
- Possuir CPF próprio;
- Estar em dia com as obrigações eleitorais e militares (para homens);

 2. Primeira Habilitação (Categoria B)

A CNH de categoria B permite a condução de veículos de passeio com até oito lugares, excluindo o motorista. Para obtê-la:

- Curso Teórico: Realize um curso teórico em um Centro de Formação de Condutores (CFC) credenciado pelo Detran. O curso aborda legislação de trânsito, direção defensiva, primeiros socorros, entre outros temas.
  
- Exame Teórico: Após o curso, você deve ser submeter ao exame teórico, composto por questões de múltipla escolha sobre os temas estudados.

- Curso Prático: Após aprovado no exame teórico, inicie as aulas práticas de direção, também realizadas em um CFC credenciado.

- Exame Prático: Concluídas as aulas práticas, faça o exame prático de direção, onde serão avaliadas suas habilidades de condução veicular.

 3. Documentação Necessária

Para iniciar o processo de habilitação, você precisará apresentar os seguintes documentos originais e cópias:

- Documento de Identidade (RG) ou outro documento oficial com foto;
- CPF (Cadastro de Pessoa Física);
- Comprovante de residência atualizado;
- Certidão de Nascimento ou documento equivalente que comprove sua naturalidade;
- Caso tenha, o Certificado de Dispensa de Incorporação (CDI) ou de Reservista (para homens maiores de 18 anos).

 4. Exames Médico e Psicológico

Antes de iniciar o processo de habilitação, você precisará passar por exames médico e psicológico, realizados em clínicas ou médicos credenciados pelo Detran. Esses exames garantem que você possui as condições físicas e mentais necessárias para dirigir.

 5. Custos

Os custos envolvidos no processo de obtenção da CNH incluem taxas de inscrição no CFC, taxas de exames (teórico e prático), além dos custos com os exames médico e psicológico. É importante verificar os valores atualizados junto ao Detran do seu estado.`,
        title: `Obtenção da CNH aos 18 anos: O que você precisa saber`,
        avatar: `https://imgs.search.brave.com/kqaF6XzGhd_0eRnHIBk1MuS2g29xEx03ghyTfZdFmLk/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90dWRv/c29icmVjbmguY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE5/LzEyL2NvbW8tdGly/YXItY25oLWljb24t/MS5wbmc`,
        image: `https://imgs.search.brave.com/MRp7-vFdfrsJMvjqapYR9AUFFUn-vzZ5Bohac1jYSKs/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/cmVtZXNzYW9ubGlu/ZS5jb20uYnIvYmxv/Zy93cC1jb250ZW50/L3VwbG9hZHMvMjAy/My8wMi9jbmgtYnJh/c2lsZWlyYS12YWxl/LWVtLXBvcnR1Z2Fs/LXRyYW5zZmVyZW5j/aWEtMTAyNHg2ODMu/anBnLm9wdGltYWwu/anBn`,
        likes: 6,
        comments: [],

      },
      {
        idPost: 3,
        title: `Imposto de Renda: O que você precisa saber`,
        conteudo: `Quando completamos 18 anos, tornamo-nos responsáveis por diversas obrigações legais, incluindo a declaração do Imposto de Renda Pessoa Física (IRPF), caso atendamos aos critérios estabelecidos pela Receita Federal. Aqui estão os passos e informações essenciais para entender e cumprir com essa obrigação fiscal:

 1. Quem Deve Declarar?

Você deve declarar o Imposto de Renda se, em 2023 (referente ao ano-calendário de 2022), atendeu a pelo menos uma das seguintes condições:

- Recebimento de Rendimentos Tributáveis: Se recebeu rendimentos tributáveis (como salários, honorários, etc.) cuja soma anual foi superior a R$ 28.559,70;
  
- Recebimento de Rendimentos Isentos, Não Tributáveis ou Tributados Exclusivamente na Fonte: Se recebeu rendimentos cuja soma anual foi superior a R$ 40.000,00;

- Atividade Rural: Se obteve receita bruta anual superior a R$ 142.798,50 com atividade rural;

- Bens e Direitos: Se tinha a posse ou a propriedade de bens ou direitos, incluindo terra nua, de valor total superior a R$ 300.000,00;

- Condição de Residente no Brasil: Se tornou residente no Brasil em qualquer mês do ano-calendário e permaneceu até 31 de dezembro.

 2. Documentação Necessária

Antes de iniciar a declaração do Imposto de Renda, organize os seguintes documentos:

- Documento de identificação com CPF: RG (Registro Geral) ou outro documento oficial com foto e CPF;
  
- Comprovantes de Rendimentos: Contracheques, informes de rendimentos fornecidos por empresas, bancos, entre outros;

- Informes de Pagamentos e Recebimentos: Como recibos de aluguel, pensão alimentícia, despesas médicas, etc.;

- Comprovantes de Bens e Direitos: Como extratos de conta corrente, poupança, investimentos, imóveis, veículos, etc.;

- Despesas Dedutíveis: Como despesas médicas, educacionais, doações, entre outras.

 3. Como Declarar

A declaração do Imposto de Renda pode ser feita de forma online, através do programa disponibilizado pela Receita Federal (IRPF), ou por meio do aplicativo "Meu Imposto de Renda". Siga os passos:

- Baixe o Programa: Acesse o site da Receita Federal e baixe o programa IRPF ou utilize o aplicativo "Meu Imposto de Renda";

- Preencha os Dados: Informe todos os rendimentos, despesas dedutíveis e bens possuídos conforme solicitado pelo programa;

- Envie a Declaração: Após preencher todos os campos necessários, envie a declaração. A Receita Federal fornecerá um recibo de entrega para sua referência.

 4. Prazo de Entrega

O prazo para a entrega da declaração do Imposto de Renda 2023 é até o dia 30 de abril de 2023. É importante não deixar para última hora para evitar multas e problemas com a Receita Federal.

 5. Consequências do Não Cumprimento

Não declarar o Imposto de Renda dentro do prazo estabelecido ou omitir informações importantes pode resultar em multa e outras penalidades legais.`,
        avatar: 'https://imgs.search.brave.com/myoZAGjS_A-3OKTA5prA_RgrpHI_1wO2SQteuLul7OA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXBuZy5vcmcvd3At/Y29udGVudC91cGxv/YWRzLzIwMTkvMDUv/ZGluaGVpcm8taWNv/bmUucG5n',
        image: `https://imgs.search.brave.com/Nnmys3V1AkoYeTYvnmedBU9GwoEjXdf9iOH945Qm6DA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jb250/ZXVkby5pbWd1b2wu/Y29tLmJyL2Mvbm90/aWNpYXMvMjAxNS8w/My8wOS9zZWxvLWlt/cG9zdG8tZGUtcmVu/ZGEtLXJlc3RpdHVp/Y2FvLTE0MjU5Mzg5/MzIwMzZfdjJfOTAw/eDUwNi5qcGc`,
        likes: 1,
        comments: [],
      },
      {
        idPost: 4,
        title: 'Já pensou em se mudar?',
        conteudo: `Antes de tomar a decisão de morar sozinho, um jovem adulto deve considerar alguns aspectos importantes para garantir uma transição tranquila e bem-sucedida para a independência. 

Morar sozinho é uma experiência enriquecedora que proporciona independência e autodescoberta. No entanto, é crucial estar preparado financeira, emocional e logisticamente para essa transição. Planejamento cuidadoso, conhecimento das responsabilidades legais e práticas domésticas são fundamentais para garantir uma adaptação tranquila e bem-sucedida à vida independente.

Aqui estão alguns pontos essenciais a serem considerados:

 1. Planejamento Financeiro

- Orçamento: Elaborar um orçamento detalhado é fundamental para entender os gastos mensais com moradia, alimentação, transporte, contas básicas (água, luz, internet), entre outros.
  
- Renda Disponível: Analisar a renda mensal e compará-la com os custos previstos para garantir que seja suficiente para cobrir todas as despesas.

- Reserva Financeira: Ter uma reserva de emergência é essencial para lidar com imprevistos, como despesas médicas não planejadas ou problemas na moradia.

 2. Escolha do Local de Moradia

- Localização: Avaliar a localização do imóvel em relação ao trabalho, universidade, transporte público, serviços essenciais e segurança do bairro.

- Tipo de Moradia: Decidir entre alugar um apartamento, uma kitnet, uma casa ou dividir o aluguel com colegas para reduzir custos.

 3. Aspectos Legais e Contratuais

- Contrato de Locação: Entender todas as cláusulas do contrato de aluguel, incluindo responsabilidades, prazos, reajustes de aluguel e condições de rescisão.

- Documentação: Garantir que todos os documentos necessários estejam em ordem, como cópia do RG, CPF, comprovantes de renda e garantias exigidas pelo proprietário.

 4. Gestão do Lar

- Manutenção: Estar preparado para realizar pequenas manutenções domésticas ou solicitar assistência quando necessário (exemplo: encanamento, eletricidade, etc.).

- Compras e Organização: Aprender a administrar as compras de supermercado, manter a organização do lar e gerenciar o tempo para realizar tarefas domésticas.

 5. Aspectos Sociais e Emocionais

- Independência Emocional: Preparar-se para lidar com a solidão ocasional e buscar formas de socialização saudável, como integrar-se a grupos ou atividades comunitárias.

- Networking: Construir uma rede de apoio pessoal, como amigos próximos, familiares ou colegas de trabalho, para situações de emergência ou para compartilhar experiências.

 6. Segurança e Bem-Estar

- Segurança Pessoal: Conhecer medidas de segurança pessoal e prevenção de acidentes dentro de casa.

- Bem-Estar: Cuidar da saúde física e mental, incluindo hábitos alimentares saudáveis, prática de atividade física regular e gerenciamento do estresse.`,
        avatar: 'https://imgs.search.brave.com/EW2eFWRx8xw2j8E3YX7rWqrGqSri4v9RC5qoskD0qzI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/cHVjcnMuYnIvaW1h/L3dwLWNvbnRlbnQv/dXBsb2Fkcy9zaXRl/cy8xMTYvMjAxOS8w/Ny9pY29uZS1jYXNh/LTMtNjAweDM0MC5w/bmc',
        image: `https://imgs.search.brave.com/lB9kdvFP1OstOgahBUUggS5OU1qEtK9OAUHWupTig4w/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/ZWxob21icmUuY29t/LmJyL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDE1LzAxL2xvYm8t/c29saXQlQzMlQTFy/aW8tZTE2NzcxNTc4/ODUyMDEtNzY4eDUx/Ny5qcGc`,
        likes: 5,
        comments: [],
      }
    ]


    AsyncStorage.setItem("posts", JSON.stringify({ posts: postsIniciais}))
  }
}