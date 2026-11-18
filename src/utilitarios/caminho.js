/**
 * Resolve o caminho de um arquivo da pasta public/.
 * O site e publicado num subcaminho (/task-manager/), entao enderecos fixos
 * comecando com "/" quebrariam depois da publicacao.
 */
export function arquivoPublico(nome) {
  return `${import.meta.env.BASE_URL}${nome}`.replace(/([^:]\/)\/+/g, '$1');
}
