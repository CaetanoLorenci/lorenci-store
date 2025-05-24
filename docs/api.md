# Documentação da API

## Endpoints

### Produtos

#### GET /api/products
Lista todos os produtos com paginação.

**Query Parameters:**
- `page` (number): Página atual (default: 1)
- `limit` (number): Itens por página (default: 10)
- `category` (string): Filtrar por categoria
- `search` (string): Buscar por nome/descrição
- `minPrice` (number): Preço mínimo
- `maxPrice` (number): Preço máximo
- `stock` (string): 'available' | 'out' | 'all'

**Response:**
```json
{
  "products": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "price": "number",
      "stock": "number",
      "images": ["string"],
      "category": "string",
      "features": [
        {
          "title": "string",
          "description": "string",
          "icon": "string"
        }
      ],
      "createdAt": "string",
      "updatedAt": "string"
    }
  ],
  "total": "number",
  "page": "number",
  "limit": "number"
}
```

#### PATCH /api/products/[id]/stock
Atualiza o estoque de um produto.

**Request Body:**
```json
{
  "stock": "number"
}
```

### Pedidos

#### POST /api/orders
Cria um novo pedido.

**Request Body:**
```json
{
  "items": [
    {
      "productId": "string",
      "quantity": "number"
    }
  ],
  "customer": {
    "name": "string",
    "email": "string",
    "phone": "string",
    "address": {
      "street": "string",
      "number": "string",
      "complement": "string",
      "city": "string",
      "state": "string",
      "zipCode": "string"
    }
  },
  "payment": {
    "method": "string", // "credit_card" | "pix" | "boleto"
    "installments": "number" // apenas para cartão
  },
  "shipping": {
    "method": "string", // "correios" | "melhor_envio"
    "zipCode": "string"
  },
  "coupon": "string" // código do cupom (opcional)
}
```

#### GET /api/orders
Lista pedidos do cliente (requer autenticação).

**Query Parameters:**
- `page` (number): Página atual
- `limit` (number): Itens por página
- `status` (string): Filtrar por status

### Cupons

#### POST /api/coupons/validate
Valida um cupom de desconto.

**Request Body:**
```json
{
  "code": "string",
  "orderValue": "number"
}
```

**Response:**
```json
{
  "valid": "boolean",
  "discount": "number",
  "type": "string", // "percentage" | "fixed" | "free_shipping"
  "message": "string"
}
```

### Frete

#### POST /api/shipping/calculate
Calcula o valor do frete.

**Request Body:**
```json
{
  "zipCode": "string",
  "items": [
    {
      "weight": "number",
      "length": "number",
      "width": "number",
      "height": "number"
    }
  ]
}
```

**Response:**
```json
{
  "options": [
    {
      "name": "string",
      "price": "number",
      "deliveryTime": "number",
      "carrier": "string"
    }
  ]
}
```

### Webhooks

#### POST /api/webhooks/shop9
Endpoint para receber atualizações do Shop9.

**Request Body:**
```json
{
  "event": "string", // "order.created" | "stock.low" | "product.updated"
  "data": {
    // Dados específicos do evento
  }
}
```

## Integrações

### Shop9
- Sincronização automática de produtos
- Atualização de estoque em tempo real
- Importação de pedidos

### MercadoPago
- Pagamento com cartão de crédito
- PIX
- Boleto bancário

### Correios/Melhor Envio
- Cálculo de frete
- Geração de etiquetas
- Rastreamento de pedidos

### WhatsApp Business API
- Notificações de pedidos
- Alertas de estoque baixo
- Confirmações de pagamento 