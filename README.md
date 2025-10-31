# LPLA-RECURSOS

![logo](logo/lplarecursos.png)

APLICAÇÃO API SIMPLES PARA TROCA DE ARQUIVOS COMPUTADOR PESSOAL E CLIENTE EM REDE LOCAL

Compatível com:
- Android (TERMUX)
- Linux
- Free BSD
- Mac-OS
- Linux subsystem for Windows (SHELL)

## CHANGELOG

Conventional commits

- 0.6.X
    - Visao geral do servidor /
    - Listar recursos no servidor
    - Obter informacoes do recurso
    - Subir recurso
    - Obter recurso
    - Deletar recurso
- 1.0.X
    - define programa como apto para atuar em redes locais.
    - elimina arquivo de configuração desnecessario (overengineering)
    - melhora tratamento de linha de comando
    - corrige forma de invocação em linha de comando para permitir IPv6

## TESTES

Executados manualmente através do cliente.sh

## COMO EXECUTAR

```
git clone https://github.com/LPLA-br/lpla-recursos \

# INSTALANDO E TRANSPILANDO
npm install \
npm run build:prod  # Execute uma vez para copiar o cliente para ./public \

# EXECUTANDO SERVIDOR NA MÁQUINA SERVIDORA
cd ./build
node ./index.js --host (IPv4|IPv6-link-local) --port (porta_TCP)

# OBTENDO CLIENTE ATRAVÉS DO CURL NA MÁQUINA CLIENTE
curl -X GET http://IP:8080/client.sh > ./client.sh && chmod 0770 ./client.sh

# OBTENDO AJUDA SOBRE COMO USAR O SCRIPT cliente.sh
./cliente.sh -h
```

## ISSUES

Descreva problemas na secção ISSUES do github.

## RECOMENDAÇÕES DE SEGURANÇA

IPv4
1. Crie uma rede local sem acesso a internet para usar este programa.
2. Redes com acesso a WAN (web) ative o servidor somente para transferir arquivos e logo em
seguida o desligue em usos eventuais.

IPv6 LINK-LOCAL
1. endereço link-local é recomendado pois não é rotável por qualquer máquina fora da rede LAN
em que o serviço está escutando.

Este software servidor foi projetado para ser menos burocrático que o sftp do sshd.service
sendo menos seguro, mas, mais usável.

## DEPENDÊNCIAS DE PLATAFORMA

- curl -> client.sh
- npm  -> executar scripts de instalação de dependências e inicio
- node -> executar servidor

## LICENSA DE USO

ISC - Este software está sob licensa ISC
Leia: LICENSE.TXT

