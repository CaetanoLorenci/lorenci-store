"use client";
import styled from "styled-components";
import Image from "next/image";

const Banner = styled.section`
  width: 100%;
  min-height: 320px;
  background: var(--color-gray);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`;

const Destaques = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const Produto = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px #0001;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CTA = styled.a`
  background: var(--color-gold);
  color: #fff;
  font-weight: 700;
  padding: 1rem 2.5rem;
  border-radius: 32px;
  text-decoration: none;
  font-size: 1.2rem;
  margin: 2rem auto 0 auto;
  display: block;
  text-align: center;
  transition: background 0.2s;
  box-shadow: 0 2px 8px #d4af3722;
  &:hover {
    background: #bfa133;
  }
`;

export default function Home() {
  return (
    <main>
      <Banner>
        <Image src="/banner-lorenci.jpg" alt="Lorenci - Sofisticação e Exclusividade" width={900} height={320} style={{borderRadius: 16, objectFit: 'cover'}} />
      </Banner>
      <h1 style={{fontFamily: 'var(--font-playfair), var(--font-lora), serif', fontSize: '2.5rem', textAlign: 'center', marginBottom: '2rem', fontWeight: 700}}>
        Novidades & Destaques
      </h1>
      <Destaques>
        {/* Exemplo de produtos em destaque */}
        <Produto>
          <Image src="/produto1.jpg" alt="Vestido Longo Dourado" width={180} height={220} style={{borderRadius: 8, objectFit: 'cover'}} />
          <h2 style={{fontFamily: 'var(--font-playfair), var(--font-lora), serif', fontWeight: 700, fontSize: '1.1rem', margin: '1rem 0 0.5rem'}}>Vestido Longo Dourado</h2>
          <span style={{color: 'var(--color-gold)', fontWeight: 700, fontSize: '1.1rem'}}>R$ 599,90</span>
        </Produto>
        <Produto>
          <Image src="/produto2.jpg" alt="Blazer Alfaiataria" width={180} height={220} style={{borderRadius: 8, objectFit: 'cover'}} />
          <h2 style={{fontFamily: 'var(--font-playfair), var(--font-lora), serif', fontWeight: 700, fontSize: '1.1rem', margin: '1rem 0 0.5rem'}}>Blazer Alfaiataria</h2>
          <span style={{color: 'var(--color-gold)', fontWeight: 700, fontSize: '1.1rem'}}>R$ 429,90</span>
        </Produto>
        <Produto>
          <Image src="/produto3.jpg" alt="Conjunto Elegante" width={180} height={220} style={{borderRadius: 8, objectFit: 'cover'}} />
          <h2 style={{fontFamily: 'var(--font-playfair), var(--font-lora), serif', fontWeight: 700, fontSize: '1.1rem', margin: '1rem 0 0.5rem'}}>Conjunto Elegante</h2>
          <span style={{color: 'var(--color-gold)', fontWeight: 700, fontSize: '1.1rem'}}>R$ 749,90</span>
        </Produto>
      </Destaques>
      <CTA href="#catalogo">Ver Catálogo Completo</CTA>
    </main>
  );
}
