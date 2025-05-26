"use client";
import styled from "styled-components";
import Image from "next/image";
import { getConfig } from '@/lib/config';

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
  const config = getConfig();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          Bem-vindo à {config.site.nome}
        </h1>
        <p className="text-center text-lg mb-8">
          {config.site.descricao}
        </p>
      </div>
    </main>
  );
}
