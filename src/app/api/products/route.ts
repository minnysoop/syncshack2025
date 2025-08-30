import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createProduct, listProductsByOwner } from '../../../services/productService';

const CreateProductSchema = z.object({
  ownerId: z.string().min(1),             
  name: z.string().min(2).max(200),
  hubId: z.string().min(1).optional(),  
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { ownerId, name, hubId } = CreateProductSchema.parse(body);

    const product = await createProduct({ ownerId, name, hubId });
    return NextResponse.json(product, { status: 201 });
  } catch (err: any) {
    if (err?.issues) {
      return NextResponse.json({ error: 'Invalid payload', details: err.issues }, { status: 400 });
    }
    const msg = typeof err?.message === 'string' ? err.message : 'Server error';
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const ownerId = searchParams.get('ownerId');
    if (!ownerId) {
      return NextResponse.json({ error: 'ownerId is required' }, { status: 400 });
    }
    const products = await listProductsByOwner(ownerId);
    return NextResponse.json(products, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
