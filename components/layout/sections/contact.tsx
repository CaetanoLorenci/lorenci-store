"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Building2, Clock, Mail, Phone, MessageSquare, Instagram, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import Image from "next/image";
import { getContactConfig } from "@/lib/config";
import { useState } from "react";
import { toast } from "sonner";

interface InfoItem {
  texto: string;
  icone: string;
  link?: string;
  titulo: string;
}

const formSchema = z.object({
  firstName: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  lastName: z.string().min(2, "Sobrenome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  subject: z.string().min(1, "Selecione um assunto"),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

export const ContactSection = () => {
  const config = getContactConfig();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    mensagem: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (config.oculta) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(config.formulario.webhookLink, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          origem: 'formulario_contato'
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar mensagem');
      }

      toast.success('Mensagem enviada com sucesso!');
      setFormData({ nome: "", email: "", mensagem: "" });
    } catch (error) {
      toast.error('Erro ao enviar mensagem. Por favor, tente novamente.');
      console.error('Erro ao enviar formulário:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: any } = {
      building2: Building2,
      phone: Phone,
      mail: Mail,
      instagram: Instagram,
      clock: Clock,
      "message-square": MessageSquare,
      "map-pin": MapPin
    };
    return icons[iconName] || Building2;
  };

  const formatText = (text: string, destaque: string) => {
    return text.replace('{destaque}', `<span class="font-bold">${destaque}</span>`);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden" style={{ background: config.corFundo }}>
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 opacity-[0.03]">
        <Image
          src={config.imagemFundo}
          alt=""
          fill
          className="object-cover"
          priority={false}
        />
      </div>
      
      <div className="container px-4 mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-medium uppercase tracking-wider mb-2" style={{ color: config.corPrimaria }}>
            Contato
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: config.corTexto }}>
            {config.titulo}
          </h3>
          <div className="w-24 h-1 mx-auto rounded-full mb-6" style={{ background: config.corPrimaria }}></div>
          <p className="max-w-2xl mx-auto" style={{ color: config.corTexto }}>
            {config.subtitulo}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-8 hover:shadow-md transition-all duration-300">
            {/* Accent color top border */}
            <div className="absolute top-0 left-0 right-0 h-1.5" style={{ background: config.corPrimaria }}></div>
            
            <div className="mb-8">
              <p 
                className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8"
                dangerouslySetInnerHTML={{ 
                  __html: formatText(config.textoIntroducao, config.textoDestaque)
                }}
              />
            </div>

            <div className="space-y-8">
              {Object.entries(config.informacoes).map(([key, info]: [string, InfoItem]) => {
                if (!info.texto) return null;
                
                const Icon = getIcon(info.icone);
                return (
                  <div key={key} className="flex items-start">
                    <div className="p-3 rounded-lg mr-4" style={{ background: `${config.corPrimaria}10` }}>
                      <Icon className="h-5 w-5" style={{ color: config.corPrimaria }} />
                    </div>
                    <div>
                      <div className="font-medium mb-1">{info.titulo}</div>
                      <div className="text-gray-500 dark:text-gray-400">
                        {info.link ? (
                          <a 
                            href={info.link} 
                            className="hover:text-[#29ABE2] transition-colors"
                            target={info.link.startsWith('http') ? '_blank' : undefined}
                            rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                          >
                            {info.texto}
                          </a>
                        ) : (
                          info.texto.split('\n').map((line, i) => (
                            <span key={i}>
                              {line}
                              {i < info.texto.split('\n').length - 1 && <br />}
                            </span>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              
              <Button 
                className="w-full flex items-center justify-center gap-2 py-6 rounded-md transition-all group shadow-lg hover:shadow-xl"
                style={{ 
                  background: config.whatsapp.corFundo,
                  color: config.whatsapp.corTexto
                }}
                asChild
              >
                <Link href={`https://wa.me/${config.whatsapp.numero}`}>
                  {React.createElement(getIcon(config.whatsapp.icone), { 
                    className: "h-5 w-5 group-hover:scale-110 transition-transform" 
                  })}
                  <span className="relative">
                    {config.whatsapp.texto}
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </span>
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {/* Google Maps embed */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden relative" style={{ height: `${config.mapa.altura}px` }}>
              {/* Accent color top border */}
              <div className="absolute top-0 left-0 right-0 h-1.5" style={{ background: config.corPrimaria, zIndex: 10 }}></div>
              
              <iframe 
                src={config.mapa.url}
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              ></iframe>
            </div>
            
            {/* Reminder about pickup only */}
            <Card style={{ background: `${config.lembrete.corFundo}10`, borderColor: `${config.lembrete.corFundo}20` }}>
              <CardHeader className="pb-2">
                <div className="flex items-center space-x-2">
                  {React.createElement(getIcon(config.lembrete.icone), { 
                    className: "h-5 w-5",
                    style: { color: config.lembrete.corFundo }
                  })}
                  <h3 className="font-bold text-lg" style={{ color: config.lembrete.corTexto }}>
                    {config.lembrete.titulo}
                  </h3>
                </div>
              </CardHeader>
              <CardContent>
                <p 
                  style={{ color: config.lembrete.corTexto }}
                  dangerouslySetInnerHTML={{ 
                    __html: formatText(config.lembrete.texto, config.textoDestaque)
                  }}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 rounded-lg p-6 border max-w-4xl mx-auto" style={{ background: `${config.corPrimaria}10`, borderColor: `${config.corPrimaria}20` }}>
          {config.indicadores.map((indicador, index) => (
            <div 
              key={index} 
              className="text-center p-4 rounded-lg transition-all duration-300 hover:shadow-md"
              style={{ 
                background: indicador.corFundo || `${indicador.cor}10`,
                border: `1px solid ${indicador.cor}20`
              }}
            >
              <div className="text-xl font-bold mb-1" style={{ color: indicador.cor }}>
                {indicador.titulo}
              </div>
              <p className="text-sm" style={{ color: config.corTexto }}>
                {indicador.descricao}
              </p>
            </div>
          ))}
        </div>

        {/* Contact form */}
        <div className="max-w-2xl mx-auto mt-16">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium mb-1" style={{ color: config.corTexto }}>
                {config.formulario.nome.label}
                {config.formulario.nome.obrigatorio && (
                  <span className="text-red-500 ml-1">*</span>
                )}
              </label>
              <Input
                id="nome"
                type="text"
                placeholder={config.formulario.nome.placeholder}
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className="w-full"
                required={config.formulario.nome.obrigatorio}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1" style={{ color: config.corTexto }}>
                {config.formulario.email.label}
                {config.formulario.email.obrigatorio && (
                  <span className="text-red-500 ml-1">*</span>
                )}
              </label>
              <Input
                id="email"
                type="email"
                placeholder={config.formulario.email.placeholder}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full"
                required={config.formulario.email.obrigatorio}
              />
            </div>

            <div>
              <label htmlFor="mensagem" className="block text-sm font-medium mb-1" style={{ color: config.corTexto }}>
                {config.formulario.mensagem.label}
                {config.formulario.mensagem.obrigatorio && (
                  <span className="text-red-500 ml-1">*</span>
                )}
              </label>
              <Textarea
                id="mensagem"
                placeholder={config.formulario.mensagem.placeholder}
                value={formData.mensagem}
                onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                className="w-full min-h-[150px]"
                required={config.formulario.mensagem.obrigatorio}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              style={{ 
                background: config.formulario.botao.cor,
                color: config.formulario.botao.corTexto
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Enviando...
                </div>
              ) : (
                config.formulario.botao.texto
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
