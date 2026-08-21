# ESAG — Engenharia de Sistemas de Alta Garantia

- Projeto: PSDResearch
- Estado: metodologia interna candidata
- Revisão editorial: 0.8.1
- Escopo: governança, arquitetura, pesquisa, implementação, validação e preservação
- Autoridade: revisão humana fundadora e gates registrados no projeto

## 1. Definição

ESAG é o arranjo metodológico usado pelo PSDResearch para transformar uma hipótese ontológica em trabalho verificável sem permitir que entusiasmo, fluência de LLM ou conveniência técnica substituam requisitos, risco, evidência e decisão.

ESAG não é uma norma internacional com esse nome e não é um selo de certificação. É uma composição explícita de referenciais reconhecidos, escolhidos conforme o tipo de problema e o nível de assurance exigido.

A cadeia de trabalho é:

`propósito → requisito → arquitetura → risco → evidência → gate → aprendizado`

## 2. Metodologias e referenciais utilizados

| Área | Referenciais | Como aparecem no PSDResearch |
| --- | --- | --- |
| Gestão e governança | PMBOK, PRINCE2 e Stage-Gate | Ciclo de vida, responsabilidade, validação, promoção de estado e encerramento formal. |
| Planejamento do trabalho | WBS, Scrum e Shape Up | Decomposição em fases e pequenos pacotes, critérios de aceite, limite de trabalho em andamento e foco. |
| Engenharia de sistemas, IA e requisitos | ISO/IEC/IEEE 15288:2023, ISO/IEC/IEEE 29148:2018, ISO/IEC 5338:2023, NASA Systems Engineering Handbook, ConOps e V&V | Ciclo de vida, processos específicos de sistemas de IA, revisões técnicas, requisitos, conceito de operação, verificação e validação. A edição 29148:2018 permanece publicada, com revisão em andamento. |
| Arquitetura e decisões | ISO/IEC/IEEE 42010:2022, arc42, C4 e ADR | Stakeholders, concerns, viewpoints, views e decisões com contexto, alternativas e consequências. |
| Riscos, segurança e privacidade | ISO 31000, NIST SP 800-160, STPA, STRIDE e LINDDUN | Risco proporcional, perigos sistêmicos, ameaças, privacidade, controles e risco residual. |
| Assurance e governança de IA | SACM, ISO/IEC 42001:2023, ISO/IEC 23894:2023 e NIST AI RMF 1.0 | Claims, argumentos, evidências, sistema de gestão de IA, riscos específicos de IA, separação de papéis, contestabilidade e limites da IA. O NIST AI RMF 1.0 permanece vigente enquanto uma revisão em andamento é desenvolvida. |
| Software, evidências e entrega | Docs-as-Code, DORA, SBOM e SLSA | Repositório canônico, projeções automatizadas, rastreabilidade, proveniência, hashes, builds e cadeia de suprimentos. |
| Continuidade e aprendizado | ISO 14721:2025 (OAIS), ISO 16363:2025, postmortems e retrospectivas | Preservação, recuperação, retomada, auditabilidade de repositórios, aprendizado acumulado e encerramento responsável. |

## 2.1 Regra de versão e estado

Uma referência não é tratada apenas pelo nome. O projeto registra edição, data, estado normativo, revisão em andamento quando aplicável, claim permitido e limite de uso.

- norma publicada não equivale a certificação do PSDResearch;
- Recommendation, Candidate Recommendation, draft, initiative, preprint e estudo revisado são categorias diferentes;
- uma edição vigente pode exigir acompanhamento porque sua sucessora está em desenvolvimento;
- referências voláteis recebem data de nova verificação;
- mudanças de status que afetem copy pública exigem atualização bilíngue e registro de delta.

O manifesto canônico dessas verificações é `site/reference-manifest.json`.

## 3. Regra operacional

Uma decisão relevante só pode avançar quando o projeto consegue responder:

1. Qual propósito e qual stakeholder são afetados?
2. Que requisito ou hipótese está sendo tratado?
3. Que decisão arquitetural organiza a resposta?
4. Quais riscos, ameaças, perigos e impactos de privacidade existem?
5. Que evidência demonstrará o resultado?
6. Qual gate e qual autoridade podem promover o estado?
7. O que precisa ser preservado para auditoria, recuperação e aprendizado futuro?
8. Qual edição e qual estado possuem as referências usadas?

## 4. Relação com LLM-First

LLM-First determina a ordem cognitiva: compreender intenção, semântica, fonte, contrato e risco antes de selecionar ferramenta ou executar.

ESAG transforma essa compreensão em percurso controlado: requisitos, arquitetura, riscos, evidências, revisão e gate.

Uma LLM pode pesquisar, propor, estruturar, implementar e testar. Ela não pode ser simultaneamente autora, única produtora de evidência, única revisora e aprovadora de uma decisão ontológica ou constitucional.

## 5. Fronteira

ESAG estrutura o trabalho e a cadeia de confiança. Não substitui revisão especializada em criptografia, consenso distribuído, segurança de hardware, banco de dados, preservação digital, ética, direito, privacidade ou ciências sociais.

Quando a evidência for insuficiente, o resultado correto é manter a questão aberta, reduzir o escopo ou bloquear o gate — não preencher a lacuna com copy convincente.
