"use client";
import styled from "styled-components";
import Link from "next/link";

const FooterBar = styled.footer`
  background: var(--color-gray);
  color: var(--color-text);
  padding: 2.5rem 1.5rem 1.2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  border-top: 1px solid #eee;
  margin-top: 3rem;
`;

const Links = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const FooterLink = styled(Link)`
  color: var(--color-gold);
  font-weight: 500;
  text-decoration: none;
  font-size: 1.05rem;
  &:hover {
    text-decoration: underline;
  }
`;

const Address = styled.address`
  font-style: normal;
  color: #888;
  font-size: 0.98rem;
  text-align: center;
`;

const Socials = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
`;

export default function Footer() {
  return (
    <FooterBar>
      <Links>
        <FooterLink href="/">Home</FooterLink>
        <FooterLink href="/catalogo">Loja</FooterLink>
        <FooterLink href="/contato">Contato</FooterLink>
        <FooterLink href="/politicas">Políticas</FooterLink>
      </Links>
      <Address>
        Rua Exemplo, 123, Centro, Chapecó-SC<br />
        (Ajuste o endereço real aqui)
      </Address>
      <Socials>
        <a href="https://instagram.com/lorencicentrochapeco" target="_blank" rel="noopener" aria-label="Instagram Lorenci">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="6" stroke="#D4AF37" strokeWidth="2"/><circle cx="12" cy="12" r="5" stroke="#D4AF37" strokeWidth="2"/><circle cx="17" cy="7" r="1.2" fill="#D4AF37"/></svg>
        </a>
        <span style={{color: 'var(--color-gold)', fontWeight: 600, fontSize: '1.05rem'}}>@lorencicentrochapeco</span>
      </Socials>
    </FooterBar>
  );
} 