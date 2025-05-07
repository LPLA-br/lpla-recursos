#!/bin/bash

# client.sh [host:porta] ação [arquivo]

$HOST=$1
$PORT=$2
$ACTION=$4
$RESNAME=$3

ajuda()
{
  echo -e "\
    client.sh HOST PORTA AÇÂO ARQUIVO"
}

infoRecurso()
{
  curl -v -X HEAD \
    http://$HOST:$PORT/recursos/$RESNAME;
  echo -e '\n';
}

obterRecurso()
{
  curl -X GET \
    http://$HOST:$PORT/recursos/$RESNAME;
}

subirRecurso()
{
  curl -v -X POST \
    -F nome="$RESOURCENAME" \
    -F recurso="@./$CURRENTFILE" \
    http://$HOST:$PORT/recursos/
}

deletarRecurso()
{
  curl -v -X DELETE \
    http://$HOST:$PORT/recursos/$RESNAME
}

atualizarRecurso()
{
  echo -e "recurso não implementado";
}

case "$ACTION" in
  --info|-i)
    infoRecurso;
      ;;
  --recurso|-r)
    if [[ $RESOURCENAME == "" ]]; then
      echo -e "";
      exit 1;
    fi
    obterRecurso;
      ;;
  --help|*)
    ajuda;
      ;;
esac

