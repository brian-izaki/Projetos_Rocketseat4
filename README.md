# Next Level Week 04 da Rocketseat

Desenvolvido uma aplicação com a temática da técnica Pomodoro para melhorar a concentração e realizar alongamentos enquanto fica na frente do computador. Nele foi utilizado uma estratégia de gamificação na qual o usuário obtém pontos ao realizar tarefas que se apresentam quando é o momento de descanso. 

*obs: a técnica Pomodoro consiste em se focar em uma tarefa por um determinado tempo e então ter um intervalo para descansar e depois voltar para a tarefa com menos tempo, e ficar nesse loop.*

---

## Ambiente de desenvolvimento

- Node versão LTS ou mais;

## Utilizado

- React com Typescript
- Next.js

## Dia 01

- Visto: 
  - Funcionamento do React: componentes, estados;
  - Typescript: tipagem estática, novas features para turbinar o JS;

- Desenvolvido: 
  - barra de xp do layout
  - CSS com variáveis globais na `:root`

## Dia 02

- Visto: 
  - Next.js
    - Framework para React.
    - **Single Page Application (SPA)**: aplicação de uma página, não atualiza a página inteira;
    - **Server Side Rendering (SSR)**: a aplicação tem sua renderização no servidor, assim, entregando html e css para o client;
    - **Static Site Generation (SSG)**: HTML, CSS, JS puro, gera uma página estática dentro do servidor que entrega ele para vários *clients* a mesma página, e após um tempo determinado atualiza a página no server assim, entregando a página nova para todos novamente.

  - **CSS modules**: o next ajuda no css isolando os nomes das classes, assim podendo duplicar nomes em outros componentes. Para isso, é necessário um arquivo `nome_arquivo.module.css` e realizar a importação dele no componente, assim, na tag passar `className={ nome_importacao.nome_ClasseCSS }` 

- Desenvolvido: 
  - Migração para o Next.js
    - passado as pastas components e styles

  - Criado o arquivo `_document.tsx`, nele foi adicionado as tags do head do HTML (não foi adicionado no `_app.tsx` pois nele é recalculado e isso pode carregar os scripts de fontes do google mais d uma vez)
    - *obs*: 
      - ele carrega apenas uma vez quando o uauário acessa a página.
      - colocar tudo o que for estático
  
  - Criado componente Countdown, Profile e CompletedChallenges

## Dia 03
  - Visto:
    - **Context Hook**: Formas de compartilhar comunicação entre vários componentes na aplicação.
      - Para utilizar ele é necessário importar o `useContext()` do React, dentro pode ser passado qualquer coisa (string, number, objetos, etc)
      - Uma variável com o `useContext` pode ser utilizada como um componente;
      - Para passar os valores de um contexto é necessário extender com o `.Provider` e passar os valores ao atributo `value={valores_desejados}`
      - ```JavaScript
        // EXEMPLO
        const Contexto = useContext({})
        <Contexto.Provider value={{valor1: 1, valor2: 2}}>
          <Componentes_que_podem_user_esse_contexto>
        </Contexto.Provider>
        ```

  - Feito:
    - Regras de negócio para aparecer os desafios e xp de usuários;
    - utilizado o `useContext` para gerenciar os estados entre os componentes;

## Dia 04
  - Visto:
    - Quando perceber que é necessário utilizar uma variável ou função de determinado componente, é interessante pensar em criar um novo contexto.
    - O contexto depende para qual funcionalidade será utilizada, algumas vezes um contexto não será utilizado na aplicação toda, assim, podendo colocar ele em uma parte específica do código que fará uso dele (ex: o `CountdownProvider` não tinha necessidade de estar no `_app.tsx`, logo, ele foi colocado apenas na prágina `index.tsx`)
      - (*obs: caso faça uso de dois contextos deve pensar qual fará uso de qual, uma que não faz uso de nenhuma está no topo da hierarquia, uma que faz uso de "A" estará abaixo dela, assim em diante* ) 
    - `Notification` é uma [API nativa do browser](https://developer.mozilla.org/pt-BR/docs/Web/API/notificacoes), assim como no nome, ele envia notificações (antes é necessário que o usuário conceda permissão)
      - (*obs: ele ainda [não é suportado](https://caniuse.com/mdn-api_notification) em todos os browsers*)
    - `Audio` outra [API nativa do browser](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement/Audio), com ele é possível tocar uma música. [ele tem amplo suporte](https://caniuse.com/mdn-api_htmlaudioelement_audio)


  - Feito:
    - Separado a lógica do Countdown para criar um novo context, pois algumas das informações dele eram necessárias no ChallengeBox
    - 