/**
 * Enderecos dos instaladores.
 *
 * COMO ATUALIZAR: suba os arquivos para o servico de hospedagem escolhido e
 * troque BASE pelo endereco da pasta onde eles ficaram. Os nomes abaixo sao os
 * mesmos que o `npm run dist:win` e o `npm run dist:mac` geram em app/dist/.
 *
 * Enquanto BASE estiver vazio, os botoes aparecem desativados com o aviso de
 * "em breve", em vez de levarem o visitante para um link quebrado.
 */
export const BASE = '';

export const VERSAO = '1.0.0';

export const SISTEMAS = [
  {
    id: 'windows',
    nome: 'Windows',
    requisito: 'Windows 10 ou superior · 64 bits',
    opcoes: [
      {
        id: 'win-instalador',
        titulo: 'Instalador',
        resumo: 'Instala o programa e cria o atalho na área de trabalho e no menu Iniciar.',
        recomendado: true,
        arquivo: `Controle-de-Tarefas-Instalador-${'1.0.0'}.exe`,
        tamanho: '85 MB'
      },
      {
        id: 'win-portatil',
        titulo: 'Portátil',
        resumo: 'Não instala nada: abre com dois cliques. Bom para levar no pendrive.',
        recomendado: false,
        arquivo: `Controle-de-Tarefas-Portatil-${'1.0.0'}.exe`,
        tamanho: '85 MB'
      }
    ],
    aviso: {
      titulo: 'O Windows vai mostrar um aviso azul na primeira vez',
      texto: 'O programa não tem assinatura digital paga, então o SmartScreen pede confirmação. Clique em "Mais informações" e depois em "Executar assim mesmo". Só acontece uma vez.'
    }
  },
  {
    id: 'mac',
    nome: 'macOS',
    requisito: 'macOS 11 Big Sur ou superior',
    opcoes: [
      {
        id: 'mac-arm',
        titulo: 'Apple Silicon',
        resumo: 'Para Macs com chip M1, M2, M3 ou mais novo.',
        recomendado: true,
        arquivo: `Controle-de-Tarefas-${'1.0.0'}-arm64.dmg`,
        tamanho: '103 MB'
      },
      {
        id: 'mac-intel',
        titulo: 'Intel',
        resumo: 'Para Macs com processador Intel.',
        recomendado: false,
        arquivo: `Controle-de-Tarefas-${'1.0.0'}-x64.dmg`,
        tamanho: '107 MB'
      }
    ],
    aviso: {
      titulo: 'O macOS vai pedir uma confirmação na primeira vez',
      texto: 'Abra o app, feche o aviso e vá em Ajustes do Sistema › Privacidade e Segurança. Role até o fim e clique em "Abrir Assim Mesmo".'
    }
  }
];

/** Monta o endereco final do arquivo. Vazio significa "ainda nao publicado". */
export function enderecoDe(opcao) {
  return BASE ? `${BASE.replace(/\/$/, '')}/${opcao.arquivo}` : '';
}

/** Descobre o sistema do visitante para destacar o download certo. */
export function detectarSistema() {
  if (typeof navigator === 'undefined') return null;
  const ua = `${navigator.userAgent} ${navigator.platform || ''}`.toLowerCase();
  if (ua.includes('win')) return 'windows';
  if (ua.includes('mac') || ua.includes('iphone') || ua.includes('ipad')) return 'mac';
  return null;
}

/**
 * Descobre se o Mac tem chip Apple.
 *
 * O user agent nao serve: por compatibilidade, os navegadores em Macs com chip
 * M ainda se anunciam como "Intel Mac OS X". O nome da placa grafica, porem,
 * entrega o hardware de verdade.
 */
export function provavelAppleSilicon() {
  try {
    const tela = document.createElement('canvas');
    const gl = tela.getContext('webgl') || tela.getContext('experimental-webgl');
    const extensao = gl && gl.getExtension('WEBGL_debug_renderer_info');
    const placa = extensao ? String(gl.getParameter(extensao.UNMASKED_RENDERER_WEBGL)) : '';
    if (/apple m\d|apple gpu/i.test(placa)) return true;
    if (/intel|radeon|amd|nvidia|geforce/i.test(placa)) return false;
  } catch (erro) {
    // navegador sem WebGL ou com a extensao bloqueada: cai no palpite abaixo
  }
  // Na duvida, Apple Silicon: e o que todo Mac vendido desde 2020 usa.
  return true;
}
