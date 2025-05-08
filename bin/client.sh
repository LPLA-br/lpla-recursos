#!/bin/bash

HOST=$1
PORT=$2
ACTION=$3
RESNAME=$4
FILEPATH=$5


ajuda()
{
  echo -e "\n
    CLIENTE PARA SERVIDOR DE ARQUIVOS REST

    client.sh HOST PORTA AÇÂO [NOME] [FILEPATH] \n
    --listar-recursos|-l      lista os recursos no diretório bin do servidor. Não requer mais argumentos\n
    --obter-info-recurso|-i   obter tamanho do recurso no cabeçalho da resposta. Requer NOME \n
    --obter-recurso|-o        obter recurso do servidor. Requer NOME \n
    --subir-recurso|-s        subir recurso local para o servidor. Requer NOME e FILEPATH \n
    --deletar-recurso|-d      deleta recurso no servidor. Requer NOME\n
    --help|--ajuda|*          obter esta ajuda.
  "
}

listarRecursos()
{
  curl http://$HOST:$PORT/recursos;
  echo -e '\n';
}

infoRecurso()
{
  curl -v -X HEAD \
    http://$HOST:$PORT/recursos/$RESNAME | grep Content-Length;
  echo -e '\n';
}

obterRecurso()
{
  curl -X GET \
    http://$HOST:$PORT/recursos/$RESNAME;
  echo -e '\n';
}

subirRecurso()
{
  curl -v -X POST \
    -F nome="$RESNAME" \
    -F recurso="@$FILEPATH" \
    http://$HOST:$PORT/recursos/
  echo -e '\n';
}

deletarRecurso()
{
  curl -v -X DELETE \
    http://$HOST:$PORT/recursos/$RESNAME
  echo -e '\n';
}

atualizarRecurso()
{
  echo -e "recurso não implementado";
  echo -e '\n';
}


if [[ $HOST == "" || $PORT == "" ]]; then
  ajuda;
  exit 1;
fi

if [[ $ACTION == "" ]]; then
  ajuda;
  exit 0;
fi

case "$ACTION" in
  --listar-recursos|-l)
    listarRecursos;
    exit 0;
    ;;
  --obter-info-recurso|-i)
    infoRecurso;
    exit 0;
    ;;
  --obter-recurso|-o)
    if [[ $RESNAME == "" ]]; then
      echo -e "Opção --obter-recurso requer NOME_DO_RECURSO !";
      exit 1;
    fi
    obterRecurso;
    exit 0;
    ;;
  --subir-recurso|-s)
    if [[  $RESNAME == "" || $FILEPATH == "" ]]; then
      echo -e "Opção --obter-recurso requer NOME_DO_RECURSO e CAMINHO_PARA_ARQUIVO_LOCAL !"
      exit 1;
    fi
    subirRecurso;
    exit 0;
    ;;
  --deletar-recurso|-d)
    if [[ $RESNAME == "" ]]; then
      echo -e "Opção --deletar-recurso requer NOME_DO_RECURSO !"
      exit 1;
    fi
    deletarRecurso;
    exit 0;
    ;;
  --help|--ajuda|*)
    ajuda;
    ;;
esac

