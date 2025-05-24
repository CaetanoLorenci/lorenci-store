"use client";
import styled from "styled-components";
import Image from "next/image";
import produtos from "../../mock/produtos";

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  margin: 2rem 0 3rem 0;
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

const Filtros = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

export default function Catalogo() {
  return (
    <main style={{maxWidth: 1200, margin: '0 auto', padding: '2rem 1rem'}}>
      <h1 style={{fontFamily: 'var(--font-playfair), var(--font-lora), serif', fontSize: '2.2rem', fontWeight: 700, marginBottom: '1.5rem'}}>Catálogo de Produtos</h1>
      <Filtros>
        <input placeholder="Buscar..." style={{padding: '0.5rem 1rem', borderRadius: 8, border: '1px solid #eee', minWidth: 180}} />
        <select style={{padding: '0.5rem 1rem', borderRadius: 8, border: '1px solid #eee'}}><option>Categoria</option></select>
        <select style={{padding: '0.5rem 1rem', borderRadius: 8, border: '1px solid #eee'}}><option>Cor</option></select>
        <select style={{padding: '0.5rem 1rem', borderRadius: 8, border: '1px solid #eee'}}><option>Tamanho</option></select>
        <select style={{padding: '0.5rem 1rem', borderRadius: 8, border: '1px solid #eee'}}><option>Preço</option></select>
      </Filtros>
      <Grid>
        {produtos.length === 0 ? (
          <div style={{gridColumn: '1/-1', textAlign: 'center', color: '#888', fontSize: '1.2rem', padding: '2rem 0'}}>
            Nenhum produto cadastrado no momento.
          </div>
        ) : (
          produtos.map((p: any) => (
            <Produto key={p.id}>
              <Image src={p.imagem} alt={p.nome} width={180} height={220} style={{borderRadius: 8, objectFit: 'cover'}} />
              <h2 style={{fontFamily: 'var(--font-playfair), var(--font-lora), serif', fontWeight: 700, fontSize: '1.1rem', margin: '1rem 0 0.5rem'}}>{p.nome}</h2>
              <span style={{color: 'var(--color-gold)', fontWeight: 700, fontSize: '1.1rem'}}>{p.preco}</span>
            </Produto>
          ))
        )}
      </Grid>
    </main>
  );
} 