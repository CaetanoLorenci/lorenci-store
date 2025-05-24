"use client";
import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";

const HeaderBar = styled.header`
  width: 100%;
  background: #fff;
  border-bottom: 1px solid var(--color-gray);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem 2rem;
  position: sticky;
  top: 0;
  z-index: 20;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
`;

const Menu = styled.nav`
  display: flex;
  gap: 2rem;
  @media (max-width: 700px) {
    gap: 1rem;
  }
`;

const MenuLink = styled(Link)`
  color: var(--color-text);
  font-family: var(--font-poppins), var(--font-montserrat), sans-serif;
  font-weight: 500;
  text-decoration: none;
  font-size: 1.1rem;
  position: relative;
  padding: 0.2rem 0.5rem;
  transition: color 0.2s;
  &:hover {
    color: var(--color-gold);
  }
`;

const CartButton = styled.button`
  background: var(--color-gold);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
  box-shadow: 0 2px 8px #d4af3722;
  &:hover {
    background: #bfa133;
  }
`;

export default function Header() {
  return (
    <HeaderBar>
      <Logo>
        <Image src="/logo-lorenci.svg" alt="Lorenci" width={38} height={38} />
        <span style={{fontFamily: 'var(--font-playfair), var(--font-lora), serif', fontWeight: 700, fontSize: '1.5rem', color: 'var(--color-gold)'}}>Lorenci</span>
      </Logo>
      <Menu>
        <MenuLink href="/">Home</MenuLink>
        <MenuLink href="/catalogo">Catálogo</MenuLink>
        <MenuLink href="/sobre">Sobre</MenuLink>
        <MenuLink href="/politicas">Políticas</MenuLink>
        <MenuLink href="/contato">Contato</MenuLink>
      </Menu>
      <CartButton aria-label="Carrinho">
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path stroke="#fff" strokeWidth="2" d="M6 6h15l-1.5 9h-13z"/><circle cx="9" cy="20" r="1.5" fill="#fff"/><circle cx="17" cy="20" r="1.5" fill="#fff"/></svg>
      </CartButton>
    </HeaderBar>
  );
} 