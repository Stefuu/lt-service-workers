const text = `O que é um service worker
Um service worker é um script que seu navegador executa em segundo plano, separado da página da Web. Isso possibilita recursos que não precisam de uma página da Web ou de interação do usuário. Atualmente, eles já incluem recursos como notificações push e sincronização em segundo plano. No futuro, os service workers permitirão outras ações como sincronização periódica ou fronteira geográfica virtual. O principal recurso discutido neste tutorial é a capacidade de interceptar e gerenciar solicitações de rede, incluindo o gerenciamento programático de um cache de respostas.

Essa API é muito interessante porque permite experiências off-line, oferecendo aos desenvolvedores controle total sobre a experiência.

Antes do service worker, havia outra API que proporcionava aos usuários uma experiência off-line na Web denominada AppCache. Os service workers foram projetados para evitar diversos problemas com a AppCache API.

Características importantes de um service worker:

Ele é um JavaScript Worker, portanto, não consegue acessar o DOM diretamente. Em vez disso, um service worker pode se comunicar com as páginas que controla respondendo a mensagens enviadas pela interface postMessage. Essas páginas podem manipular o DOM, se necessário.
O service worker é um proxy de rede programável, o que permite controlar como as solicitações de rede da página são gerenciadas.
Ele é encerrado quando ocioso e reiniciado quando necessário novamente. Isso significa que não se pode confiar no estado global dentro dos gerenciadores onfetch e onmessage de um service worker. Para informações que devem ser mantidas e reutilizadas entre reinícios, os service workers podem acessar a IndexedDB API.
Os service workers usam muito as promessas. Se você não estiver familiarizado com promessas, interrompa esta leitura e confira Promessas, uma introdução.
O ciclo de vida do service worker
Um service worker tem um ciclo de vida totalmente separado da página da Web.

Para instalar um service worker no seu site, é necessário registrá-lo, o que pode ser feito no JavaScript da sua página. O registro de um service worker faz com que o navegador inicie a etapa de instalação do service worker em segundo plano.

Durante a etapa de instalação, normalmente alguns recursos estáticos são armazenados em cache. Se todos os arquivos forem armazenados em cache corretamente, o service worker estará instalado. Se houver falha no download e no armazenamento em cache de qualquer arquivo, a etapa de instalação falhará e o service worker não será ativado (ou seja, não será instalado). Se isso ocorrer, não se preocupe. Haverá uma nova tentativa na próxima vez. Mas isso significa que, se instalados, os recursos estáticos estarão no cache.

Após a instalação, temos a etapa de ativação, que é uma ótima oportunidade para lidar com o gerenciamento de caches antigos. Veremos isso na seção de atualização do service worker.

Depois da etapa de ativação, o service worker controlará todas as páginas dentro do escopo. No entanto, a página que registrou o service worker pela primeira vez não será controlada até ser carregada novamente. Quando o service worker estiver no controle, estará em um de dois estados: encerrado, para economizar memória, ou tratando eventos de busca e mensagem gerados pela página ao enviar uma solicitação ou mensagem de rede.`

module.exports = {
  text
}
