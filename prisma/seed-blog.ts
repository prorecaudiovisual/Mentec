import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const POSTS = [
  {
    title: "Transformadores Monofásicos vs Trifásicos: Qual Escolher para sua Instalação?",
    slug: "transformadores-monofasicos-vs-trifasicos",
    excerpt:
      "Entenda as diferenças fundamentais entre transformadores monofásicos e trifásicos e saiba como escolher o modelo ideal para cada tipo de aplicação industrial ou comercial.",
    content: `<h2>Introdução</h2>
<p>A escolha entre um transformador monofásico e um trifásico é uma das decisões mais importantes no planejamento de uma instalação elétrica. Cada tipo possui características distintas que o tornam mais adequado para determinadas aplicações.</p>

<h2>Transformadores Monofásicos</h2>
<p>Os transformadores monofásicos operam com uma única fase de corrente alternada. São amplamente utilizados em:</p>
<ul>
  <li>Residências e pequenos estabelecimentos comerciais</li>
  <li>Equipamentos de iluminação</li>
  <li>Pequenas cargas industriais</li>
  <li>Sistemas de distribuição rural</li>
</ul>
<p>Sua principal vantagem é o custo reduzido para potências menores. São mais simples de instalar e manter, e oferecem boa eficiência para as aplicações para as quais foram projetados.</p>

<h2>Transformadores Trifásicos</h2>
<p>Os transformadores trifásicos trabalham com três fases defasadas entre si em 120°. São a escolha preferida para:</p>
<ul>
  <li>Indústrias de médio e grande porte</li>
  <li>Motores elétricos de alta potência</li>
  <li>Sistemas de distribuição urbana</li>
  <li>Data centers e hospitais</li>
</ul>
<p>Oferecem maior eficiência energética em altas potências, menor custo por kVA instalado e melhor aproveitamento da rede elétrica. A distribuição equilibrada de carga reduz perdas e aquecimento.</p>

<h2>Como Fazer a Escolha Certa</h2>
<p>Para escolher corretamente, considere:</p>
<ol>
  <li><strong>Tipo de rede disponível:</strong> verifique se a rede da concessionária é mono ou trifásica</li>
  <li><strong>Potência total das cargas:</strong> acima de 10 kVA, o trifásico costuma ser mais vantajoso</li>
  <li><strong>Tipo de equipamentos:</strong> motores trifásicos exigem transformadores trifásicos</li>
  <li><strong>Custo total da instalação:</strong> compare não só o equipamento, mas toda a infraestrutura</li>
</ol>

<h2>Conclusão</h2>
<p>Não existe uma resposta universal. A melhor escolha depende das necessidades específicas de cada projeto. Consulte sempre um especialista para dimensionar corretamente seu transformador e garantir segurança, eficiência e vida útil prolongada do equipamento.</p>`,
    published: true,
    publishedAt: new Date("2025-10-15"),
  },
  {
    title: "Eficiência Energética em Transformadores: Como Reduzir Perdas e Economizar",
    slug: "eficiencia-energetica-transformadores",
    excerpt:
      "Descubra como as perdas em transformadores impactam sua conta de energia e quais tecnologias e práticas podem aumentar significativamente a eficiência do seu sistema elétrico.",
    content: `<h2>O Impacto das Perdas em Transformadores</h2>
<p>Transformadores estão presentes em praticamente todas as instalações elétricas, e mesmo pequenas perdas de eficiência, multiplicadas por horas de operação e pelo número de equipamentos, resultam em custos significativos ao longo do tempo.</p>

<h2>Tipos de Perdas em Transformadores</h2>
<h3>Perdas no Ferro (a vazio)</h3>
<p>Ocorrem no núcleo magnético e estão presentes sempre que o transformador está energizado, independentemente da carga. São causadas por histerese magnética e correntes de Foucault. Representam consumo constante, mesmo sem carga conectada.</p>

<h3>Perdas no Cobre (em carga)</h3>
<p>Ocorrem nos enrolamentos devido à resistência elétrica dos condutores. Variam conforme a corrente que passa pelo transformador, ou seja, dependem da carga conectada. Quanto maior a carga, maiores essas perdas.</p>

<h2>Tecnologias para Alta Eficiência</h2>
<h3>Núcleos de Aço Silício de Grão Orientado</h3>
<p>O uso de chapas de aço silício com grão orientado reduz as perdas no ferro em até 30% em comparação com materiais convencionais. São a tecnologia padrão em transformadores modernos de alta eficiência.</p>

<h3>Núcleos Amorfos</h3>
<p>Transformadores com núcleo de material amorfo apresentam perdas no ferro até 70% menores que os convencionais. Ideais para aplicações onde o transformador opera por longos períodos a baixa carga.</p>

<h3>Condutores de Alta Condutividade</h3>
<p>O uso de cobre de alta pureza nos enrolamentos reduz as perdas resistivas. Alguns projetos utilizam condutores de seção transversal aumentada para minimizar o aquecimento.</p>

<h2>Práticas de Operação para Maior Eficiência</h2>
<ul>
  <li><strong>Operação próxima da carga nominal:</strong> transformadores operam com melhor eficiência entre 50% e 75% da carga nominal</li>
  <li><strong>Evitar transformadores superdimensionados:</strong> equipamentos muito acima da carga real operam sempre na região de baixa eficiência</li>
  <li><strong>Manutenção preventiva:</strong> conexões limpas e aperto adequado reduzem resistências de contato</li>
  <li><strong>Fator de potência:</strong> manter o fator de potência próximo de 1 reduz correntes reativas e, consequentemente, as perdas no cobre</li>
</ul>

<h2>Retorno do Investimento</h2>
<p>Um transformador de alta eficiência pode custar entre 15% e 30% a mais que um convencional. No entanto, a economia de energia ao longo da vida útil (tipicamente 20 a 30 anos) costuma superar em muito o investimento adicional, especialmente em instalações de alta demanda.</p>`,
    published: true,
    publishedAt: new Date("2025-10-28"),
  },
  {
    title: "Transformadores Secos: Segurança e Aplicações em Ambientes Críticos",
    slug: "transformadores-secos-seguranca-aplicacoes",
    excerpt:
      "Saiba por que os transformadores a seco são a escolha preferida para hospitais, shoppings, arranha-céus e outros ambientes onde segurança contra incêndio é prioridade.",
    content: `<h2>O que São Transformadores Secos?</h2>
<p>Transformadores secos, também chamados de transformadores a seco ou cast resin (resina epóxi), são equipamentos cujo sistema de isolamento e refrigeração não utiliza óleo mineral. Em vez disso, os enrolamentos são isolados com resina epóxi e refrigerados por circulação natural ou forçada de ar.</p>

<h2>Vantagens em Relação aos Transformadores a Óleo</h2>
<h3>Segurança Contra Incêndio</h3>
<p>A principal vantagem é a ausência de óleo mineral inflamável. Transformadores a óleo, quando submetidos a falhas elétricas severas, podem causar incêndios ou explosões. Os transformadores secos eliminam esse risco, sendo classificados como autoextinguíveis.</p>

<h3>Instalação Interna</h3>
<p>Podem ser instalados diretamente dentro dos edifícios, em subestações internas, sem necessidade de bacias de contenção de óleo ou distâncias mínimas de segurança exigidas para equipamentos com óleo.</p>

<h3>Manutenção Reduzida</h3>
<p>Não requerem análise periódica de óleo, troca de óleo ou manutenção do sistema de conservação. Isso reduz significativamente os custos operacionais ao longo da vida útil.</p>

<h3>Impacto Ambiental</h3>
<p>Eliminam o risco de contaminação do solo e lençol freático por vazamento de óleo, além de não requererem descarte de óleo usado.</p>

<h2>Aplicações Típicas</h2>
<ul>
  <li><strong>Hospitais e clínicas:</strong> onde continuidade de energia e segurança são críticas</li>
  <li><strong>Shopping centers e hotéis:</strong> instalações com grande circulação de pessoas</li>
  <li><strong>Edifícios comerciais e residenciais de alto padrão:</strong> subestações em subsolos ou coberturas</li>
  <li><strong>Plataformas offshore:</strong> onde risco de incêndio deve ser minimizado</li>
  <li><strong>Metrô e ferrovias:</strong> instalações em túneis e ambientes confinados</li>
  <li><strong>Indústrias químicas e petroquímicas:</strong> áreas classificadas com risco de explosão</li>
</ul>

<h2>Classes de Temperatura</h2>
<p>Transformadores secos são classificados pelas classes de temperatura dos seus materiais isolantes:</p>
<ul>
  <li><strong>Classe F (155°C):</strong> uso geral</li>
  <li><strong>Classe H (180°C):</strong> sobrecargas frequentes ou ambientes quentes</li>
  <li><strong>Classe C (220°C):</strong> aplicações especiais de alta temperatura</li>
</ul>

<h2>Considerações de Custo</h2>
<p>Transformadores secos têm custo inicial maior que equivalentes a óleo. Porém, quando considerados os custos de instalação (sem necessidade de casa de transformadores especial), manutenção reduzida e benefícios de segurança, frequentemente representam a solução mais econômica no longo prazo.</p>`,
    published: true,
    publishedAt: new Date("2025-11-05"),
  },
  {
    title: "Manutenção Preventiva de Transformadores: Guia Completo",
    slug: "manutencao-preventiva-transformadores-guia",
    excerpt:
      "Um programa eficaz de manutenção preventiva pode triplicar a vida útil de um transformador. Veja quais inspeções, ensaios e intervenções são essenciais e com que frequência realizá-los.",
    content: `<h2>Por que a Manutenção Preventiva é Essencial?</h2>
<p>Transformadores de distribuição e força representam investimentos significativos e, quando falham inesperadamente, causam paradas de produção, perdas financeiras e riscos à segurança. Um programa bem estruturado de manutenção preventiva pode estender a vida útil do equipamento de 15-20 anos para 30-40 anos.</p>

<h2>Inspeções Visuais (Mensais ou Trimestrais)</h2>
<ul>
  <li>Verificar nível de óleo no visor</li>
  <li>Inspecionar buchas e isoladores em busca de rachaduras ou contaminação</li>
  <li>Verificar funcionamento de termômetros e relés de temperatura</li>
  <li>Inspecionar conexões de aterramento</li>
  <li>Observar sinais de vazamento de óleo</li>
  <li>Verificar estado do dessecador de sílica gel (cor azul = ok, rosa = saturado)</li>
</ul>

<h2>Ensaios Elétricos (Anuais)</h2>
<h3>Medição de Resistência de Isolamento</h3>
<p>Realizado com megôhmetro (megger), avalia o estado do sistema de isolamento. Valores muito baixos indicam contaminação por umidade ou degradação do isolamento.</p>

<h3>Fator de Potência do Isolamento</h3>
<p>Mede as perdas dielétricas no isolamento. Valores crescentes ao longo dos anos indicam deterioração do sistema de isolamento.</p>

<h3>Relação de Transformação</h3>
<p>Verifica se a relação entre tensões primária e secundária está dentro dos valores de projeto, identificando possíveis curtos entre espiras.</p>

<h3>Resistência dos Enrolamentos</h3>
<p>Detecta problemas em conexões internas, como solda fria ou oxidação nos terminais do comutador de tensão.</p>

<h2>Análise de Óleo (Semestral ou Anual)</h2>
<p>O óleo isolante é considerado o "sangue" do transformador. Sua análise revela muito sobre a saúde do equipamento:</p>
<ul>
  <li><strong>Análise físico-química:</strong> rigidez dielétrica, acidez, cor, teor de água</li>
  <li><strong>Cromatografia de gases dissolvidos (DGA):</strong> detecta falhas internas por análise dos gases gerados por decomposição do óleo</li>
  <li><strong>Análise de furanos:</strong> indica o grau de degradação do papel isolante</li>
</ul>

<h2>Intervenções Periódicas</h2>
<h3>Reconstituição do Óleo (a cada 5-10 anos)</h3>
<p>Quando a análise indica degradação do óleo, pode ser realizada a reconstituição por filtração, degasificação e desidratação, ou a substituição total do óleo.</p>

<h3>Limpeza de Buchas e Isoladores</h3>
<p>Em ambientes poluídos ou costeiros, a limpeza frequente das superfícies externas previne descargas superficiais e flashovers.</p>

<h2>Registro e Histórico</h2>
<p>Manter um histórico completo de manutenções e resultados de ensaios é fundamental. Tendências de piora nos resultados permitem antecipar falhas e programar intervenções antes de uma pane catastrófica.</p>`,
    published: true,
    publishedAt: new Date("2025-11-18"),
  },
  {
    title: "Transformadores para Energia Solar: Como Integrar a Geração Fotovoltaica à Rede",
    slug: "transformadores-energia-solar-fotovoltaica",
    excerpt:
      "Com o crescimento explosivo da geração solar no Brasil, entenda qual o papel dos transformadores nos sistemas fotovoltaicos e como escolher o equipamento certo para sua usina.",
    content: `<h2>O Boom da Energia Solar no Brasil</h2>
<p>O Brasil consolidou-se entre os maiores mercados de energia solar do mundo. Desde microgerações residenciais até usinas solares de grande porte, o setor cresce aceleradamente, impulsionado por tarifas competitivas e incentivos fiscais. E em cada instalação fotovoltaica de médio e grande porte, um transformador é componente fundamental.</p>

<h2>Por que Sistemas Solares Precisam de Transformadores?</h2>
<p>Os inversores fotovoltaicos convertem a corrente contínua dos painéis em corrente alternada, geralmente em baixa tensão (220V ou 380V). Para injetar essa energia na rede de média ou alta tensão da concessionária, ou para alimentar cargas industriais distantes, é necessário elevar a tensão por meio de transformadores.</p>

<h2>Tipos de Transformadores em Sistemas Solares</h2>
<h3>Transformadores de Conexão de Inversores</h3>
<p>Conectam os inversores à rede. Devem suportar o perfil de carga variável típico da geração solar (zero à noite, variações ao longo do dia). Requerem boa eficiência em cargas parciais, pois a operação a 100% ocorre apenas em momentos de irradiância máxima.</p>

<h3>Transformadores de Subestação Elevadora</h3>
<p>Em usinas de grande porte, elevam a tensão de 13,8 kV ou 34,5 kV para a tensão de transmissão (69 kV, 138 kV ou mais). São equipamentos de alta potência, geralmente resfriados a óleo.</p>

<h3>Transformadores Auxiliares</h3>
<p>Alimentam os sistemas auxiliares da usina: sistema de monitoramento, climatização de inversores, iluminação e segurança.</p>

<h2>Desafios Específicos em Aplicações Solares</h2>
<h3>Harmônicos</h3>
<p>Inversores modernos são fontes de harmônicos que podem sobrecarregar transformadores convencionais. Transformadores para aplicações solares devem ser especialmente projetados para suportar conteúdo harmônico elevado, com fator K adequado.</p>

<h3>Cargas Cíclicas</h3>
<p>A geração solar impõe ciclos diários de carga (zero à noite, máxima ao meio-dia). O transformador deve suportar esses ciclos sem deterioração acelerada do isolamento.</p>

<h3>Instalação em Campo Aberto</h3>
<p>Usinas solares frequentemente estão em locais remotos, sujeitos a variações extremas de temperatura e umidade. Os equipamentos devem ter proteção adequada e sistemas de ventilação dimensionados para o clima local.</p>

<h2>Normas e Certificações</h2>
<p>Transformadores para conexão com a rede devem atender às normas da ABNT (NBR 5356 e correlatas) e aos requisitos de conexão das concessionárias regionais (RDC - Requisitos de Distribuição/Conexão). A certificação INMETRO é exigida para determinadas faixas de potência.</p>

<h2>Dimensionamento Correto</h2>
<p>O dimensionamento inadequado é um dos erros mais comuns. Um transformador superdimensionado terá baixo rendimento nas operações de baixa irradiância (que são frequentes). Um subdimensionado pode ser danificado pelos picos de geração. O ideal é dimensionar para 100% a 120% da potência instalada dos inversores.</p>`,
    published: true,
    publishedAt: new Date("2025-12-02"),
  },
  {
    title: "Como Dimensionar Corretamente um Transformador de Distribuição",
    slug: "como-dimensionar-transformador-distribuicao",
    excerpt:
      "Dimensionar um transformador vai muito além de somar a potência das cargas. Aprenda o método correto, com fatores de demanda, potência aparente e margens de segurança.",
    content: `<h2>O Erro Mais Comum no Dimensionamento</h2>
<p>A maior parte dos erros de dimensionamento ocorre por simplesmente somar a potência nominal de todos os equipamentos a serem alimentados. Esse método ignora que na prática as cargas raramente operam todas simultaneamente e sempre no máximo de sua capacidade.</p>

<h2>Conceitos Fundamentais</h2>
<h3>Potência Ativa (kW)</h3>
<p>É a potência efetivamente convertida em trabalho ou calor. Medida em quilowatts (kW).</p>

<h3>Potência Reativa (kVAr)</h3>
<p>Potência associada ao campo magnético de motores e reatores. Não realiza trabalho útil, mas circula nos condutores e transformadores, aquecendo-os.</p>

<h3>Potência Aparente (kVA)</h3>
<p>Combinação vetorial de ativa e reativa. É a grandeza usada para especificar transformadores. kVA = kW / cos φ (fator de potência).</p>

<h2>Passo a Passo do Dimensionamento</h2>
<h3>1. Levantamento das Cargas</h3>
<p>Liste todos os equipamentos com sua potência nominal em kW ou kVA e fator de potência (cos φ).</p>

<h3>2. Aplicação do Fator de Demanda</h3>
<p>O fator de demanda reflete que nem todas as cargas operam simultaneamente no máximo. Valores típicos:</p>
<ul>
  <li>Iluminação: 0,9 a 1,0</li>
  <li>Tomadas de uso geral: 0,4 a 0,6</li>
  <li>Motores: 0,5 a 0,8 (dependendo do processo)</li>
  <li>Ar-condicionado: 0,7 a 0,9</li>
</ul>

<h3>3. Cálculo da Demanda Total</h3>
<p>Some as potências ativas de cada carga multiplicadas pelo fator de demanda respectivo. Isso fornece a demanda máxima provável em kW.</p>

<h3>4. Conversão para kVA</h3>
<p>Divida a demanda total em kW pelo fator de potência médio ponderado da instalação. Se o fator de potência não for conhecido, use 0,85 como estimativa conservadora.</p>

<h3>5. Aplicação da Margem de Crescimento</h3>
<p>Adicione entre 20% e 30% para acomodar ampliações futuras e variações de carga. Transformadores operam melhor entre 60% e 80% da carga nominal.</p>

<h3>6. Seleção da Potência Normalizada</h3>
<p>Escolha a potência padronizada imediatamente superior ao valor calculado. As potências normalizadas pela ABNT são: 15, 30, 45, 75, 112,5, 150, 225, 300, 500, 750, 1000, 1500, 2000, 2500 kVA.</p>

<h2>Exemplo Prático</h2>
<p>Uma indústria possui: motores = 150 kW (FD 0,7), iluminação = 30 kW (FD 0,95), tomadas = 20 kW (FD 0,5), ar-condicionado = 40 kW (FD 0,8).</p>
<p>Demanda = (150×0,7) + (30×0,95) + (20×0,5) + (40×0,8) = 105 + 28,5 + 10 + 32 = 175,5 kW</p>
<p>FP médio estimado = 0,85 → kVA = 175,5 / 0,85 = 206,5 kVA</p>
<p>Com 25% de margem = 258 kVA → escolher 300 kVA</p>

<h2>Consulta ao Especialista</h2>
<p>O dimensionamento apresentado é uma metodologia simplificada para orientação. Projetos completos devem considerar curto-circuito, seletividade, regulação de tensão e outros fatores. Sempre consulte um engenheiro eletricista habilitado.</p>`,
    published: true,
    publishedAt: new Date("2025-12-15"),
  },
  {
    title: "Transformadores Subterrâneos: Soluções para Distribuição Urbana Moderna",
    slug: "transformadores-subterraneos-distribuicao-urbana",
    excerpt:
      "Cidades modernas buscam redes elétricas invisíveis e mais seguras. Entenda como os transformadores subterrâneos funcionam e por que são a tendência nas grandes metrópoles.",
    content: `<h2>A Evolução das Redes de Distribuição Urbana</h2>
<p>O cenário de fios aéreos entrelaçados entre postes que caracterizou as cidades do século XX está sendo progressivamente substituído por redes subterrâneas. Além da estética, a distribuição subterrânea oferece ganhos reais em confiabilidade, segurança e resiliência a intempéries.</p>

<h2>O que são Transformadores Subterrâneos?</h2>
<p>São transformadores projetados especificamente para instalação abaixo do nível do solo, em câmaras ou poços de alvenaria ou pré-moldados. Também chamados de transformadores do tipo vault ou câmara subterrânea.</p>

<h2>Características Construtivas</h2>
<h3>Hermeticidade</h3>
<p>Ao contrário dos transformadores de poste convencionais, que têm conservador de óleo exposto ao ar, os transformadores subterrâneos são herméticos. O tanque é completamente fechado, com expansão do óleo absorvida pelo próprio tanque ou por bolsas expansoras, sem contato com o ambiente.</p>

<h3>Resistência à Inundação</h3>
<p>Câmaras subterrâneas são suscetíveis a alagamentos. Transformadores para este ambiente possuem vedações reforçadas nas buchas e no tanque, e devem ser capazes de operar submersos por períodos determinados sem falha dielétrica.</p>

<h3>Conectores Separáveis (Elbows)</h3>
<p>Utilizam conectores do tipo elbow (cotovelo), que permitem a conexão e desconexão com segurança mesmo em ambientes confinados. Esses conectores são blindados e à prova de toque acidental.</p>

<h2>Tipos de Instalação</h2>
<h3>Câmara de Alvenaria</h3>
<p>Câmara construída em obra, com acesso por tampas metálicas na calçada. Permite transformadores de maior porte e facilita a manutenção. Solução mais comum em novas redes de distribuição concessionárias.</p>

<h3>Poço Pré-moldado</h3>
<p>Estrutura pré-fabricada de concreto instalada no local. Reduz tempo de obra e é indicada para projetos de retrofit em locais com restrição de espaço.</p>

<h3>Pad-mounted (Instalação em Superfície)</h3>
<p>Tecnicamente não é subterrâneo, mas é parte do mesmo ecossistema de redes compactas. Instalado em base de concreto na calçada ou gramado, em gabinete fechado de aço inoxidável. Muito comum em loteamentos fechados e condomínios de alto padrão.</p>

<h2>Vantagens da Distribuição Subterrânea</h2>
<ul>
  <li>Proteção contra vendavais, quedas de árvore e descargas atmosféricas</li>
  <li>Redução de interrupções de energia (SAIDI/SAIFI)</li>
  <li>Eliminação do risco de choque por contato com fios expostos</li>
  <li>Valorização imobiliária e estética urbana</li>
  <li>Menor custo de manutenção a longo prazo</li>
</ul>

<h2>Desafios e Considerações</h2>
<p>O custo de implantação de redes subterrâneas é de 3 a 5 vezes maior que o de redes aéreas. A localização de falhas e o reparo são mais complexos. Por isso, a transição para redes subterrâneas ocorre gradualmente, priorizando áreas de maior densidade urbana e valor imobiliário.</p>`,
    published: true,
    publishedAt: new Date("2026-01-08"),
  },
  {
    title: "Normas ABNT para Transformadores: O que Todo Comprador Deve Saber",
    slug: "normas-abnt-transformadores-comprador",
    excerpt:
      "Comprar um transformador sem verificar a conformidade com as normas técnicas pode resultar em equipamentos inseguros e problemas com a concessionária. Conheça as principais normas aplicáveis.",
    content: `<h2>Por que as Normas Técnicas Importam?</h2>
<p>As normas técnicas existem para garantir que equipamentos elétricos sejam seguros, interoperáveis e duráveis. Para transformadores, a conformidade normativa é exigida pelas concessionárias de energia para aprovação de projetos e conexão à rede, e pelo INMETRO para determinadas faixas de potência e tensão.</p>

<h2>Principais Normas ABNT para Transformadores</h2>
<h3>ABNT NBR 5356 – Transformadores de Potência</h3>
<p>A norma mais abrangente para transformadores. Estabelece requisitos de construção, ensaios de rotina (realizados em todos os transformadores), ensaios de tipo (em um exemplar representativo) e ensaios especiais. Cobre transformadores trifásicos e monofásicos de potências acima de 1 kVA.</p>

<h3>ABNT NBR 5380 – Transformadores de Distribuição</h3>
<p>Específica para transformadores de distribuição, com tensão primária até 36,2 kV e potência até 10.000 kVA. Define requisitos construtivos, limites de temperatura, perdas máximas e ensaios obrigatórios.</p>

<h3>ABNT NBR 10295 – Transformadores a Seco</h3>
<p>Requisitos específicos para transformadores com isolamento seco (resina epóxi). Aborda classes de temperatura, proteção contra penetração de sólidos e líquidos (grau IP), e requisitos de ventilação.</p>

<h3>ABNT NBR 7036 – Buchas para Transformadores</h3>
<p>Norma para as buchas (terminais de alta e baixa tensão) dos transformadores. Define tensões suportáveis, dimensões e ensaios.</p>

<h2>Certificação INMETRO</h2>
<p>A Portaria INMETRO nº 20/2017 tornou compulsória a certificação para transformadores de distribuição monofásicos e trifásicos com tensão primária de até 36,2 kV e potência de 5 kVA a 300 kVA. Equipamentos nessa faixa sem o selo INMETRO não podem ser comercializados nem instalados legalmente no Brasil.</p>

<h2>O que Verificar ao Comprar</h2>
<ul>
  <li><strong>Placa de identificação:</strong> deve conter todos os dados elétricos, norma de referência e número de série</li>
  <li><strong>Protocolo de ensaios:</strong> o fabricante deve fornecer os resultados dos ensaios de rotina realizados no equipamento</li>
  <li><strong>Certificado INMETRO:</strong> verifique a validade e o escopo do certificado</li>
  <li><strong>Declaração de conformidade:</strong> documento do fabricante atestando conformidade com as normas aplicáveis</li>
  <li><strong>Manual de instalação e operação:</strong> deve conter instruções claras em português</li>
</ul>

<h2>Ensaios de Rotina Obrigatórios</h2>
<p>Todo transformador deve ser submetido, antes de sair da fábrica, aos seguintes ensaios:</p>
<ul>
  <li>Medição da relação de transformação</li>
  <li>Medição da resistência dos enrolamentos</li>
  <li>Ensaio de tensão suportável a frequência industrial</li>
  <li>Medição das perdas e corrente a vazio</li>
  <li>Medição das perdas e tensão de curto-circuito</li>
</ul>

<h2>Conclusão</h2>
<p>Exigir a documentação técnica completa não é burocracia — é garantia de que você está adquirindo um equipamento seguro e que funcionará conforme especificado. Fabricantes sérios fornecem toda essa documentação sem questionamentos.</p>`,
    published: true,
    publishedAt: new Date("2026-01-22"),
  },
  {
    title: "Transformadores de Força: Aplicações em Alta Tensão e Sistemas de Transmissão",
    slug: "transformadores-de-forca-alta-tensao-transmissao",
    excerpt:
      "Os transformadores de força são os gigantes das subestações de transmissão. Entenda como funcionam equipamentos que operam com centenas de megavolt-amperes e por que são tão críticos para o sistema elétrico.",
    content: `<h2>O que são Transformadores de Força?</h2>
<p>Transformadores de força (ou de potência) são equipamentos de grande porte utilizados nas subestações de transmissão e subtransmissão. Ao contrário dos transformadores de distribuição (que atendem consumidores finais), os transformadores de força conectam diferentes níveis de tensão do sistema de transmissão: de 500 kV para 138 kV, de 138 kV para 69 kV, e assim por diante.</p>

<h2>Características que os Distinguem</h2>
<h3>Potências Elevadas</h3>
<p>Enquanto transformadores de distribuição tipicamente vão de 5 kVA a alguns MVA, os de força partem de dezenas de MVA e podem chegar a 1.000 MVA ou mais. Os maiores transformadores do mundo, como os das usinas hidrelétricas de Itaipu e Belo Monte, têm potências que desafiam a engenharia de transporte.</p>

<h3>Sistemas de Refrigeração Sofisticados</h3>
<p>O calor gerado pelas perdas exige sistemas de refrigeração elaborados. Os mais comuns são:</p>
<ul>
  <li><strong>ONAN (Oil Natural Air Natural):</strong> circulação natural de óleo e ar, sem equipamentos auxiliares</li>
  <li><strong>ONAF (Oil Natural Air Forced):</strong> ventiladores forçam a circulação de ar nos radiadores</li>
  <li><strong>OFAF (Oil Forced Air Forced):</strong> bombas forçam a circulação do óleo e ventiladores o ar</li>
  <li><strong>OFWF (Oil Forced Water Forced):</strong> trocadores de calor água-óleo para máxima eficiência</li>
</ul>

<h3>Comutadores Sob Carga (On-Load Tap Changers)</h3>
<p>Transformadores de força geralmente possuem comutadores de tap que permitem ajustar a relação de transformação com o transformador energizado e em carga. São mecanismos complexos que permitem manter a tensão na faixa adequada conforme a demanda varia ao longo do dia.</p>

<h2>Testes e Ensaios Especiais</h2>
<p>Pela criticidade e custo, transformadores de força são submetidos a ensaios rigorosos:</p>
<ul>
  <li><strong>Ensaio de impulso atmosférico:</strong> simula a sobretensão de uma descarga atmosférica</li>
  <li><strong>Ensaio de impulso de manobra:</strong> simula sobretensões causadas por chaveamentos na rede</li>
  <li><strong>Ensaio de temperatura:</strong> verifica se os limites de temperatura são respeitados em operação plena</li>
  <li><strong>Ensaio acústico:</strong> mede o nível de ruído gerado pelo transformador</li>
</ul>

<h2>Logística de Grandes Transformadores</h2>
<p>Transformadores de alta potência podem pesar centenas de toneladas e exigem logística especial para transporte. É comum a utilização de carretas especiais com dezenas de eixos, operações noturnas para evitar o tráfego urbano, e em alguns casos, reformas em pontes e viadutos para suportar o peso.</p>

<h2>Vida Útil e Gestão de Ativos</h2>
<p>Pela importância estratégica e custo elevado (um transformador de força pode custar vários milhões de reais), as concessionárias de transmissão realizam monitoramento contínuo e gestão cuidadosa desses ativos. Técnicas como análise cromatográfica de gases dissolvidos, termografia e monitoramento acústico permitem detectar anomalias precocemente e planejar intervenções antes de falhas.</p>`,
    published: true,
    publishedAt: new Date("2026-02-05"),
  },
  {
    title: "Proteção de Transformadores: Relés, Fusíveis e Sistemas de Alarme",
    slug: "protecao-transformadores-reles-fusiveis-alarme",
    excerpt:
      "Um transformador desprotegido está vulnerável a danos catastróficos por sobrecarga, curto-circuito e falhas internas. Conheça os principais dispositivos e sistemas de proteção.",
    content: `<h2>Por que Proteger o Transformador?</h2>
<p>Transformadores são equipamentos robustos, mas não invulneráveis. Sobretensões, curtos-circuitos, sobrecargas prolongadas e falhas internas podem causar desde danos leves (exigindo manutenção) até a destruição completa do equipamento — com risco de incêndio e explosão no caso de transformadores a óleo. Um sistema de proteção bem projetado minimiza esses riscos e limita os danos em caso de falha.</p>

<h2>Proteção por Fusíveis</h2>
<p>Para transformadores de distribuição de pequeno porte (até 300 kVA), os fusíveis são a proteção mais comum e econômica. Existem dois tipos principais:</p>
<h3>Elo Fusível (Expulsion Fuse)</h3>
<p>Instalados em chave fusível no poste, ao lado do transformador. Interrompem a corrente de curto-circuito e são facilmente substituídos pelas equipes de campo. A corrente de fusão deve ser coordenada com a corrente nominal e a corrente de inrush (pico de energização) do transformador.</p>

<h3>Fusível Limitador de Corrente</h3>
<p>Atua mais rapidamente que o elo fusível, limitando a energia de curto-circuito. Mais caro, é utilizado em aplicações onde a velocidade de atuação é crítica.</p>

<h2>Relé Buchholz</h2>
<p>Exclusivo para transformadores a óleo, o relé Buchholz é instalado na tubulação entre o tanque e o conservador de óleo. Detecta a formação de gases resultantes de falhas internas por decomposição do óleo ou papel isolante. Possui dois estágios:</p>
<ul>
  <li><strong>Alarme (1ª boia):</strong> detecta acúmulo lento de gases, indicando falha incipiente. Aciona alarme para investigação.</li>
  <li><strong>Trip (2ª boia):</strong> detecta fluxo rápido de óleo para o conservador, indicando falha interna grave. Desliga o transformador imediatamente.</li>
</ul>

<h2>Relé Diferencial</h2>
<p>A proteção mais eficaz para transformadores de médio e grande porte. Compara as correntes que entram e saem do transformador. Em condições normais, a corrente de entrada (ajustada pela relação de transformação) deve ser igual à corrente de saída. Uma diferença indica falha interna e provoca o desligamento instantâneo.</p>
<p>É a proteção principal exigida pelas normas para transformadores acima de certos níveis de potência e tensão.</p>

<h2>Proteção de Sobrecorrente (Fase e Terra)</h2>
<p>Relés de sobrecorrente protegem contra faltas externas ao transformador. Atuam com temporização definida, coordenada com os demais dispositivos de proteção do sistema, garantindo seletividade (apenas o equipamento mais próximo da falta é desligado).</p>

<h2>Relé de Temperatura</h2>
<p>Termômetros com contatos de alarme e trip monitoram a temperatura do óleo e dos enrolamentos. Permitem:</p>
<ul>
  <li>Acionamento de ventiladores de resfriamento em temperatura mais baixa</li>
  <li>Alarme quando a temperatura atinge nível elevado</li>
  <li>Desligamento quando a temperatura atinge nível crítico</li>
</ul>

<h2>Sistema de Alarme e SCADA</h2>
<p>Em subestações modernas, todos esses dispositivos são integrados a um sistema SCADA (Supervisory Control and Data Acquisition) que permite monitoramento remoto em tempo real, registro de eventos e atuação à distância. Qualquer anomalia gera alarme automático para a equipe de operação, reduzindo o tempo de resposta a incidentes.</p>

<h2>Coordenação de Proteção</h2>
<p>Os dispositivos de proteção devem ser coordenados entre si para garantir seletividade. A coordenação errada pode resultar em desligamentos desnecessários de áreas amplas da rede ou, pior, na falha em desligar um equipamento com defeito. A análise de coordenação de proteção é uma especialidade da engenharia elétrica de potência.</p>`,
    published: true,
    publishedAt: new Date("2026-02-20"),
  },
];

async function main() {
  console.log("Iniciando seed do blog...");

  for (const post of POSTS) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        published: post.published,
        publishedAt: post.publishedAt,
      },
      create: post,
    });
    console.log(`✓ Post criado: "${post.title}"`);
  }

  console.log(`\nSeed do blog concluído! ${POSTS.length} posts criados.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
