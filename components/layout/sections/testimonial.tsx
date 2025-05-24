"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";
import Image from "next/image";
import { getConfig } from "@/lib/config";

export const TestimonialSection = () => {
  const config = getConfig().testimonials;
  const cores = getConfig().site.paletaCores;

  if (config.oculta) {
    return null;
  }

  return (
    <section id="testimonials" className="relative py-24 sm:py-32 overflow-hidden" style={{ background: config.corFundo }}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 opacity-[0.03]">
        <Image
          src={config.imagemFundo || "/ice-texture.png"}
          alt=""
          fill
          className="object-cover"
          priority={false}
        />
      </div>
      
      <div className="container px-4 mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-medium uppercase tracking-wider mb-2" style={{ color: cores.primaria }}>
            {config.tituloHeader}
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: config.corTexto }}>
            {config.titulo}
          </h3>
          <div className="w-24 h-1 mx-auto rounded-full mb-6" style={{ background: cores.primaria }}></div>
          <p className="max-w-2xl mx-auto" style={{ color: config.corTexto }}>
            {config.subtitulo}
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
          }}
          className="relative w-[90%] lg:max-w-screen-xl mx-auto"
        >
          <CarouselContent>
            {config.itens.map((review) => (
              <CarouselItem
                key={review.nome}
                className="md:basis-1/2 lg:basis-1/3 p-2"
              >
                <div className="group bg-white rounded-lg shadow-sm border border-gray-100 p-6 h-full hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                  {/* Accent color top border */}
                  <div className="absolute top-0 left-0 right-0 h-1" style={{ background: cores.primaria }}></div>
                  
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={`size-4 ${i < Math.floor(review.rating || 5) ? 'fill-[#29ABE2] text-[#29ABE2]' : 'fill-gray-200 text-gray-200'}`} 
                      />
                    ))}
                    <span className="text-sm text-[#29ABE2] font-medium ml-1">
                      {(review.rating || 5).toFixed(1)}
                    </span>
                  </div>
                  
                  {/* Comment */}
                  <p className="text-gray-600 mb-6 italic">
                    {review.texto}
                  </p>
                  
                  {/* User info */}
                  <div className="flex items-center">
                    <Avatar className="border-2 border-[#29ABE2]/20">
                      <AvatarImage src={review.imagem || "/business-icons/default.jpg"} alt={review.nome} />
                      <AvatarFallback className="bg-[#29ABE2]/10 text-[#29ABE2]">
                        {review.nome.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="ml-4">
                      <h4 className="font-bold text-gray-900">{review.nome}</h4>
                      <p className="text-sm text-gray-500">{review.cargo}</p>
                    </div>
                  </div>
                  
                  {/* Bottom decorative element */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" style={{ background: cores.primaria }}></div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <CarouselPrevious className="border border-gray-200 hover:bg-[#29ABE2] hover:text-white hover:border-[#29ABE2] -left-4" />
          <CarouselNext className="border border-gray-200 hover:bg-[#29ABE2] hover:text-white hover:border-[#29ABE2] -right-4" />
        </Carousel>
      </div>
    </section>
  );
};
