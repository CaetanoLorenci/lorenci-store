"use client";
export default function Politicas() {
  return (
    <main style={{maxWidth: 800, margin: '0 auto', padding: '2rem 1rem'}}>
      <h1 style={{fontFamily: 'var(--font-playfair), var(--font-lora), serif', fontSize: '2.2rem', fontWeight: 700, marginBottom: '1.5rem'}}>Políticas</h1>
      <section style={{marginBottom: '2rem'}}>
        <h2 style={{color: 'var(--color-gold)', fontWeight: 700}}>Troca e Devolução</h2>
        <p style={{fontSize: '1.05rem'}}>Nossa loja preza pela satisfação do cliente. Caso precise trocar ou devolver algum produto, entre em contato conosco em até 7 dias após o recebimento. O produto deve estar sem uso e com etiqueta.</p>
      </section>
      <section style={{marginBottom: '2rem'}}>
        <h2 style={{color: 'var(--color-gold)', fontWeight: 700}}>Política de Privacidade</h2>
        <p style={{fontSize: '1.05rem'}}>Seus dados são utilizados apenas para processar seu pedido e garantir uma experiência de compra segura. Não compartilhamos informações com terceiros.</p>
      </section>
      <section>
        <h2 style={{color: 'var(--color-gold)', fontWeight: 700}}>Política de Entrega</h2>
        <p style={{fontSize: '1.05rem'}}>Enviamos para todo o Brasil com parceiros logísticos confiáveis. O prazo de entrega pode variar conforme a região.</p>
      </section>
    </main>
  );
} 