import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createDeliveryByRenter, listPendingDeliveriesByHub } from '../../../services/deliveryService';

const CreateDeliverySchema = z.object({
  renterId: z.string().min(1),      // the user creating the delivery (RENTER)
  productId: z.string().min(1),
  originHubId: z.string().min(1),
  destLat: z.number().gte(-90).lte(90),
  destLng: z.number().gte(-180).lte(180),
  estimatedArrivalTime: z.string().datetime().optional(), 
});

// POST /api/deliveries creates a delivery
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = CreateDeliverySchema.parse(body);
    const delivery = await createDeliveryByRenter({
      renterId: parsed.renterId,
      productId: parsed.productId,
      originHubId: parsed.originHubId,
      destLat: parsed.destLat,
      destLng: parsed.destLng,
      estimatedArrivalTime: parsed.estimatedArrivalTime ? new Date(parsed.estimatedArrivalTime) : null,
    });
    return NextResponse.json(delivery, { status: 201 });
  } catch (err: any) {
    if (err?.issues) {
      return NextResponse.json({ error: 'Invalid payload', details: err.issues }, { status: 400 });
    }
    const msg = typeof err?.message === 'string' ? err.message : 'Server error';
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}

// GET /api/deliveries?hubId=...  → list pending deliveries for a hub
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const hubId = searchParams.get('hubId');
    if (!hubId) return NextResponse.json({ error: 'hubId is required' }, { status: 400 });
    const rows = await listPendingDeliveriesByHub(hubId);
    return NextResponse.json(rows, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
