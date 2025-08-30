import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createHubForOwner } from '../../../services/hubService'; 

const CreateHubSchema = z.object({
  ownerId: z.string().min(1),
  name: z.string().min(2).max(120),
  lat: z.number().gte(-90).lte(90),
  lng: z.number().gte(-180).lte(180),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { ownerId, name, lat, lng } = CreateHubSchema.parse(body);

    const hub = await createHubForOwner({ ownerId, name, lat, lng });
    return NextResponse.json(hub, { status: 201 });
  } catch (err: any) {
    if (err?.issues) {
      return NextResponse.json({ error: 'Invalid payload', details: err.issues }, { status: 400 });
    }
    return NextResponse.json({ error: err?.message ?? 'Server error' }, { status: 400 });
  }
}
