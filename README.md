# ty-brega

O **ty-brega** é uma ferramenta para coletar os bregas que estão bombando no momento nos principais canais de brega funk do YouTube. É possível listar as melhores músicas dos ultimos **N** _dias_, _meses_, ou até _anos_.

## Instalação

    $ git clone https://github.com/felipemarinho97/ty-brega.git
    $ cd ty-brega
    $ yarn install

## Uso

Para usar a ferramenta basta digitar o seguinte comando:

    $ yarn run generate-playlist


### Download

Caso deseje fazer o download das músicas é necessario que o pacorte `youtube-dl` esteja instalado na sua distribuição. Insira o nome do arquivo .json que contém a lista de músicas no arquivo `download.py`.

    $ python download.py