# ty-brega

O **ty-brega** é uma ferramenta para coletar os bregas que estão bombando no momento nos principais canais de brega funk do YouTube. É possível listar as melhores músicas dos ultimos **N** _dias_, _meses_, ou até _anos_.

## Instalação

    $ git clone https://github.com/felipemarinho97/ty-brega.git
    $ cd ty-brega
    $ yarn install

## Uso

Para usar a ferramenta basta digitar o seguinte comando:

    $ yarn run generate-playlist

Isso deve gerar uma playlist contendo os melhores bregas do último mês (padrão). 

É possivel personalizar as variáveis **AMOUNT** e **TIMING**, para tal, edite o arquivo `app.ts`.

```ts
    const TIMING: SupportedTimings = "Day";
    const AMOUNT: number = 7;
```
O exemplo acima deve retornar as melhores músicas dos últimos 7 dias. A variável `TIMING` suporta os valores `Day`, `Month` e `Year`.

### Download

Caso deseje fazer o download das músicas é necessario que o pacorte `youtube-dl` esteja instalado na sua distribuição. Insira o nome do arquivo .json que contém a lista de músicas e execute o arquivo `download.py`.

    $ python download.py