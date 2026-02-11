---
name: mercado-pago-integration
description: "Integration guide for Mercado Pago (PIX, Webhooks, Split Payment) in Next.js/Node.js. Use when implementing payments, validating credentials, handling webhooks, or managing subscriptions."
---

# Mercado Pago Integration

## Overview

This skill provides standard patterns for integrating Mercado Pago into the ERP, focusing on PIX collections, instant payment notifications (Webhooks), and credential validation.

## When to Use This Skill

- Use when setting up Mercado Pago credentials in `.env`.
- Use when implementing PIX charges (QR Code / Copy & Paste).
- Use when handling Webhooks for payment status updates.
- Use when debugging payment errors or access token issues.

## How It Works

### Step 1: Install SDK

```bash
pnpm add mercadopago
```

### Step 2: Initialize Client

Always initialize the client with the access token from the environment.

```typescript
import { MercadoPagoConfig, Payment } from 'mercadopago';

const client = new MercadoPagoConfig({ 
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN!,
  options: { timeout: 5000 }
});

const payment = new Payment(client);
```

### Step 3: Create PIX Charge

```typescript
const body = {
  transaction_amount: 100.00,
  description: 'Venda #123',
  payment_method_id: 'pix',
  payer: {
    email: 'client@email.com',
    identification: {
      type: 'CPF',
      number: '12345678909'
    }
  }
};

const response = await payment.create({ body });
const qrCode = response.point_of_interaction.transaction_data.qr_code;
const ticketUrl = response.point_of_interaction.transaction_data.ticket_url;
```

### Step 4: Handle Webhooks

1.  Validate signature (hmac) if available, or fetch payment status directly from API to ensure authenticity.
2.  Update database status based on `response.status` (approved, pending, rejected).

## Best Practices

-   ✅ **Always validate credentials** before starting the app (fail fast).
-   ✅ **Use Idempotency Keys** `X-Idempotency-Key` to prevent double charges.
-   ✅ **Verify Webhooks** by querying the API `v1/payments/[id]` using the ID received in the webhook, rather than trusting the webhook payload blindly.
-   ❌ **Don't hardcode tokens**.
-   ❌ **Don't expose Access Tokens** to the frontend.

## Validation Script Template

Use this pattern to verify credentials:

```typescript
import { MercadoPagoConfig, Payment } from 'mercadopago';

async function validateCredentials(token: string) {
  try {
    const client = new MercadoPagoConfig({ accessToken: token });
    // Try to search for payments to validate token permission
    const payment = new Payment(client);
    await payment.search({ options: { limit: 1 } });
    return true;
  } catch (error) {
    console.error("Invalid Credential:", error.message);
    return false;
  }
}
```
