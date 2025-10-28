# Análise de Erros do Servidor Semac

## Resumo Executivo
**Período:** 18-22 de Agosto de 2025
**Total de Erros:** 46 ocorrências
**Tipos de Erro:** 6 categorias principais

---

## 1. OpenURI::HTTPError - Documentos não encontrados (404)
**Total de ocorrências:** 27
**Descrição:** Tentativas de download de documentos que retornam erro 404 Not Found

### Detalhes:
- **Endpoint:** `/document_verification/:token/download_document?preview=1`
- **Controller:** `attachment_verification_requests#download_document`
- **Arquivo:** `app/uploaders/file_uploader.rb:64`
- **Causa:** Documentos não encontrados após restore do banco de dados
- **Token exemplo:** `fcb81e6081abe105d448d60e1e8be7fc1ede25f7e0938282ee`
- **Data:** 20/08/2025 às 08:08 AM

### Justificativa:
Conforme explicado pelo Tor Damian Lorentzen, este erro está diretamente relacionado ao restore do banco de dados realizado em 19/08 às 04:34 UTC. O problema ocorreu porque:

1. **Dessincronização pós-restore:** O banco de dados foi restaurado para um ponto anterior, mas os jobs em fila continuaram tentando processar documentos que não existiam mais no storage
2. **Jobs persistentes:** O banco de jobs manteve referências a documentos que foram perdidos durante o restore
3. **Storage separado:** Os arquivos físicos estão em serviços separados e não foram afetados pelo restore, mas as referências no banco foram

### Contexto Técnico:
- **User Agent:** Windows Chrome 139.0.0.0
- **IP:** 104.28.195.1 (usuário autenticado)
- **Server:** e549b551-9de3-407d-8a2e-78c0a1bda6e9
- **Process ID:** 66
- **Request ID:** 1ce56101-387a-4124-b669-d4616eb2ae2f
- **Session:** Usuário logado (user_id: 2804) com TFA autenticado

### Comentário do Tor:
> "This is because the jobs db has jobs that do not exist in prod db that has been restored to an earlier snapshot (04:34). I don't think this is a problem; failures are the expected outcome"

> "We're having issues with some newer cases where attachments are not found after the database restore. Investigating. The attachment files themselves would not be affected by the database restore (separate services)."

### Tokens afetados:
- `d70f46adb7eb3c485d34f109de66e884e6b797682e84f9f8ad`
- `4d873df9528cdfc868ec334d5d3a1b83b0405d8eecb389b276` (múltiplas tentativas)
- `fcb81e6081abe105d448d60e1e8be7fc1ede25f7e0938282ee` (múltiplas tentativas)
- `29197239ca2f710faab9c0a52975fd105a93d8ad0e8b357f73`
- `c68d86da37871d82d91237bd857f7f2c230c75e78bdfcbbcda`
- `a2c81bbc21eec8a0fbff1d886f2862a1b105bc670e1b88b597`
- `c64aa45fe1415ce075093add3336788f97aba8dca6580e0d38`
- `d0f21657fee12ae2cf3fa4fbbbde47e96079abfd125f9e5e3e`

---

## 2. OpenURI::HTTPError - Formulários de consentimento não encontrados (404)
**Total de ocorrências:** 2
**Descrição:** Tentativas de download de formulários de consentimento que retornam erro 404

### Detalhes:
- **Endpoint:** `/document_verification/:token/download_consent_form`
- **Controller:** `attachment_verification_requests#download_consent_form`
- **Arquivo:** `app/uploaders/file_uploader.rb:64`

### Tokens afetados:
- `4d873df9528cdfc868ec334d5d3a1b83b0405d8eecb389b276`
- `d0f21657fee12ae2cf3fa4fbbbde47e96079abfd125f9e5e3e`

---

## 3. Grover::Error - Falha na instanciação do worker
**Total de ocorrências:** 1
**Descrição:** Erro na geração de PDF durante processamento de consentimento

### Detalhes:
- **Endpoint:** `POST /consent_requests/:token`
- **Controller:** `consent_requests#submit_consent`
- **Arquivo:** `app/helpers/attachments_inquiries_helper.rb:34`
- **Causa:** Falha ao instanciar processo worker para geração de PDF
- **Token afetado:** `joFQEUrzYdLEWg4CM15TA9QA`
- **Usuário:** Brynhild Johnsen (Selbu, Noruega)
- **Data:** 18/08/2025 às 12:02 PM

### Justificativa:
Erro isolado na geração de PDF usando a biblioteca Grover durante o processamento de um formulário de consentimento. O erro ocorreu no helper `AttachmentsInquiriesHelper#statement_doc` na linha 34, dentro de um bloco que processa um array de attachments. O worker process falhou ao tentar instanciar o processo necessário para converter HTML em PDF. Este tipo de erro pode ocorrer devido a:

1. **Problemas de memória:** O servidor pode ter ficado sem memória disponível para criar o processo worker
2. **Configuração do Chrome/Chromium:** Problemas com a instalação ou configuração do navegador headless
3. **Instabilidade do ambiente:** Sobrecarga temporária do sistema ou problemas de recursos
4. **Dados complexos:** O formulário continha uma assinatura digital extensa (base64 PNG com dados de pontos de assinatura) que pode ter causado sobrecarga no processamento

### Contexto Técnico:
- **User Agent:** iPhone iOS 18.6.0 (Chrome Mobile)
- **Content Length:** 25,703 bytes (formulário com assinatura digital)
- **Server:** 108e7058-b4f7-4c95-8868-b82a2b8b940a
- **Process ID:** 59
- **Request ID:** 3fb26e46-0b99-4abd-a029-e863830ec8d8



---

## 4. ActionView::Template::Error - Argumento de interpolação ausente
**Total de ocorrências:** 3
**Descrição:** Erro de template devido a argumento `:reference` ausente na interpolação

### Detalhes:
- **Endpoint:** `GET /self_assessment/:token/report`
- **Controller:** `self_declarations#show_report_by_access_token`
- **Arquivo:** `app/views/references/self_declarations/components/_info.html.erb:3`
- **Causa:** Template espera `:reference` mas recebe `:candidate`
- **Token afetado:** `VUm8A991bfNYCgNyvNLWFWwF`
- **Data:** 20/08/2025 às 14:20 PM

### Justificativa:
O template norueguês espera uma variável `:reference` para interpolação, mas o controller está passando `:candidate` em seu lugar. O template contém a string "Svarene i referanseuttalelsen til <b>%{reference}</b> ble fylt inn av <b>%{user}</b> <b>%{date}</b>." que requer o argumento `:reference`, mas recebe apenas `{candidate: "Test Test", user: "Simen N-1409", date: "..."}`. Este é um erro de inconsistência entre o template e os dados passados pelo controller.

### Contexto Técnico:
- **User Agent:** Windows Chrome 139.0.0.0
- **IP:** 104.28.227.1 (usuário autenticado)
- **Server:** b3aafde4-1e3e-4f2c-8a1d-b582255ace84
- **Process ID:** 99
- **Request ID:** ba05acb9-ddd8-46e5-865b-e639ed49f44d
- **Session:** Usuário logado (user_id: 2012) com TFA autenticado
- **Referer:** https://bakgrunnssjekk.semac.no/requests/179671

### Dados Recebidos vs Esperados:
- **Esperado:** `:reference` (nome da referência)
- **Recebido:** `:candidate` (nome do candidato)
- **Template:** "Svarene i referanseuttalelsen til <b>%{reference}</b> ble fylt inn av <b>%{user}</b> <b>%{date}</b>."
- **Dados:** `{candidate: "Test Test", user: "Simen N-1409", date: "<time datetime=\"2025-08-20T15:18:32+02:00\">20.08.2025</time>"}`

### Localização do Erro:
- **Arquivo:** `app/views/references/self_declarations/components/_info.html.erb:3`
- **Incluído em:** `app/views/references/show_report.html.erb:13`
- **Controller:** `app/controllers/references/self_declarations_controller.rb:114`



---

## 5. ActionView::Template::Error - Método 'candidate' indefinido
**Total de ocorrências:** 8
**Descrição:** Erro de template devido a objeto nil tentando acessar método 'candidate'

### Detalhes:
- **Endpoint:** `GET /candidates/:token`
- **Controller:** `candidates#show_by_access_token`
- **Arquivo:** `app/views/requests/new/digital_education/_attachment.html.erb:76`
- **Causa:** Objeto nil tentando acessar método 'candidate'
- **Token afetado:** `MCoojobjctj8nNDuqKcD9GQR`
- **Data:** 21/08/2025 às 08:33 AM

### Justificativa:
Conforme investigação do Tor Damian Lorentzen, este erro estava relacionado ao restore do banco de dados. Um attachment de diploma foi atualizado em 19/08, mas devido a problemas complexos causados pelo restore, perdeu o case_id correspondente. O template tentava acessar o método 'candidate' em um objeto que estava nil devido a essa inconsistência de dados. O problema foi identificado e corrigido, mas o candidato tentou acessar a URL múltiplas vezes antes da correção.

### Contexto Técnico:
- **User Agents:** Windows Chrome 139.0.0.0 e Mac Firefox 141.0
- **IPs:** 104.47.11.126 e 147.161.146.107 (múltiplas tentativas)
- **Server:** bb25f799-533e-4c34-96aa-082fc2b6dfe7
- **Process IDs:** 198 e 209
- **Request IDs:** b9ab3bbd-e2a7-43de-8a2e-6e18f9cfeb65 e 1790463d-d8dc-44aa-a6f4-7655823b4d55
- **Sessão:** Usuário não autenticado (sessão vazia)

### Localização do Erro:
- **Arquivo:** `app/views/requests/new/digital_education/_attachment.html.erb:76`
- **Incluído em:** `app/views/requests/new/digital_education/_entry.html.erb:119`
- **Seção:** `app/views/requests/new/sections/_digital_education_check.html.erb:50`
- **Template principal:** `app/views/candidates/steps/_statement.html.erb:32`
- **Controller:** `app/controllers/candidates_controller.rb:60`

### Comentário do Tor:
> "Looking into this, in case it's related to the db restore. There is at least a candidate with that access token."

> "I've managed to track down the issue here; the diploma attachment was updated on the 19th, and because of complex issues due to the database restore had lost the corresponding case id. I've fixed it so that this candidate..."

### Contexto da Sessão:
- Usuário não autenticado (sessão vazia)
- Múltiplas tentativas de acesso em sequência
- Acesso via navegação direta (não referer)
- Problema persistiu até ser corrigido pelo Tor



---

## 6. ActionView::Template::Error - Erro de asset não encontrado
**Total de ocorrências:** 1
**Descrição:** Erro ao encontrar asset durante geração de PDF

### Detalhes:
- **Endpoint:** `GET /requests/:id.pdf`
- **Controller:** `requests#show`
- **Arquivo:** `app/helpers/application_helper.rb:556`
- **Causa:** Asset não encontrado durante geração de PDF
- **Request ID:** 179413
- **Data:** 20/08/2025 às 14:57 PM

### Justificativa:
Erro isolado durante a **geração dinâmica de PDF** onde o helper `ApplicationHelper#find_asset` não conseguiu localizar um asset específico necessário para a renderização do PDF. O erro ocorreu no template `portal.pdf.erb` na linha 9, que tenta incluir um asset via `pdf_asset_base64`. Este tipo de erro pode ocorrer quando há problemas na compilação de assets, cache desatualizado, ou assets que foram removidos mas ainda são referenciados no template de PDF.

### Contexto Técnico:
- **User Agent:** Windows Chrome 139.0.0.0
- **IP:** 195.1.78.182 (usuário autenticado)
- **Server:** 170345e1-dd4e-4850-88a7-bb76b0b9a014
- **Process ID:** 180
- **Request ID:** de9d5460-4284-4476-98b8-efe273b6f950
- **Session:** Usuário logado (user_id: 4440) com TFA autenticado
- **Referer:** https://bakgrunnssjekk.semac.no/requests/179413/background_report

### Localização do Erro:
- **Arquivo:** `app/helpers/application_helper.rb:556` (ApplicationHelper#find_asset)
- **Chamado por:** `app/helpers/application_helper.rb:561` (ApplicationHelper#pdf_asset_base64)
- **Template:** `app/views/layouts/portal.pdf.erb:9`
- **Controller:** `app/controllers/requests_controller.rb:725`

### Contexto da Sessão:
- Usuário acabou de fazer login (flash: "Du er nå logget inn.")
- Sessão ativa desde 15:56 PM
- Acesso via navegação direta do background report
- **Formato solicitado:** PDF (application/pdf) - **Geração dinâmica**

### Possíveis Causas:
1. **Asset não compilado:** O asset referenciado no template não foi compilado corretamente
2. **Cache desatualizado:** Cache de assets está desatualizado
3. **Asset removido:** O asset foi removido mas ainda é referenciado no template
4. **Problema de path:** Caminho incorreto para o asset no ambiente de produção
5. **Problema de compilação:** Assets não foram compilados para o ambiente de produção



---

## 7. ActiveRecord::ValueTooLong - Dados muito longos para coluna
**Total de ocorrências:** 6
**Descrição:** Erro de banco de dados devido a dados muito longos para coluna 'position'

### Detalhes:
- **Endpoint:** `PUT /references/:token`
- **Controller:** `references#update_by_access_token`
- **Arquivo:** `app/controllers/references_controller.rb:114`
- **Causa:** Dados excedem limite da coluna 'position' no banco MySQL
- **Token afetado:** `qhJFPQ1p1BVbtevCXZc7Xgdt`
- **Data:** 21/08/2025 às 19:06 PM

### Justificativa:
A user is trying to save data in the 'position' column that exceeds the limit defined in the MySQL database schema. The user is inserting a very long text that includes duplicated information and extensive details about the position, exceeding the maximum size allowed for this column. The error occurs repeatedly because the user continues to submit the same form without reducing the text size.

### Contexto Técnico:
- **User Agent:** Mac Chrome 138.0.0.0
- **IP:** 84.234.219.88
- **Server:** b531ffab-79b2-4f24-bab0-d405b5caf770
- **Process ID:** 81
- **Request ID:** b172a353-8059-451e-a053-5b1b840a96dd
- **Content Length:** 1,946 bytes
- **Referer:** https://bakgrunnssjekk.semac.no/digital_references/NPHtJ7EDn1roThwjbHt8a9yX

### Dados Problemáticos:
- **Campo:** `position`
- **Valor:** " Regional Manager | Customer Success South Region Senior Regional Manager | Customer Success South Region Sep 2022 - Present · 3 yrsSep 2022 to Present · 3 yrs Barcelona, Catalonia, SpainBarcelona, Catalonia, Spain Regional Manager | Customer Success South Region"
- **Problema:** Texto duplicado e muito longo (aproximadamente 200+ caracteres)
- **Empresa:** Webfleet Solutions
- **Usuário:** Carlos Torrecilla

### Análise do Problema:
1. **Texto duplicado:** O usuário copiou e colou informações que se repetem
2. **Informações extras:** Incluiu datas, localização e detalhes que não deveriam estar no campo position
3. **Limite excedido:** O texto ultrapassa o limite da coluna MySQL
4. **Tentativas repetidas:** O usuário continua tentando submeter sem corrigir

### Contexto da Sessão:
- Usuário autenticado via cookies
- Acesso via formulário de referência digital
- Múltiplas tentativas de submissão
- Formato: Turbo Stream (AJAX)

### Localização do Erro:
- **Arquivo:** `app/controllers/references_controller.rb:114`
- **Ação:** `ReferencesController#update_by_access_token`
- **Parâmetros:** Formulário de referência com dados de LinkedIn



---

## Análise por Impacto

### Erros Críticos (Afetam funcionalidade principal):
1. **OpenURI::HTTPError (404)** - 27 ocorrências
   - Impacta download de documentos e formulários
   - Relacionado ao restore do banco de dados
   - **Status:** Esperado após restore, investigação em andamento

2. **ActionView::Template::Error** - 12 ocorrências
   - Afeta renderização de páginas
   - Problemas de template e dados

### Erros de Dados:
1. **ActiveRecord::ValueTooLong** - 6 ocorrências
   - Limitação de tamanho de campo no banco

### Erros de Processamento:
1. **Grover::Error** - 1 ocorrência
   - Falha na geração de PDF

---

## Recomendações

1. **Investigar inconsistências pós-restore:**
   - Verificar sincronização entre banco de dados e storage de arquivos
   - Implementar validação de integridade de dados
   - **Prioridade:** Alta - Tor já está investigando casos mais recentes

2. **Melhorar tratamento de erros:**
   - Adicionar validação de tamanho de campos
   - Implementar fallbacks para templates com dados ausentes

3. **Monitoramento:**
   - Implementar alertas para erros recorrentes
   - Criar dashboard de saúde do sistema

4. **Correções imediatas:**
   - Resolver problema do template com argumento `:reference` (inconsistência entre template e controller)
   - Verificar e corrigir dados da coluna 'position' (implementar validação de tamanho no frontend e backend)
   - Investigar causa do objeto nil no template de candidatos (já identificado e corrigido pelo Tor)
   - Implementar validação de integridade pós-restore para evitar dessincronização de dados
   - **Grover::Error:** Implementar retry mechanism e monitoramento de recursos para geração de PDF
   - **Template Error:** Corrigir mapeamento de dados no controller (candidate → reference)
   - **Asset Error:** Verificar compilação e cache de assets para geração de PDF
   - **ValueTooLong:** Implementar validação de tamanho e limpeza de dados duplicados
