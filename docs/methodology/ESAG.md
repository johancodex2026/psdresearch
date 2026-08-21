# ESAG — Engenharia de Sistemas de Alta Garantia

- Projeto: PSDResearch
- Estado: metodologia interna candidata
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
| Engenharia de sistemas e requisitos | ISO/IEC/IEEE 15288, ISO/IEC/IEEE 29148, NASA Systems Engineering Handbook, ConOps e V&V | Ciclo de vida, revisões técnicas, requisitos, conceito de operação, verificação e validação. |
| Arquitetura e decisões | ISO/IEC/IEEE 42010, arc42, C4 e ADR | Stakeholders, concerns, viewpoints, views e decisões com contexto, alternativas e consequências. |
| Riscos, segurança e privacidade | ISO 31000, NIST SP 800-160, STPA, STRIDE e LINDDUN | Risco proporcional, perigos sistêmicos, ameaças, privacidade, controles e risco residual. |
| Assurance e governança de IA | SACM e NIST AI RMF | Claims, argumentos, evidências, separação de papéis, contestabilidade e limites da IA. |
| Software, evidências e entrega | Docs-as-Code, DORA, SBOM e SLSA | Repositório canônico, projeções automatizadas, rastreabilidade, proveniência, hashes, builds e cadeia de suprimentos. |
| Continuidade e aprendizado | OAIS, postmortems e retrospectivas | Preservação, recuperação, retomada, aprendizado acumulado e encerramento responsável. |

## 3. Regra operacional

Uma decisão relevante só pode avançar quando o projeto consegue responder:

1. Qual propósito e qual stakeholder são afetados?
2. Que requisito ou hipótese está sendo tratado?
3. Que decisão arquitetural organiza a resposta?
4. Quais riscos, ameaças, perigos e impactos de privacidade existem?
5. Que evidência demonstrará o resultado?
6. Qual gate e qual autoridade podem promover o estado?
7. O que precisa ser preservado para auditoria, recuperação e aprendizado futuro?

## 4. Relação com LLM-First

LLM-First determina a ordem cognitiva: compreender intenção, semântica, fonte, contrato e risco antes de selecionar ferramenta ou executar.

ESAG transforma essa compreensão em percurso controlado: requisitos, arquitetura, riscos, evidências, revisão e gate.

Uma LLM pode pesquisar, propor, estruturar, implementar e testar. Ela não pode ser simultaneamente autora, única produtora de evidência, única revisora e aprovadora de uma decisão ontológica ou constitucional.

## 5. Fronteira

ESAG estrutura o trabalho e a cadeia de confiança. Não substitui revisão especializada em criptografia, consenso distribuído, segurança de hardware, banco de dados, preservação digital, ética, direito, privacidade ou ciências sociais.

Quando a evidência for insuficiente, o resultado correto é manter a questão aberta, reduzir o escopo ou bloquear o gate — não preencher a lacuna com copy convincente.
