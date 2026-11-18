export const RECURSOS = [
  {
    icone: 'pastas',
    titulo: 'Um quadro para cada projeto',
    texto: 'Separe trabalho, casa e estudos. Cada projeto tem suas próprias tarefas, cores e etiquetas, sem misturar nada.'
  },
  {
    icone: 'colunas',
    titulo: 'Kanban com arrastar e soltar',
    texto: 'Mova os cartões entre A fazer, Em andamento e Concluído. A ordem dentro de cada coluna também é sua.'
  },
  {
    icone: 'relogio',
    titulo: 'Prazos e prioridades',
    texto: 'Defina data e prioridade. O que vence hoje aparece em destaque e o que passou do prazo fica em vermelho.'
  },
  {
    icone: 'etiqueta',
    titulo: 'Etiquetas coloridas',
    texto: 'Marque tarefas por tema e filtre o quadro com um clique. Cada projeto tem o seu próprio conjunto.'
  },
  {
    icone: 'clipe',
    titulo: 'Anexos na tarefa',
    texto: 'Arraste arquivos para dentro da tarefa. Imagens ganham miniatura e o resto abre no programa padrão do sistema.'
  },
  {
    icone: 'cadeado',
    titulo: 'Tudo no seu computador',
    texto: 'Sem nuvem, sem conta e sem internet. Os dados ficam num arquivo local que você pode copiar quando quiser.'
  }
];

export const PERGUNTAS = [
  {
    pergunta: 'Preciso de internet para usar?',
    resposta: 'Não. O programa funciona inteiramente offline. A internet só é necessária para baixar o instalador.'
  },
  {
    pergunta: 'Onde ficam os meus dados?',
    resposta: 'Num arquivo SQLite dentro da pasta do aplicativo: em "Application Support" no macOS e em "AppData" no Windows. Os anexos ficam numa subpasta ao lado. Para levar tudo para outro computador, basta copiar essa pasta — ou usar a exportação em JSON do menu Arquivo.'
  },
  {
    pergunta: 'E gratuito?',
    resposta: 'Sim. Não há conta, assinatura, anúncios nem limite de projetos ou tarefas.'
  },
  {
    pergunta: 'Por que aparece um aviso de segurança ao abrir?',
    resposta: 'Porque o programa não tem certificado de assinatura digital, que é pago e cobrado por ano. O aviso é do sistema operacional, não do aplicativo, e some depois da primeira confirmação.'
  },
  {
    pergunta: 'Posso usar no trabalho e em casa?',
    resposta: 'Pode instalar em quantos computadores quiser. Como não há sincronização pela nuvem, cada máquina tem a sua própria base; se quiser levar os dados de um lado para o outro, use a exportação em JSON ou copie a pasta de dados.'
  }
];
