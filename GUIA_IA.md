# Guia de Padronização para Assistentes de IA

Este documento serve como um guia para qualquer assistente de IA que contribua com este projeto. O objetivo é manter um código consistente, limpo e padronizado. Siga estritamente as regras abaixo ao gerar qualquer código, componente ou lógica.

## 1. Dependências Principais e Seu Propósito

O projeto utiliza uma stack enxuta e moderna. O uso de cada dependência deve respeitar seu propósito principal:

- **`react`**: Biblioteca principal para a construção da interface de usuário.
- **`react-dom`**: Ponte entre o React e o DOM do navegador.
- **`react-scripts`**: Scripts e configurações do Create React App para build, teste e desenvolvimento.
- **`react-router-dom`**: Para gerenciamento de rotas e navegação no estilo SPA (Single-Page Application). Use os componentes `<Routes>`, `<Route>` e `<Link>`.
- **`bootstrap`**: Framework CSS para estilização global. O CSS já está importado em `index.js`.
- **`react-bootstrap`**: Componentes React pré-construídos que implementam o sistema do Bootstrap. **Prefira usar estes componentes (`<Button>`, `<Container>`) em vez de classes CSS do Bootstrap diretamente sempre que possível.**
- **`@tabler/icons-react`**: Biblioteca de ícones SVG. Importe ícones individualmente conforme a necessidade para otimizar o bundle. Ex: `import { IconHome } from '@tabler/icons-react';`.

**Nota Importante sobre Novas Dependências:**
A filosofia deste projeto é mantê-lo o mais leve e enxuto possível. Novas dependências só devem ser adicionadas se forem **urgentemente necessárias** e se não houver uma solução viável utilizando as ferramentas já existentes. Antes de sugerir uma nova biblioteca, considere se a funcionalidade pode ser implementada de forma simples com JavaScript vanilla ou com os recursos já presentes no projeto.

## 2. Estrutura de Arquivos

A organização dos arquivos é fundamental. Siga a estrutura abaixo:

- **`src/pages`**: Contém componentes que representam uma página inteira (uma rota). Ex: `HomePage.js`.
- **`src/components`**: Contém componentes de UI reutilizáveis.
    - **`src/components/layout`**: Componentes estruturais como `Navbar.js`, `Footer.js`, `Layout.js`.
    - **`src/components/common`**: Componentes genéricos como `Card.js`, `Modal.js`, etc.
- **`src/assets`**: Para arquivos estáticos como imagens, fontes e arquivos CSS customizados.
- **`src/hooks`**: Para hooks customizados que encapsulam lógica reutilizável.
- **`src/services`**: Para lógica de comunicação com APIs (ex: usando Axios ou Fetch).

## 3. Estilo de Código e Padrões

- **Linguagem**: O projeto é escrito **puramente em JavaScript (ES6+)**. Não utilize TypeScript ou qualquer outra linguagem que precise de transpilação. Mantenha a lógica o mais próxima possível do JavaScript "vanilla" sempre que viável dentro do ecossistema React.
- **Componentes Funcionais e Hooks**: Todo novo componente deve ser um componente funcional. Use Hooks (`useState`, `useEffect`, etc.) para gerenciar estado e ciclo de vida. Evite Class Components.
- **Nomenclatura**:
    - **Componentes**: `PascalCase` (ex: `UserProfile.js`).
    - **Variáveis e Funções**: `camelCase` (ex: `userData`, `fetchUserData`).
- **Importações**: Organize as importações no topo do arquivo na seguinte ordem:
    1.  Imports do React.
    2.  Imports de bibliotecas externas (`react-router-dom`, `react-bootstrap`).
    3.  Imports de componentes locais, páginas ou serviços.
    4.  Imports de CSS ou outros assets.

## 4. Formatação de Código com Prettier (Obrigatório)

**O projeto está configurado para usar o Prettier.** Toda contribuição de código **deve** seguir estritamente as regras definidas no arquivo `.prettierrc`.

A configuração é a seguinte:

```json
{
	"semi": true,
	"trailingComma": "es5",
	"singleQuote": false,
	"printWidth": 120,
	"tabWidth": 4,
	"useTabs": false
}
```

### O que isso significa na prática:

- **Sempre use ponto e vírgula (`;`)** no final das declarações (`semi: true`).
- **Use vírgula no final** de listas de propriedades em objetos e arrays (`trailingComma: "es5"`).
- **Use aspas duplas (`"`)** para strings, não aspas simples (`'`) (`singleQuote: false`).
- **O limite de caracteres por linha é 120** (`printWidth: 120`).
- **A indentação deve ter 4 espaços** (`tabWidth: 4`).
- **Não use tabs para indentação**, use espaços (`useTabs: false`).

---

### Resumo para a IA:

Ao gerar código para este projeto:

1.  **Escreva apenas em JavaScript (ES6+).**
2.  **Não adicione novas dependências, a menos que seja absolutamente essencial.**
3.  Utilize as dependências listadas para seus devidos fins.
4.  Crie arquivos e componentes na estrutura de pastas definida.
5.  Escreva componentes funcionais com Hooks.
6.  **Formate todo o código gerado de acordo com as regras do `.prettierrc` acima.**

Seguir estas diretrizes garante que o projeto se mantenha organizado, leve e padronizado.
