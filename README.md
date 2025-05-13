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

- 0.6.0
    - Visao geral do servidor /
    - Listar recursos no servidor
    - Obter informacoes do recurso
    - Subir recurso
    - Obter recurso
    - Deletar recurso

## TESTES

Testes implementados com o JEST 29.7.0 a nível de api (90%)

## COMO EXECUTAR

```
git clone https://github.com/LPLA-br/lpla-recursos \
npm install \
npm run build:prod  # Execute uma vez \
npm run start:prod  # Execute para eventuais usos \

# Obtenha o cliente no outro dispositivo com shell unix padrão
curl -X GET http://IP:8080/client.sh > ./client.sh && chmod 0770 ./client.sh

# Obtenha ajuda
./cliente.sh -h
```

## ISSUES

Descreva problemas na secção ISSUES do github.

## RECOMENDAÇÕES DE SEGURANÇA

Conecte um roteador a outra interface de rede de teu computador (rede local)
e configure o iptables (firewall) para bloquear requisições para a porta de
serviço do servidor na outra interface de rede com acesso a World Wide Web.
Alternativamente ative o servidor somente para transferir arquivos e logo em
seguida o desligue usos eventuais.

Este software servidor foi projetado para ser menos burocrático que o sftp do sshd.service
sendo menos seguro, mas, mais usável.

## DEPENDÊNCIAS DE PLATAFORMA

- curl -> client.sh
- npm  -> executar scripts de instalação de dependências e inicio
- node -> executar servidor

## LICENSA DE USO

ISC - Este software está sob licensa ISC
Leia: LICENSE.TXT

