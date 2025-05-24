"use client";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  max-width: 400px;
  margin: 2rem auto;
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px #0001;
`;

const Input = styled.input`
  padding: 0.7rem 1rem;
  border-radius: 8px;
  border: 1px solid #eee;
  font-size: 1rem;
`;

const Textarea = styled.textarea`
  padding: 0.7rem 1rem;
  border-radius: 8px;
  border: 1px solid #eee;
  font-size: 1rem;
  min-height: 90px;
`;

const Button = styled.button`
  background: var(--color-gold);
  color: #fff;
  font-weight: 700;
  padding: 0.8rem 2rem;
  border-radius: 32px;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #bfa133;
  }
`;

const WhatsApp = styled.a`
  position: fixed;
  right: 24px;
  bottom: 24px;
  background: #25d366;
  color: #fff;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px #0002;
  z-index: 100;
  font-size: 2rem;
`;

export default function Contato() {
  return (
    <main style={{maxWidth: 700, margin: '0 auto', padding: '2rem 1rem'}}>
      <h1 style={{fontFamily: 'var(--font-playfair), var(--font-lora), serif', fontSize: '2.2rem', fontWeight: 700, marginBottom: '1.5rem'}}>Contato</h1>
      <Form>
        <Input type="text" placeholder="Seu nome" required />
        <Input type="email" placeholder="Seu e-mail" required />
        <Textarea placeholder="Mensagem" required />
        <Button type="submit">Enviar</Button>
      </Form>
      <WhatsApp href="https://wa.me/5549999999999" target="_blank" aria-label="WhatsApp Lorenci">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#25d366"/><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.198.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.099 3.205 5.077 4.372.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347z" fill="#fff"/></svg>
      </WhatsApp>
    </main>
  );
} 